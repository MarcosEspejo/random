# Guía de Despliegue en Railway

## Paso 1: Crear cuenta en Railway
1. Ve a https://railway.app
2. Regístrate con tu cuenta de GitHub

## Paso 2: Desplegar el servidor
1. Haz clic en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Conecta tu repositorio `MarcosEspejo/random`
4. Railway detectará automáticamente que es un proyecto Node.js

## Paso 3: Configurar variables de entorno
En el panel de Railway, ve a "Variables" y agrega:
- `NODE_ENV` = `production`
- `FRONTEND_URL` = `https://random-h18vps637-marcos-projects-07c9c421.vercel.app`

## Paso 4: Obtener la URL del servidor
1. Railway te dará una URL como: `https://tu-proyecto.railway.app`
2. Copia esta URL

## Paso 5: Configurar Vercel
1. Ve a tu proyecto en Vercel (https://vercel.com)
2. Ve a Settings > Environment Variables
3. Agrega una nueva variable:
   - Name: `VITE_SOCKET_URL`
   - Value: La URL de Railway (ejemplo: `https://tu-proyecto.railway.app`)
4. Marca "Production", "Preview" y "Development"
5. Haz clic en "Save"

## Paso 6: Redesplegar Vercel
Ejecuta en tu terminal:
```bash
vercel --prod
```

O haz un nuevo commit y push a GitHub (si conectaste el repositorio).

¡Listo! Tu aplicación de chat ahora funcionará completamente.
