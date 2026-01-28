import { StrengthLevel } from '@/hooks/usePasswordStrength';

interface StrengthMeterProps {
  level: StrengthLevel;
  percentage: number;
}

export const StrengthMeter = ({ level, percentage }: StrengthMeterProps) => {
  const getColorClass = () => {
    switch (level) {
      case 'weak':
        return 'bg-destructive';
      case 'medium':
        return 'bg-warning';
      case 'strong':
        return 'bg-success';
      default:
        return 'bg-muted';
    }
  };

  const getGlowClass = () => {
    switch (level) {
      case 'weak':
        return 'glow-destructive';
      case 'medium':
        return 'glow-warning';
      case 'strong':
        return 'glow-primary';
      default:
        return '';
    }
  };

  const getLabelText = () => {
    switch (level) {
      case 'weak':
        return 'WEAK';
      case 'medium':
        return 'MEDIUM';
      case 'strong':
        return 'STRONG';
      default:
        return 'AWAITING INPUT';
    }
  };

  const getLabelColor = () => {
    switch (level) {
      case 'weak':
        return 'text-destructive';
      case 'medium':
        return 'text-warning';
      case 'strong':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground uppercase tracking-widest">
          Password Strength
        </span>
        <span className={`text-sm font-bold uppercase tracking-widest ${getLabelColor()}`}>
          {getLabelText()}
        </span>
      </div>
      
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out ${getColorClass()} ${percentage > 0 ? getGlowClass() : ''}`}
          style={{ width: `${percentage}%` }}
        />
        
        {/* Animated scan line */}
        {percentage > 0 && (
          <div 
            className="absolute inset-y-0 w-full opacity-30"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              animation: 'scan-horizontal 2s linear infinite',
            }}
          />
        )}
      </div>
      
      {/* Segment markers */}
      <div className="flex justify-between px-1">
        <div className={`w-1 h-1 rounded-full ${percentage >= 33 ? getColorClass() : 'bg-muted'}`} />
        <div className={`w-1 h-1 rounded-full ${percentage >= 66 ? getColorClass() : 'bg-muted'}`} />
        <div className={`w-1 h-1 rounded-full ${percentage >= 100 ? getColorClass() : 'bg-muted'}`} />
      </div>
      
      <style>{`
        @keyframes scan-horizontal {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
