const timeElement = document.querySelector('[data-testid="test-user-time"]');
const avatarInput = document.getElementById('avatarUpload');
const avatarImage = document.querySelector('[data-testid="test-user-avatar"]');

// Update time
function updateTime() {
  timeElement.textContent = Date.now();
}
updateTime();
setInterval(updateTime, 1000);

// Avatar upload & preview
avatarInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarImage.src = e.target.result;
      avatarImage.alt = 'User uploaded profile picture';
    };
    reader.readAsDataURL(file);
  }
});

// ---------- Contact form validation ----------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const nameInput = document.querySelector('[data-testid="test-contact-name"]');
  const emailInput = document.querySelector('[data-testid="test-contact-email"]');
  const subjectInput = document.querySelector('[data-testid="test-contact-subject"]');
  const messageInput = document.querySelector('[data-testid="test-contact-message"]');
  const successEl = document.getElementById('contact-success');

  function showError(input, message) {
    const errId = input.getAttribute('aria-describedby');
    const errEl = document.getElementById(errId);
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.add('show'); // animation
      input.setAttribute('aria-invalid', 'true');
    }
  }

  function clearError(input) {
    const errId = input.getAttribute('aria-describedby');
    const errEl = document.getElementById(errId);
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.remove('show');
      input.removeAttribute('aria-invalid');
    }
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    [nameInput, emailInput, subjectInput, messageInput].forEach(clearError);
    if (successEl) {
      successEl.hidden = true;
      successEl.textContent = '';
    }

    if (!nameInput.value.trim()) {
      showError(nameInput, 'Full name is required.');
      valid = false;
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, 'Email is required.');
      valid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address.');
      valid = false;
    }

    if (!subjectInput.value.trim()) {
      showError(subjectInput, 'Subject is required.');
      valid = false;
    }

    if (!messageInput.value.trim()) {
      showError(messageInput, 'Message is required.');
      valid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'Message must be at least 10 characters.');
      valid = false;
    }

    if (valid) {
      if (successEl) {
        successEl.textContent = 'Thanks! Your message has been sent.';
        successEl.hidden = false;
        successEl.focus && successEl.focus();
      }
      contactForm.reset();
    }
  });

  [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
    input.addEventListener('input', () => clearError(input));
  });
}

// Optional: smooth scroll for nav links
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if(target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
