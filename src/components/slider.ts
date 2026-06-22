/**
 * General Slider component
 *
 * If a `[data-slider-el="component"]` wrapper is present on the page, this script loads
 * Swiper's JS and initialises every matching component once Swiper is available.
 */
const COMPONENT_SELECTOR = '[data-slider-el="component"]';
const SWIPER_JS_URL = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';

class Slider {
  COMPONENT_SELECTOR = COMPONENT_SELECTOR;
  NAV_PREV_BUTTON_SELECTOR = '[data-slider-el="nav-prev"]';
  NAV_NEXT_BUTTON_SELECTOR = '[data-slider-el="nav-next"]';
  PAGINATION_SELECTOR = '[data-slider-el="pagination"]';

  swiperComponents: NodeListOf<HTMLElement> | [];
  swiper: unknown | null = null;

  constructor() {
    this.swiperComponents = document.querySelectorAll(this.COMPONENT_SELECTOR);
    this.initSliders();
  }

  initSliders() {
    this.swiperComponents.forEach((swiperComponent) => {
      const swiperEl = swiperComponent.querySelector('.swiper');
      const swiperWrapperEl = swiperComponent.querySelector('.swiper-wrapper');
      const slideEls = swiperComponent.querySelectorAll('.swiper-slide');

      if (!swiperEl || !swiperWrapperEl || !slideEls.length) {
        console.warn('Skipping invalid slider component', swiperComponent);
        return;
      }

      const navPrevButtonEl = swiperComponent.querySelector(this.NAV_PREV_BUTTON_SELECTOR);
      const navNextButtonEl = swiperComponent.querySelector(this.NAV_NEXT_BUTTON_SELECTOR);
      const paginationEl = swiperComponent.querySelector(this.PAGINATION_SELECTOR);

      const navigationConfig =
        navPrevButtonEl && navNextButtonEl
          ? {
              nextEl: navNextButtonEl,
              prevEl: navPrevButtonEl,
              disabledClass: 'is-disabled',
            }
          : false;

      const paginationConfig = paginationEl
        ? {
            el: paginationEl,
            clickable: true,
            bulletClass: 'slider_pagination-bullet',
            bulletActiveClass: 'is-active',
            renderBullet: (_index: number, className: string) =>
              `<button type="button" class="${className}"></button>`,
          }
        : false;

      this.swiper = new Swiper(swiperEl, {
        loop: false,
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        spaceBetween: 0,
        slidesPerView: 1,
        navigation: navigationConfig,
        pagination: paginationConfig,
        slideActiveClass: 'is-active',
        slidePrevClass: 'is-previous',
        slideNextClass: 'is-next',
        a11y: {
          enabled: true,
        },
      });
    });
  }
}

let hasInitialisedSlider = false;

function hasSliderComponent() {
  return Boolean(document.querySelector(COMPONENT_SELECTOR));
}

function isSwiperReady() {
  return typeof Swiper !== 'undefined';
}

function initSlider() {
  if (hasInitialisedSlider || !hasSliderComponent() || !isSwiperReady()) {
    return;
  }

  hasInitialisedSlider = true;
  new Slider();
}

function loadSwiper() {
  if (isSwiperReady()) {
    initSlider();
    return;
  }

  if (!window.loadScript) {
    console.error('window.loadScript is required to load Swiper. Make sure entry.js loads first.');
    return;
  }

  window
    .loadScript(SWIPER_JS_URL, {
      placement: 'head',
      scriptName: 'swiper',
    })
    .then(initSlider)
    .catch((error) => {
      console.error('Failed to load Swiper JS', error);
    });
}

document.addEventListener('scriptLoaded:swiper', initSlider);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (hasSliderComponent()) {
      loadSwiper();
    }
  });
} else if (hasSliderComponent()) {
  loadSwiper();
}
