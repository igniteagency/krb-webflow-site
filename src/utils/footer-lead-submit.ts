const FOOTER_LEAD_ENDPOINT = 'https://enrol.krb.nsw.edu.au/api/v1/lead-submit/';
const FOOTER_LEAD_REFERENCE = 'b7583f8b-dcb9-4905-9330-63ab9ec8e390';
const FOOTER_LEAD_SELECTOR = 'footer form';
const CONNECT_BUTTON_TEXT = /connect with us/i;

function getInputValue(form: HTMLFormElement, selectors: string): string {
  const input = form.querySelector<HTMLInputElement>(selectors);
  return input?.value.trim() || '';
}

function isFooterLeadForm(form: HTMLFormElement): boolean {
  const submitButton = form.querySelector<HTMLButtonElement | HTMLInputElement>(
    'button[type="submit"], input[type="submit"]'
  );
  const buttonText = submitButton?.textContent || submitButton?.value || '';

  return CONNECT_BUTTON_TEXT.test(buttonText);
}

function submitLead(form: HTMLFormElement) {
  const email = getInputValue(form, '[name="Email"], input[type="email"]');

  if (!email) return;

  const body = new URLSearchParams({
    first_name: getInputValue(form, '[name="Name"], input[type="text"]'),
    email,
    reference: FOOTER_LEAD_REFERENCE,
  });

  void fetch(FOOTER_LEAD_ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    keepalive: true,
    body,
  }).catch((error) => {
    console.debug('KRB footer lead submission failed', error);
  });
}

export function initFooterLeadSubmit() {
  document.querySelectorAll<HTMLFormElement>(FOOTER_LEAD_SELECTOR).forEach((form) => {
    if (form.dataset.krbLeadSubmit === 'true' || !isFooterLeadForm(form)) return;

    form.dataset.krbLeadSubmit = 'true';
    form.addEventListener('submit', () => submitLead(form), true);
  });
}
