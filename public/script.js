const form = document.getElementById('registerForm');
const counter = document.getElementById('counter');
const langSelect = document.getElementById('languageSelect');
const toggleTheme = document.getElementById('toggleTheme');

let language = 'en';

const translations = {};

function loadLang(lang) {
  fetch('./lang/' + lang + '.json')
    .then(res => res.json())
    .then(data => {
      Object.assign(translations, data);
      document.querySelectorAll('[data-lang]').forEach(el => {
        el.textContent = translations[el.getAttribute('data-lang')];
      });
    });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  await fetch('https://your-firebase-endpoint/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  window.location.href = '/thankyou.html';
});

toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

langSelect.addEventListener('change', (e) => {
  language = e.target.value;
  loadLang(language);
});

loadLang(language);