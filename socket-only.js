import { createServer } from 'node:http';
import { initializeSocketServer } from './socket-server.js';

const port = process.env.PORT || 3001;
const httpServer = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', message: 'Socket.IO server running' }));
});

initializeSocketServer(httpServer);

httpServer.listen(port, () => {
  console.log(`🚀 Socket.IO server running on http://localhost:${port}`);
});
