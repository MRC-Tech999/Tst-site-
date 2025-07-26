const form = document.getElementById('registerForm');
const counter = document.getElementById('counter');
const langSelect = document.getElementById('languageSelect');
const toggleTheme = document.getElementById('toggleTheme');

let language = 'en';
const translations = {};

// Charge le fichier de langue
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

// Événement formulaire
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  
  // Envoyer à Firebase ou générer VCF local
  await fetch('/api/generate-vcf', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(async (res) => {
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name}.vcf`;
    a.click();
  });

  window.location.href = '/thankyou.html';
});

// Toggle theme
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Changer la langue
langSelect.addEventListener('change', (e) => {
  language = e.target.value;
  loadLang(language);
});

loadLang(language);
