import { useState } from 'react';
import { FiSmile, FiCornerUpLeft } from 'react-icons/fi';

interface ChatMessageProps {
  message: {
    id: number;
    text: string;
    isSent: boolean;
    timestamp: Date;
    reaction?: string;
    replyTo?: {
      id: number;
      text: string;
    };
  };
  onReact?: (messageId: number, emoji: string) => void;
  onReply?: (messageId: number, text: string) => void;
}

const REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

const ChatMessage = ({ message, onReact, onReply }: ChatMessageProps) => {
  const [showReactions, setShowReactions] = useState(false);

  const handleReaction = (emoji: string) => {
    if (onReact) {
      // Si el emoji ya está seleccionado, quitarlo
      if (message.reaction === emoji) {
        onReact(message.id, '');
      } else {
        onReact(message.id, emoji);
      }
    }
    setShowReactions(false);
  };

  const handleReply = () => {
    if (onReply) {
      onReply(message.id, message.text);
    }
  };

  return (
    <>
      <div className={`w-full flex ${message.isSent ? 'justify-end' : 'justify-start'} px-2 py-1`}>
        <div className="flex flex-col max-w-[85%] sm:max-w-[75%] min-w-0 relative">
          {/* Replied message preview */}
          {message.replyTo && (
            <div className={`mb-1.5 px-3 py-2 rounded-lg border-l-2 ${
              message.isSent 
                ? 'bg-cyan-600/20 border-cyan-400' 
                : 'bg-dark-100/60 border-gray-600'
            }`}>
              <p className="text-xs text-gray-400 mb-0.5">Respondiendo a:</p>
              <p className="text-xs text-gray-300 truncate">{message.replyTo.text}</p>
            </div>
          )}
          
          {/* Message bubble */}
          <div className="relative group">
            <div
              className={`chat-bubble ${
                message.isSent ? 'chat-bubble-sent' : 'chat-bubble-received'
              } relative`}
            >
              <p className="text-sm md:text-base leading-relaxed break-words whitespace-pre-wrap">{message.text}</p>
            </div>
            
            {/* Reaction on message - clickeable to remove */}
            {message.reaction && (
              <button
                onClick={() => handleReaction(message.reaction!)}
                className={`absolute -bottom-2 ${message.isSent ? 'left-2' : 'right-2'} bg-dark-200 hover:bg-dark-300 border border-gray-700 rounded-full px-2 py-0.5 text-sm shadow-md transition-colors active:scale-95 z-10`}
                title="Clic para quitar reacción"
              >
                {message.reaction}
              </button>
            )}

            {/* Action buttons - visible below message on mobile, hover on desktop */}
            <div className={`flex gap-2 mt-1 md:absolute md:top-1/2 md:-translate-y-1/2 md:mt-0 ${
              message.isSent ? 'justify-end md:justify-start md:-left-20' : 'justify-start md:justify-end md:-right-20'
            } md:opacity-0 md:group-hover:opacity-100 transition-opacity`}>
              <button
                onClick={() => setShowReactions(!showReactions)}
                className="bg-dark-100 hover:bg-dark-200 active:bg-dark-300 border border-gray-700 rounded-full p-1.5 md:p-2 transition-colors shadow-sm"
                title="Reaccionar"
              >
                <FiSmile className="text-sm md:text-base text-gray-400" />
              </button>
              {!message.isSent && (
                <button
                  onClick={handleReply}
                  className="bg-dark-100 hover:bg-dark-200 active:bg-dark-300 border border-gray-700 rounded-full p-1.5 md:p-2 transition-colors shadow-sm"
                  title="Responder"
                >
                  <FiCornerUpLeft className="text-sm md:text-base text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Timestamp */}
          <span className={`text-xs text-gray-500 mt-1 px-2 ${
            message.isSent ? 'text-right' : 'text-left'
          }`}>
            {message.timestamp.toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>

      {/* Reactions picker - animated dropdown */}
      {showReactions && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setShowReactions(false)}
          />
          
          {/* Reactions panel */}
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 md:relative md:bottom-auto md:left-auto md:translate-x-0 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="bg-dark-100 border border-gray-700 rounded-2xl p-3 md:p-4 shadow-2xl">
              <p className="text-center text-xs md:text-sm text-gray-400 mb-2 md:mb-3">
                {message.reaction ? 'Cambiar reacción' : 'Reaccionar'}
              </p>
              <div className="flex gap-2 md:gap-3 justify-center">
                {REACTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleReaction(emoji)}
                    className={`hover:bg-dark-200 active:bg-dark-300 active:scale-95 rounded-xl p-2 md:p-3 text-xl md:text-2xl transition-all touch-manipulation hover:scale-110 ${
                      message.reaction === emoji ? 'bg-dark-200 ring-2 ring-cyan-500' : ''
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChatMessage;
