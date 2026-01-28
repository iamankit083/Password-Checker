import { useMemo } from 'react';

export interface PasswordCriteria {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export type StrengthLevel = 'none' | 'weak' | 'medium' | 'strong';

export interface PasswordStrengthResult {
  criteria: PasswordCriteria;
  score: number;
  level: StrengthLevel;
  percentage: number;
  timeToCrack: string;
  tips: string[];
}

const calculateTimeToCrack = (password: string): string => {
  if (!password) return '—';
  
  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;
  
  // Assuming 10 billion guesses per second (modern hardware)
  const guessesPerSecond = 10_000_000_000;
  const combinations = Math.pow(charsetSize, password.length);
  const seconds = combinations / guessesPerSecond / 2; // Average case
  
  if (seconds < 0.001) return 'Instantly';
  if (seconds < 1) return `${Math.round(seconds * 1000)} milliseconds`;
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000 * 100) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 31536000 * 1000) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 31536000 * 1000000) return `${Math.round(seconds / 31536000 / 1000)}k years`;
  if (seconds < 31536000 * 1000000000) return `${Math.round(seconds / 31536000 / 1000000)}M years`;
  return 'Centuries+';
};

const generateTips = (criteria: PasswordCriteria, password: string): string[] => {
  const tips: string[] = [];
  
  if (!password) {
    tips.push('Enter a password to begin analysis');
    return tips;
  }
  
  if (!criteria.minLength) {
    tips.push('Add more characters to reach 8+ length');
  }
  if (!criteria.hasUppercase) {
    tips.push('Include at least one UPPERCASE letter');
  }
  if (!criteria.hasLowercase) {
    tips.push('Include at least one lowercase letter');
  }
  if (!criteria.hasNumber) {
    tips.push('Add numbers (0-9) for complexity');
  }
  if (!criteria.hasSpecial) {
    tips.push('Use special characters (!@#$%^&*)');
  }
  
  if (tips.length === 0) {
    tips.push('Excellent! Your password is highly secure');
    if (password.length < 16) {
      tips.push('Consider making it even longer for maximum security');
    }
  }
  
  return tips;
};

export const usePasswordStrength = (password: string): PasswordStrengthResult => {
  return useMemo(() => {
    const criteria: PasswordCriteria = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^a-zA-Z0-9]/.test(password),
    };
    
    const criteriaValues = Object.values(criteria);
    const score = criteriaValues.filter(Boolean).length;
    
    let level: StrengthLevel = 'none';
    let percentage = 0;
    
    if (password.length === 0) {
      level = 'none';
      percentage = 0;
    } else if (score <= 2) {
      level = 'weak';
      percentage = 33;
    } else if (score <= 4) {
      level = 'medium';
      percentage = 66;
    } else {
      level = 'strong';
      percentage = 100;
    }
    
    return {
      criteria,
      score,
      level,
      percentage,
      timeToCrack: calculateTimeToCrack(password),
      tips: generateTips(criteria, password),
    };
  }, [password]);
};
