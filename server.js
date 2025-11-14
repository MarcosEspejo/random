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

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

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

// Initialize Socket.IO
initializeSocketServer(httpServer)

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
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    /** @type {string} */
    let template
    /** @type {import('./src/entry-server.ts').render} */
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

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
            // See entry-server.tsx for more details of this code
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
