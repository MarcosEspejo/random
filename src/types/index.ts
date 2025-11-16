// Tipos para los mensajes y estados del chat
export interface Message {
  id: number;
  text: string;
  isSent: boolean;
  timestamp: Date;
  reaction?: string;
  replyTo?: {
    id: number;
    text: string;
  };
}

export interface ChatState {
  isConnected: boolean;
  isMatched: boolean;
  isWaiting: boolean;
  onlineUsers: number;
  messages: Message[];
}

export interface SocketHook {
  isConnected: boolean;
  isMatched: boolean;
  isWaiting: boolean;
  onlineUsers: number;
  messages: Message[];
  connect: () => void;
  searchMatch: () => void;
  sendMessage: (text: string) => void;
  skipPartner: () => void;
  disconnect: () => void;
}
