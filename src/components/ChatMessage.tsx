import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: {
    id: number;
    text: string;
    isSent: boolean;
    timestamp: Date;
  };
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
    >
      <div className="flex flex-col">
        <div
          className={`chat-bubble ${
            message.isSent ? 'chat-bubble-sent' : 'chat-bubble-received'
          }`}
        >
          <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1.5 px-2">
          {message.timestamp.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
