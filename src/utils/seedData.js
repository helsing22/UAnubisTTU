import { supabase } from '../services/supabase';

export const seedDatabase = async () => {
  try {
    // Add services
    const { error: servicesError } = await supabase.from('services').insert([
      {
        title: 'Tatuajes Personalizados',
        description:
          'Creamos diseños únicos adaptados a tus ideas y visión personal. Cada tatuaje es una obra de arte única.',
        icon_name: 'star',
        display_order: 1,
      },
      {
        title: 'Asesoría Estética',
        description:
          'Te guiamos en la elección del diseño perfecto, ubicación en tu cuerpo y tamaño ideal para tu estilo.',
        icon_name: 'palette',
        display_order: 2,
      },
      {
        title: 'Diseño de Flash',
        description:
          'Disponemos de diseños flash listos para tatuaje inmediato. Elige entre nuestras opciones disponibles.',
        icon_name: 'zap',
        display_order: 3,
      },
    ]);

    if (servicesError && servicesError.code !== '23505') {
      console.error('Error seeding services:', servicesError);
    }

    // Add team members
    const { error: teamError } = await supabase.from('team_members').insert([
      {
        name: 'Yandier Gonzales',
        role: 'Tatuador Profesional',
        bio: 'Con más de 10 años de experiencia en el arte del tatuaje. Especializado en realismo, tribal y estilos personalizados.',
        specialties: ['Realismo', 'Tribal', 'Geométrico', 'Custom Design'],
        instagram_username: 'yandier_tattoo',
      },
      {
        name: 'Evelyn Martín',
        role: 'Asesora Estética',
        bio: 'Experta en diseño y estética. Te ayuda a encontrar el tatuaje perfecto para tu estilo personal.',
        specialties: ['Diseño', 'Asesoría', 'Cuidados Post-Tatuaje'],
        instagram_username: 'evelyn_tattoo',
      },
    ]);

    if (teamError && teamError.code !== '23505') {
      console.error('Error seeding team:', teamError);
    }

    // Add sample testimonials
    const { error: testimonialError } = await supabase.from('testimonials').insert([
      {
        author_name: 'Juan Pérez',
        rating: 5,
        content:
          'El mejor estudio de tatuajes en la ciudad. Profesionales, atentos y con mucha experiencia. Recomendado 100%.',
        tattoo_style: 'Realista',
        published: true,
      },
      {
        author_name: 'María Gómez',
        rating: 5,
        content:
          'Quedé encantada con mi tatuaje. El diseño fue exactamente como lo imaginaba. Los chicos son muy profesionales.',
        tattoo_style: 'Custom',
        published: true,
      },
      {
        author_name: 'Carlos López',
        rating: 5,
        content:
          'La higiene y profesionalismo son impecables. Mi tatuaje quedó perfecto y el proceso fue muy cómodo.',
        tattoo_style: 'Tribal',
        published: true,
      },
    ]);

    if (testimonialError && testimonialError.code !== '23505') {
      console.error('Error seeding testimonials:', testimonialError);
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
