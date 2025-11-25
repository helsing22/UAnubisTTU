import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../services/supabase';
import styles from './Reservation.module.css';

export function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bodyZone: '',
    tattooStyle: '',
    designDescription: '',
    desiredDate: '',
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const { error } = await supabase.from('reservations').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          body_zone: formData.bodyZone,
          tattoo_style: formData.tattooStyle,
          design_description: formData.designDescription,
          desired_date: formData.desiredDate,
          status: 'pending',
        },
      ]);

      if (error) throw error;

      // Send WhatsApp message
      const message = `Hola, soy ${formData.name}. Quiero un tatuaje en la zona ${formData.bodyZone}, estilo ${formData.tattooStyle}, para la fecha ${formData.desiredDate}. ${formData.designDescription}`;
      window.open(
        `https://wa.me/5355016158?text=${encodeURIComponent(message)}`,
        '_blank'
      );

      setStatus({
        type: 'success',
        message: 'Reserva enviada exitosamente. Se abrirá WhatsApp para confirmar.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        bodyZone: '',
        tattooStyle: '',
        designDescription: '',
        desiredDate: '',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Error al enviar la reserva',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.reservation}>
      <section className={styles.header}>
        <h1>Reserva tu Cita</h1>
        <p>Llena el formulario y nos contactaremos pronto</p>
      </section>

      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre Completo *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Teléfono *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="bodyZone">Zona Corporal *</label>
            <select
              id="bodyZone"
              name="bodyZone"
              value={formData.bodyZone}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una zona</option>
              <option value="brazo">Brazo</option>
              <option value="pierna">Pierna</option>
              <option value="espalda">Espalda</option>
              <option value="pecho">Pecho</option>
              <option value="cuello">Cuello</option>
              <option value="tobillo">Tobillo</option>
              <option value="otra">Otra</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tattooStyle">Estilo de Tatuaje *</label>
            <select
              id="tattooStyle"
              name="tattooStyle"
              value={formData.tattooStyle}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un estilo</option>
              <option value="realista">Realista</option>
              <option value="tribal">Tribal</option>
              <option value="geometrico">Geométrico</option>
              <option value="japones">Japonés</option>
              <option value="lineal">Lineal</option>
              <option value="acuarela">Acuarela</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="designDescription">Descripción del Diseño</label>
            <textarea
              id="designDescription"
              name="designDescription"
              value={formData.designDescription}
              onChange={handleChange}
              rows={4}
              placeholder="Cuéntanos qué tatuaje tienes en mente..."
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="desiredDate">Fecha Deseada</label>
            <input
              type="date"
              id="desiredDate"
              name="desiredDate"
              value={formData.desiredDate}
              onChange={handleChange}
            />
          </div>

          {status && (
            <div className={`${styles.status} ${styles[status.type]}`}>
              {status.type === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <p>{status.message}</p>
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Reserva'}
          </button>
        </form>

        <aside className={styles.info}>
          <h2>Información de Contacto</h2>
          <div className={styles.infoItem}>
            <h3>Teléfono</h3>
            <a href="tel:+5355016158">+53 5501-6158</a>
          </div>
          <div className={styles.infoItem}>
            <h3>WhatsApp</h3>
            <a
              href="https://wa.me/5355016158"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enviar mensaje
            </a>
          </div>
          <div className={styles.infoItem}>
            <h3>Correo</h3>
            <a href="mailto:info@anubisyrtattoo.com">info@anubisyrtattoo.com</a>
          </div>
          <div className={styles.infoItem}>
            <h3>Ubicación</h3>
            <p>Manicaragua, Cuba</p>
          </div>
          <div className={styles.infoItem}>
            <h3>Horarios</h3>
            <p>Lunes a Viernes: 11:00 - 18:00</p>
            <p>Sábado: 10:00 - 17:00</p>
            <p>Domingo: Cerrado</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
