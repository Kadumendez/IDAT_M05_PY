

const ChatHeader = () => {
  return (
    <header className="relative px-6 py-6 border-b border-white/5">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            Orientador Vocacional
          </h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            En línea • Tu guía para becas y universidades
          </p>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
