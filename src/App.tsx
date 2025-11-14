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
  } = useSocket();

  const [messageInput, setMessageInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showCountryFilter, setShowCountryFilter] = useState(false);
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
      sendMessage(messageInput);
      setMessageInput('');
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
              <div className="w-full max-w-4xl space-y-6">
                <div className="text-center space-y-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    <BsChatDots className="text-8xl text-accent-primary" />
                  </motion.div>
                  <h2 className="text-3xl font-bold gradient-text">
                    Listo para conocer a alguien nuevo
                  </h2>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Conecta con personas aleatorias de todo el mundo. Haz clic en el botón para comenzar.
                  </p>
                </div>

                {/* Filtro de países */}
                {userCountry && (
                  <>
                    <button
                      onClick={() => setShowCountryFilter(!showCountryFilter)}
                      className="btn-secondary mx-auto flex items-center gap-2 text-sm touch-manipulation cursor-pointer"
                    >
                      <FiUsers />
                      {showCountryFilter ? 'Ocultar filtro' : 'Filtrar por país'}
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
                  </>
                )}

                <div className="text-center">
                  <button
                    onClick={() => searchMatch(selectedCountry || undefined)}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      searchMatch(selectedCountry || undefined);
                    }}
                    className="btn-primary inline-flex items-center gap-2 touch-manipulation active:scale-95 cursor-pointer"
                  >
                    <FiUsers className="text-xl" />
                    Buscar Conversación
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {isWaiting && (
            <WaitingScreen key="waiting" />
          )}

          {isMatched && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col space-y-4"
            >
              {/* Status Bar */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-effect rounded-xl p-3 md:p-4 flex flex-col md:flex-row items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <span className="text-xs md:text-sm font-medium block">
                      Conectado con un extraño
                    </span>
                    {partnerCountry && (
                      <span className="text-xs text-accent-primary">
                        📍 {partnerCountry}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={skipPartner}
                    className="btn-secondary flex items-center justify-center gap-2 text-xs md:text-sm px-3 md:px-4 py-2 flex-1 md:flex-initial"
                  >
                    <FiSkipForward />
                    <span className="hidden sm:inline">Siguiente</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={disconnect}
                    className="btn-danger flex items-center justify-center gap-2 text-xs md:text-sm px-3 md:px-4 py-2 flex-1 md:flex-initial"
                  >
                    <FiLogOut />
                    <span className="hidden sm:inline">Salir</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Messages Container */}
              <div className="flex-1 glass-effect rounded-xl p-4 md:p-6 overflow-y-auto min-h-[350px] md:min-h-[450px] max-h-[550px] md:max-h-[650px]">
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                  </AnimatePresence>
                  
                  {/* Indicador de escribiendo */}
                  {isPartnerTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-dark-100 rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 bg-accent-primary rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-accent-primary rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-accent-primary rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <motion.form
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onSubmit={handleSendMessage}
                className="glass-effect rounded-xl p-3 md:p-4"
              >
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
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="btn-primary flex items-center gap-2 px-4 md:px-6 h-[44px]"
                    disabled={!messageInput.trim()}
                  >
                    <FiSend />
                    <span className="hidden sm:inline">Enviar</span>
                  </motion.button>
                </div>
              </motion.form>
            </motion.div>
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
