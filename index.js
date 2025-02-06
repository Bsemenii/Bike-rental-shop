const contactForm = document.getElementById("contactform");

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidName(name) {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
  return regex.test(name);
}

const toggleGrayButton = document.getElementById('toggleGray');
let isGrayscale = false;

toggleGrayButton.addEventListener('click', () => {
  if (isGrayscale) {
    document.body.classList.remove('grayscale');
    toggleGrayButton.textContent = 'Grey Filtr';
  } else {
    document.body.classList.add('grayscale');
    toggleGrayButton.textContent = 'Remove Grey Filtr';
  }
  isGrayscale = !isGrayscale;
});
  
let currentUtterance = null; 

function speakTextt() {
  if (!('speechSynthesis' in window)) {
    alert('Sorry, your browser does not support text-to-speech.');
    return;
  }

 
  const textToSpeak = document.body.innerText;

  
  const utterance = new SpeechSynthesisUtterance(textToSpeak);

  const voices = window.speechSynthesis.getVoices();


  const englishVoice = voices.find(voice => voice.lang === 'en-US' || voice.lang === 'en-US');

  
  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  
  utterance.pitch = 0.3; // Тон
  utterance.rate = 1; // Скорость

 
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel(); 
  }


  window.speechSynthesis.speak(utterance);

  currentUtterance = utterance;
  
  
  document.getElementById('stopButton').disabled = false;
  document.getElementById('resumeButton').disabled = true;
}

// Stop the current speech
function stopSpeech() {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel(); // Stop the speech
    document.getElementById('stopButton').disabled = true; 
    document.getElementById('resumeButton').disabled = false; 
  }
}


function resumeSpeech() {
  if (currentUtterance) {
    window.speechSynthesis.resume(); // Resume the speech
    document.getElementById('stopButton').disabled = false; 
    document.getElementById('resumeButton').disabled = true; 
  }
}

// Event listeners for the buttons
document.getElementById('stopButton').addEventListener('click', stopSpeech);
document.getElementById('resumeButton').addEventListener('click', resumeSpeech);




function showError(input, message) {
  const formControl = input.parentElement;
  const errorDisplay = formControl.querySelector('.error-message');
  errorDisplay.innerText = message;
  formControl.classList.add('error');
  formControl.classList.remove('success');
}


function showSuccess(input) {
  const formControl = input.parentElement;
  const errorDisplay = formControl.querySelector('.error-message');
  errorDisplay.innerText = '';
  formControl.classList.remove('error');
  formControl.classList.add('success');
}


function checkRequired(input) {
  if (input.value.trim() === '') {
    showError(input, `${input.labels[0].innerText} is required`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}


function checkEmail(input) {
  if (!isValidEmail(input.value.trim())) {
    showError(input, 'Email is not valid');
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}


function checkName(input) {
  if (!isValidName(input.value.trim())) {
    showError(input, 'Name can only contain letters and spaces');
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}


function validateForm(event) {
  event.preventDefault();

  const name = contactForm.name;
  const email = contactForm.email;
  const message = contactForm.message;

  const isNameValid = checkRequired(name) && checkName(name);
  const isEmailValid = checkRequired(email) && checkEmail(email);
  const isMessageValid = checkRequired(message);

  if (isNameValid && isEmailValid && isMessageValid) {
    alert('Form submitted successfully!');
    contactForm.reset();
    document.querySelectorAll('.form-control').forEach(control => control.classList.remove('success', 'error'));
  }
}

contactForm.addEventListener('submit', validateForm);

contactForm.addEventListener('input', function(event) {
  const input = event.target;
  if (input.tagName.toLowerCase() === 'input' || input.tagName.toLowerCase() === 'textarea') {
    checkRequired(input);
    if (input.type === 'email') {
      checkEmail(input);
    }
    if (input.name === 'name') {
      checkName(input);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.getElementById("theme-toggle");
  if (!themeToggleButton) return; 


  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    themeToggleButton.textContent = "Light Theme";
  } else {
    themeToggleButton.textContent = "Dark Theme";
  }

  
  themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
      themeToggleButton.textContent = "Light Theme";
      localStorage.setItem("theme", "dark");
    } else {
      themeToggleButton.textContent = "Dark Theme";
      localStorage.setItem("theme", "light");
    }
  });
});





