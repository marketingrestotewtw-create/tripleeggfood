import { menuItems, location, claims } from './data.js';

const instagram = 'https://www.instagram.com/tripleeggfood/';
const nav = [
  ['Home', '#home'], ['About', '#about'], ['Menu', '#menu'],
  ['Location', '#location'], ['Contact', '#contact'],
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
    <div class="hero-copy reveal"><p class="eyebrow">Healthy food · Bali</p><h1>Good food.<br><em>Full strength.</em></h1>
      <p class="hero-lede">Nutritious, delicious dishes for the way you want to live—made by Triple Egg inside OBSIDIAN Gym.</p>
      <div class="actions"><a class="button button--light" href="#menu">View menu <span>↓</span></a><a class="text-link" href="#location">Find us <span>↘</span></a></div>
    </div>
    <div class="hero-visual reveal">${eggArt()}<p class="stamp">TRIPLE<br>THE<br>GOOD</p></div>
    <p class="hero-side" aria-hidden="true">NUTRITIOUS / DELICIOUS / COOKED TO ORDER</p>
  </section>`;
}

function Marquee() { return `<div class="ticker" aria-label="Triple Egg food principles"><div>${[...claims, ...claims].map(c => `<span>${c}<i>●</i></span>`).join('')}</div></div>`; }

function About() {
  return `<section class="section about" id="about"><div class="section-kicker"><span>01</span><p>Our thing</p></div>
    <div class="about-grid"><h2>Food that keeps<br>up with you.</h2><div><p class="large-copy">Triple Egg is a healthy lifestyle restaurant in Bali, serving food that balances real nourishment with real flavour.</p><p>Based inside OBSIDIAN Gym, we make straightforward, appetite-first food for training days, rest days, and every day in between.</p><a class="arrow-link" href="#principles">See our principles <span>↘</span></a></div></div>
    <div class="principles" id="principles">${claims.map((claim, i) => `<article><span>0${i + 1}</span><h3>${claim}</h3><p class="review-note">Brand guideline claim · [REVIEW REQUIRED: confirm current operational accuracy]</p></article>`).join('')}</div>
  </section>`;
}

function MenuCard(item) { return `<article class="menu-card"><div class="menu-image"><span>${item.number}</span>${eggArt('egg-art--small')}</div><div class="menu-card-copy"><p>Featured menu</p><h3>${item.name}</h3><span>${item.note}</span></div></article>`; }
function Menu() { return `<section class="section menu-section" id="menu"><div class="section-kicker light"><span>02</span><p>On the table</p></div><div class="menu-heading"><h2>Fresh from<br>the kitchen.</h2><p>Explore a selection of fresh, satisfying dishes made for training days, rest days, and everything in between.</p></div><div class="menu-grid">${menuItems.map(MenuCard).join('')}</div><div class="menu-full"><p>Explore our full menu, including dishes, drinks, pricing, and macronutrient information.</p><a class="button menu-full__button" href="/menu/tripleegg-menu-august.pdf" target="_blank" rel="noopener noreferrer">View full menu <span aria-hidden="true">↗</span></a></div></section>`; }

function Location() { return `<section class="section location" id="location"><div class="section-kicker"><span>03</span><p>Come through</p></div><div class="location-grid"><div><h2>Find your<br>new routine.</h2><p class="large-copy">Fuel up before you train, refuel after, or just come hungry.</p></div><article class="location-card"><div class="pin" aria-hidden="true">●</div><p>Triple Egg</p><h3>${location.name}</h3><dl><div><dt>Area</dt><dd>${location.area}</dd></div><div><dt>Address</dt><dd>${location.address}</dd></div><div><dt>Hours</dt><dd>${location.hours}</dd></div></dl><p class="review-note">Map link will be added once the official address is confirmed.</p></article></div></section>`; }

function Contact() { return `<section class="contact" id="contact"><p class="eyebrow">Stay in the loop</p><h2>See what’s<br><em>cracking.</em></h2><p>Follow the official Triple Egg Instagram for current food, news, and updates.</p><a class="button button--dark" href="${instagram}" target="_blank" rel="noreferrer">@tripleeggfood <span>↗</span></a>${eggArt('egg-art--footer')}</section>`; }

function Footer() { return `<footer>${Brand({light:true})}<div class="footer-nav">${nav.map(([l,h]) => `<a href="${h}">${l}</a>`).join('')}</div><div><a href="${instagram}" target="_blank" rel="noreferrer">Instagram ↗</a><p>© ${new Date().getFullYear()} Triple Egg</p></div></footer>`; }

document.querySelector('#app').innerHTML = `${Navbar()}<main>${Hero()}${Marquee()}${About()}${Menu()}${Location()}${Contact()}</main>${Footer()}`;

const toggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-nav');
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu'); mobileMenu.classList.toggle('is-open'); document.body.classList.toggle('menu-open'); });
mobileMenu.addEventListener('click', e => { if (e.target.matches('a')) { toggle.setAttribute('aria-expanded', 'false'); mobileMenu.classList.remove('is-open'); document.body.classList.remove('menu-open'); } });

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('in-view')), { threshold: .12 });
  document.querySelectorAll('section:not(.hero), .reveal').forEach(el => observer.observe(el));
}
