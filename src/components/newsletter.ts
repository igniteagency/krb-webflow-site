const COMPONENT_SELECTOR = '.newsletter_component';
const SIDE_NAV_DETAILS_SELECTOR = '.newsletter_side-nav_details';
const SIDE_NAV_LINK_SELECTOR = '.newsletter_side-nav_link';
const PERIOD_SELECTOR = '.newsletter_period_item[id]';
const PERIOD_DETAILS_SELECTOR = '.newsletter_period_item > details';
const DESKTOP_MEDIA_QUERY = '(min-width: 768px)';

const desktopMediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

type NewsletterPeriod = {
  year: string;
  term: string;
  id: string;
};

export function initNewsletter() {
  const components = document.querySelectorAll<HTMLElement>(COMPONENT_SELECTOR);

  components.forEach((component) => {
    const mainDetails = getMainNewsletterDetails(component);

    populateSideNav(component);
    initMainContentDetails(mainDetails);
  });
}

function populateSideNav(component: HTMLElement) {
  const templateDetails = component.querySelector<HTMLDetailsElement>(SIDE_NAV_DETAILS_SELECTOR);
  const sideNavWrapper = templateDetails?.parentElement;
  const templateLink = templateDetails?.querySelector<HTMLAnchorElement>(SIDE_NAV_LINK_SELECTOR);

  if (!templateDetails || !sideNavWrapper || !templateLink) return;

  const groupedPeriods = groupPeriodsByYear(getNewsletterPeriods(component));
  if (!groupedPeriods.size) return;

  const previousTemplateOpenState = templateDetails.open;
  const sideNavItems = Array.from(groupedPeriods.entries()).map(([year, periods], index) => {
    const item = templateDetails.cloneNode(true) as HTMLDetailsElement;
    const yearText = item.querySelector<HTMLElement>('summary p') || item.querySelector('summary');
    const content = item.querySelector<HTMLElement>('.newsletter_side-nav_content');
    const spacer = content?.querySelector<HTMLElement>('[class*="spacer"]')?.cloneNode(true);

    item.open = previousTemplateOpenState && index === 0;

    if (yearText) yearText.textContent = year;
    if (!content) return item;

    content.replaceChildren(
      ...periods.map((period) => {
        const link = templateLink.cloneNode(true) as HTMLAnchorElement;
        link.textContent = period.term;
        link.setAttribute('href', `#${encodeURIComponent(period.id)}`);
        return link;
      }),
      ...(spacer ? [spacer] : [])
    );

    return item;
  });

  sideNavWrapper.querySelectorAll(SIDE_NAV_DETAILS_SELECTOR).forEach((item) => item.remove());
  sideNavWrapper.append(...sideNavItems);
}

function getNewsletterPeriods(component: HTMLElement) {
  return Array.from(component.querySelectorAll<HTMLElement>(PERIOD_SELECTOR))
    .filter((period) => !period.closest(SIDE_NAV_DETAILS_SELECTOR))
    .map((period) => {
      const year = period.closest<HTMLElement>('[data-year]')?.dataset.year || parseYear(period.id);
      const term = parseTerm(period.id) || period.querySelector('summary')?.textContent?.trim();

      if (!year || !term) return null;

      return {
        year,
        term: normaliseTerm(term),
        id: period.id,
      };
    })
    .filter((period): period is NewsletterPeriod => Boolean(period));
}

function groupPeriodsByYear(periods: NewsletterPeriod[]) {
  return periods.reduce((groups, period) => {
    const currentPeriods = groups.get(period.year) || [];
    const alreadyAdded = currentPeriods.some((currentPeriod) => currentPeriod.id === period.id);

    if (!alreadyAdded) {
      groups.set(period.year, [...currentPeriods, period].sort(sortPeriodsByTerm));
    }

    return groups;
  }, new Map<string, NewsletterPeriod[]>());
}

function sortPeriodsByTerm(firstPeriod: NewsletterPeriod, secondPeriod: NewsletterPeriod) {
  return getTermNumber(firstPeriod.term) - getTermNumber(secondPeriod.term);
}

function getMainNewsletterDetails(component: HTMLElement) {
  return Array.from(component.querySelectorAll<HTMLDetailsElement>(PERIOD_DETAILS_SELECTOR)).filter(
    (details) => !details.closest(SIDE_NAV_DETAILS_SELECTOR)
  );
}

function initMainContentDetails(detailsList: HTMLDetailsElement[]) {
  const syncDetails = () => {
    if (!desktopMediaQuery.matches) return;

    detailsList.forEach((details) => {
      details.open = true;
    });
  };

  detailsList.forEach((details) => {
    const summary = details.querySelector('summary');

    summary?.addEventListener('click', (event) => {
      if (!desktopMediaQuery.matches) return;

      event.preventDefault();
      details.open = true;
    });
  });

  syncDetails();
  desktopMediaQuery.addEventListener('change', syncDetails);
}

function parseYear(value: string) {
  return value.match(/\b(20\d{2})\b/)?.[1];
}

function parseTerm(value: string) {
  return value.match(/\bTerm\s+\d+\b/i)?.[0];
}

function getTermNumber(value: string) {
  return Number(value.match(/\d+/)?.[0] || 0);
}

function normaliseTerm(value: string) {
  return value
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
