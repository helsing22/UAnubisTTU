# Arquitectura del Sitio Web ANUBIS YR TATTOO

## Visión General

El sitio web de ANUBIS YR TATTOO es una aplicación web moderna desarrollada con React + Vite que integra funcionalidades de e-commerce, galería de portafolio y sistema de reservas, todo sincronizado con Instagram.

## Componentes Principales

### 1. Frontend (React + Vite)

**Estructura de Componentes:**

```
App.jsx (Componente raíz)
├── ErrorBoundary (Manejo de errores)
├── Header (Navegación principal)
├── Main (Router)
│   ├── Home (Página de inicio)
│   ├── Gallery (Galería interactiva)
│   ├── Team (Equipo profesional)
│   ├── Reservation (Sistema de reservas)
│   └── Contact (Redirige a Reservation)
└── Footer (Pie de página)
```

### 2. Base de Datos (Supabase PostgreSQL)

**Tablas Principales:**

- **tattoo_works**: Almacena trabajos de tatuajes locales
  - id, title, description, category, body_zone, style
  - image_url, instagram_post_id, featured, likes_count

- **instagram_sync**: Cache de posts de Instagram sincronizados
  - post_id, image_url, caption, likes, comments
  - posted_at, included_in_portfolio

- **reservations**: Solicitudes de reserva de clientes
  - name, email, phone, body_zone, tattoo_style
  - design_description, desired_date, status

- **testimonials**: Reseñas de clientes
  - author_name, author_photo_url, rating, content
  - tattoo_style, published

- **services**: Servicios ofrecidos
  - title, description, icon_name, display_order

- **team_members**: Información del equipo
  - name, role, bio, photo_url, specialties
  - instagram_username

- **site_settings**: Configuración del sitio
  - key, value

### 3. Autenticación

**Flujo de Autenticación:**

- Supabase Auth para usuarios administradores
- Context API para estado global de autenticación
- Tokens JWT para sesiones seguras

### 4. Integración Instagram

**Sincronización Automática:**

- Edge Function que consume API Graph de Instagram
- Almacena posts en tabla instagram_sync
- Actualización periódica o manual desde admin
- Caché de imágenes para mejor rendimiento

## Flujos de Datos

### Flujo de Reserva

```
Cliente rellena formulario
    ↓
Validación en cliente
    ↓
Envío a Supabase (tabla reservations)
    ↓
Apertura de WhatsApp con mensaje
    ↓
Admin recibe en WhatsApp
    ↓
Actualización manual de estado en Supabase
```

### Flujo de Galería

```
Instagram sincronización automática
    ↓
Almacenamiento en instagram_sync
    ↓
Componente Gallery obtiene datos
    ↓
Aplicación de filtros en cliente
    ↓
Visualización en galería responsiva
```

## Características Técnicas

### Rendimiento

- **Code Splitting**: Separación automática de dependencias grandes
- **Lazy Loading**: Carga perezosa de imágenes en galería
- **CSS Modules**: Estilos scoped para evitar conflictos
- **Minificación**: Terser para optimización de bundle

### Seguridad

- **Row Level Security (RLS)**: Políticas en cada tabla de Supabase
- **Environment Variables**: Credenciales protegidas
- **Error Boundaries**: Manejo seguro de errores
- **Validación de Datos**: En cliente y servidor

### Responsividad

- **Mobile First**: Diseño basado en mobile
- **Breakpoints**: Adaptación a tablets y desktop
- **Grid/Flexbox**: Layouts modernos y escalables
- **Viewport Meta Tag**: Configuración de viewport

### SEO

- **Meta Tags**: Description, og:image, og:url
- **Page Titles**: Dinámicos para cada ruta
- **Semantic HTML**: Estructura HTML semántica
- **Lazy Loading**: Mejora de Largest Contentful Paint (LCP)

## Paleta de Colores

```css
--primary-dark: #0a0a0a (Fondo principal)
--primary-darker: #111111 (Variación oscura)
--accent-gold: #d4af37 (Color primario)
--accent-gold-light: #e5bf52 (Variación clara)
--text-primary: #f5f5f5 (Texto principal)
--text-secondary: #aaaaaa (Texto secundario)
```

## Tipografía

- **Font**: System fonts (Apple/San Francisco, Segoe UI, etc.)
- **Weights**: 400, 600, 700, 900
- **Line Height**: 1.2 (headings), 1.6 (body)

## Sistema de Espaciado

Base: 8px
- xs: 0.25rem (2px)
- sm: 0.5rem (4px)
- md: 1rem (8px)
- lg: 1.5rem (12px)
- xl: 2rem (16px)
- 2xl: 3rem (24px)
- 3xl: 4rem (32px)

## Stack Tecnológico Completo

**Frontend:**
- React 18
- Vite (build tool)
- React Router v6
- Lucide React (iconos)

**Backend:**
- Supabase (PostgreSQL)
- Supabase Auth
- Supabase Edge Functions

**Herramientas:**
- npm (gestor de paquetes)
- Terser (minificación)
- CSS Modules

## Próximas Mejoras

- [ ] Dashboard administrativo completo
- [ ] Sistema de pago integrado (Stripe)
- [ ] Blog de cuidados post-tatuaje
- [ ] Chat en vivo con clientes
- [ ] Sistema de notificaciones por email
- [ ] Analytics avanzado
- [ ] PWA para funcionalidad offline

## Notas de Implementación

### Variables de Entorno Requeridas

```
VITE_SUPABASE_URL=<url_supabase>
VITE_SUPABASE_ANON_KEY=<anon_key>
VITE_INSTAGRAM_USERNAME=anubisyrtattoo
VITE_INSTAGRAM_ACCESS_TOKEN=<token>
```

### Comandos Importantes

```bash
npm install          # Instalar dependencias
npm run dev         # Servidor de desarrollo
npm run build       # Construir para producción
npm run preview     # Ver preview de build
```

### Configuración de Supabase

1. Crear base de datos en Supabase
2. Ejecutar migraciones SQL
3. Habilitar RLS en todas las tablas
4. Configurar políticas de acceso
5. Obtener URL y claves de API

### Configuración de Instagram

1. Crear Instagram Graph API token
2. Obtener información de usuario
3. Configurar permisos de acceso
4. Guardar token en variables de entorno
