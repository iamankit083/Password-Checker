import { Clock, AlertTriangle, Shield } from 'lucide-react';
import { StrengthLevel } from '@/hooks/usePasswordStrength';

interface TimeToCrackProps {
  time: string;
  level: StrengthLevel;
}

export const TimeToCrack = ({ time, level }: TimeToCrackProps) => {
  const getIcon = () => {
    switch (level) {
      case 'weak':
        return <AlertTriangle className="w-6 h-6 text-destructive animate-pulse" />;
      case 'strong':
        return <Shield className="w-6 h-6 text-success" />;
      default:
        return <Clock className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getBorderClass = () => {
    switch (level) {
      case 'weak':
        return 'border-destructive/50';
      case 'medium':
        return 'border-warning/50';
      case 'strong':
        return 'border-success/50';
      default:
        return 'border-border';
    }
  };

  const isInstant = time === 'Instantly';
  const isSecure = level === 'strong';

  return (
    <div className={`p-4 rounded-lg border ${getBorderClass()} bg-card/50 transition-all duration-300`}>
      <div className="flex items-center gap-3 mb-2">
        {getIcon()}
        <span className="text-sm text-muted-foreground uppercase tracking-widest">
          Estimated Time to Crack
        </span>
      </div>
      
      <div className="pl-9">
        <span className={`text-2xl font-display font-bold tracking-wider ${
          isInstant ? 'text-destructive' : isSecure ? 'text-success text-glow-primary' : 'text-foreground'
        }`}>
          {time}
        </span>
        
        {isInstant && (
          <p className="mt-2 text-sm text-destructive/80">
            ⚠️ This password can be cracked almost instantly by modern hardware!
          </p>
        )}
        
        {isSecure && (
          <p className="mt-2 text-sm text-success/80">
            ✓ This password would take significant time to crack via brute force.
          </p>
        )}
      </div>
    </div>
  );
};
