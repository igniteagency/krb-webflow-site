const REVEAL_SELECTOR = '[data-reveal], [data-reveal-stagger]';
const REVEAL_STAGGER_CHILDREN_SELECTOR = ":scope > *:not(.display-contents):not([class*='spacer'])";
const REVEALED_CLASS = 'is-revealed';
const FALLBACK_CLASS = 'reveal-fallback';
const LOG_PREFIX = '[KRB reveal fallback]';

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

function reveal(element: HTMLElement) {
  element.classList.add(REVEALED_CLASS);
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
    revealElements.forEach(reveal);
    return;
  }

  if (reducedMotion) {
    console.info(`${LOG_PREFIX} Reduced motion requested; revealing elements without animation.`, {
      revealElementCount: revealElements.length,
    });
    revealElements.forEach(reveal);
    return;
  }

  console.info(`${LOG_PREFIX} Native CSS animation-trigger unsupported; JS fallback active.`, {
    revealElementCount: revealElements.length,
  });
  document.documentElement.classList.add(FALLBACK_CLASS);

  if (!('IntersectionObserver' in window)) {
    console.info(
      `${LOG_PREFIX} IntersectionObserver unsupported; revealing all elements immediately.`
    );
    revealElements.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        reveal(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: '0px 0px -50% 0px',
      threshold: 0,
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}
