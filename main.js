const header = document.querySelector('.topbar');
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const welcome = document.querySelector('#welcome');
const welcomeClose = document.querySelector('.welcome-close');
const contactDialog = document.querySelector('#contact-dialog');
const contactOpen = document.querySelector('.contact-orb');
const contactClose = document.querySelector('.contact-dialog-close');

if (!sessionStorage.getItem('roman-welcome-seen')) {
  requestAnimationFrame(() => welcome.classList.add('show'));
}
const closeWelcome = () => {
  welcome.classList.remove('show');
  sessionStorage.setItem('roman-welcome-seen', '1');
};
welcomeClose.addEventListener('click', closeWelcome);
welcome.addEventListener('click', (event) => { if (event.target === welcome) closeWelcome(); });
welcome.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeWelcome));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && welcome.classList.contains('show')) closeWelcome(); });

const openContactDialog = () => {
  contactDialog.classList.add('show');
  contactDialog.setAttribute('aria-hidden', 'false');
  contactDialog.querySelector('.contact-dialog-links a').focus();
};
const closeContactDialog = () => {
  contactDialog.classList.remove('show');
  contactDialog.setAttribute('aria-hidden', 'true');
  contactOpen.focus();
};
contactOpen.addEventListener('click', openContactDialog);
contactClose.addEventListener('click', closeContactDialog);
contactDialog.addEventListener('click', (event) => { if (event.target === contactDialog) closeContactDialog(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && contactDialog.classList.contains('show')) closeContactDialog(); });

const setMenu = (open) => {
  menuButton.setAttribute('aria-expanded', String(open));
  mobileMenu.classList.toggle('open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
};

menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealItems.forEach((item, index) => {
    item.classList.add('reveal');
    item.style.transitionDelay = `${(index % 4) * 70}ms`;
  });
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}

document.querySelector('#year').textContent = new Date().getFullYear();

const cursorAura = document.querySelector('.cursor-aura');
window.addEventListener('pointermove', (event) => {
  cursorAura.style.left = `${event.clientX}px`;
  cursorAura.style.top = `${event.clientY}px`;
}, { passive: true });
