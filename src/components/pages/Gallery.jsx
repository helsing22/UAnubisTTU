import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { useInstagram } from '../../hooks/useInstagram';
import styles from './Gallery.module.css';

const FILTER_OPTIONS = {
  bodyZone: [
    { id: 'all', label: 'Todas las Zonas' },
    { id: 'brazo', label: 'Brazo' },
    { id: 'pierna', label: 'Pierna' },
    { id: 'espalda', label: 'Espalda' },
    { id: 'pecho', label: 'Pecho' },
    { id: 'cuello', label: 'Cuello' },
    { id: 'tobillo', label: 'Tobillo' },
  ],
  style: [
    { id: 'all', label: 'Todos los Estilos' },
    { id: 'realista', label: 'Realista' },
    { id: 'tribal', label: 'Tribal' },
    { id: 'geometrico', label: 'Geométrico' },
    { id: 'japones', label: 'Japonés' },
    { id: 'lineal', label: 'Lineal' },
    { id: 'acuarela', label: 'Acuarela' },
  ],
};

export function Gallery() {
  const { posts, loading } = useInstagram();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [filters, setFilters] = useState({ bodyZone: 'all', style: 'all' });
  const [localWorks, setLocalWorks] = useState([]);

  useEffect(() => {
    fetchLocalWorks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, posts, localWorks]);

  const fetchLocalWorks = async () => {
    const { data } = await supabase
      .from('tattoo_works')
      .select('*')
      .order('created_at', { ascending: false });
    setLocalWorks(data || []);
  };

  const applyFilters = () => {
    let filtered = [...posts, ...localWorks];

    if (filters.bodyZone !== 'all') {
      filtered = filtered.filter(
        (item) => item.body_zone?.toLowerCase() === filters.bodyZone.toLowerCase()
      );
    }

    if (filters.style !== 'all') {
      filtered = filtered.filter(
        (item) => item.style?.toLowerCase() === filters.style.toLowerCase()
      );
    }

    setFilteredPosts(filtered);
  };

  return (
    <div className={styles.gallery}>
      <section className={styles.header}>
        <h1>Galería de Trabajos</h1>
        <p>Explora nuestro portafolio completo de tatuajes</p>
      </section>

      <div className={styles.container}>
        <aside className={styles.filters}>
          <h3>Filtros</h3>

          <div className={styles.filterGroup}>
            <h4>Zona Corporal</h4>
            <div className={styles.filterOptions}>
              {FILTER_OPTIONS.bodyZone.map((option) => (
                <button
                  key={option.id}
                  className={`${styles.filterBtn} ${
                    filters.bodyZone === option.id ? styles.active : ''
                  }`}
                  onClick={() => setFilters({ ...filters, bodyZone: option.id })}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h4>Estilo</h4>
            <div className={styles.filterOptions}>
              {FILTER_OPTIONS.style.map((option) => (
                <button
                  key={option.id}
                  className={`${styles.filterBtn} ${
                    filters.style === option.id ? styles.active : ''
                  }`}
                  onClick={() => setFilters({ ...filters, style: option.id })}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button
            className={styles.resetBtn}
            onClick={() => setFilters({ bodyZone: 'all', style: 'all' })}
          >
            Limpiar Filtros
          </button>
        </aside>

        <main className={styles.main}>
          {loading ? (
            <div className={styles.loading}>Cargando galería...</div>
          ) : filteredPosts.length > 0 ? (
            <div className={styles.galleryGrid}>
              {filteredPosts.map((item) => (
                <div
                  key={item.id}
                  className={styles.galleryCard}
                  onClick={() => setSelectedPost(item)}
                >
                  <img src={item.image_url} alt={item.title || 'Tatuaje'} />
                  <div className={styles.cardOverlay}>
                    <div className={styles.cardInfo}>
                      <h3>{item.title || 'Tatuaje'}</h3>
                      <p>{item.style || 'Estilo'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>No hay trabajos que coincidan con estos filtros</p>
            </div>
          )}
        </main>
      </div>

      {selectedPost && (
        <div className={styles.modal} onClick={() => setSelectedPost(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedPost(null)}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <img src={selectedPost.image_url} alt={selectedPost.title} />
            <div className={styles.modalInfo}>
              <h2>{selectedPost.title}</h2>
              {selectedPost.description && <p>{selectedPost.description}</p>}
              <div className={styles.modalMeta}>
                {selectedPost.style && (
                  <span>
                    <strong>Estilo:</strong> {selectedPost.style}
                  </span>
                )}
                {selectedPost.body_zone && (
                  <span>
                    <strong>Zona:</strong> {selectedPost.body_zone}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
