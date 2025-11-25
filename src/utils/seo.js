export const updateMetaTags = (title, description, image = null, url = null) => {
  document.title = title;

  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = description;

  if (image) {
    let metaImage = document.querySelector('meta[property="og:image"]');
    if (!metaImage) {
      metaImage = document.createElement('meta');
      metaImage.setAttribute('property', 'og:image');
      document.head.appendChild(metaImage);
    }
    metaImage.content = image;
  }

  if (url) {
    let metaUrl = document.querySelector('meta[property="og:url"]');
    if (!metaUrl) {
      metaUrl = document.createElement('meta');
      metaUrl.setAttribute('property', 'og:url');
      document.head.appendChild(metaUrl);
    }
    metaUrl.content = url;
  }
};

export const pageMetadata = {
  home: {
    title: 'ANUBIS YR TATTOO - Estudio de Tatuajes Profesional',
    description: 'Transformamos tus ideas en tatuajes únicos y memorables. Estudio profesional con más de 10 años de experiencia en Manicaragua, Cuba.',
  },
  gallery: {
    title: 'Galería de Trabajos - ANUBIS YR TATTOO',
    description: 'Explora nuestro portafolio completo de tatuajes. Descubre trabajos realizados en diferentes estilos y zonas corporales.',
  },
  team: {
    title: 'Nuestro Equipo - ANUBIS YR TATTOO',
    description: 'Conoce a los artistas profesionales detrás de ANUBIS YR TATTOO. Tatuadores especializados con trayectoria comprobada.',
  },
  reservation: {
    title: 'Reserva tu Cita - ANUBIS YR TATTOO',
    description: 'Agenda tu cita para tu próximo tatuaje. Llena el formulario y nos contactaremos para confirmar tu reserva.',
  },
};
