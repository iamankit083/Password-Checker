import { Lightbulb, Terminal } from 'lucide-react';

interface SecurityTipsProps {
  tips: string[];
}

export const SecurityTips = ({ tips }: SecurityTipsProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-secondary">
        <Lightbulb className="w-5 h-5" />
        <h3 className="text-sm uppercase tracking-widest">
          Security Recommendations
        </h3>
      </div>
      
      <div className="space-y-2">
        {tips.map((tip, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 p-3 bg-muted/30 rounded border border-border/50 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Terminal className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
