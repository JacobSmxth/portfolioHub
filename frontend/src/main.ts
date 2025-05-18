// Imports here

import './style.scss';

// DOM Elements

const sideToggle = document.getElementById('sidebar-toggle');


// Event Listeners

sideToggle.addEventListener('click', () => {
  sideToggle.style.opacity = '0';
});

sideToggle.addEventListener('transitionend', (evt) => {
  if (evt.propertyName !== 'opacity') return;

  if (getComputedStyle(sideToggle).opacity === '0') {
    sideToggle.innerText =
      sideToggle.innerText === 'Jacob Smith' ? 'JS' : 'Jacob Smith';

    document.body.classList.toggle('sidebar-collapsed');

    requestAnimationFrame(() => {
      sideToggle.style.opacity = '1';
    });
  }
});
  
