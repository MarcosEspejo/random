import fs from 'node:fs/promises'
import express from 'express'
import { Transform } from 'node:stream'
import { createServer } from 'node:http'
import { initializeSocketServer } from './socket-server.js'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'
const host = process.env.HOST || '0.0.0.0'
const ABORT_DELAY = 10000

// Configurar CORS para permitir Vercel
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://random-h18vps637-marcos-projects-07c9c421.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean)

// Create http server
const app = express()
const httpServer = createServer(app)

// Configurar CORS para Express
app.use((req, res, next) => {
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

// Health check endpoint para Railway/Render
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Socket.IO server is running',
    timestamp: new Date().toISOString()
  })
})

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' })
})

// Initialize Socket.IO
initializeSocketServer(httpServer)

// Cached production assets (solo para desarrollo local)
const templateHtml = isProduction ? '' : ''

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { 
      middlewareMode: true,
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
    },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)

  // Serve HTML solo en desarrollo
  app.use('*all', async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, '')
      let template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      const render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render

      let didError = false

      const { pipe, abort } = render(url, {
        onShellError() {
          res.status(500)
          res.set({ 'Content-Type': 'text/html' })
          res.send('<h1>Something went wrong</h1>')
        },
        onShellReady() {
          res.status(didError ? 500 : 200)
          res.set({ 'Content-Type': 'text/html' })

          const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`)
          let htmlEnded = false

          const transformStream = new Transform({
            transform(chunk, encoding, callback) {
              if (!htmlEnded) {
                chunk = chunk.toString()
                if (chunk.endsWith('<vite-streaming-end></vite-streaming-end>')) {
                  res.write(chunk.slice(0, -41) + htmlEnd, 'utf-8')
                } else {
                  res.write(chunk, 'utf-8')
                }
              } else {
                res.write(chunk, encoding)
              }
              callback()
            },
          })

          transformStream.on('finish', () => {
            res.end()
          })

          res.write(htmlStart)
          pipe(transformStream)
        },
        onError(error) {
          didError = true
          console.error(error)
        },
      })

      setTimeout(() => {
        abort()
      }, ABORT_DELAY)
    } catch (e) {
      vite?.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })
}

// Start http server with Socket.IO
httpServer.listen(port, host, () => {
  console.log(`\n🚀 Servidor iniciado exitosamente!\n`)
  if (isProduction) {
    console.log(`   Producción en puerto ${port}`)
  } else {
    console.log(`   Local:   http://localhost:${port}`)
    console.log(`   Red:     http://192.168.0.200:${port}\n`)
    console.log(`💡 Para probar en otros dispositivos:`)
    console.log(`   1. Asegúrate que estén en la misma red WiFi`)
    console.log(`   2. Abre http://192.168.0.200:${port} en el navegador\n`)
  }
})
