const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menuButton = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); mobileNav.hidden = true; }
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileNav.hidden = !open;
});
$$('a,button', mobileNav).forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); } });
const desktopMedia = matchMedia('(min-width: 761px)');
desktopMedia.addEventListener('change', event => { if (event.matches) closeMenu(); });

const products = {
  "printing": {
    "title": "Printing rubber rollers",
    "label": "01 — MEIWA PRINTING",
    "description": "Meiwa’s printing portfolio includes inking, water-supply and Hickey rollers for offset printing, as well as gravure, flexo, newspaper and label applications. BZ and UV Summit II address conventional and UV ink requirements. MD and Aquaphilic focus on dampening and water transfer.",
    "details": [
      "Press manufacturer, model, and roller position",
      "Ink system, fountain solution, and cleaning chemistry",
      "Core and finished roller dimensions",
      "Required hardness, press speed, and operating concerns"
    ]
  },
  "industrial": {
    "title": "Industrial rubber rolls",
    "label": "02 — MEIWA INDUSTRIAL",
    "description": "Meiwa’s industrial rubber rolls cover functions from nip rolls to winding touch rolls. Applications include film processing, paper manufacturing, plywood and steel lines. Discuss the material and surface requirements against your production conditions.",
    "details": [
      "Industry, equipment, and roller function",
      "Substrate, line speed, temperature, and chemicals",
      "Core construction and finished dimensions",
      "Hardness, surface finish, and wear requirements"
    ]
  },
  "dust": {
    "title": "Dust-removal rolls",
    "label": "03 — MEIWA CLEAN SURFACES",
    "description": "Meiwa’s dust-removal rolls support cleanliness requirements in electronic materials, precision equipment and optical films. Share the material being processed and the contamination concern to discuss the appropriate roller surface.",
    "details": [
      "Material or film being processed",
      "Dust or contamination concerns",
      "Roller position, dimensions, and contact conditions",
      "Line speed and cleaning requirements"
    ]
  },
  "antistatic": {
    "title": "Anti-static rolls",
    "label": "04 — MEIWA STATIC CONTROL",
    "description": "Meiwa’s anti-static range addresses static-control requirements on film manufacturing lines. Ozone resistance is also a material consideration for these environments. Define the roller’s role and operating conditions before selecting the material.",
    "details": [
      "Film type and manufacturing process",
      "Static-control requirements and current concerns",
      "Ozone exposure, line speed, and temperature",
      "Roller dimensions, surface, and core requirements"
    ]
  },
  "cfrp": {
    "title": "CFRP lightweight rolls",
    "label": "05 — MEIWA CARBON FIBER",
    "description": "Meiwa’s CFRP range uses carbon fiber reinforced polymer cores for lightweight rolls in printing and film processing. Share the application and core requirements to discuss suitability. The illustration shows the carbon-fiber material, rather than a rubber-coated surface.",
    "details": [
      "Printing or film-processing application",
      "Roller span, finished diameter, and shaft dimensions",
      "Operating speed and loading conditions",
      "Core weight and surface requirements"
    ]
  },
  "nonstick": {
    "title": "Non-stick rolls",
    "label": "06 — MEIWA SURFACE TECHNOLOGY",
    "description": "Meiwa’s non-stick rolls use composite surface modification, with special thermal spraying and sealing treatments described in the supplied reference. The wider portfolio also includes ceramic surface-treated rolls. Discuss the processed material, release requirements and operating environment to define the suitable surface.",
    "details": [
      "Processed material and release requirements",
      "Temperature, chemicals, and cleaning process",
      "Roller dimensions and core construction",
      "Current sticking, build-up, or surface-wear concerns"
    ]
  }
};
const productDialog = $('#product-dialog');
const enquiryDialog = $('#enquiry-dialog');
let selectedProduct = 'General enquiry';
let currentApplication = 'Sheet-fed offset';
let lastDialogTrigger;
function showDialog(dialog, trigger) {
  lastDialogTrigger = trigger || document.activeElement;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}
