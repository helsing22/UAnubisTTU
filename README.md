# ANUBIS YR TATTOO - Sitio Web Profesional

Sitio web moderno y completamente funcional para el estudio de tatuajes ANUBIS YR TATTOO en Manicaragua, Cuba.

## Características

- **Galería Interactiva**: Mostrar trabajos del tatuador con filtros por zona corporal y estilo
- **Integración Instagram**: Las imágenes se sincronizan automáticamente desde Instagram
- **Sistema de Reservas**: Formulario de reserva integrado con WhatsApp
- **Gestión de Equipo**: Página dedicada con información de los profesionales
- **Diseño Responsivo**: Funciona perfectamente en móviles, tablets y escritorio
- **Optimización SEO**: Meta tags y estructura apropiada para búsquedas
- **Base de Datos**: Supabase para almacenar reservas, testimonios y información

## Stack Tecnológico

- **Frontend**: React 18 + Vite
- **Estilos**: CSS Modules + CSS personalizado
- **Base de Datos**: Supabase
- **Autenticación**: Supabase Auth
- **Enrutamiento**: React Router v6
- **Íconos**: Lucide React

## Instalación

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno en `.env`
4. Ejecutar servidor de desarrollo: `npm run dev`
5. Construir para producción: `npm run build`

## Variables de Entorno

```
VITE_SUPABASE_URL=tu_url_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
VITE_INSTAGRAM_USERNAME=anubisyrtattoo
VITE_INSTAGRAM_ACCESS_TOKEN=tu_token_instagram
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── common/          # Header, Footer, ErrorBoundary
│   └── pages/           # Páginas principales
├── context/             # Auth Context
├── hooks/               # Custom hooks
├── services/            # Supabase client
├── styles/              # CSS global
└── utils/               # Funciones auxiliares
```

## Funcionalidades Principales

### Página de Inicio
- Hero section atractivo
- Información sobre el estudio
- Servicios destacados
- Últimos trabajos de Instagram
- Testimonios de clientes
- CTA para reservas

### Galería
- Filtros por zona corporal y estilo
- Vista modal para imágenes ampliadas
- Sincronización automática de Instagram
- Carga perezosa de imágenes

### Reservas
- Formulario multipasos
- Integración con WhatsApp
- Almacenamiento en Supabase
- Validación de datos

### Equipo
- Perfil de miembros
- Enlaces a Instagram
- Especialidades y biografía

## Contacto

**Teléfono**: +53 5501-6158
**WhatsApp**: https://wa.me/5355016158
**Instagram**: https://instagram.com/anubisyrtattoo
