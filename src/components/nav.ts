const NAVBAR_WRAPPER_SELECTOR = '.navbar-wrapper';
const NAVBAR_COMPONENT_SELECTOR = '.navbar_component';

const HIDE_THRESHOLD = 100;
const HIDDEN_CLASS = 'is-hidden';
const TRANSPARENT_CLASS = 'is-transparent';

export function initNav() {
  const navbarWrapperEls = document.querySelectorAll<HTMLElement>(NAVBAR_WRAPPER_SELECTOR);

  navbarWrapperEls.forEach((navbarWrapperEl) => {
    const navbarComponentEl = navbarWrapperEl.querySelector<HTMLElement>(NAVBAR_COMPONENT_SELECTOR);

    if (!navbarComponentEl) {
      console.debug('Skipping empty/placeholder navbar wrapper:', navbarWrapperEl);
      return;
    }

    console.debug('Navbar script initialized successfully.', { navbarWrapperEl, navbarComponentEl });

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
