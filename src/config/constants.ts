/**
 * Constantes de configuración de la aplicación
 */

export const APP_CONFIG = {
  name: 'ChatAleatorio',
  version: '1.0.0',
  description: 'Conecta con personas aleatorias de todo el mundo',
};

export const CHAT_CONFIG = {
  maxMessageLength: 500,
  minSearchTime: 1500,
  maxSearchTime: 3000,
  minResponseTime: 1000,
  maxResponseTime: 3000,
  maxMessagesDisplayed: 100,
};

export const ANIMATION_CONFIG = {
  messageSpring: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 30,
  },
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  },
};

export const THEME = {
  colors: {
    primary: '#00d9ff',
    secondary: '#8338ec',
    tertiary: '#ff006e',
    dark: {
      50: '#1a1a2e',
      100: '#16213e',
      200: '#0f1724',
      300: '#0d1117',
      400: '#0a0e1a',
    },
  },
};

export const TIPS = [
  '💡 Sé amable y respetuoso para tener mejores conversaciones',
  '🌍 Puedes conocer personas de cualquier parte del mundo',
  '🔒 Tu privacidad está protegida, no compartimos tu información',
  '✨ Cada conversación es una nueva oportunidad de aprender',
  '🎯 Si alguien te incomoda, puedes saltar a la siguiente persona',
  '💬 Las mejores conversaciones comienzan con un buen saludo',
  '🌟 Mantén la mente abierta y disfruta de la experiencia',
];

export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  MESSAGE: 'message',
  SEARCH: 'search',
  MATCH_FOUND: 'match_found',
  PARTNER_DISCONNECTED: 'partner_disconnected',
  TYPING: 'typing',
};
