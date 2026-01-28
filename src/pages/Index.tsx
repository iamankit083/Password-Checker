import { useState } from 'react';
import { Header } from '@/components/Header';
import { PasswordInput } from '@/components/PasswordInput';
import { StrengthMeter } from '@/components/StrengthMeter';
import { CriteriaChecklist } from '@/components/CriteriaChecklist';
import { TimeToCrack } from '@/components/TimeToCrack';
import { SecurityTips } from '@/components/SecurityTips';
import { SafetyTipsSection } from '@/components/SafetyTipsSection';
import { usePasswordStrength } from '@/hooks/usePasswordStrength';

const Index = () => {
  const [password, setPassword] = useState('');
  const strength = usePasswordStrength(password);

  return (
    <div className="min-h-screen matrix-bg scanlines">
      <div className="container max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <Header />
        
        <main className="space-y-6">
          {/* Password Input */}
          <div className="cyber-border rounded-xl p-6 bg-card/50 backdrop-blur-sm">
            <PasswordInput value={password} onChange={setPassword} />
            
            {/* Strength Meter */}
            <div className="mt-6">
              <StrengthMeter level={strength.level} percentage={strength.percentage} />
            </div>
          </div>
          
          {/* Analysis Results */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Criteria Checklist */}
            <div className="cyber-border rounded-xl p-6 bg-card/50 backdrop-blur-sm">
              <CriteriaChecklist criteria={strength.criteria} />
            </div>
            
            {/* Time to Crack & Tips */}
            <div className="space-y-6">
              <div className="cyber-border rounded-xl p-6 bg-card/50 backdrop-blur-sm">
                <TimeToCrack time={strength.timeToCrack} level={strength.level} />
              </div>
              
              <div className="cyber-border rounded-xl p-6 bg-card/50 backdrop-blur-sm">
                <SecurityTips tips={strength.tips} />
              </div>
            </div>
          </div>
          
          {/* Safety Tips Section */}
          <div className="cyber-border rounded-xl p-6 bg-card/50 backdrop-blur-sm">
            <SafetyTipsSection />
          </div>
        </main>
        
        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-xs text-muted-foreground/50 tracking-widest">
            [ SECURE • LOCAL • ENCRYPTED ]
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
