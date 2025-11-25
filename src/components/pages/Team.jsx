import { useEffect, useState } from 'react';
import { Instagram } from 'lucide-react';
import { supabase } from '../../services/supabase';
import styles from './Team.module.css';

export function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false });
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.team}>
      <section className={styles.header}>
        <h1>Nuestro Equipo</h1>
        <p>Conoce a los artistas detrás de ANUBIS YR TATTOO</p>
      </section>

      <div className={styles.container}>
        {loading ? (
          <div className={styles.loading}>Cargando equipo...</div>
        ) : members.length > 0 ? (
          <div className={styles.membersGrid}>
            {members.map((member) => (
              <div key={member.id} className={styles.memberCard}>
                {member.photo_url && (
                  <div className={styles.photoContainer}>
                    <img src={member.photo_url} alt={member.name} />
                    {member.instagram_username && (
                      <a
                        href={`https://instagram.com/${member.instagram_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.instagramLink}
                        aria-label={`Instagram de ${member.name}`}
                      >
                        <Instagram size={20} />
                      </a>
                    )}
                  </div>
                )}
                <h2>{member.name}</h2>
                <p className={styles.role}>{member.role}</p>
                {member.bio && <p className={styles.bio}>{member.bio}</p>}
                {member.specialties && member.specialties.length > 0 && (
                  <div className={styles.specialties}>
                    <h4>Especialidades</h4>
                    <ul>
                      {member.specialties.map((specialty, idx) => (
                        <li key={idx}>{specialty}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>No hay miembros del equipo para mostrar</p>
          </div>
        )}
      </div>

      <section className={styles.values}>
        <div className={styles.container}>
          <h2>Nuestros Valores</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3>Calidad</h3>
              <p>
                Utilizamos materiales de la más alta calidad y técnicas avanzadas para garantizar
                tatuajes duraderos y hermosos.
              </p>
            </div>
            <div className={styles.valueCard}>
              <h3>Creatividad</h3>
              <p>
                Cada tatuaje es una obra de arte única diseñada específicamente para reflejar tu
                personalidad e identidad.
              </p>
            </div>
            <div className={styles.valueCard}>
              <h3>Higiene</h3>
              <p>
                Mantenemos los más altos estándares de sanitización y esterilización en todo
                nuestro estudio.
              </p>
            </div>
            <div className={styles.valueCard}>
              <h3>Respeto</h3>
              <p>
                Escuchamos y respetamos los deseos de nuestros clientes, trabajando
                colaborativamente en cada proyecto.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
