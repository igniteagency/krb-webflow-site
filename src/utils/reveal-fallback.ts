const REVEAL_SELECTOR = '[data-reveal], [data-reveal-stagger]';
const REVEAL_STAGGER_CHILDREN_SELECTOR = ":scope > *:not(.display-contents):not([class*='spacer'])";
const REVEALED_CLASS = 'is-revealed';
const FALLBACK_CLASS = 'reveal-fallback';
const LOG_PREFIX = '[KRB reveal fallback]';
const TRIGGER_VIEWPORT_RATIO = 0.5;

function supportsNativeRevealAnimations() {
  return CSS.supports('animation-trigger: --reveal-trigger play-once');
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function setStaggerIndexes(element: HTMLElement) {
  if (!element.hasAttribute('data-reveal-stagger')) return;

  element
    .querySelectorAll<HTMLElement>(REVEAL_STAGGER_CHILDREN_SELECTOR)
    .forEach((child, index) => {
      if (child.closest('[data-stagger-stop]')) return;

      child.style.setProperty('--reveal-index', String(index));
    });
}

function reveal(element: HTMLElement, shouldLog = false) {
  if (element.classList.contains(REVEALED_CLASS)) return false;

  element.classList.add(REVEALED_CLASS);

  if (shouldLog) {
    console.info(`${LOG_PREFIX} Revealed element.`, { element });
  }

  return true;
}

function initViewportFallback(revealElements: NodeListOf<HTMLElement>) {
  const unrevealedElements = new Set(revealElements);
  let isTicking = false;

  const checkRevealElements = () => {
    const triggerPoint = window.innerHeight * TRIGGER_VIEWPORT_RATIO;

    unrevealedElements.forEach((element) => {
      if (element.getBoundingClientRect().top > triggerPoint) return;

      reveal(element, true);
      unrevealedElements.delete(element);
    });

    if (!unrevealedElements.size) {
      window.removeEventListener('scroll', requestRevealCheck);
      window.removeEventListener('resize', requestRevealCheck);
    }
  };

  const requestRevealCheck = () => {
    if (isTicking) return;

    isTicking = true;
    window.requestAnimationFrame(() => {
      isTicking = false;
      checkRevealElements();
    });
  };

  window.addEventListener('scroll', requestRevealCheck, { passive: true });
  window.addEventListener('resize', requestRevealCheck);
  checkRevealElements();
}

export function initRevealFallback() {
  const revealElements = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);

  if (!revealElements.length) return;

  revealElements.forEach(setStaggerIndexes);

  const nativeRevealSupported = supportsNativeRevealAnimations();
  const reducedMotion = prefersReducedMotion();

  if (nativeRevealSupported) {
    console.info(`${LOG_PREFIX} Native CSS animation-trigger supported; JS fallback not needed.`, {
      revealElementCount: revealElements.length,
    });
    revealElements.forEach((element) => reveal(element));
    return;
  }

  if (reducedMotion) {
    console.info(`${LOG_PREFIX} Reduced motion requested; revealing elements without animation.`, {
      revealElementCount: revealElements.length,
    });
    revealElements.forEach((element) => reveal(element));
    return;
  }

  console.info(`${LOG_PREFIX} Native CSS animation-trigger unsupported; JS fallback active.`, {
    revealElementCount: revealElements.length,
  });
  console.info(`${LOG_PREFIX} Using viewport scroll fallback.`, {
    triggerViewportRatio: TRIGGER_VIEWPORT_RATIO,
  });

  document.documentElement.classList.add(FALLBACK_CLASS);
  initViewportFallback(revealElements);
}
