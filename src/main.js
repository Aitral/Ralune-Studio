import { disciplines, projects } from './content.js';
import { contact } from './contact.js';

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-shell');
menuButton.hidden = false;
function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('menu-open');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('menu-open', open);
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', (event) => {
  if (!navigation.contains(event.target)) closeMenu();
});
const mobileQuery = window.matchMedia('(max-width: 767px)');
mobileQuery.addEventListener('change', () => closeMenu());
navigation.classList.add('enhanced');

const tabs = [...document.querySelectorAll('[data-discipline]')];
const tabList = document.getElementById('discipline-tabs');
const panel = document.getElementById('discipline-panel');
tabList.setAttribute('role', 'tablist');
tabList.setAttribute('aria-label', 'Disciplinas del estudio');
tabList.setAttribute('aria-orientation', 'vertical');
panel.setAttribute('role', 'tabpanel');
tabs.forEach((tab) => {
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-controls', panel.id);
});
function selectDiscipline(index, moveFocus = false) {
  const discipline = disciplines[index];
  tabs.forEach((tab, tabIndex) => {
    tab.setAttribute('aria-selected', String(tabIndex === index));
    tab.tabIndex = tabIndex === index ? 0 : -1;
  });
  panel.setAttribute('aria-labelledby', tabs[index].id);
  document.getElementById('discipline-tag').textContent = discipline.tag;
  document.getElementById('discipline-number').textContent = String(index + 1).padStart(2, '0');
  document.getElementById('discipline-title').textContent = discipline.title;
  document.getElementById('discipline-description').textContent = discipline.description;
  document.getElementById('discipline-services').replaceChildren(...discipline.services.map((service) => {
    const item = document.createElement('li');
    item.textContent = service;
    return item;
  }));
  if (moveFocus) tabs[index].focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectDiscipline(index));
  tab.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectDiscipline(next, true);
    }
  });
});
selectDiscipline(0);

const dialog = document.getElementById('project-dialog');
let projectTrigger;
document.querySelectorAll('[data-project]').forEach((button) => {
  button.hidden = false;
  button.addEventListener('click', () => {
    const project = projects.find((item) => item.id === button.dataset.project);
    projectTrigger = button;
    document.getElementById('dialog-title').textContent = project.title;
    document.getElementById('dialog-description').textContent = project.description;
    document.getElementById('dialog-focus').textContent = project.focus;
    const image = document.getElementById('dialog-image');
    image.src = `${import.meta.env.BASE_URL}assets/${project.id}.jpg`;
    image.srcset = `${import.meta.env.BASE_URL}assets/${project.id}-640.jpg 640w, ${import.meta.env.BASE_URL}assets/${project.id}.jpg ${project.width}w`;
    image.width = project.width;
    image.height = project.height;
    image.sizes = '(max-width: 800px) calc(100vw - 40px), 760px';
    image.alt = project.alt;
    dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.querySelector('.dialog-close').focus();
  });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  projectTrigger?.focus();
});
document.getElementById('dialog-contact').addEventListener('click', () => {
  dialog.close();
  // The explicit destination receives focus after the dialog returns it to its trigger.
  document.getElementById('name').focus({ preventScroll: true });
});

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const endpoint = contact.endpoint.trim();
const configured = endpoint.length > 0 && !/[\s/?#]/u.test(endpoint) && !/PENDIENTE|ENDPOINT|CONFIGURADO/i.test(endpoint);
if (configured) {
  form.action = `https://formsubmit.co/${encodeURIComponent(endpoint)}`;
  form.querySelector('[name="_subject"]').value = contact.subject;
  if (contact.publicSiteUrl) {
    const site = new URL(contact.publicSiteUrl.endsWith('/') ? contact.publicSiteUrl : `${contact.publicSiteUrl}/`);
    if (site.protocol === 'https:') {
      const next = document.createElement('input');
      next.type = 'hidden';
      next.name = '_next';
      next.value = new URL('gracias/', site).href;
      form.append(next);
    }
  }
  form.querySelector('[type="submit"]').disabled = false;
  status.textContent = 'Al enviar, FormSubmit procesará tu nombre, correo e idea para hacernos llegar tu consulta.';
}
form.addEventListener('submit', (event) => {
  if (!configured) {
    event.preventDefault();
    status.textContent = 'El envío todavía no está habilitado. Tu mensaje no se ha enviado.';
  }
});

