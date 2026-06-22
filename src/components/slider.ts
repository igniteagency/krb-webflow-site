/**
 * General Slider component
 *
 * If a slider wrapper is present on the page, this script loads Swiper's JS and initialises
 * every matching component once Swiper is available.
 */
const COMPONENT_SELECTOR = '[data-slider-el="component"], .slider-gallery_component';
const SWIPER_JS_URL = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';

class Slider {
  COMPONENT_SELECTOR = COMPONENT_SELECTOR;
  NAV_PREV_BUTTON_SELECTOR = '[data-slider-el="nav-prev"]';
  NAV_NEXT_BUTTON_SELECTOR = '[data-slider-el="nav-next"]';

  swiperComponents: NodeListOf<HTMLElement> | [];
  swiper: unknown | null = null;

  constructor() {
    this.swiperComponents = document.querySelectorAll(this.COMPONENT_SELECTOR);
    this.initSliders();
  }

  initSliders() {
    this.swiperComponents.forEach((swiperComponent) => {
      const swiperEl = swiperComponent.querySelector('.swiper');
      if (!swiperEl) {
        console.error('`.swiper` element not found', swiperComponent);
        return;
      }

      if (!swiperEl.querySelector('.swiper-wrapper') || !swiperEl.querySelector('.swiper-slide')) {
        console.debug('Swiper wrapper/slides not found, skipping slider', swiperComponent);
        return;
      }

      const navPrevButtonEl = swiperComponent.querySelector(this.NAV_PREV_BUTTON_SELECTOR);
      const navNextButtonEl = swiperComponent.querySelector(this.NAV_NEXT_BUTTON_SELECTOR);

      const navigationConfig =
        navPrevButtonEl && navNextButtonEl
          ? {
              nextEl: navNextButtonEl,
              prevEl: navPrevButtonEl,
              disabledClass: 'is-disabled',
            }
          : false;

      this.swiper = new Swiper(swiperEl, {
        loop: false,
        spaceBetween: 24,
        slidesPerView: 'auto',
        navigation: navigationConfig,
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
