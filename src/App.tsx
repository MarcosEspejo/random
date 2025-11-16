import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiUsers, FiSkipForward, FiLogOut } from 'react-icons/fi';
import { BsChatDots } from 'react-icons/bs';
import './index.css';
import ChatMessage from './components/ChatMessage';
import WaitingScreen from './components/WaitingScreen';
import WelcomeScreen from './components/WelcomeScreen';
import Header from './components/Header';
import AnimatedBackground from './components/AnimatedBackground';
import CountryFilter from './components/CountryFilter';
import { useSocket } from './hooks/useSocket';

function App() {
  // Verificar modo mantenimiento
  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'true';
  
  // Log para debug (solo en desarrollo)
  if (import.meta.env.DEV) {
    console.log('VITE_MAINTENANCE_MODE:', import.meta.env.VITE_MAINTENANCE_MODE);
    console.log('isMaintenanceMode:', isMaintenanceMode);
  }

  if (isMaintenanceMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4">
        <AnimatedBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl text-white text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            🔧
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">En Mantenimiento</h1>
          <p className="text-xl mb-6 opacity-90">
            Estamos realizando mejoras para ofrecerte una mejor experiencia.
            Volveremos pronto con nuevas características y optimizaciones.
          </p>
          <div className="bg-white/10 rounded-2xl p-6 mt-8">
            <h2 className="text-2xl font-semibold mb-4">Mientras tanto...</h2>
            <ul className="text-lg space-y-2">
              <li>✓ Estamos mejorando la estabilidad</li>
              <li>✓ Optimizando el rendimiento</li>
              <li>✓ Agregando nuevas funciones</li>
            </ul>
          </div>
          <p className="mt-8 text-sm opacity-70">
            Tiempo estimado: Pronto estaremos de vuelta
          </p>
        </motion.div>
      </div>
    );
  }
  const {
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
    setMessageReaction,
  } = useSocket();

  const [messageInput, setMessageInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showCountryFilter, setShowCountryFilter] = useState(false);
  const [replyingTo, setReplyingTo] = useState<{ id: number; text: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() && isMatched) {
      sendMessage(messageInput, replyingTo || undefined);
      setMessageInput('');
      setReplyingTo(null);
      stopTyping();
      
      // Resetear altura del textarea
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.style.height = 'auto';
      }
    }
  };

  const handleTyping = () => {
    startTyping();
    
    // Limpiar timeout anterior
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Detener typing después de 2 segundos de inactividad
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping();
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleConnect = () => {
    console.log('🟢 handleConnect llamado en App.tsx');
    console.log('🟢 Estado isConnected:', isConnected);
    connect();
  };

  if (!isConnected) {
    console.log('⚪ Mostrando WelcomeScreen');
    return <WelcomeScreen onStart={handleConnect} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-300 via-dark-200 to-dark-400 flex flex-col relative">
      <AnimatedBackground />
      <Header onlineUsers={onlineUsers} />

      <main className="flex-1 flex flex-col max-w-6xl w-full mx-auto px-4 py-6 relative z-10">
        <AnimatePresence mode="wait">
          {!isMatched && !isWaiting && (
            <motion.div
              key="search"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex items-center justify-center"
            >
              <div className="w-full max-w-4xl space-y-8 px-4">
                <div className="text-center space-y-6">
                  {/* Icon */}
                  <div className="inline-block mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-xl"></div>
                      <div className="relative bg-gradient-to-br from-cyan-500 to-cyan-600 p-6 rounded-2xl shadow-lg">
                        <BsChatDots className="text-6xl text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-3">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                      <span className="text-white">Listo para </span>
                      <span className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                        conectar
                      </span>
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500"></div>
                      <p className="text-gray-400 text-base sm:text-lg max-w-md">
                        Encuentra personas aleatorias de todo el mundo
                      </p>
                      <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500"></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-center gap-4 text-sm">
                    <div className="glass-effect rounded-lg px-4 py-2 border-cyan-500/20">
                      <div className="text-cyan-400 font-semibold">{onlineUsers}</div>
                      <div className="text-gray-500 text-xs">usuarios activos</div>
                    </div>
                    <div className="glass-effect rounded-lg px-4 py-2 border-cyan-500/20">
                      <div className="text-cyan-400 font-semibold">100%</div>
                      <div className="text-gray-500 text-xs">anónimo</div>
                    </div>
                  </div>
                </div>

                {/* Filtro de países */}
                {userCountry && (
                  <div className="space-y-4">
                    <button
                      onClick={() => setShowCountryFilter(!showCountryFilter)}
                      className="mx-auto flex items-center gap-2 text-sm glass-effect rounded-lg px-4 py-2.5 text-gray-300 border border-gray-700 hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300"
                    >
                      <FiUsers />
                      {showCountryFilter ? 'Ocultar filtro de país' : 'Filtrar por país'}
                    </button>

                    <AnimatePresence>
                      {showCountryFilter && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <CountryFilter
                            selectedCountry={selectedCountry}
                            onCountrySelect={setSelectedCountry}
                            userCountry={userCountry}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* CTA Button */}
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => searchMatch(selectedCountry || undefined)}
                    className="group relative bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white text-lg font-semibold px-10 py-4 rounded-xl inline-flex items-center gap-3 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300"
                  >
                    <FiUsers className="text-2xl group-hover:scale-110 transition-transform duration-300" />
                    <span>Buscar Conversación</span>
                    <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </motion.button>
                  
                  {selectedCountry && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-gray-500 mt-3"
                    >
                      Buscando personas de: <span className="text-cyan-400 font-medium">{selectedCountry}</span>
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {isWaiting && (
            <WaitingScreen key="waiting" />
          )}

          {isMatched && (
            <div
              key="chat"
              className="flex-1 flex flex-col space-y-4"
            >
              {/* Status Bar */}
              <div className="glass-effect rounded-xl p-3 md:p-4 flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                  <div>
                    <span className="text-xs md:text-sm font-medium text-gray-200 block">
                      Conectado con un extraño
                    </span>
                    {partnerCountry && (
                      <span className="text-xs text-cyan-400">
                        📍 {partnerCountry}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button
                    onClick={skipPartner}
                    className="btn-secondary flex items-center justify-center gap-2 text-xs md:text-sm px-3 md:px-4 py-2 flex-1 md:flex-initial"
                  >
                    <FiSkipForward />
                    <span className="hidden sm:inline">Siguiente</span>
                  </button>
                  <button
                    onClick={disconnect}
                    className="btn-danger flex items-center justify-center gap-2 text-xs md:text-sm px-3 md:px-4 py-2 flex-1 md:flex-initial"
                  >
                    <FiLogOut />
                    <span className="hidden sm:inline">Salir</span>
                  </button>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 glass-effect rounded-xl p-4 md:p-6 overflow-y-auto overflow-x-hidden min-h-[350px] md:min-h-[450px] max-h-[550px] md:max-h-[650px]">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <ChatMessage 
                      key={message.id} 
                      message={message}
                      onReact={(messageId, emoji) => {
                        setMessageReaction(messageId, emoji);
                      }}
                      onReply={(messageId, text) => {
                        setReplyingTo({ id: messageId, text });
                      }}
                    />
                  ))}
                  
                  {/* Indicador de escribiendo */}
                  {isPartnerTyping && (
                    <div className="flex justify-start">
                      <div className="bg-dark-100/80 border border-gray-800 rounded-2xl px-4 py-3">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <form
                onSubmit={handleSendMessage}
                className="glass-effect rounded-xl p-3 md:p-4"
              >
                {/* Reply preview */}
                {replyingTo && (
                  <div className="mb-2 flex items-center justify-between bg-dark-100/60 border border-cyan-500/30 rounded-lg p-2">
                    <div className="flex-1">
                      <p className="text-xs text-cyan-400 mb-0.5">Respondiendo a:</p>
                      <p className="text-sm text-gray-300 truncate">{replyingTo.text}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setReplyingTo(null)}
                      className="ml-2 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                )}
                <div className="flex gap-2 md:gap-3 items-end">
                  <textarea
                    value={messageInput}
                    onChange={(e) => {
                      setMessageInput(e.target.value);
                      
                      // Ajustar altura dinámicamente
                      e.target.style.height = '44px';
                      const newHeight = Math.min(e.target.scrollHeight, 200);
                      e.target.style.height = newHeight + 'px';
                      
                      // Notificar que está escribiendo
                      if (e.target.value.trim()) {
                        handleTyping();
                      } else {
                        stopTyping();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                    placeholder="Escribe un mensaje..."
                    className="input-field flex-1 text-sm md:text-base resize-none overflow-y-auto"
                    rows={1}
                    style={{ 
                      minHeight: '44px', 
                      maxHeight: '200px', 
                      height: '44px',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                    wrap="soft"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="btn-primary flex items-center gap-2 px-4 md:px-6 h-[44px]"
                    disabled={!messageInput.trim()}
                  >
                    <FiSend />
                    <span className="hidden sm:inline">Enviar</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>ChatAleatorio © 2025 - Conecta con el mundo</p>
      </footer>
    </div>
  );
}

export default App;
