import { motion } from 'framer-motion';
import { FiRadio } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { TIPS } from '../config/constants';

const WaitingScreen = () => {
  const [currentTip, setCurrentTip] = useState('');

  useEffect(() => {
    setCurrentTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex items-center justify-center"
    >
      <div className="text-center space-y-8">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="inline-block"
        >
          <FiRadio className="text-6xl text-accent-primary" />
        </motion.div>

        <div className="space-y-2">
          <h3 className="text-xl font-medium text-white">Buscando conexión</h3>
          <p className="text-gray-400 font-light text-sm">Encontrando a alguien disponible</p>
        </div>

        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-accent-primary rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <div className="glass-effect rounded-lg p-4 max-w-sm mx-auto border-gray-800">
          <p className="text-sm text-gray-400 font-light">
            {currentTip}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default WaitingScreen;
