import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>ANUBY</span>
          <span className={styles.logoAbbr}>YR</span>
        </Link>

        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
          <Link
            to="/"
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
          >
            Inicio
          </Link>
          <Link
            to="/galeria"
            className={`${styles.navLink} ${isActive('/galeria') ? styles.active : ''}`}
          >
            Galería
          </Link>
          <Link
            to="/equipo"
            className={`${styles.navLink} ${isActive('/equipo') ? styles.active : ''}`}
          >
            Equipo
          </Link>
          <Link
            to="/reserva"
            className={`${styles.navLink} ${isActive('/reserva') ? styles.active : ''}`}
          >
            Reserva
          </Link>
          <Link
            to="/contacto"
            className={`${styles.navLink} ${isActive('/contacto') ? styles.active : ''}`}
          >
            Contacto
          </Link>
        </nav>

        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
