const NAVBAR_WRAPPER_SELECTOR = '.navbar-wrapper';
const NAVBAR_COMPONENT_SELECTOR = '.navbar_component';

const HIDE_THRESHOLD = 100;
const HIDDEN_CLASS = 'is-hidden';
const TRANSPARENT_CLASS = 'is-transparent';

function initNav() {
  const navbarWrapperEl = document.querySelector<HTMLElement>(NAVBAR_WRAPPER_SELECTOR);
  const navbarComponentEl = navbarWrapperEl?.querySelector<HTMLElement>(NAVBAR_COMPONENT_SELECTOR);

  if (!navbarWrapperEl || !navbarComponentEl) {
    console.error('Navbar wrapper or component not found', navbarWrapperEl, navbarComponentEl);
    return;
  }

  let previousScrollY = window.scrollY;
  let isTicking = false;

  const updateNavState = () => {
    const currentScrollY = window.scrollY;
    const isPastThreshold = currentScrollY > HIDE_THRESHOLD;
    const isScrollingDown = currentScrollY > previousScrollY;

    navbarComponentEl.classList.toggle(TRANSPARENT_CLASS, !isPastThreshold);
    navbarWrapperEl.classList.toggle(HIDDEN_CLASS, isPastThreshold && isScrollingDown);

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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNav);
} else {
  initNav();
}
