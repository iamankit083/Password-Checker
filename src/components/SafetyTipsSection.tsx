import { ShieldCheck, Key, RefreshCw, Eye, Database, Fingerprint } from 'lucide-react';

const tips = [
  {
    icon: Key,
    title: 'Use Unique Passwords',
    description: 'Never reuse passwords across different accounts. One breach can compromise all your accounts.',
  },
  {
    icon: RefreshCw,
    title: 'Change Periodically',
    description: 'Update critical passwords every 3-6 months, especially for banking and email.',
  },
  {
    icon: Eye,
    title: 'Enable 2FA',
    description: 'Two-factor authentication adds an extra layer of security beyond just your password.',
  },
  {
    icon: Database,
    title: 'Use a Password Manager',
    description: 'Store complex passwords securely and generate random passwords when needed.',
  },
  {
    icon: Fingerprint,
    title: 'Avoid Personal Info',
    description: 'Don\'t use birthdays, names, or common words that can be easily guessed.',
  },
  {
    icon: ShieldCheck,
    title: 'Check for Breaches',
    description: 'Regularly check if your email has been involved in data breaches.',
  },
];

export const SafetyTipsSection = () => {
  return (
    <div className="mt-8 pt-8 border-t border-border/50">
      <h2 className="text-lg font-display font-bold text-secondary mb-6 text-glow-secondary">
        [ PASSWORD SECURITY GUIDELINES ]
      </h2>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((tip, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg border border-border/50 bg-card/30 
                       hover:border-secondary/50 hover:bg-card/50 transition-all duration-300
                       group"
          >
            <div className="flex items-center gap-3 mb-2">
              <tip.icon className="w-5 h-5 text-secondary group-hover:text-secondary transition-colors" />
              <h3 className="text-sm font-semibold text-foreground">{tip.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {tip.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
