import { Shield, Terminal } from 'lucide-react';

export const Header = () => {
  return (
    <header className="text-center mb-10">
      <div className="inline-flex items-center justify-center gap-3 mb-4">
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 glow-primary">
          <Shield className="w-8 h-8 text-primary" />
        </div>
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-display font-bold text-primary text-glow-primary mb-3 tracking-wider">
        PASSWORD ANALYZER
      </h1>
      
      <div className="flex items-center justify-center gap-2 text-muted-foreground">
        <Terminal className="w-4 h-4" />
        <p className="text-sm tracking-widest uppercase">
          Real-time Security Assessment Tool
        </p>
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span>All analysis performed locally • No data transmitted</span>
      </div>
    </header>
  );
};
