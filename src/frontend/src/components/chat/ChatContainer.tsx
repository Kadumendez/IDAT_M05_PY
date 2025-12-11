import { useState } from 'react';
import { Message } from '@/types/chat';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import QuickSuggestions from './QuickSuggestions';
import TypingIndicator from './TypingIndicator';

const WELCOME_MESSAGE: Message = {
  id: '1',
  content:
    '¡Hola! 👋 Soy tu asistente educativo. Estoy aquí para ayudarte con información sobre becas, universidades y exámenes de admisión en Perú. ¿En qué puedo ayudarte hoy?',
  sender: 'bot',
  timestamp: new Date(),
};

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setShowSuggestions(false);
    setIsTyping(true);

    // Simular respuesta del bot
    setTimeout(() => {
      setIsTyping(false);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          'Gracias por tu pregunta. Esta es una demo de la interfaz. Pronto podré ayudarte con información detallada sobre becas PRONABEC, Beca 18, requisitos de admisión y más. ¡Estamos trabajando para brindarte la mejor orientación! 🎓',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1500);
  };

  return (
    <div className="relative flex flex-col h-screen w-full max-w-3xl mx-auto">
      {/* Header - Fixed */}
      <div className="shrink-0">
        <ChatHeader />
      </div>
      
      {/* Messages - Scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin">
        <ChatMessages messages={messages} />
        
        {isTyping && (
          <div className="px-6 pb-4">
            <TypingIndicator />
          </div>
        )}
        
        {showSuggestions && messages.length === 1 && (
          <QuickSuggestions onSelect={handleSendMessage} />
        )}
      </div>
      
      {/* Input - Fixed */}
      <div className="shrink-0">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
