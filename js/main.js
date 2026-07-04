/**
 * Her After School — main.js
 * Vanilla JS only. Organized by feature: nav, scroll reveal, FAQ accordion,
 * animated counters. Each module is self-contained and guards for missing
 * elements so this file is safe to reuse across pages.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScrollState();
  initScrollReveal();
  initFaqAccordion();
  initCounters();
});

/* ---------------------------------------------------------------
   Mobile navigation toggle
--------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.add('hidden');
    menu.classList.remove('flex');
    toggle.setAttribute('aria-expanded', 'false');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      menu.classList.remove('hidden');
      menu.classList.add('flex');
      toggle.setAttribute('aria-expanded', 'true');
      iconOpen.classList.add('hidden');
      iconClose.classList.remove('hidden');
    }
  });

  // Close menu when a link is tapped
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
}

/* ---------------------------------------------------------------
   Header background state on scroll (subtle elevation once scrolled)
--------------------------------------------------------------- */
function initHeaderScrollState() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 12) {
      header.classList.add('shadow-[0_1px_0_rgba(42,33,24,0.06)]');
    } else {
      header.classList.remove('shadow-[0_1px_0_rgba(42,33,24,0.06)]');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------------------------------------------------------------
   Fade-up reveal on scroll, using IntersectionObserver.
   Targets any element with the `.reveal` class (see input.css).
--------------------------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------
   FAQ accordion — single-open, smooth height transition via
   max-height (see .faq-panel in input.css).
--------------------------------------------------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    const icon = item.querySelector('.faq-icon');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other items first (single-open behavior)
      items.forEach((other) => {
        if (other === item) return;
        other.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
        const otherPanel = other.querySelector('.faq-panel');
        if (otherPanel) otherPanel.style.maxHeight = null;
        const otherIcon = other.querySelector('.faq-icon');
        if (otherIcon) otherIcon.textContent = '+';
      });

      if (isOpen) {
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
        if (icon) icon.textContent = '+';
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        if (icon) icon.textContent = '–';
      }
    });
  });
}

/* ---------------------------------------------------------------
   Animated counters — counts up from 0 to data-target once the
   stats section scrolls into view.
--------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}
