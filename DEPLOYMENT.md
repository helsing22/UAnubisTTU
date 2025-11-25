# Guía de Despliegue - ANUBIS YR TATTOO

## Requisitos Previos

- Node.js 16+ y npm 7+
- Cuenta en Supabase
- Cuenta en Instagram Business o acceso a API
- Dominio personalizado (opcional)

## Paso 1: Configurar Supabase

### 1.1 Crear Proyecto en Supabase
1. Ir a https://supabase.com
2. Crear nuevo proyecto
3. Copiar URL y claves API

### 1.2 Ejecutar Migraciones
```sql
-- Copiar y ejecutar el contenido de la migración en SQL Editor
-- Crear todas las tablas necesarias
-- Activar RLS
-- Crear índices
```

### 1.3 Insertar Datos Iniciales
```sql
-- Ejecutar scripts de seeding
-- Agregar servicios
-- Agregar miembros del equipo
-- Agregar testimonios de ejemplo
```

## Paso 2: Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_INSTAGRAM_USERNAME=anubisyrtattoo
VITE_INSTAGRAM_ACCESS_TOKEN=IGQVJYb21...
```

## Paso 3: Instalar Dependencias

```bash
npm install
```

## Paso 4: Ejecutar Localmente

```bash
npm run dev
```

Acceder a http://localhost:5173

## Paso 5: Compilar para Producción

```bash
npm run build
```

Esto crea la carpeta `dist/` con archivos optimizados.

## Paso 6: Despliegue en Vercel

### Opción A: Despliegue Automático

1. Hacer push a GitHub
2. Conectar repositorio a Vercel
3. Vercel detectará automáticamente Vite
4. Configurar variables de entorno en Vercel
5. Deploy automático

### Opción B: Despliegue Manual

```bash
npm install -g vercel
vercel
```

Seguir las instrucciones de Vercel.

## Paso 7: Configurar Dominio Personalizado

En el panel de Vercel o proveedor de dominios:
1. Actualizar registros DNS
2. Apuntar al servidor de Vercel
3. Esperar propagación (hasta 24 horas)

## Paso 8: Configurar Instagram API

### 8.1 Obtener Token de Acceso
1. Ir a Meta Developers
2. Crear aplicación
3. Solicitar acceso a Instagram Graph API
4. Generar token de acceso permanente

### 8.2 Guardar Token
```env
VITE_INSTAGRAM_ACCESS_TOKEN=tu_token_aqui
```

## Paso 9: Edge Functions (Opcional)

### Desplegar Edge Function para Sincronización
```bash
supabase functions deploy sync-instagram
```

## Paso 10: Verificación Final

### Checklist
- [ ] Supabase está conectado
- [ ] Datos se cargan correctamente
- [ ] Formulario de reserva funciona
- [ ] Instagram se sincroniza
- [ ] Correos funcionan (si están configurados)
- [ ] Responsive en móvil
- [ ] SEO tags están presentes

## Monitoreo en Producción

### Logs de Supabase
```bash
# Ver logs en tiempo real
supabase functions list
```

### Analytics
Usar Google Analytics para rastrear:
- Visitors
- Conversion rates
- Pages más visitadas

### Alertas
Configurar alertas en Supabase para:
- Errores en base de datos
- Picos de tráfico
- Fallos de queries

## Mantenimiento

### Backups
- Supabase realiza backups automáticos
- Descargar backups semanalmente
- Mantener en almacenamiento seguro

### Actualizaciones
```bash
npm update
npm audit fix
```

### Monitoreo
- Revisar logs diariamente
- Verificar sincronización de Instagram
- Revisar nuevas reservas

## Solución de Problemas

### Problema: Las imágenes no cargan
**Solución**: Verificar URLs de imágenes en Supabase Storage

### Problema: Instagram no sincroniza
**Solución**: Verificar token de acceso y permisos

### Problema: El formulario no envía
**Solución**: Verificar RLS policies en tabla reservations

### Problema: Estilos no cargan
**Solución**: Limpiar cache del navegador (Ctrl+Shift+Delete)

## Performance

### Optimizaciones Aplicadas
- ✓ Code splitting automático
- ✓ Lazy loading de imágenes
- ✓ CSS minificado
- ✓ JavaScript minificado con Terser
- ✓ Gzip compression

### Métricas Objetivo
- Lighthouse: > 90
- Core Web Vitals: Green
- Time to First Byte: < 500ms
- First Contentful Paint: < 1.5s

## Rollback

Si algo sale mal en producción:

```bash
# Ver versiones anteriores
vercel deployments list

# Rollback a versión anterior
vercel rollback
```

## Documentación Útil

- [Supabase Docs](https://supabase.com/docs)
- [Vite Guide](https://vite.dev/guide/)
- [React Docs](https://react.dev)
- [Instagram Graph API](https://developers.instagram.com/docs/instagram-api)
