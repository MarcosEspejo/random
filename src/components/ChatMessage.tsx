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
    <div className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}>
      <div className="flex flex-col max-w-[85%] sm:max-w-[75%]">
        <div
          className={`chat-bubble ${
            message.isSent ? 'chat-bubble-sent' : 'chat-bubble-received'
          }`}
        >
          <p className="text-sm md:text-base leading-relaxed break-words">{message.text}</p>
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
