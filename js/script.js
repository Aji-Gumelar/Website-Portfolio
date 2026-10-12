/* Personal Portfolio — interaksi tanpa framework */
(() => {
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = [...document.querySelectorAll('.nav-link')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header blur and reading progress
  function handleScroll() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    header?.classList.toggle('scrolled', window.scrollY > 18);
    if (progress) progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu with keyboard-friendly state
  function closeMenu() {
    navLinks?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Buka menu');
  }
  menuToggle?.addEventListener('click', () => {
    const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(opening));
    menuToggle.setAttribute('aria-label', opening ? 'Tutup menu' : 'Buka menu');
    navLinks?.classList.toggle('open', opening);
  });
  navItems.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', event => {
    if (navLinks?.classList.contains('open') && !navLinks.contains(event.target) && !menuToggle?.contains(event.target)) closeMenu();
  });

  // Reveal elements on scroll; content remains visible if IntersectionObserver is unavailable.
  const revealItems = document.querySelectorAll('.reveal');
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Active navigation section
  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navItems.forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Certificate preview dialog
const dialog = document.querySelector('.certificate-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogImage = document.querySelector('#dialog-image');
const dialogClose = document.querySelector('.dialog-close');

// Buka preview sesuai sertifikat yang diklik
document.querySelectorAll('[data-certificate]').forEach(button => {
  button.addEventListener('click', () => {
    if (!dialog) return;

    const title = button.dataset.certificate || 'Sertifikat';
    const imageSrc = button.dataset.image;
    const previewImage = button.querySelector('.certificate-image');

    // Ubah judul modal
    if (dialogTitle) {
      dialogTitle.textContent = title;
    }

    // Tampilkan gambar sertifikat yang dipilih
    if (dialogImage && imageSrc) {
      dialogImage.src = imageSrc;
      dialogImage.alt = previewImage?.alt || title;
    }

    // Tampilkan modal
    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  });
});

// Tutup modal melalui tombol X
dialogClose?.addEventListener('click', () => {
  if (typeof dialog?.close === 'function') {
    dialog.close();
  } else {
    dialog?.removeAttribute('open');
  }
});

// Tutup modal saat area luar diklik
dialog?.addEventListener('click', event => {
  if (event.target === dialog) {
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }
});


  // Custom cursor + flashlight spotlight that reveals a subtle grid on dark backgrounds.
  // Disabled on touch screens and when reduced motion is requested.
  const cursorOrb = document.querySelector('.cursor-orb');
  const cursorSpotlight = document.querySelector('.cursor-spotlight');
  const cursorGrid = document.querySelector('.cursor-grid');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (finePointer && !reducedMotion && cursorOrb && cursorSpotlight && cursorGrid) {
    document.body.classList.add('cursor-effects-ready');
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let targetX = pointerX;
    let targetY = pointerY;
    let rafPending = false;

    const renderCursor = () => {
      pointerX += (targetX - pointerX) * 0.22;
      pointerY += (targetY - pointerY) * 0.22;
      cursorOrb.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      if (Math.abs(targetX - pointerX) > 0.15 || Math.abs(targetY - pointerY) > 0.15) {
        requestAnimationFrame(renderCursor);
      } else {
        rafPending = false;
      }
    };

    window.addEventListener('pointermove', event => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursorOrb.classList.add('is-visible');
      const position = `${event.clientX}px ${event.clientY}px`;
      cursorSpotlight.style.setProperty('--spot-x', `${event.clientX}px`);
      cursorSpotlight.style.setProperty('--spot-y', `${event.clientY}px`);
      cursorGrid.style.setProperty('--spot-x', `${event.clientX}px`);
      cursorGrid.style.setProperty('--spot-y', `${event.clientY}px`);
      cursorSpotlight.classList.add('is-active');
      cursorGrid.classList.add('is-active');
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(renderCursor);
      }
    }, { passive: true });

    window.addEventListener('pointerdown', () => {
      cursorOrb.style.width = '22px';
      cursorOrb.style.height = '22px';
      window.setTimeout(() => {
        cursorOrb.style.removeProperty('width');
        cursorOrb.style.removeProperty('height');
      }, 140);
    });

    document.querySelectorAll('a, button').forEach(element => {
      element.addEventListener('pointerenter', () => cursorOrb.classList.add('is-hovering'));
      element.addEventListener('pointerleave', () => cursorOrb.classList.remove('is-hovering'));
    });
    document.addEventListener('pointerleave', () => {
      cursorOrb.classList.remove('is-visible');
      cursorSpotlight.classList.remove('is-active');
      cursorGrid.classList.remove('is-active');
    });
    document.addEventListener('pointerenter', () => {
      cursorSpotlight.classList.add('is-active');
      cursorGrid.classList.add('is-active');
    });
  }

  // Dynamic copyright year
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