function openEnquiry(solution = 'General enquiry', trigger) {
  $('#enquiry-form').elements.solution.value = solution;
  $('#enquiry-status').hidden = true;
  closeMenu();
  showDialog(enquiryDialog, trigger);
}
$$('[data-product]').forEach(button => button.addEventListener('click', () => {
  const product = products[button.dataset.product];
  selectedProduct = product.title;
  $('#product-dialog-label').textContent = product.label;
  $('#product-dialog-title').textContent = product.title;
  $('#product-dialog-description').textContent = product.description;
  $('#product-detail-link').href = `roller-technology.html#${button.dataset.product}`;
  $('#product-dialog-list').replaceChildren(...product.details.map(detail => { const li = document.createElement('li'); li.textContent = detail; return li; }));
  showDialog(productDialog, button);
}));
$$('[data-enquiry]').forEach(button => button.addEventListener('click', () => openEnquiry(button.dataset.solution || (button.id === 'application-enquiry' ? currentApplication : 'General enquiry'), button)));
$('#product-enquiry').addEventListener('click', () => { const trigger = lastDialogTrigger; productDialog.close(); openEnquiry(selectedProduct, trigger); });
$$('dialog').forEach(dialog => {
  $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target !== dialog) return; const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); });
  dialog.addEventListener('close', () => {
    if (!$('dialog[open]')) { document.body.classList.remove('dialog-open'); lastDialogTrigger?.focus(); }
  });
});

const applications = {
  sheet: { solution: 'Sheet-fed offset', label: 'CONTROL. FROM SHEET TO SHEET.', title: ['Every sheet is', 'a first impression.'], description: 'Meiwa’s BZ inking rollers and UV Summit II range cover conventional and UV ink requirements. Share your press model and ink system to discuss suitability.' },
  web: { solution: 'Web offset', label: 'CONTINUITY. FROM START TO FINISH.', title: ['Keep the process', 'moving forward.'], description: 'Meiwa’s BW (Black Web), BN (Black News), and NCD-III/IV ranges address commercial and newspaper rotary printing. Discuss press speed, heat generation, and roller wear.' },
  packaging: { solution: 'Packaging printing', label: 'DETAIL. THAT GOES BEYOND THE PRINT.', title: ['An impression', 'worth picking up.'], description: 'Meiwa’s gravure, flexo, and label ranges include impression, furnisher, and fountain rolls. Share your substrate and ink system to discuss wear resistance, ozone, and static control.' }
};
const tabs = $$('[data-application]');
function selectApplication(button) {
  if (!button || button.getAttribute('aria-selected') === 'true') return;
  const index = tabs.indexOf(button);
  tabs.forEach(tab => { const active = tab === button; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; });
  const application = applications[button.dataset.application];
  currentApplication = application.solution;
  $('#application-panel').setAttribute('aria-labelledby', button.id);
  $('#application-label').textContent = application.label;
  $('#application-title').replaceChildren(document.createTextNode(application.title[0]), document.createElement('br'), document.createTextNode(application.title[1]));
  $('#application-description').textContent = application.description;
  $('#application-panel').dataset.applicationStep = String(index);
  $('.application-index').textContent = `${String(index + 1).padStart(2, '0')} / 03`;
}
tabs.forEach((button, index) => {
  button.addEventListener('click', () => selectApplication(button));
  button.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault(); selectApplication(tabs[next]); tabs[next].focus();
  });
});

$('#enquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const text = `NUTECH RUBBER SOLUTIONS — ENQUIRY\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')}\nSolution: ${data.get('solution')}\n\nRequirement:\n${data.get('requirement')}\n\nPrepared locally. This enquiry has not been sent.\n`;
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'nutech-enquiry.txt'; document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  const status = $('#enquiry-status'); status.textContent = 'Your enquiry file is ready. Share it with your NUTECH contact to continue the conversation. It has not been sent by this website.'; status.hidden = false;
});
$('#year').textContent = new Date().getFullYear();

// Keep a dated announcement from remaining active after the planned visit week.
const visitNote = $('#meiwa-visit');
if (visitNote && Date.now() >= Date.parse(visitNote.dataset.eventUntil)) visitNote.hidden = true;

// Restore an incoming section link after the optional motion layer refreshes
// its measurements on load. Keep ordinary scrolling and manual tabs unchanged.
function restoreIncomingSection() {
  if (!location.hash) return;
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  if (!target) return;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: 'instant', block: 'start' });
  }));
}
if (document.readyState === 'complete') restoreIncomingSection();
else window.addEventListener('load', restoreIncomingSection, { once: true });
