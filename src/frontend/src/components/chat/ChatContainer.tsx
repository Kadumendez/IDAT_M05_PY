import { useState } from 'react';
import { Message } from '@/types/chat';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import QuickSuggestions from './QuickSuggestions';
import TypingIndicator from './TypingIndicator';
import { API_URL } from '@/config/api';

const WELCOME_MESSAGE: Message = {
  id: '1',
  content:
    '¡Hola! 👋 Soy tu asistente educativo. Estoy aquí para ayudarte con información sobre becas y universidades en Perú. ¿Cómo te llamas y qué te gustaría estudiar?',
  sender: 'bot',
  timestamp: new Date(),
};

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleSendMessage = async (content: string) => {
    // 1. Agregar mensaje del usuario a la vista
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    // Actualizamos el estado local (para que se vea en pantalla)
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setShowSuggestions(false);
    setIsTyping(true);

    try {
      // 2. PREPARAR MEMORIA PARA LA IA
      // Convertimos el formato del frontend al formato que entiende Groq (role: 'user' | 'assistant')
      const historyForBackend = newMessages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      // 3. ENVIAR A AWS (Con historial completo)
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: historyForBackend }), // Enviamos 'history'
      });

      if (!response.ok) throw new Error('Error en el servidor');

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "😔 Perdí la conexión. Por favor intenta de nuevo.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative flex flex-col h-screen w-full max-w-3xl mx-auto">
      <div className="shrink-0"><ChatHeader /></div>
      <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin">
        <ChatMessages messages={messages} />
        {isTyping && <div className="px-6 pb-4"><TypingIndicator /></div>}
        {showSuggestions && messages.length === 1 && (
          <QuickSuggestions onSelect={handleSendMessage} />
        )}
      </div>
      <div className="shrink-0"><ChatInput onSendMessage={handleSendMessage} /></div>
    </div>
  );
};

export default ChatContainer;