# 🌐 ChatAleatorio

Una plataforma moderna de chat aleatorio donde puedes conectar con personas de todo el mundo de forma anónima.

## ✨ Características

- 💬 **Chat en tiempo real** - Conversaciones instantáneas con extraños
- 🎨 **Diseño moderno y oscuro** - Interfaz elegante con tema oscuro
- 🎭 **Completamente anónimo** - No se requiere registro ni información personal
- 📱 **Totalmente responsivo** - Funciona perfectamente en móviles, tablets y escritorio
- ⚡ **Animaciones fluidas** - Transiciones suaves con Framer Motion
- 🎯 **Interfaz intuitiva** - Fácil de usar desde el primer momento

## 🛠️ Tecnologías Utilizadas

- **React 19** - Biblioteca principal de UI
- **TypeScript** - Tipado estático para mayor seguridad
- **Vite** - Build tool ultrarrápido
- **TailwindCSS** - Framework de utilidades CSS
- **Framer Motion** - Animaciones y transiciones fluidas
- **React Icons** - Biblioteca completa de iconos
- **Socket.io** - WebSocket para comunicación en tiempo real
- **Express** - Servidor backend

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js 18+ instalado
- npm o yarn

### Pasos de instalación

1. Las dependencias ya están instaladas en este proyecto

2. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

3. Abrir el navegador en:
```
http://localhost:5173
```

## 📁 Estructura del Proyecto

```
random-chat/
├── src/
│   ├── components/
│   │   ├── ChatMessage.tsx      # Componente de mensaje individual
│   │   ├── Header.tsx            # Cabecera con contador de usuarios
│   │   ├── WaitingScreen.tsx     # Pantalla de búsqueda
│   │   └── WelcomeScreen.tsx     # Pantalla de bienvenida
│   ├── App.tsx                   # Componente principal
│   ├── index.css                 # Estilos globales con Tailwind
│   ├── entry-client.tsx          # Punto de entrada del cliente
│   └── entry-server.tsx          # SSR server-side
├── public/                       # Archivos estáticos
├── tailwind.config.js            # Configuración de Tailwind
├── postcss.config.js             # Configuración de PostCSS
├── vite.config.ts                # Configuración de Vite
└── package.json                  # Dependencias del proyecto
```

## 🎨 Características de Diseño

### Tema de Colores

- **Fondo oscuro**: Gradientes de azul oscuro y negro
- **Acentos**: Cyan (#00d9ff), Púrpura (#8338ec), Rosa (#ff006e)
- **Efectos**: Glass morphism, sombras con glow, gradientes animados

### Animaciones

- Transiciones suaves al cambiar de pantalla
- Animaciones de entrada/salida de mensajes
- Efectos hover en botones
- Rotación continua de iconos
- Pulsos y efectos de flotación

### Responsividad

- Diseño mobile-first
- Breakpoints optimizados para todos los dispositivos
- Elementos adaptables según el tamaño de pantalla
- Touch-friendly en dispositivos móviles

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## 🌟 Funcionalidades Implementadas

### Pantalla de Bienvenida
- Diseño atractivo con animaciones
- Cards informativos sobre características
- Botón CTA destacado
- Información de privacidad

### Sistema de Chat
- Búsqueda de usuarios con animación de carga
- Mensajes con burbuja diferenciada (enviados/recibidos)
- Timestamps en cada mensaje
- Input con autoenfoque
- Botones para saltar o salir de la conversación

### Simulación de Socket
- Sistema de mensajes en tiempo real (simulado)
- Respuestas automáticas aleatorias
- Contador de usuarios online
- Manejo de estados de conexión

## 📝 Notas de Implementación

Esta versión incluye una simulación del sistema de chat para desarrollo local. Para implementar en producción, necesitarías:

1. Configurar un servidor Socket.io real
2. Implementar sistema de emparejamiento de usuarios
3. Agregar moderación de contenido
4. Implementar sistema de reportes
5. Agregar rate limiting y seguridad

## 🔒 Privacidad y Seguridad

- No se almacena información personal
- Los chats son temporales
- Conexiones anónimas
- Sin registro requerido

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerir cambios o mejoras.

---

Desarrollado con ❤️ usando React y TailwindCSS
