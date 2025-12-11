import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-white/5"
    >
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="w-full bg-white/[0.05] hover:bg-white/[0.07] focus:bg-white/[0.07] border border-white/10 focus:border-amber-500/30 rounded-2xl px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim()}
          className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-lg shadow-amber-500/30 disabled:shadow-none transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-3">
        Orientador Vocacional puede cometer errores. Verifica la información importante.
      </p>
    </form>
  );
};

export default ChatInput;
