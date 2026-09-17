import { menuItems, location, claims } from './data.js';

const instagram = 'https://www.instagram.com/tripleeggfood/';
const nav = [
  ['Home', '#home'], ['About', '#about'], ['Menu', '#menu'],
  ['Location', '#location'],
];

function Brand({ light = false } = {}) {
  return `<a class="brand ${light ? 'brand--light' : ''}" href="#home" aria-label="Triple Egg home">
    <span>triple</span><strong>egg<span class="brand-dots" aria-hidden="true">••</span></strong>
  </a>`;
}

function Navbar() {
  return `<header class="nav-shell"><nav class="navbar" aria-label="Main navigation">
    ${Brand()}
    <button class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><span></span><span></span></button>
    <div class="desktop-nav">${nav.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}</div>
    <a class="nav-social" href="${instagram}" target="_blank" rel="noreferrer">Instagram ↗</a>
    <div class="mobile-nav" id="mobile-menu">${nav.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}<a href="${instagram}" target="_blank" rel="noreferrer">Instagram ↗</a></div>
  </nav></header>`;
}

const eggArt = (className = '') => `<div class="egg-art ${className}" aria-hidden="true"><span class="egg-white"><i></i></span><span class="scribble">made fresh</span></div>`;

function Hero() {
  return `<section class="hero" id="home">
    <div class="hero-copy reveal"><p class="eyebrow">Healthy food · Bali</p><h1><span class="hero-heading__intro">Real Ingredients.<br>Honest Cooking.</span><em>Built for Strength.</em></h1>
      <p class="hero-lede">Every dish is carefully sourced, cooked to order, and clearly labeled with macros, so you always know what you’re eating.</p>
      <div class="actions"><a class="button button--light" href="#menu">View menu <span>↓</span></a><a class="text-link" href="#location">Find us <span>↘</span></a><button class="text-link join-trigger" type="button">Join with us <span>↗</span></button></div>
    </div>
    <div class="hero-visual reveal">${eggArt()}<p class="stamp">TRIPLE<br>THE<br>GOOD</p></div>
    <p class="hero-side" aria-hidden="true">NUTRITIOUS / DELICIOUS / COOKED TO ORDER</p>
  </section>`;
}

function Marquee() { return `<div class="ticker" aria-label="Triple Egg food principles"><div>${[...claims, ...claims].map(c => `<span>${c}<i>●</i></span>`).join('')}</div></div>`; }

function About() {
  return `<section class="section about" id="about">
    <img class="about-principles-image" src="/about-principles.jpg" alt="Triple Egg ingredients and cooking principles">
  </section>`;
}

const menuImages = [
  '/sweet-potato-gnocchi.jpg',
  '/marangi-chicken-skewer.jpg',
  '/coco-matcha-cloud.jpg',
];

function MenuCard(item, index) { return `<article class="menu-card"><div class="menu-image"><span>${item.number}</span><img src="${menuImages[index]}" alt="${item.name}" loading="lazy"></div><div class="menu-card-copy"><h3>${item.name}</h3>${item.description ? `<p class="menu-description">${item.description}</p>` : ''}<p class="menu-macros">${item.macros}</p></div></article>`; }
function Menu() { return `<section class="section menu-section" id="menu"><div class="menu-heading"><h2>Special of The Month</h2></div><div class="menu-grid">${menuItems.map(MenuCard).join('')}</div><div class="menu-full"><a class="button menu-full__button" href="/menu/tripleegg-menu-august.pdf" target="_blank" rel="noopener noreferrer">VIEW FULL MENU</a></div></section>`; }

function Location() { return `<section class="section location" id="location"><div class="section-kicker"><span>03</span><p>Come through</p></div><div class="location-grid"><div class="location-message"><h2>Psst....</h2><p>we're hatching something exciting soon</p><button class="text-link join-trigger" type="button">Join with us <span>↗</span></button></div><article class="location-card"><div class="pin" aria-hidden="true">●</div><p>Triple Egg</p><div class="location-photo-placeholder" role="img" aria-label="Location photo coming soon"></div><dl><div><dt>Address</dt><dd><a class="location-address" href="${location.mapUrl}" target="_blank" rel="noopener noreferrer">${location.address}</a></dd></div><div><dt>Opening Hours</dt><dd>${location.hours}</dd></div><div><dt>Contact</dt><dd><a class="location-address" href="${location.contactUrl}" target="_blank" rel="noopener noreferrer">${location.contact}</a></dd></div></dl></article></div></section>`; }

