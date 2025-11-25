import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.title}>ANUBIS YR TATTOO</h3>
          <p>Donde el arte se fusiona con tu piel</p>
        </div>

        <div className={styles.section}>
          <h4>Contacto</h4>
          <a href="tel:+5355016158" className={styles.link}>
            <Phone size={18} />
            +53 5501-6158
          </a>
          <a href="mailto:info@anubisyrtattoo.com" className={styles.link}>
            <Mail size={18} />
            info@anubisyrtattoo.com
          </a>
          <a href="#map" className={styles.link}>
            <MapPin size={18} />
            Manicaragua, Cuba
          </a>
        </div>

        <div className={styles.section}>
          <h4>Redes Sociales</h4>
          <div className={styles.socialLinks}>
            <a
              href="https://instagram.com/anubisyrtattoo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://facebook.com/anubisyrtattoo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; 2025 ANUBIS YR TATTOO. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
