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
    <div className="min-h-screen bg-dark-300 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center space-y-12">
          {/* Logo/Title */}
          <div>
            <h1 className="text-5xl md:text-7xl font-semibold text-white mb-3 tracking-tight">
              Chat<span className="text-accent-primary">Aleatorio</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-light">
              Conecta con personas de todo el mundo
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-effect rounded-lg p-6 text-center space-y-3 hover:border-gray-700 transition-colors duration-200"
              >
                <div className="text-accent-primary flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm font-light">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div>
            <button
              type="button"
              onClick={() => {
                console.log('📱 Click detectado');
                handleStart();
              }}
              onTouchEnd={(e) => {
                console.log('📱 TouchEnd detectado');
                e.preventDefault();
                e.stopPropagation();
                handleStart();
              }}
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-3 touch-manipulation active:scale-95 cursor-pointer select-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <FiMessageCircle className="text-xl" />
              Comenzar a Chatear
            </button>
          </div>

          {/* Info */}
          <div className="glass-effect rounded-lg p-4 max-w-2xl mx-auto border-gray-800">
            <p className="text-sm text-gray-400 font-light">
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
