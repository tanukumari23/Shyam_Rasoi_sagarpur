/* ============================================
   Shyam Rasoi — Custom JS
   ============================================ */

// ===== Loader =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hide');
  }, 800);
});

// ===== AOS init =====
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    AOS.init({ duration: 900, once: true, offset: 80 });
  }

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Offer popup after 4s
  setTimeout(() => {
    const popup = document.getElementById('offerPopup');
    if (popup && !sessionStorage.getItem('offerSeen')) {
      popup.classList.add('show');
      sessionStorage.setItem('offerSeen', '1');
    }
  }, 4000);
});

// ===== Navbar shadow on scroll + active link =====
const navbar = document.querySelector('.navbar-custom');
const navLinks = document.querySelectorAll('.navbar-custom .nav-link');
const sections = document.querySelectorAll('section[id], header[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  // Active link based on section in view
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// ===== Smooth scroll + auto-close mobile menu =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
      // Collapse navbar on mobile
      const navCollapse = document.getElementById('mainNav');
      if (navCollapse && navCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navCollapse).hide();
      }
    }
  });
});

// ===== Contact form =====
function handleContactSubmit(form) {
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin me-1"></i> Sending...';
  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-check me-1"></i> Message Sent!';
    form.reset();
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = original;
    }, 2200);
  }, 1100);
}
