import { Check, X } from 'lucide-react';
import { PasswordCriteria } from '@/hooks/usePasswordStrength';

interface CriteriaChecklistProps {
  criteria: PasswordCriteria;
}

interface CriteriaItemProps {
  met: boolean;
  label: string;
  delay: number;
}

const CriteriaItem = ({ met, label, delay }: CriteriaItemProps) => (
  <div 
    className="flex items-center gap-3 py-2 animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`
      flex items-center justify-center w-6 h-6 rounded border transition-all duration-300
      ${met 
        ? 'bg-success/20 border-success text-success glow-primary' 
        : 'bg-muted/20 border-muted-foreground/30 text-muted-foreground'
      }
    `}>
      {met ? (
        <Check className="w-4 h-4" />
      ) : (
        <X className="w-4 h-4" />
      )}
    </div>
    <span className={`text-sm transition-colors duration-300 ${met ? 'text-foreground' : 'text-muted-foreground'}`}>
      {label}
    </span>
  </div>
);

export const CriteriaChecklist = ({ criteria }: CriteriaChecklistProps) => {
  const items = [
    { key: 'minLength', label: 'Minimum 8 characters', met: criteria.minLength },
    { key: 'hasUppercase', label: 'At least one uppercase letter (A-Z)', met: criteria.hasUppercase },
    { key: 'hasLowercase', label: 'At least one lowercase letter (a-z)', met: criteria.hasLowercase },
    { key: 'hasNumber', label: 'At least one number (0-9)', met: criteria.hasNumber },
    { key: 'hasSpecial', label: 'At least one special character (!@#$%)', met: criteria.hasSpecial },
  ];

  return (
    <div className="space-y-1">
      <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-3">
        Security Criteria
      </h3>
      {items.map((item, index) => (
        <CriteriaItem 
          key={item.key} 
          met={item.met} 
          label={item.label} 
          delay={index * 50}
        />
      ))}
    </div>
  );
};