function Footer() { return `<footer>${Brand({light:true})}<div class="footer-nav">${nav.map(([l,h]) => `<a href="${h}">${l}</a>`).join('')}</div><div><a href="${instagram}" target="_blank" rel="noreferrer">Instagram ↗</a><p>© ${new Date().getFullYear()} Triple Egg</p></div></footer>`; }

function JoinDialog() { return `<dialog class="join-dialog" aria-labelledby="join-title">
  <div class="join-dialog__inner">
    <button class="join-dialog__close" type="button" aria-label="Close Join With Us form">×</button>
    <div class="join-dialog__content">
      <p class="eyebrow">Triple Egg</p><h2 id="join-title">Join With Us</h2>
      <p class="join-dialog__intro">Leave your details below and we'll get to know you first.</p>
      <form class="join-form" novalidate>
        <label>Nama<input name="name" type="text" placeholder="Nama lengkap" autocomplete="name" required></label>
        <label>No. HP<input name="phone" type="tel" placeholder="08xxxxxxxxxx" autocomplete="tel" inputmode="tel" required></label>
        <label>Tanggal Lahir<input name="birthDate" type="date" autocomplete="bday" required></label>
        <p class="form-message" role="alert" aria-live="polite"></p>
        <button class="button join-form__submit" type="submit">Submit</button>
      </form>
      <div class="join-success" aria-live="polite" hidden><h3>Thank you! ✨</h3><p>Your details have been submitted.</p></div>
    </div>
  </div>
</dialog>`; }

document.querySelector('#app').innerHTML = `${Navbar()}<main>${Hero()}${Marquee()}${About()}${Menu()}${Location()}</main>${Footer()}${JoinDialog()}`;

const toggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-nav');
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu'); mobileMenu.classList.toggle('is-open'); document.body.classList.toggle('menu-open'); });
mobileMenu.addEventListener('click', e => { if (e.target.matches('a')) { toggle.setAttribute('aria-expanded', 'false'); mobileMenu.classList.remove('is-open'); document.body.classList.remove('menu-open'); } });

const joinDialog = document.querySelector('.join-dialog');
const joinForm = document.querySelector('.join-form');
const joinMessage = document.querySelector('.form-message');
const joinSubmit = document.querySelector('.join-form__submit');
const joinSuccess = document.querySelector('.join-success');
const birthDate = joinForm.elements.birthDate;

function todayForDateInput() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function resetJoinDialog() {
  joinForm.reset();
  joinForm.hidden = false;
  joinSuccess.hidden = true;
  joinMessage.textContent = '';
  joinSubmit.disabled = false;
  joinSubmit.textContent = 'Submit';
}

birthDate.max = todayForDateInput();
document.querySelectorAll('.join-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => joinDialog.showModal());
});
document.querySelector('.join-dialog__close').addEventListener('click', () => joinDialog.close());
joinDialog.addEventListener('click', event => { if (event.target === joinDialog) joinDialog.close(); });
joinDialog.addEventListener('close', resetJoinDialog);

function normalizedIndonesianPhone(value) {
  const compact = value.trim().replace(/[\s().-]/g, '');
  const normalized = compact.startsWith('08') ? `+62${compact.slice(1)}` : compact;
  return /^\+628\d{7,11}$/.test(normalized) ? normalized : null;
}

joinForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (joinSubmit.disabled) return;
  const name = joinForm.elements.name.value.trim();
  const phone = normalizedIndonesianPhone(joinForm.elements.phone.value);
  const selectedBirthDate = birthDate.value;
  if (!name || !phone || !selectedBirthDate || selectedBirthDate > todayForDateInput()) {
    joinMessage.textContent = 'Please complete all fields with valid details.';
    return;
  }

  joinMessage.textContent = '';
  joinSubmit.disabled = true;
  joinSubmit.textContent = 'Submitting…';
  try {
    const response = await fetch('/api/join-with-us', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, birth_date: selectedBirthDate }),
    });
    if (!response.ok) throw new Error('Submission failed');
    joinForm.reset();
    joinForm.hidden = true;
    joinSuccess.hidden = false;
  } catch {
    joinMessage.textContent = 'Something went wrong. Please try again.';
    joinSubmit.disabled = false;
    joinSubmit.textContent = 'Submit';
  }
});

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('in-view')), { threshold: .12 });
  document.querySelectorAll('section:not(.hero), .reveal').forEach(el => observer.observe(el));
}
