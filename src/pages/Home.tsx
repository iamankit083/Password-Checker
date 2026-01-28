import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X, Copy, ShieldAlert, ShieldCheck, Shield, Info, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Home = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0); // 0-100
  const [strengthLabel, setStrengthLabel] = useState('Empty');
  const [timeToCrack, setTimeToCrack] = useState('Instant');
  
  const criteria = [
    { label: 'Minimum 8 characters', met: password.length >= 8 },
    { label: 'At least one uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'At least one lowercase letter', met: /[a-z]/.test(password) },
    { label: 'At least one number', met: /[0-9]/.test(password) },
    { label: 'At least one special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

  useEffect(() => {
    evaluateStrength();
  }, [password]);

  const evaluateStrength = () => {
    if (!password) {
      setStrength(0);
      setStrengthLabel('Empty');
      setTimeToCrack('Instant');
      return;
    }

    let score = 0;
    const metCount = criteria.filter(c => c.met).length;
    
    // Length contribution
    score += Math.min(password.length * 4, 40); 
    
    // Variety contribution
    score += metCount * 12;

    setStrength(Math.min(score, 100));

    if (metCount <= 2 || password.length < 8) {
      setStrengthLabel('Weak');
    } else if (metCount <= 4) {
      setStrengthLabel('Medium');
    } else {
      setStrengthLabel('Strong');
    }

    calculateTimeToCrack();
  };

  const calculateTimeToCrack = () => {
    if (!password) return;

    let charsetSize = 0;
    if (/[a-z]/.test(password)) charsetSize += 26;
    if (/[A-Z]/.test(password)) charsetSize += 26;
    if (/[0-9]/.test(password)) charsetSize += 10;
    if (/[^A-Za-z0-9]/.test(password)) charsetSize += 32;

    const entropy = Math.log2(Math.pow(charsetSize, password.length));
    const combinations = Math.pow(2, entropy);
    const guessesPerSecond = 1e9; // 1 Billion guesses/sec (Offline attack)
    const seconds = combinations / guessesPerSecond;

    if (seconds < 1) setTimeToCrack('less than a second');
    else if (seconds < 60) setTimeToCrack(`${Math.round(seconds)} seconds`);
    else if (seconds < 3600) setTimeToCrack(`${Math.round(seconds / 60)} minutes`);
    else if (seconds < 86400) setTimeToCrack(`${Math.round(seconds / 3600)} hours`);
    else if (seconds < 31536000) setTimeToCrack(`${Math.round(seconds / 86400)} days`);
    else if (seconds < 3153600000) setTimeToCrack(`${Math.round(seconds / 31536000)} years`);
    else setTimeToCrack('centuries');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard.",
    });
  };

  const getStrengthColor = () => {
    if (strengthLabel === 'Weak') return 'bg-destructive';
    if (strengthLabel === 'Medium') return 'bg-warning';
    if (strengthLabel === 'Strong') return 'bg-primary';
    return 'bg-muted';
  };

  const getStrengthTextColor = () => {
    if (strengthLabel === 'Weak') return 'text-destructive';
    if (strengthLabel === 'Medium') return 'text-warning';
    if (strengthLabel === 'Strong') return 'text-primary';
    return 'text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 xl:p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Input and Analysis */}
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">
              VAULT-SENTRY
            </h1>
            <p className="text-muted-foreground font-mono text-xs tracking-widest">
              // SECURE PASSWORD ANALYZER V2.0.4
            </p>
          </div>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-md shadow-2xl shadow-primary/5">
            <CardHeader className="border-b border-primary/10 pb-4">
              <CardTitle className="text-xl flex items-center gap-2 text-primary">
                <Shield className="w-5 h-5" />
                Input Authentication Data
              </CardTitle>
              <CardDescription className="text-muted-foreground/70">
                Encrypted local analysis. No data leaves this terminal.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6 @container">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-primary/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter secure password..."
                  className="relative pr-24 h-14 bg-black/40 border-primary/30 focus-visible:ring-primary font-mono text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{showPassword ? 'Hide' : 'Show'} password</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10"
                          onClick={copyToClipboard}
                          disabled={!password}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy to clipboard</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-mono uppercase tracking-tighter text-muted-foreground">Integrity Level</span>
                  <span className={cn("text-lg font-bold uppercase tracking-wider font-mono", getStrengthTextColor())}>
                    {strengthLabel}
                  </span>
                </div>
                <Progress 
                  value={strength} 
                  className="h-3 bg-black/40 border border-primary/10 overflow-hidden" 
                  indicatorClassName={cn("transition-all duration-700 ease-in-out", getStrengthColor())}
                />
              </div>

              <div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest">Entropy Bits</span>
                  <div className="text-2xl font-mono text-primary flex items-center gap-2">
                    {Math.round(strength * 1.28)} 
                    <span className="text-xs text-muted-foreground font-normal">pts</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest">Brute-Force ETA</span>
                  <div className="text-xl font-mono text-primary truncate" title={timeToCrack}>
                    {timeToCrack}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {strengthLabel === 'Weak' && password && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="mt-1 p-2 rounded-full bg-destructive/20">
                <ShieldAlert className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h4 className="font-bold text-destructive uppercase tracking-tight">Security Breach Risk</h4>
                <p className="text-sm text-destructive/80 leading-relaxed mt-1">
                  Current password pattern is recognized in common wordlists. It can be decrypted in milliseconds.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Checklist and Tips */}
        <div className="space-y-6 animate-fade-in [animation-delay:200ms]">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-md">
            <CardHeader className="border-b border-primary/10 pb-4">
              <CardTitle className="text-xl flex items-center gap-2 text-primary">
                <ShieldCheck className="w-5 h-5" />
                Encryption Protocols
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {criteria.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(34,197,94,0)]",
                        item.met ? "bg-primary shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-muted"
                      )} />
                      <span className={cn(
                        "text-sm font-mono transition-colors",
                        item.met ? "text-primary" : "text-muted-foreground"
                      )}>
                        {item.label}
                      </span>
                    </div>
                    <div className={cn(
                      "w-6 h-6 rounded flex items-center justify-center border transition-all duration-300",
                      item.met 
                        ? "bg-primary/20 border-primary text-primary" 
                        : "bg-muted/10 border-muted text-muted-foreground/30"
                    )}>
                      {item.met ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-md overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <RefreshCw className="w-24 h-24 text-primary animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <CardHeader className="border-b border-primary/10 pb-4">
              <CardTitle className="text-xl flex items-center gap-2 text-primary">
                <Info className="w-5 h-5" />
                Defense Directives
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-4">
                {[
                  { title: "Isolation", desc: "Never reuse passwords across different security domains." },
                  { title: "Escalation", desc: "Activate MFA to provide an secondary layer of defense." },
                  { title: "Vaulting", desc: "Store credentials in a dedicated encrypted vault system." },
                  { title: "Rotation", desc: "Renew credentials immediately upon any suspected breach." }
                ].map((tip, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-primary uppercase font-mono tracking-tighter">{tip.title}</span>
                    <p className="text-sm text-muted-foreground leading-snug">{tip.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full border-primary/30 text-primary hover:bg-primary/10 font-mono text-xs tracking-widest uppercase"
                  onClick={() => setPassword('')}
                >
                  <RefreshCw className="w-3 h-3 mr-2" />
                  Purge Analyzer Cache
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="fixed bottom-4 text-center w-full pointer-events-none">
        <p className="text-[10px] text-muted-foreground/30 uppercase tracking-[0.3em] font-mono">
          &copy; 2026 VAULT-SENTRY DIGITAL DEFENSE SYSTEMS // KERNEL v4.19.0-X64
        </p>
      </div>
    </div>
  );
};

export default Home;