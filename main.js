function toPersianNumber(num) {
  const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return num.toString().replace(/\d/g, x => persianDigits[x]);
}
function updateCountdown() {
  const targetDate = new Date('2025-06-30T17:00:00'); 
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) {
    document.getElementById('days').textContent = '۰';
    document.getElementById('hours').textContent = '۰۰';
    document.getElementById('minutes').textContent = '۰۰';
    document.getElementById('seconds').textContent = '۰۰';
    clearInterval(timerInterval);
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  document.getElementById('days').textContent = toPersianNumber(days);
  document.getElementById('hours').textContent = toPersianNumber(hours.toString().padStart(2, '0'));
  document.getElementById('minutes').textContent = toPersianNumber(minutes.toString().padStart(2, '0'));
  document.getElementById('seconds').textContent = toPersianNumber(seconds.toString().padStart(2, '0'));
}
updateCountdown();
const timerInterval = setInterval(updateCountdown, 1000);


  const wrapper = document.getElementById('videoWrapper');

  wrapper.addEventListener('click', () => {
    const video = document.createElement('video');
    video.src = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm';
    video.controls = true;
    video.autoplay = true;
    video.style.borderRadius = '16px';

    wrapper.innerHTML = '';
    wrapper.appendChild(video);
  });


  document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const isOpen = faqItem.classList.contains('open');

    if (isOpen) {
      faqItem.classList.remove('open');
      answer.setAttribute('hidden', '');
      button.setAttribute('aria-expanded', 'false');
    } else {
      faqItem.classList.add('open');
      answer.removeAttribute('hidden');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});


  document.getElementById('confirmPaymentBtn').addEventListener('click', function() {

    window.location.href = 'invoice-page.html';
  });


const modal = document.getElementById('modal');
const priceModal = document.getElementById('priceModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const submitPhoneBtn = document.getElementById('submitPhoneBtn');
const confirmCodeBtn = document.getElementById('confirmCodeBtn');
const closePriceBtn = document.getElementById('closePriceBtn');
const phoneInputContent = document.getElementById('phoneInputContent');
const codeVerificationContent = document.getElementById('codeVerificationContent');
const phoneInput = document.getElementById('phoneInput');
const displayedPhone = document.getElementById('displayedPhone');
const codeInputs = document.querySelectorAll('.code-digit');

// Open auth modal
openModalBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
  phoneInputContent.style.display = 'block';
  codeVerificationContent.style.display = 'none';
  phoneInput.value = '';
  phoneInput.focus();
});

// Close auth modal
closeModalBtn.addEventListener('click', () => modal.style.display = 'none');

// Submit phone and show code entry
submitPhoneBtn.addEventListener('click', () => {
  const phone = phoneInput.value.trim();
  const phonePattern = /^09\d{9}$/;
  if (!phone) { alert('لطفاً شماره موبایل را وارد کنید'); return; }
  if (!phonePattern.test(phone)) { alert('شماره موبایل نامعتبر است'); return; }
  displayedPhone.textContent = phone;
  fadeOut(phoneInputContent, () => {
    phoneInputContent.style.display = 'none';
    codeVerificationContent.style.display = 'block';
    fadeIn(codeVerificationContent);
  });
});

// Confirm code and open price modal
confirmCodeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  priceModal.style.display = 'flex';
});

// Close price modal
closePriceBtn.addEventListener('click', () => priceModal.style.display = 'none');

// Auto-advance code inputs
codeInputs.forEach((input, idx) => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '');
    if (input.value.length === 1 && idx < codeInputs.length - 1) codeInputs[idx + 1].focus();
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && input.value === '' && idx > 0) codeInputs[idx - 1].focus();
  });
});

// Fade utility
function fadeOut(el, cb) { el.style.transition = 'opacity 0.3s ease'; el.style.opacity = 0; setTimeout(cb, 300); }
function fadeIn(el) { el.style.transition = 'opacity 0.3s ease'; el.style.opacity = 1; }
