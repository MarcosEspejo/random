import { FiMessageCircle, FiGlobe, FiZap } from 'react-icons/fi';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const handleStart = () => {
    console.log('🔵 Botón clickeado en WelcomeScreen');
    console.log('🔵 Llamando a onStart()...');
    try {
      onStart();
      console.log('✅ onStart() ejecutado exitosamente');
    } catch (error) {
      console.error('❌ Error al ejecutar onStart():', error);
    }
  };

  const features = [
    {
      icon: <FiMessageCircle className="text-3xl" />,
      title: 'Chat Anónimo',
      description: 'Conversaciones sin registro, completamente anónimas',
    },
    {
      icon: <FiGlobe className="text-3xl" />,
      title: 'Conexiones Globales',
      description: 'Conoce personas de todo el mundo al instante',
    },
    {
      icon: <FiZap className="text-3xl" />,
      title: 'Rápido y Simple',
      description: 'Un clic para empezar a chatear sin complicaciones',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-300 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {/* Floating dots */}
        <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <div className="absolute top-[60%] left-[15%] w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse delay-150" />
        <div className="absolute top-[40%] right-[20%] w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-[30%] right-[10%] w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse delay-500" />
        <div className="absolute top-[15%] right-[30%] w-1 h-1 bg-cyan-300 rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-[20%] left-[25%] w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
        
        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <line x1="10%" y1="25%" x2="40%" y2="25%" stroke="url(#lineGradient1)" strokeWidth="1">
            <animate attributeName="x1" values="10%;15%;10%" dur="8s" repeatCount="indefinite" />
            <animate attributeName="x2" values="40%;50%;40%" dur="8s" repeatCount="indefinite" />
          </line>
          
          <line x1="60%" y1="70%" x2="90%" y2="70%" stroke="url(#lineGradient1)" strokeWidth="1">
            <animate attributeName="x1" values="60%;55%;60%" dur="10s" repeatCount="indefinite" />
            <animate attributeName="x2" values="90%;95%;90%" dur="10s" repeatCount="indefinite" />
          </line>
          
          <line x1="20%" y1="80%" x2="35%" y2="80%" stroke="url(#lineGradient1)" strokeWidth="0.5">
            <animate attributeName="x1" values="20%;25%;20%" dur="12s" repeatCount="indefinite" />
            <animate attributeName="x2" values="35%;40%;35%" dur="12s" repeatCount="indefinite" />
          </line>
          
          <line x1="70%" y1="30%" x2="85%" y2="30%" stroke="url(#lineGradient1)" strokeWidth="0.5">
            <animate attributeName="x1" values="70%;65%;70%" dur="9s" repeatCount="indefinite" />
            <animate attributeName="x2" values="85%;90%;85%" dur="9s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center space-y-5 md:space-y-12">
          {/* Logo/Title */}
          <div className="space-y-2 md:space-y-4 mt-4 md:mt-0">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-2 md:mb-3 tracking-tight">
              <span className="inline-block">Chat</span>
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent inline-block">Aleatorio</span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500"></div>
              <p className="text-base sm:text-lg md:text-xl font-light">
                Conecta con personas de todo el mundo
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500"></div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6 px-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-effect rounded-lg p-3 md:p-6 text-center space-y-1.5 md:space-y-3 hover:border-gray-700 transition-colors duration-200"
              >
                <div className="text-accent-primary flex justify-center text-2xl md:text-3xl">
                  {feature.icon}
                </div>
                <h3 className="text-xs md:text-lg font-medium text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-[10px] md:text-sm font-light hidden md:block">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div>
            <button
              type="button"
              onClick={handleStart}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white text-base md:text-lg font-semibold px-10 md:px-12 py-4 md:py-5 rounded-xl inline-flex items-center gap-2 md:gap-3 shadow-md transition-colors duration-200 cursor-pointer"
            >
              <FiMessageCircle className="text-xl md:text-2xl" />
              <span>Comenzar a Chatear</span>
            </button>
          </div>

          {/* Info */}
          <div className="glass-effect rounded-lg p-3 md:p-4 max-w-2xl mx-auto border-gray-800">
            <p className="text-xs md:text-sm text-gray-400 font-light">
              🔒 Tu privacidad es importante. No guardamos ninguna información
              personal. Los chats son temporales y anónimos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
