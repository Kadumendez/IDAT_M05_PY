import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { Sparkles, User } from 'lucide-react';

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

      {/* Message bubble */}
      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed',
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-md shadow-lg shadow-blue-500/20'
            : 'bg-white/[0.07] backdrop-blur-sm border border-white/10 text-foreground rounded-tl-md'
        )}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;
