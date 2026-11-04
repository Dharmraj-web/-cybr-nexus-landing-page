// CYBR//NEXUS interactions: mobile navigation, reveal-on-scroll, and module switching.
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
  revealObserver.observe(element);
});

const moduleContent = {
  neural: { tag: 'MODULE_01 // NEURAL', title: 'NEURAL SYNC', desc: 'A direct interface between intention and action.', code: '[ NX-001 ]', className: '' },
  vision: { tag: 'MODULE_02 // OPTIC', title: 'OPTIC OVERDRIVE', desc: 'See hidden patterns. Expand your field of perception.', code: '[ VX-002 ]', className: 'vision' },
  motion: { tag: 'MODULE_03 // KINETIC', title: 'KINETIC ENGINE', desc: 'Precision movement powered by responsive intelligence.', code: '[ KX-003 ]', className: 'motion' }
};
const moduleButtons = document.querySelectorAll('.module-item');
const moduleArt = document.querySelector('#module-art');
moduleButtons.forEach(button => button.addEventListener('click', () => {
  moduleButtons.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const data = moduleContent[button.dataset.module];
  document.querySelector('#module-tag').textContent = data.tag;
  document.querySelector('#module-title').textContent = data.title;
  document.querySelector('#module-desc').textContent = data.desc;
  document.querySelector('.display-code').textContent = data.code;
  moduleArt.classList.remove('vision', 'motion');
  if (data.className) moduleArt.classList.add(data.className);
}));

// A subtle pointer glow on devices that support a fine pointer.
const glow = document.querySelector('.cursor-glow');
if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
} else {
  glow.style.display = 'none';
}
