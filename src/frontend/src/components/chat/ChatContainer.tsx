import { useState } from 'react';
import { Message } from '@/types/chat';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import QuickSuggestions from './QuickSuggestions';
import TypingIndicator from './TypingIndicator';
// 👇 IMPORTANTE: Importamos la configuración de la API
import { API_URL } from '@/config/api';

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

  const handleSendMessage = async (content: string) => {
    // 1. Mostrar mensaje del usuario inmediatamente
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setShowSuggestions(false);
    setIsTyping(true);

    try {
      // 2. CONEXIÓN REAL: Llamar al Backend
      // Usamos la variable API_URL que configuraste en api.ts
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();

      // 3. Mostrar respuesta real de Groq
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || "Lo siento, no pude procesar tu respuesta.",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Error al conectar:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "🚨 Error de conexión. Verifica que el backend esté corriendo.",
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