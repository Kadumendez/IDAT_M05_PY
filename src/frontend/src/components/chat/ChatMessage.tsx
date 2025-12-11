import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { Sparkles, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // 👈 Importamos esto

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === 'user';

  return (
    <div
      className={cn(
        'flex gap-3 animate-fade-in',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div className={cn(
        'shrink-0 w-9 h-9 rounded-xl flex items-center justify-center',
        isUser
          ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20'
          : 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/20'
      )}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Sparkles className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Burbuja del Mensaje */}
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-5 py-4 text-[15px] leading-relaxed shadow-md',
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
            : 'bg-white/[0.08] border border-white/10 text-gray-100'
        )}
      >
        {/* 👇 AQUÍ ESTÁ LA MAGIA: Renderizamos Markdown */}
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="markdown-content space-y-2">
            <ReactMarkdown
              components={{
                // Estilos para negritas
                strong: ({ node, ...props }) => <span className="font-bold text-amber-400" {...props} />,
                // Estilos para listas desordenadas (puntos)
                ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1" {...props} />,
                // Estilos para listas ordenadas (números)
                ol: ({ node, ...props }) => <ol className="list-decimal pl-4 space-y-1" {...props} />,
                // Estilos para elementos de lista
                li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                // Estilos para párrafos
                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;