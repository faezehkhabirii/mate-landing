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


const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

const phoneInputContent = document.getElementById('phoneInputContent');
const codeVerificationContent = document.getElementById('codeVerificationContent');

const submitPhoneBtn = document.getElementById('submitPhoneBtn');
const editPhoneBtn = document.getElementById('editPhoneBtn');
const displayedPhone = document.getElementById('displayedPhone');

const phoneInput = document.getElementById('phoneInput');


openModalBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
  phoneInputContent.style.display = 'block';
  codeVerificationContent.style.display = 'none';
  phoneInput.value = '';
  phoneInput.focus();
});


closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});


submitPhoneBtn.addEventListener('click', () => {
  const phone = phoneInput.value.trim();
  if (!phone) {
    alert('لطفا شماره موبایل را وارد کنید');
    return;
  }
  displayedPhone.textContent = phone;
  phoneInputContent.style.opacity = 1;
  codeVerificationContent.style.opacity = 0;

 
  fadeOut(phoneInputContent, () => {
    phoneInputContent.style.display = 'none';
    codeVerificationContent.style.display = 'block';
    fadeIn(codeVerificationContent);
  });
});


editPhoneBtn.addEventListener('click', () => {
  codeVerificationContent.style.opacity = 1;
  phoneInputContent.style.opacity = 0;

  fadeOut(codeVerificationContent, () => {
    codeVerificationContent.style.display = 'none';
    phoneInputContent.style.display = 'block';
    fadeIn(phoneInputContent);
  });
});


function fadeOut(element, callback) {
  element.style.transition = 'opacity 0.3s ease';
  element.style.opacity = 0;
  setTimeout(() => {
    callback();
  }, 300);
}

function fadeIn(element) {
  element.style.transition = 'opacity 0.3s ease';
  element.style.opacity = 1;
}

const codeInputs = document.querySelectorAll('.code-digit');

codeInputs.forEach((input, idx) => {
  input.addEventListener('input', () => {
    if (input.value.length === 1) {
   
      if (idx < codeInputs.length - 1) {
        codeInputs[idx + 1].focus();
      }
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === "Backspace" && input.value.length === 0) {

      if (idx > 0) {
        codeInputs[idx - 1].focus();
      }
    }
  });
});

