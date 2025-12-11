import { Sparkles } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl rounded-tl-md px-5 py-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
