import { useState, useEffect, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';

interface Message {
  id: number;
  text: string;
  isSent: boolean;
  timestamp: Date;
}

interface UseSocketReturn {
  isConnected: boolean;
  isMatched: boolean;
  isWaiting: boolean;
  onlineUsers: number;
  messages: Message[];
  userCountry: string;
  partnerCountry: string;
  isPartnerTyping: boolean;
  connect: () => void;
  searchMatch: (preferredCountry?: string) => void;
  sendMessage: (text: string) => void;
  skipPartner: () => void;
  disconnect: () => void;
  startTyping: () => void;
  stopTyping: () => void;
}

// Detectar si estamos en localhost o en la red (solo en el cliente)
const getSocketURL = () => {
  if (typeof window === 'undefined') {
    return 'http://localhost:5173'; // Fallback para SSR
  }
  
  const hostname = window.location.hostname;
  const port = window.location.port || '5173';
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `http://localhost:${port}`;
  }
  
  return `http://${hostname}:${port}`;
};

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || getSocketURL();

if (typeof window !== 'undefined') {
  console.log('🔗 Socket URL configurada:', SOCKET_URL);
}

export const useSocket = (): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userCountry, setUserCountry] = useState('');
  const [partnerCountry, setPartnerCountry] = useState('');
  const [partnerId, setPartnerId] = useState<string | null>(null);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);

  const connect = useCallback(() => {
    console.log('🟢 Iniciando conexión a:', SOCKET_URL);
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    newSocket.on('connect', () => {
      console.log('✅ Conectado al servidor Socket.IO');
      setIsConnected(true);
      setSocket(newSocket);
      
      // Solicitar detección de país
      newSocket.emit('request_country');
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Error de conexión:', error);
    });

    newSocket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      setIsConnected(false);
      setIsMatched(false);
      setIsWaiting(false);
    });

    newSocket.on('online_users', (count: number) => {
      setOnlineUsers(count);
    });

    newSocket.on('country_detected', (country: string) => {
      setUserCountry(country);
    });

    newSocket.on('match_found', ({ partnerId: newPartnerId, partnerCountry: newPartnerCountry }) => {
      console.log('¡Match encontrado!', newPartnerId);
      setIsWaiting(false);
      setIsMatched(true);
      setPartnerId(newPartnerId);
      setPartnerCountry(newPartnerCountry);
      setMessages([]);
    });

    newSocket.on('receive_message', ({ text, timestamp }) => {
      const newMessage: Message = {
        id: Date.now(),
        text,
        isSent: false,
        timestamp: new Date(timestamp),
      };
      setMessages(prev => [...prev, newMessage]);
    });

    newSocket.on('partner_disconnected', () => {
      console.log('Compañero desconectado');
      setIsMatched(false);
      setIsWaiting(false);
      setPartnerId(null);
      setPartnerCountry('');
      setMessages([]);
    });

    newSocket.on('partner_typing', (typing: boolean) => {
      setIsPartnerTyping(typing);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const searchMatch = useCallback((preferredCountry?: string) => {
    if (socket && userCountry) {
      setIsWaiting(true);
      socket.emit('search_match', {
        country: userCountry,
        preferredCountry: preferredCountry || null
      });
    }
  }, [socket, userCountry]);

  const sendMessage = useCallback((text: string) => {
    if (socket && isMatched && partnerId) {
      const newMessage: Message = {
        id: Date.now(),
        text,
        isSent: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newMessage]);
      socket.emit('send_message', { text, partnerId });
    }
  }, [socket, isMatched, partnerId]);

  const skipPartner = useCallback(() => {
    if (socket) {
      socket.emit('skip_partner');
      setIsMatched(false);
      setMessages([]);
      setPartnerId(null);
      setPartnerCountry('');
    }
  }, [socket]);

  const disconnect = useCallback(() => {
    if (socket) {
      if (isMatched) {
        socket.emit('skip_partner');
      }
      setIsMatched(false);
      setIsWaiting(false);
      setMessages([]);
      setPartnerId(null);
      setPartnerCountry('');
    }
  }, [socket, isMatched]);

  const startTyping = useCallback(() => {
    if (socket && isMatched) {
      socket.emit('typing_start');
    }
  }, [socket, isMatched]);

  const stopTyping = useCallback(() => {
    if (socket && isMatched) {
      socket.emit('typing_stop');
    }
  }, [socket, isMatched]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return {
    isConnected,
    isMatched,
    isWaiting,
    onlineUsers,
    messages,
    userCountry,
    partnerCountry,
    isPartnerTyping,
    connect,
    searchMatch,
    sendMessage,
    skipPartner,
    disconnect,
    startTyping,
    stopTyping,
  };
};
