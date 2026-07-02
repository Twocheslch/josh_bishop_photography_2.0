const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

function updateHeader() {
  header.classList.toggle('is-scrolled', window.scrollY > 40);
}

function closeMenu() {
  navToggle.classList.remove('is-open');
  siteNav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation menu');
}

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('is-open');
  siteNav.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

siteNav.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    closeMenu();
  }
});

window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});

updateHeader();
