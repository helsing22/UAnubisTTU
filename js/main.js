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
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.innerHTML = `<img src="${img.src}" style="max-width:90%; max-height:90%;" />`;
    overlay.addEventListener('click', () => document.body.removeChild(overlay));
    document.body.appendChild(overlay);
  });
});

// WhatsApp reserva
document.getElementById('whatsappForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const nombre = this.nombre.value;
  const zona = this.zona.value;
  const estilo = this.estilo.value;
  const fecha = this.fecha.value;
  const mensaje = `Hola, soy ${nombre}. Quiero un tatuaje en la zona ${zona}, estilo ${estilo}, para la fecha ${fecha}.`;
  window.open(`https://wa.me/5355016158?text=${encodeURIComponent(mensaje)}`, '_blank');
});
