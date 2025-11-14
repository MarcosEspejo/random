# Chat Aleatorio - Despliegue en Vercel

## 🚀 Pasos para desplegar en Vercel

### 1. Preparar el repositorio Git

```bash
git init
git add .
git commit -m "Initial commit - Chat Aleatorio"
```

### 2. Subir a GitHub

1. Crea un nuevo repositorio en GitHub (https://github.com/new)
2. Ejecuta estos comandos:

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

### 3. Desplegar en Vercel

**Opción A: Desde la terminal**
```bash
npm install -g vercel
vercel login
vercel
```

**Opción B: Desde el sitio web**
1. Ve a https://vercel.com
2. Click en "Add New Project"
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente la configuración
5. Click en "Deploy"

### 4. Configuración de Environment Variables (Opcional)

Si necesitas configurar variables de entorno:
- `NODE_ENV=production` (se configura automáticamente)
- `PORT` (Vercel lo maneja automáticamente)

## ⚠️ Limitaciones de Vercel con WebSockets

**IMPORTANTE**: Vercel tiene limitaciones con WebSockets (Socket.IO):
- Las funciones serverless tienen un timeout de 10 segundos (plan gratuito)
- Las conexiones WebSocket pueden ser inestables
- No es ideal para aplicaciones real-time con Socket.IO

### 🔧 Alternativas recomendadas para Socket.IO:

1. **Railway** (Recomendado) - https://railway.app
   - Soporta WebSockets completamente
   - Fácil despliegue desde GitHub
   - Plan gratuito con $5 de crédito mensual

2. **Render** - https://render.com
   - Soporta WebSockets
   - Plan gratuito disponible
   - Buena integración con GitHub

3. **Heroku** - https://heroku.com
   - Soporta WebSockets
   - Plan gratuito limitado

## 🛠️ Para desplegar en Railway (Recomendado)

1. Ve a https://railway.app
2. Sign up con GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Selecciona tu repositorio
5. Railway detectará automáticamente todo
6. ¡Desplegado en minutos!

## 📝 Notas

- El proyecto está configurado con `vercel.json` pero puede no funcionar óptimamente
- Para producción real con Socket.IO, usa Railway o Render
- El código está listo para cualquier plataforma que soporte Node.js
