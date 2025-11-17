// Filtro de contenido para mensajes

// Lista de palabras ofensivas que serán censuradas
const OFFENSIVE_WORDS = [
  // Palabras muy fuertes en español
  'puta', 'puto', 'verga', 'chingada', 'pendejo', 'pendeja',
  'culero', 'culera', 'cabrón', 'cabrona', 'hijo de puta',
  'hijueputa', 'gonorrea', 'malparido', 'malparida',
  
  // Palabras fuertes en inglés
  'fuck', 'fucking', 'bitch', 'asshole', 'shit', 'cunt',
  'dick', 'pussy', 'cock', 'motherfucker',
];

// Expresiones regulares para detectar URLs
const URL_PATTERNS = [
  /https?:\/\/[^\s]+/gi,                    // http:// o https://
  /www\.[^\s]+/gi,                          // www.algo.com
  /[a-zA-Z0-9-]+\.(com|net|org|io|co|app|dev|me|tv|edu|gov|mil)[^\s]*/gi, // dominios comunes
  /[a-zA-Z0-9-]+\.vercel\.app/gi,          // Vercel apps
  /[a-zA-Z0-9-]+\.railway\.app/gi,         // Railway apps
  /bit\.ly\/[^\s]+/gi,                     // Acortadores
  /t\.me\/[^\s]+/gi,                       // Telegram
  /wa\.me\/[^\s]+/gi,                      // WhatsApp
  /discord\.gg\/[^\s]+/gi,                 // Discord invites
];

/**
 * Censura palabras ofensivas reemplazándolas con asteriscos
 */
export function censorOffensiveWords(text: string): string {
  let censoredText = text;
  
  OFFENSIVE_WORDS.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const replacement = '*'.repeat(word.length);
    censoredText = censoredText.replace(regex, replacement);
  });
  
  return censoredText;
}

/**
 * Detecta si el mensaje contiene URLs o links
 */
export function containsURL(text: string): boolean {
  return URL_PATTERNS.some(pattern => pattern.test(text));
}

/**
 * Elimina todas las URLs del texto
 */
export function removeURLs(text: string): string {
  let cleanText = text;
  
  URL_PATTERNS.forEach(pattern => {
    cleanText = cleanText.replace(pattern, '[link removido]');
  });
  
  return cleanText;
}

/**
 * Función principal para filtrar contenido de mensajes
 * Censura palabras ofensivas y elimina/bloquea URLs
 */
export function filterMessageContent(text: string): {
  isBlocked: boolean;
  filteredText: string;
  reason?: string;
} {
  // Primero verificar si contiene URLs
  if (containsURL(text)) {
    return {
      isBlocked: true,
      filteredText: text,
      reason: 'No se permiten links o URLs por seguridad. Por favor, evita compartir enlaces.'
    };
  }
  
  // Censurar palabras ofensivas
  const filteredText = censorOffensiveWords(text);
  
  return {
    isBlocked: false,
    filteredText,
  };
}

/**
 * Valida que el mensaje no esté vacío después del filtrado
 */
export function isValidMessage(text: string): boolean {
  return text.trim().length > 0 && text.trim().length <= 1000;
}
