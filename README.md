# PeopleTech ConnectIA v1.0.0

Plataforma de red social corporativa para PeopleTech, diseñada para mejorar la colaboración y comunicación entre empleados a través de un entorno digital interactivo y atractivo.

## Características

- **Feed Social**: Comparte actualizaciones y reacciona a publicaciones de compañeros
- **El Altavoz**: Canal de anuncios importantes de la empresa
- **Retos ConnectIA**: Sistema gamificado para fomentar la participación
- **Equipos y Comunidades**: Espacios colaborativos para grupos de trabajo
- **Modo Oscuro**: Interfaz adaptable para diferentes preferencias visuales
- **Diseño Responsive**: Experiencia optimizada en todos los dispositivos

## Tecnologías

- **Frontend**: React 19, TypeScript, Tailwind CSS, Shadcn UI
- **Routing**: React Router v7
- **Gestión de Estado**: React Context
- **Formularios**: React Hook Form con validación Zod
- **Consultas API**: TanStack Query

## Ejecutar Localmente

**Prerrequisitos**: Node.js 18+

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar variables de entorno (opcional):
   ```bash
   cp .env.example .env.local
   ```

3. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Despliegue

Para desplegar a producción:

1. Generar build optimizado:
   ```bash
   npm run build
   ```

2. Previsualizar build antes de desplegar:
   ```bash
   npm run preview
   ```

3. Desplegar en plataforma elegida (Netlify, Vercel, etc.)

## Changelog

### v1.0.0 (10/06/2025)

- Correcciones de visualización en modo oscuro
- Estandarización de modales en toda la aplicación
- Mejoras en la estructura JSX y corrección de errores sintácticos
- Optimización del rendimiento general
- Primera versión estable para producción
