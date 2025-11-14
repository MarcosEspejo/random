import { Server } from 'socket.io';

// Estado del servidor
const users = new Map();
const waitingUsers = [];

// Función para encontrar una pareja
function findMatch(socketId, country, preferredCountry) {
  console.log(`🔍 Buscando match para ${socketId}. País: ${country}, Preferencia: ${preferredCountry}`);
  console.log(`📊 Usuarios en espera: ${waitingUsers.length}`, waitingUsers.map(u => ({ id: u.socketId, country: u.country, pref: u.preferredCountry })));
  
  const availableUsers = waitingUsers.filter(user => {
    // No emparejar consigo mismo
    if (user.socketId === socketId) {
      console.log(`❌ Rechazado ${user.socketId}: es el mismo usuario`);
      return false;
    }
    
    console.log(`✅ Usuario disponible: ${user.socketId}`);
    return true;
  });

  if (availableUsers.length > 0) {
    // Priorizar usuarios con preferencias coincidentes
    const priorityMatch = availableUsers.find(u => {
      // Match perfecto: ambos tienen preferencia y coinciden
      if (preferredCountry && u.country === preferredCountry) return true;
      if (u.preferredCountry && u.preferredCountry === country) return true;
      return false;
    });
    
    const matchedUser = priorityMatch || availableUsers[0];
    console.log(`✨ Match encontrado: ${matchedUser.socketId}`);
    return matchedUser.socketId;
  }

  console.log(`⚠️ No hay usuarios disponibles para match`);
  return null;
}

// Función para eliminar usuario de la cola de espera
function removeFromWaiting(socketId) {
  const index = waitingUsers.findIndex(u => u.socketId === socketId);
  if (index !== -1) {
    waitingUsers.splice(index, 1);
  }
}

export function initializeSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    // Registrar nuevo usuario
    users.set(socket.id, {
      id: socket.id,
      socketId: socket.id,
      country: 'Unknown',
      isMatched: false,
      partnerId: null
    });

    // Emitir el número de usuarios online a todos
    io.emit('online_users', users.size);

    // Usuario solicita país basado en IP
    socket.on('request_country', async () => {
      try {
        // En producción, usar un servicio como ipapi.co
        // Por ahora, asignar un país aleatorio para demostración
        const countries = ['Mexico', 'España', 'Argentina', 'Colombia', 'Chile', 'Peru', 'Venezuela', 'Ecuador', 'Guatemala', 'Cuba'];
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        
        const user = users.get(socket.id);
        if (user) {
          user.country = randomCountry;
          users.set(socket.id, user);
        }
        
        socket.emit('country_detected', randomCountry);
      } catch (error) {
        socket.emit('country_detected', 'Unknown');
      }
    });

    // Buscar pareja
    socket.on('search_match', ({ country, preferredCountry }) => {
      console.log(`${socket.id} buscando pareja. País: ${country}, Preferencia: ${preferredCountry || 'ninguna'}`);
      
      const user = users.get(socket.id);
      if (!user) return;

      user.country = country || 'Unknown';
      users.set(socket.id, user);

      // Intentar encontrar una pareja
      const matchId = findMatch(socket.id, country, preferredCountry);

      if (matchId) {
        // Se encontró una pareja
        const partner = users.get(matchId);
        if (partner) {
          // Actualizar estados
          user.isMatched = true;
          user.partnerId = matchId;
          partner.isMatched = true;
          partner.partnerId = socket.id;

          users.set(socket.id, user);
          users.set(matchId, partner);

          // Remover de la cola de espera
          removeFromWaiting(matchId);

          // Notificar a ambos usuarios
          socket.emit('match_found', { partnerId: matchId, partnerCountry: partner.country });
          io.to(matchId).emit('match_found', { partnerId: socket.id, partnerCountry: user.country });

          console.log(`Match exitoso: ${socket.id} <-> ${matchId}`);
        }
      } else {
        // Agregar a la cola de espera
        waitingUsers.push({
          socketId: socket.id,
          country: country || 'Unknown',
          preferredCountry: preferredCountry || null
        });
        console.log(`${socket.id} agregado a la cola. Total esperando: ${waitingUsers.length}`);
      }
    });

    // Enviar mensaje
    socket.on('send_message', ({ text, partnerId }) => {
      const user = users.get(socket.id);
      if (user && user.isMatched && user.partnerId === partnerId) {
        io.to(partnerId).emit('receive_message', {
          text,
          timestamp: new Date()
        });
      }
    });

    // Notificar que está escribiendo
    socket.on('typing_start', () => {
      const user = users.get(socket.id);
      if (user && user.partnerId) {
        io.to(user.partnerId).emit('partner_typing', true);
      }
    });

    socket.on('typing_stop', () => {
      const user = users.get(socket.id);
      if (user && user.partnerId) {
        io.to(user.partnerId).emit('partner_typing', false);
      }
    });

    // Saltar a la siguiente persona
    socket.on('skip_partner', () => {
      const user = users.get(socket.id);
      if (user && user.partnerId) {
        const partnerId = user.partnerId;
        const partner = users.get(partnerId);

        // Notificar al compañero que fue desconectado
        io.to(partnerId).emit('partner_disconnected');

        // Resetear ambos usuarios
        if (partner) {
          partner.isMatched = false;
          partner.partnerId = null;
          users.set(partnerId, partner);
        }

        user.isMatched = false;
        user.partnerId = null;
        users.set(socket.id, user);

        console.log(`${socket.id} saltó a ${partnerId}`);
      }
    });

    // Desconexión
    socket.on('disconnect', () => {
      console.log('Usuario desconectado:', socket.id);

      const user = users.get(socket.id);
      if (user) {
        // Si estaba emparejado, notificar al compañero
        if (user.partnerId) {
          io.to(user.partnerId).emit('partner_disconnected');
          
          const partner = users.get(user.partnerId);
          if (partner) {
            partner.isMatched = false;
            partner.partnerId = null;
            users.set(user.partnerId, partner);
          }
        }

        // Remover de la cola de espera
        removeFromWaiting(socket.id);

        // Eliminar usuario
        users.delete(socket.id);
      }

      // Emitir nuevo conteo de usuarios
      io.emit('online_users', users.size);
    });
  });

  console.log('Servidor Socket.IO inicializado');
  return io;
}
