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
  const [showOptions, setShowOptions] = useState(false);

  const handleReaction = (emoji: string) => {
    if (onReact) {
      onReact(message.id, emoji);
    }
    setShowReactions(false);
    setShowOptions(false);
  };

  const handleReply = () => {
    if (onReply) {
      onReply(message.id, message.text);
    }
    setShowOptions(false);
  };

  return (
    <div className={`flex ${message.isSent ? 'justify-end' : 'justify-start'} group relative`}>
      <div className="flex flex-col max-w-[85%] sm:max-w-[75%]">
        <div className="relative">
          {/* Replied message preview */}
          {message.replyTo && (
            <div className={`mb-1 px-3 py-2 rounded-lg border-l-2 ${
              message.isSent 
                ? 'bg-cyan-600/20 border-cyan-400' 
                : 'bg-dark-100/60 border-gray-600'
            }`}>
              <p className="text-xs text-gray-400 mb-0.5">Respondiendo a:</p>
              <p className="text-xs text-gray-300 truncate">{message.replyTo.text}</p>
            </div>
          )}
          
          {/* Message bubble */}
          <div
            className={`chat-bubble ${
              message.isSent ? 'chat-bubble-sent' : 'chat-bubble-received'
            } relative`}
          >
            <p className="text-sm md:text-base leading-relaxed break-words">{message.text}</p>
            
            {/* Reaction on message */}
            {message.reaction && (
              <div className="absolute -bottom-2 -right-1 bg-dark-200 border border-gray-700 rounded-full px-1.5 py-0.5 text-xs shadow-sm">
                {message.reaction}
              </div>
            )}
          </div>

          {/* Action buttons (hover) */}
          <div 
            className={`absolute top-0 ${
              message.isSent ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'
            } flex gap-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity`}
            onMouseEnter={() => setShowOptions(true)}
            onMouseLeave={() => {
              setTimeout(() => {
                if (!showReactions) {
                  setShowOptions(false);
                }
              }, 100);
            }}
          >
            <button
              onClick={() => setShowReactions(!showReactions)}
              onMouseDown={(e) => e.preventDefault()}
              className="bg-dark-100 hover:bg-dark-200 border border-gray-700 rounded-full p-1.5 transition-colors"
              title="Reaccionar"
            >
              <FiSmile className="text-sm text-gray-400" />
            </button>
            {!message.isSent && (
              <button
                onClick={handleReply}
                onMouseDown={(e) => e.preventDefault()}
                className="bg-dark-100 hover:bg-dark-200 border border-gray-700 rounded-full p-1.5 transition-colors"
                title="Responder"
              >
                <FiCornerUpLeft className="text-sm text-gray-400" />
              </button>
            )}
          </div>

          {/* Reactions picker */}
          {showReactions && (
            <div 
              className={`fixed md:absolute top-auto md:top-0 bottom-20 md:bottom-auto left-1/2 md:left-auto md:right-auto -translate-x-1/2 md:translate-x-0 ${
                message.isSent ? 'md:left-0 md:-translate-x-full md:-translate-y-full' : 'md:right-0 md:translate-x-full md:-translate-y-full'
              } bg-dark-100 border border-gray-700 rounded-lg p-3 shadow-xl flex gap-2 z-50`}
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => {
                setShowReactions(false);
                setShowOptions(false);
              }}
            >
              {REACTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(emoji)}
                  onMouseDown={(e) => e.preventDefault()}
                  className="hover:bg-dark-200 active:bg-dark-300 rounded-lg px-3 py-2 text-xl md:text-lg transition-colors touch-manipulation"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

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
  );
};

export default ChatMessage;
