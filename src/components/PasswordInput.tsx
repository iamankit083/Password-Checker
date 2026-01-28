import { useState } from 'react';
import { Eye, EyeOff, Lock, Copy, Check } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PasswordInput = ({ value, onChange }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-center">
        <div className="absolute left-4 text-primary/60">
          <Lock className="w-5 h-5" />
        </div>
        
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter password to analyze..."
          className="w-full pl-12 pr-24 py-4 bg-input border border-border rounded-lg 
                     text-foreground placeholder:text-muted-foreground
                     focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                     transition-all duration-300 font-mono text-lg tracking-wider"
          autoComplete="off"
          spellCheck={false}
        />
        
        <div className="absolute right-3 flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!value}
            className="p-2 text-muted-foreground hover:text-primary disabled:opacity-30 
                       disabled:cursor-not-allowed transition-colors duration-200"
            title="Copy password"
          >
            {copied ? (
              <Check className="w-5 h-5 text-success" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
          
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
