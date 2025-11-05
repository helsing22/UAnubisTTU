// Filtro de galería
const buttons = document.querySelectorAll('.filters button');
const images = document.querySelectorAll('.gallery img');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const zone = button.dataset.zone;
    images.forEach(img => {
      img.style.display = zone === 'todos' || img.dataset.zone === zone ? 'inline-block' : 'none';
    });
  });
});

// Abrir imagen en grande
images.forEach(img => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.9)';
    overlay
