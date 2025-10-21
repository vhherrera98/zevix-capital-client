# Zevix Capital - Gestión de Fondo de Inversión Cerrado

Una plataforma segura, escalable y transparente para la administración de fondos de inversión cerrados. Este MVP ofrece acceso exclusivo para socios y clientes, con control total de fondos, contratos, notificaciones y más.

## 🚀 Características Principales

### Para Socios
- **Panel de Control Completo**: Gestión integral de la plataforma
- **Gestión de Clientes**: Crear y administrar cuentas de clientes
- **Gestión de Socios**: Administración de partners
- **Control de Cuentas**: Manejo de cuentas bancarias y flujos
- **KYC (Know Your Customer)**: Verificación de identidad
- **Documentos**: Gestión de documentos personales y de beneficiarios
- **Notificaciones**: Sistema de autorizaciones y alertas
- **Inversiones**: Control de ingresos y solicitudes

### Para Clientes
- **Panel Personal**: Vista dedicada a su portafolio
- **Documentos**: Acceso a documentos personales y de beneficiarios
- **Inversiones**: Seguimiento de ingresos personales
- **Notificaciones**: Alertas personalizadas

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Radix UI** - Componentes primitivos accesibles
- **Framer Motion** - Animaciones
- **React Hook Form + Zod** - Formularios y validación

### Estado y Datos
- **Redux Toolkit** - Gestión de estado global
- **RTK Query** - API calls y caching
- **NextAuth.js** - Autenticación

### Integraciones
- **Stripe** - Procesamiento de pagos
- **Neteller** - Transferencias electrónicas
- **Cloudinary** - Gestión de imágenes
- **Socket.io** - Comunicación en tiempo real

### Internacionalización
- Soporte multiidioma (Español/Inglés)
- Context API para gestión de idiomas

## 📁 Estructura del Proyecto

```
client/
├── app/                          # App Router de Next.js
│   ├── (client)/                 # Rutas para clientes
│   ├── (partnert)/               # Rutas para socios
│   ├── (public)/                 # Rutas públicas (auth)
│   ├── api/                      # API Routes
│   ├── globals.css               # Estilos globales
│   └── layout.tsx                # Layout raíz
├── components/                   # Componentes reutilizables
│   ├── ui/                       # Componentes base (shadcn/ui)
│   ├── forms/                    # Formularios específicos
│   ├── tables/                   # Tablas de datos
│   ├── sidebar/                  # Navegación lateral
│   └── ...
├── lib/                          # Utilidades y configuración
│   ├── Redux/                    # Store y slices
│   └── utils.ts                  # Funciones helper
├── types/                        # Definiciones TypeScript
├── i18n/                         # Traducciones
├── services/                     # Servicios API
├── hooks/                        # Custom hooks
├── context/                      # Context providers
└── ...
```

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- npm, yarn, pnpm o bun
- Backend API corriendo (ver repositorio del servidor)

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Instala dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   # o
   bun install
   ```

3. **Configura variables de entorno**
   Crea un archivo `.env.local`:
   ```env
   NEXT_PUBLIC_SERVER_PATHNAME=http://localhost:3001/api
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3003
   ```

4. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   # o
   bun dev
   ```

5. **Abre en el navegador**
   [http://localhost:3003](http://localhost:3003)

## 📜 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo con Turbopack
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linting con ESLint

## 🌍 Internacionalización

La aplicación soporta múltiples idiomas:
- Español (es)
- Inglés (en)

Las traducciones se gestionan en la carpeta `i18n/` con archivos JSON separados por idioma.

## 🔐 Autenticación

- **NextAuth.js** con JWT
- Roles: Socio, Cliente
- Sesiones persistentes
- Protección de rutas

## 🎨 UI/UX

- **Diseño Responsivo**: Mobile-first approach
- **Modo Oscuro**: Soporte completo
- **Accesibilidad**: Componentes ARIA-compliant
- **Animaciones**: Transiciones suaves con Framer Motion

## 📊 Características Técnicas

### Seguridad
- Validación de formularios con Zod
- Sanitización de inputs
- Protección CSRF
- Headers de seguridad

### Performance
- Code splitting automático
- Lazy loading de componentes
- Optimización de imágenes
- Caching inteligente con RTK Query

### Escalabilidad
- Arquitectura modular
- Componentes reutilizables
- Tipado fuerte con TypeScript
- Estructura organizada por features

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

**Zevix Capital**
- Website: [https://zevixcapital.com](https://zevixcapital.com)
- Email: info@zevixcapital.com

---

*Desarrollado con ❤️ por el equipo de Zevix Capital*
