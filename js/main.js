/// Filtro de galería por zona del cuerpo
document.querySelectorAll('.filters button').forEach(button => {
  button.addEventListener('click', () => {
    const zone = button.dataset.zone;
    document.querySelectorAll('.gallery img').forEach(img => {
      img.style.display = zone === 'todos' || img.dataset.zone === zone ? 'inline-block' : 'none';
    });
  });
});

// Visualización ampliada de imágenes
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.95)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 9999;
    overlay.innerHTML = `<img src="${img.src}" style="max-width:90%; max-height:90%; border: 2px solid #d4af37;" />`;
    overlay.addEventListener('click', () => document.body.removeChild(overlay));
    document.body.appendChild(overlay);
  });
});

// Envío de reservas por WhatsApp
document.getElementById('whatsappForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const nombre = this.nombre.value.trim();
  const zona = this.zona.value.trim();
  const estilo = this.estilo.value.trim();
  const fecha = this.fecha.value;
  const mensaje = `Hola, soy ${nombre}. Quiero un tatuaje en la zona ${zona}, estilo ${estilo}, para la fecha ${fecha}.`;
  const telefono = '5355016158';
  window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
});
