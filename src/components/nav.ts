const NAVBAR_WRAPPER_SELECTOR = '.navbar-wrapper';
const NAVBAR_COMPONENT_SELECTOR = '.navbar_component';
const NAV_MENU_ITEM_SELECTOR = '.navbar_menu-content_item';
const NAV_MENU_ITEM_LIST_SELECTOR = '.navbar_menu-content_item-list';
const NAV_MENU_TRIGGER_SELECTOR = ':scope > a.heading-style-h5';
const NAV_MENU_BACK_SELECTOR =
  '[data-nav-menu-back], .navbar_menu-back, .navbar_menu-content_item-back';

const HIDE_THRESHOLD = 100;
const TABLET_BREAKPOINT = 991;
const HIDDEN_CLASS = 'is-hidden';
const TRANSPARENT_CLASS = 'is-transparent';
const OPEN_CLASS = 'is-open';
const OVERVIEW_LABEL = 'overview';

function isTabletDown() {
  return window.matchMedia(`(max-width: ${TABLET_BREAKPOINT}px)`).matches;
}

function getOverviewLink(listEl: HTMLElement) {
  const links = Array.from(listEl.querySelectorAll<HTMLAnchorElement>('a'));

  return links.find((link) => link.textContent?.trim().toLowerCase() === OVERVIEW_LABEL) ?? null;
}

function getBackButton(listEl: HTMLElement) {
  const explicitBackButton = listEl.querySelector<HTMLElement>(NAV_MENU_BACK_SELECTOR);

  if (explicitBackButton) return explicitBackButton;

  const textBackButton = Array.from(listEl.querySelectorAll<HTMLElement>('a, button')).find(
    (button) => button.textContent?.trim().toLowerCase().includes('back')
  );

  if (textBackButton) return textBackButton;

  const backLabel = Array.from(listEl.querySelectorAll<HTMLElement>('*')).find(
    (element) => element.textContent?.trim().toLowerCase() === 'back'
  );

  return backLabel?.closest<HTMLElement>('a, button, .button_component') ?? backLabel ?? null;
}

export function initNav() {
  const navbarWrapperEls = document.querySelectorAll<HTMLElement>(NAVBAR_WRAPPER_SELECTOR);

  navbarWrapperEls.forEach((navbarWrapperEl) => {
    const navbarComponentEl = navbarWrapperEl.querySelector<HTMLElement>(NAVBAR_COMPONENT_SELECTOR);

    if (!navbarComponentEl) {
      console.debug('Skipping empty/placeholder navbar wrapper:', navbarWrapperEl);
      return;
    }

    if (navbarWrapperEl.dataset.navInitialised === 'true') return;
    navbarWrapperEl.dataset.navInitialised = 'true';

    console.debug('Navbar script initialized successfully.', {
      navbarWrapperEl,
      navbarComponentEl,
    });

    const menuItemEls = Array.from(
      navbarWrapperEl.querySelectorAll<HTMLElement>(NAV_MENU_ITEM_SELECTOR)
    );

    const closeMenuLists = () => {
      menuItemEls.forEach((itemEl) => {
        const triggerEl = itemEl.querySelector<HTMLAnchorElement>(NAV_MENU_TRIGGER_SELECTOR);
        const listEl = itemEl.querySelector<HTMLElement>(NAV_MENU_ITEM_LIST_SELECTOR);

        listEl?.classList.remove(OPEN_CLASS);
        triggerEl?.setAttribute('aria-expanded', 'false');
      });
    };

    menuItemEls.forEach((itemEl) => {
      const triggerEl = itemEl.querySelector<HTMLAnchorElement>(NAV_MENU_TRIGGER_SELECTOR);
      const listEl = itemEl.querySelector<HTMLElement>(NAV_MENU_ITEM_LIST_SELECTOR);

      if (!triggerEl || !listEl) return;

      const triggerHref = triggerEl.getAttribute('href');
      const overviewLinkEl = getOverviewLink(listEl);
      const backButtonEl = getBackButton(listEl);

      triggerEl.setAttribute('aria-haspopup', 'true');
      triggerEl.setAttribute('aria-expanded', listEl.classList.contains(OPEN_CLASS).toString());

      if (triggerHref && overviewLinkEl) {
        overviewLinkEl.setAttribute('href', triggerHref);
      }

      triggerEl.addEventListener(
        'click',
        (event) => {
          if (!isTabletDown()) return;

          event.preventDefault();

          const shouldOpen = !listEl.classList.contains(OPEN_CLASS);
          closeMenuLists();

          if (shouldOpen) {
            listEl.classList.add(OPEN_CLASS);
            triggerEl.setAttribute('aria-expanded', 'true');
          }
        },
        { capture: true }
      );

      backButtonEl?.addEventListener('click', (event) => {
        event.preventDefault();
        listEl.classList.remove(OPEN_CLASS);
        triggerEl.setAttribute('aria-expanded', 'false');
      });
    });

    closeMenuLists();

    window.addEventListener('resize', () => {
      if (!isTabletDown()) closeMenuLists();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenuLists();
    });

    let previousScrollY = window.scrollY;
    let isTicking = false;
    let transparentTimeoutId: number | null = null;

    const updateNavState = () => {
      const currentScrollY = window.scrollY;
      const isPastThreshold = currentScrollY > HIDE_THRESHOLD;
      const isScrollingDown = currentScrollY > previousScrollY;
      const isHiding = isPastThreshold && isScrollingDown;

      console.debug('updateNavState firing:', {
        currentScrollY,
        previousScrollY,
        isPastThreshold,
        isScrollingDown,
        isHiding,
      });

      if (transparentTimeoutId !== null) {
        window.clearTimeout(transparentTimeoutId);
        transparentTimeoutId = null;
      }

      navbarWrapperEl.classList.toggle(HIDDEN_CLASS, isHiding);

      if (!isPastThreshold) {
        navbarComponentEl.classList.add(TRANSPARENT_CLASS);
      } else {
        if (isHiding) {
          // Delay removal of transparency while it slides out of view to avoid flash to white
          transparentTimeoutId = window.setTimeout(() => {
            navbarComponentEl.classList.remove(TRANSPARENT_CLASS);
            transparentTimeoutId = null;
          }, 400); // 400ms matches the slide-out transition duration
        } else {
          // If we are showing it (scrolling up), make it opaque immediately
          navbarComponentEl.classList.remove(TRANSPARENT_CLASS);
        }
      }

      previousScrollY = currentScrollY;
      isTicking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (isTicking) return;

        window.requestAnimationFrame(updateNavState);
        isTicking = true;
      },
      { passive: true }
    );

    updateNavState();
  });
}
