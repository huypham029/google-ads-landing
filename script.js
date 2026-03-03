// ========================
// Navbar scroll effect
// ========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ========================
// Mobile menu toggle
// ========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
// Close menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ========================
// Scroll-triggered AOS animations
// ========================
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute('data-aos-delay') || 0);
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach(el => observer.observe(el));
}
initAOS();

// ========================
// Plan buttons → pre-select form
// ========================
const planLinks = {
  'btn-plan-trial':   'trial',
  'btn-plan-basic':   'basic',
  'btn-plan-premium': 'premium',
};
Object.entries(planLinks).forEach(([btnId, value]) => {
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.addEventListener('click', (e) => {
      const select = document.getElementById('planSelect');
      if (select) select.value = value;
    });
  }
});

// ========================
// Form Validation & Submit
// ========================
const form = document.getElementById('consultForm');
const formSuccess = document.getElementById('formSuccess');

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}
function clearErrors() {
  ['err-name', 'err-phone', 'err-plan', 'err-time'].forEach(id => showError(id, ''));
}

function validatePhone(phone) {
  return /^(0|\+84)[0-9]{8,10}$/.test(phone.replace(/\s/g, ''));
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  clearErrors();

  const fullName = document.getElementById('fullName').value.trim();
  const phone    = document.getElementById('phone').value.trim();
  const plan     = document.getElementById('planSelect').value;
  const callTime = document.getElementById('callTime').value;

  let hasError = false;

  if (!fullName || fullName.length < 2) {
    showError('err-name', 'Vui lòng nhập họ tên (tối thiểu 2 ký tự).');
    hasError = true;
  }
  if (!phone || !validatePhone(phone)) {
    showError('err-phone', 'Vui lòng nhập số điện thoại hợp lệ.');
    hasError = true;
  }
  if (!plan) {
    showError('err-plan', 'Vui lòng chọn gói cần tư vấn.');
    hasError = true;
  }
  if (!callTime) {
    showError('err-time', 'Vui lòng chọn giờ gọi lại.');
    hasError = true;
  }

  if (hasError) return;

  // Simulate submit
  const btn = document.getElementById('btn-submit');
  btn.classList.add('loading');
  btn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    formSuccess.style.display = 'block';
    btn.classList.remove('loading');
    btn.disabled = false;
  }, 1600);
});

// ========================
// Smooth scroll for anchors
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ========================
// Number counter animation
// ========================
function animateCounter(el, end, suffix) {
  let start = 0;
  const duration = 1500;
  const step = 16;
  const increment = (end / duration) * step;
  function tick() {
    start += increment;
    if (start >= end) {
      el.textContent = end + suffix;
      return;
    }
    el.textContent = Math.floor(start) + suffix;
    requestAnimationFrame(tick);
  }
  tick();
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(el => {
        const text = el.textContent;
        const match = text.match(/^(\d+)(\D*)$/);
        if (match) animateCounter(el, parseInt(match[1]), match[2]);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// ========================
// Chart bar hover tooltip
// ========================
document.querySelectorAll('.bar').forEach(bar => {
  bar.addEventListener('mouseenter', function() {
    this.style.cursor = 'pointer';
  });
});
