const GradientBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0b]">
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Main gradient orbs */}
      <div className="absolute -top-[300px] -left-[200px] w-[600px] h-[600px] bg-amber-500/30 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-orange-600/25 rounded-full blur-[130px]" />
      <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-red-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-200px] right-[10%] w-[500px] h-[500px] bg-amber-600/25 rounded-full blur-[140px] animate-pulse-slow" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[120px]" />
      
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
    </div>
  );
};

export default GradientBackground;
