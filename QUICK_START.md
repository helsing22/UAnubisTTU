# 🚀 Guía Rápida de Inicio - ANUBIS YR TATTOO

## En 5 Minutos: Inicia el Proyecto

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
Copia el archivo `.env.example` a `.env` y actualiza con tus credenciales:

```bash
cp .env.example .env
```

Edita `.env` con:
```env
VITE_SUPABASE_URL=tu_url_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima
VITE_INSTAGRAM_USERNAME=anubisyrtattoo
VITE_INSTAGRAM_ACCESS_TOKEN=tu_token_instagram
```

### 3. Ejecutar Servidor de Desarrollo
```bash
npm run dev
```

Abre http://localhost:5173 en tu navegador.

---

## 10 Minutos: Configurar Supabase

### Paso 1: Crear Proyecto
1. Ve a https://supabase.com
2. Haz clic en "New Project"
3. Llena los detalles y crea el proyecto

### Paso 2: Ejecutar Migraciones
1. Abre SQL Editor en Supabase
2. Copia el contenido de la migración en `SETUP.sql`
3. Ejecuta el script

### Paso 3: Agregar Datos Iniciales
```javascript
// Ejecuta en la consola del navegador
import { seedDatabase } from './src/utils/seedData.js';
seedDatabase();
```

---

## 15 Minutos: Configurar Instagram

### Obtener Token
1. Ve a https://developers.facebook.com
2. Crea una aplicación
3. Solicita acceso a Instagram Graph API
4. Genera un token de acceso permanente

### Guardar Token
```env
VITE_INSTAGRAM_ACCESS_TOKEN=tu_token_aqui
```

---

## Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor con hot reload

# Compilación
npm run build        # Compila para producción
npm run preview      # Previsualiza build local

# Limpieza
rm -rf dist         # Elimina carpeta de build
rm -rf node_modules # Elimina dependencias (reinstala con npm install)
```

---

## Estructura de Carpetas

```
src/
├── components/     # Componentes React
├── context/        # Estado global (Auth)
├── hooks/          # Custom hooks
├── services/       # Servicios (Supabase)
├── styles/         # Estilos CSS
├── utils/          # Funciones auxiliares
├── App.jsx         # Componente raíz
└── main.jsx        # Punto de entrada

public/             # Archivos públicos estáticos
dist/               # Build de producción (generado)
```

---

## Crear Nueva Página

### 1. Crear Componente
```jsx
// src/components/pages/MiPagina.jsx
import styles from './MiPagina.module.css';

export function MiPagina() {
  return (
    <div className={styles.container}>
      <h1>Mi Página</h1>
    </div>
  );
}
```

### 2. Crear Estilos
```css
/* src/components/pages/MiPagina.module.css */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xl);
}
```

### 3. Agregar Ruta
```jsx
// En App.jsx
<Route path="/mi-pagina" element={<MiPagina />} />
```

---

## Agregar Nueva Tabla a Supabase

### 1. En SQL Editor
```sql
CREATE TABLE IF NOT EXISTS mi_tabla (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  descripcion text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mi_tabla ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos pueden ver"
  ON mi_tabla FOR SELECT
  USING (true);
```

### 2. En Componente
```javascript
// Obtener datos
const { data } = await supabase
  .from('mi_tabla')
  .select('*');

// Crear registro
const { error } = await supabase
  .from('mi_tabla')
  .insert([{ nombre: 'Test', descripcion: 'Una prueba' }]);
```

---

## Solucionar Problemas Comunes

### ❌ Error: "Cannot find module"
**Solución**: Ejecuta `npm install` nuevamente

### ❌ Las imágenes no cargan
**Solución**: Verifica que las URLs en Supabase sean correctas

### ❌ El formulario no funciona
**Solución**: Verifica que RLS esté deshabilitado para INSERT en tabla

### ❌ Hot reload no funciona
**Solución**: Reinicia servidor con `npm run dev`

### ❌ Build falla
**Solución**: Ejecuta `npm audit fix` y `npm install` nuevamente

---

## Atajos Útiles

```bash
# Instalar nueva dependencia
npm install nombre-paquete

# Desinstalar dependencia
npm uninstall nombre-paquete

# Ver información del proyecto
npm info

# Ver outdated packages
npm outdated

# Limpiar cache
npm cache clean --force
```

---

## Desplegar en 1 Minuto

### Con Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

Sigue las instrucciones y listo!

### Con Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Manual (servidor propio)
```bash
npm run build
# Sube carpeta 'dist' a tu servidor
```

---

## Recursos Útiles

- 📚 [Documentación React](https://react.dev)
- 🎨 [Vite Guide](https://vite.dev)
- 🔌 [Supabase Docs](https://supabase.com/docs)
- 🎯 [React Router](https://reactrouter.com)
- 💅 [CSS Modules](https://css-tricks.com/css-modules-part-1-need/)

---

## Tips & Tricks

### Uso de CSS Variables
```css
color: var(--accent-gold);
padding: var(--spacing-lg);
transition: all var(--transition-base);
```

### Lazy Loading de Imágenes
```jsx
<img src="url" alt="desc" loading="lazy" />
```

### Debugging en React
```javascript
console.log('Valor:', valor);
debugger; // Pausa el código
```

### Testing en Componente
```bash
npm run build  # Verifica que compila
npm run preview # Verifica que se ve bien
```

---

## Próximas Mejoras

- [ ] Agregar blog
- [ ] Implementar chat
- [ ] Sistema de pagos
- [ ] PWA offline
- [ ] Dark mode
- [ ] Notificaciones email

---

## Contacto y Soporte

Si necesitas ayuda:
- 📖 Revisa la documentación en `ARQUITECTURA.md`
- 🎯 Consulta `FEATURES.md` para características
- 🚀 Lee `DEPLOYMENT.md` para desplegar

¡Happy coding! 🎉
