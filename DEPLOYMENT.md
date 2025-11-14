# 🚀 Guía de Despliegue

Esta guía te ayudará a desplegar ChatAleatorio en producción.

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Cuenta en un servicio de hosting (Vercel, Netlify, Railway, etc.)
- Git instalado y configurado

## 🌐 Opciones de Deployment

### Opción 1: Vercel (Recomendado)

Vercel es ideal para aplicaciones React con SSR.

#### Pasos:

1. **Instalar Vercel CLI**
```bash
npm install -g vercel
```

2. **Login en Vercel**
```bash
vercel login
```

3. **Desplegar**
```bash
npm run build
vercel --prod
```

4. **Configuración automática**
Vercel detectará automáticamente que es un proyecto Vite.

#### Variables de Entorno (si usas backend real):
```
NODE_ENV=production
SOCKET_URL=tu_url_de_socket_io
```

---

### Opción 2: Netlify

Netlify es excelente para SPAs y sitios estáticos.

#### Pasos:

1. **Instalar Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build del proyecto**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod --dir=dist/client
```

#### netlify.toml (crear en la raíz):
```toml
[build]
  command = "npm run build"
  publish = "dist/client"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Opción 3: Railway

Railway es perfecto si necesitas un backend completo con Socket.io.

#### Pasos:

1. **Crear cuenta en Railway.app**

2. **Conectar tu repositorio de GitHub**

3. **Railway detectará automáticamente el proyecto Node.js**

4. **Variables de entorno en Railway dashboard:**
```
NODE_ENV=production
PORT=5173
```

5. **Deploy automático** con cada push a main

---

### Opción 4: Docker

Para deployment en cualquier plataforma que soporte Docker.

#### Dockerfile (crear en la raíz):
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/server.js ./

EXPOSE 5173
ENV NODE_ENV=production

CMD ["node", "server.js"]
```

#### Comandos Docker:
```bash
# Build
docker build -t chataletario .

# Run
docker run -p 5173:5173 chataletario

# Con Docker Compose
docker-compose up -d
```

#### docker-compose.yml:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5173:5173"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

---

## 🔧 Configuración de Producción

### 1. Optimizar Build

Asegúrate de que el `package.json` tenga:
```json
{
  "scripts": {
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build --outDir dist/client",
    "build:server": "vite build --ssr src/entry-server.tsx --outDir dist/server"
  }
}
```

### 2. Variables de Entorno

Crea un archivo `.env.production`:
```env
VITE_APP_NAME=ChatAleatorio
VITE_APP_VERSION=1.0.0
VITE_SOCKET_URL=https://tu-backend.com
```

### 3. Configuración de Vite

En `vite.config.ts`, asegúrate de tener:
```typescript
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
        },
      },
    },
  },
});
```

---

## 🔒 Seguridad en Producción

### Headers de Seguridad

Si usas Express, agrega estos headers:

```javascript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

### Rate Limiting

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por ventana
});

app.use('/api/', limiter);
```

---

## 📊 Monitoreo

### Sentry para Error Tracking

```bash
npm install @sentry/react
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "tu-sentry-dsn",
  environment: "production",
});
```

### Google Analytics

Agrega en `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

---

## 🚀 CI/CD con GitHub Actions

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

---

## 🎯 Checklist Pre-Deploy

- [ ] Tests pasando (si los tienes)
- [ ] Build exitoso sin warnings
- [ ] Variables de entorno configuradas
- [ ] Lighthouse score > 90
- [ ] Funcionalidad probada en diferentes dispositivos
- [ ] HTTPS configurado
- [ ] Domain apuntando correctamente
- [ ] Analytics configurado
- [ ] Error tracking activo
- [ ] Backups configurados

---

## 📱 Testing en Producción

1. **Prueba en múltiples navegadores**
   - Chrome
   - Firefox
   - Safari
   - Edge

2. **Prueba en dispositivos móviles**
   - iOS Safari
   - Chrome Android
   - Samsung Internet

3. **Verifica performance**
   - Lighthouse
   - WebPageTest
   - GTmetrix

---

## 🆘 Troubleshooting

### Error: Module not found
```bash
npm ci
npm run build
```

### Error: Port already in use
```bash
# Cambiar puerto en server.js
const port = process.env.PORT || 3000;
```

### Build demasiado grande
```bash
# Analizar bundle
npm run build -- --mode analyze
```

---

## 📞 Soporte

Si encuentras problemas durante el deployment:
1. Revisa los logs del servidor
2. Verifica las variables de entorno
3. Asegúrate de que todas las dependencias estén instaladas
4. Verifica la versión de Node.js

---

## 🎉 Post-Deploy

Después de desplegar:
1. ✅ Verifica que la app funciona correctamente
2. ✅ Prueba en diferentes dispositivos
3. ✅ Configura SSL/HTTPS
4. ✅ Configura dominio personalizado
5. ✅ Activa monitoreo
6. ✅ ¡Comparte tu proyecto!

---

**¡Felicidades! Tu ChatAleatorio está en producción! 🎊**
