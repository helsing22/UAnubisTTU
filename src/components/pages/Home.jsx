import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { useInstagram } from '../../hooks/useInstagram';
import { usePageTitle } from '../../hooks/usePageTitle';
import styles from './Home.module.css';

export function Home() {
  usePageTitle(
    'ANUBIS YR TATTOO - Estudio de Tatuajes Profesional',
    'Transformamos tus ideas en tatuajes únicos y memorables. Estudio profesional con más de 10 años de experiencia en Manicaragua, Cuba.'
  );
  const [testimonials, setTestimonials] = useState([]);
  const [services, setServices] = useState([]);
  const { posts } = useInstagram();

  useEffect(() => {
    fetchTestimonials();
    fetchServices();
  }, []);

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('published', true)
      .limit(3);
    setTestimonials(data || []);
  };

  const fetchServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });
    setServices(data || []);
  };

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Donde el arte se fusiona con tu piel</h1>
          <p className={styles.heroSubtitle}>
            Transformamos tus ideas en tatuajes únicos y memorables
          </p>
          <div className={styles.heroButtons}>
            <Link to="/galeria" className={`${styles.button} ${styles.primary}`}>
              Ver Trabajos
              <ArrowRight size={18} />
            </Link>
            <Link to="/reserva" className={`${styles.button} ${styles.secondary}`}>
              Reservar Cita
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.about}>
        <div className={styles.container}>
          <h2>ANUBIS YR TATTOO</h2>
          <p>
            Somos un estudio de tatuaje profesional dedicado a transformar tus ideas en obras de arte
            permanentes. Con más de una década de experiencia, combinamos técnica precisa, creatividad
            sin límites y pasión por nuestro oficio.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <strong>500+</strong>
              <span>Tatuajes realizados</span>
            </div>
            <div className={styles.stat}>
              <strong>10+</strong>
              <span>Años de experiencia</span>
            </div>
            <div className={styles.stat}>
              <strong>100%</strong>
              <span>Clientes satisfechos</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.services}>
        <div className={styles.container}>
          <h2>Nuestros Servicios</h2>
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <Star />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className={styles.gallery}>
          <div className={styles.container}>
            <h2>Últimos Trabajos</h2>
            <div className={styles.galleryGrid}>
              {posts.slice(0, 6).map((post) => (
                <div key={post.id} className={styles.galleryItem}>
                  <img
                    src={post.image_url}
                    alt={post.caption || 'Tatuaje'}
                    loading="lazy"
                  />
                  <div className={styles.galleryOverlay}>
                    <p>{post.caption}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.centerButton}>
              <Link to="/galeria" className={`${styles.button} ${styles.primary}`}>
                Ver Galería Completa
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className={styles.testimonials}>
          <div className={styles.container}>
            <h2>Testimonios de Clientes</h2>
            <div className={styles.testimonialsGrid}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className={styles.testimonialCard}>
                  <div className={styles.rating}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className={styles.content}>"{testimonial.content}"</p>
                  <p className={styles.author}>— {testimonial.author_name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>¿Listo para tu próximo tatuaje?</h2>
          <p>Reserva tu cita hoy y comienza tu transformación artística</p>
          <Link to="/reserva" className={`${styles.button} ${styles.primary}`}>
            Agendar Reserva
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
