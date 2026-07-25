const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

function updateHeader() {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 40);
}

function closeMenu() {
  if (!navToggle || !siteNav) return;
  navToggle.classList.remove('is-open');
  siteNav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation menu');
}

if (navToggle && siteNav) {
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
}

function handleScroll() {
  updateHeader();

  if (window.innerWidth <= 900 && siteNav && siteNav.classList.contains('is-open')) {
    closeMenu();
  }
}

window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});

updateHeader();

const currentYear = document.querySelector('[data-current-year]');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const galleryItems = Array.from(document.querySelectorAll('[data-gallery-item]'));
const lightbox = document.querySelector('[data-lightbox]');
const lightboxImage = document.querySelector('[data-lightbox-image]');
const lightboxVideo = document.querySelector('[data-lightbox-video]');
const lightboxClose = document.querySelector('[data-lightbox-close]');
const lightboxPrev = document.querySelector('[data-lightbox-prev]');
const lightboxNext = document.querySelector('[data-lightbox-next]');
let activeGalleryIndex = 0;

function resetLightboxMedia() {
  if (lightboxImage) {
    lightboxImage.removeAttribute('src');
    lightboxImage.alt = '';
    lightboxImage.hidden = true;
  }

  if (lightboxVideo) {
    lightboxVideo.pause();
    lightboxVideo.removeAttribute('src');
    lightboxVideo.removeAttribute('poster');
    lightboxVideo.hidden = true;
    lightboxVideo.load();
  }
}

function getGalleryImage(index) {
  const item = galleryItems[index];
  return item ? item.querySelector('img') : null;
}

function setGalleryMedia(index) {
  if (galleryItems.length === 0) return;
  activeGalleryIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[activeGalleryIndex];
  const image = getGalleryImage(activeGalleryIndex);
  const kind = item.dataset.galleryKind || 'image';

  resetLightboxMedia();

  if (kind === 'video' && lightboxVideo) {
    lightboxVideo.src = item.dataset.videoSrc || '';
    if (item.dataset.videoPoster) {
      lightboxVideo.poster = item.dataset.videoPoster;
    }
    lightboxVideo.hidden = false;
    lightboxVideo.load();
    return;
  }

  if (lightboxImage && image) {
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || 'Gallery image';
    lightboxImage.hidden = false;
  }
}

function openGallery(index) {
  if (!lightbox) return;
  setGalleryMedia(index);
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  if (lightboxClose) lightboxClose.focus();
}

function closeGallery() {
  if (!lightbox) return;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  resetLightboxMedia();
}

function showPreviousMedia() {
  setGalleryMedia(activeGalleryIndex - 1);
}

function showNextMedia() {
  setGalleryMedia(activeGalleryIndex + 1);
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => openGallery(index));
});

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeGallery();
    }
  });
}

if (lightboxClose) lightboxClose.addEventListener('click', closeGallery);
if (lightboxPrev) lightboxPrev.addEventListener('click', showPreviousMedia);
if (lightboxNext) lightboxNext.addEventListener('click', showNextMedia);

document.addEventListener('keydown', (event) => {
  if (!lightbox || !lightbox.classList.contains('is-open')) return;

  if (event.key === 'Escape') closeGallery();
  if (event.key === 'ArrowLeft') showPreviousMedia();
  if (event.key === 'ArrowRight') showNextMedia();
});
