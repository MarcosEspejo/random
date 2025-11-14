/**
 * Utilidades para la aplicación de chat
 */

/**
 * Genera un array de respuestas aleatorias para simular conversaciones
 */
export const getRandomResponses = (): string[] => {
  return [
    "Interesante 🤔",
    "¿De dónde eres?",
    "¡Eso suena genial!",
    "Cuéntame más sobre eso",
    "Jaja, es verdad 😄",
    "¿Y tú qué opinas?",
    "¡Qué cool! 😎",
    "No sabía eso",
    "¿En serio?",
    "Me encanta hablar de eso",
    "Totalmente de acuerdo",
    "Hmm, déjame pensar...",
    "¿Tienes algún hobby?",
    "¡Fascinante!",
    "Nunca lo había pensado así",
  ];
};

/**
 * Formatea la hora actual en formato HH:MM
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Genera un número aleatorio entre min y max
 */
export const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Simula un delay para operaciones asíncronas
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Trunca un texto si excede la longitud máxima
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Valida si un mensaje es válido (no vacío, no solo espacios)
 */
export const isValidMessage = (message: string): boolean => {
  return message.trim().length > 0;
};

/**
 * Genera un ID único basado en timestamp
 */
export const generateId = (): number => {
  return Date.now() + Math.random();
};
