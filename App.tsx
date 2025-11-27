import React, { useState, useEffect, useRef, useCallback, useReducer } from 'react';
import { 
  Github, Send, Sun, Moon, Volume2, VolumeX, 
  Terminal, Shield, Zap, Code, Database, Brain, Menu, X, 
  MapPin, Mail, ExternalLink, Download, MessageSquare, ChevronDown, 
  Radio, Battery, Wifi, Cpu, Lock, Search, Heart, Share2, 
  Play, Pause, SkipForward, AlertTriangle, User, Key, Globe,
  Settings, Monitor, Smartphone, Repeat, Shuffle, Mic, Eye, 
  CreditCard, DollarSign, Calendar, PieChart, BarChart, Activity,
  Cloud, Power, Crosshair, Award, Gift, Music, Briefcase, FileText
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import confetti from 'canvas-confetti';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart as RechartsBar, Bar } from 'recharts';
import { PERSONAL_DETAILS, PROJECTS, SKILLS, TESTIMONIALS, POWERS_LIST, TERMINAL_COMMANDS, QUIZ_QUESTIONS } from './constants';
import { Project, ChatMessage, Achievement, AppSettings, CryptoRate, QuizQuestion } from './types';

// --- SOUND ENGINE ---
const useSound = (enabled: boolean) => {
  const playHover = useCallback(() => {
    if (!enabled) return;
    const osc = new (window.AudioContext || (window as any).webkitAudioContext)().createOscillator();
    const ctx = osc.context;
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }, [enabled]);

  const playClick = useCallback(() => {
    if (!enabled) return;
    const osc = new (window.AudioContext || (window as any).webkitAudioContext)().createOscillator();
    const ctx = osc.context;
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }, [enabled]);

  return { playHover, playClick };
};

// --- COMPONENTS ---

const GlitchText = ({ text, className = "", intensity = "high" }: { text: string; className?: string, intensity?: "low" | "high" }) => (
  <div className={`relative inline-block group ${className}`}>
    <span className="relative z-10">{text}</span>
    <span className={`absolute top-0 left-0 -z-10 w-full h-full text-cyan-400 opacity-0 group-hover:opacity-70 ${intensity === 'high' ? 'animate-pulse translate-x-[2px]' : ''}`}>{text}</span>
    <span className={`absolute top-0 left-0 -z-10 w-full h-full text-pink-500 opacity-0 group-hover:opacity-70 ${intensity === 'high' ? 'animate-pulse -translate-x-[2px]' : ''}`}>{text}</span>
  </div>
);

const SectionHeading = ({ children, subtitle }: { children?: React.ReactNode, subtitle?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-16 text-center"
  >
    <h2 className="text-4xl md:text-6xl font-bold font-cyber bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 inline-block relative z-10 filter drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
      {children}
    </h2>
    {subtitle && <p className="text-cyan-400/60 font-code mt-4 tracking-widest uppercase text-sm">{`< ${subtitle} />`}</p>}
    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-4 rounded-full"></div>
  </motion.div>
);

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHover, setLinkHover] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setLinkHover(true);
      } else {
        setLinkHover(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: position.x - 8, y: position.y - 8, scale: clicked ? 0.8 : linkHover ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 1000, damping: 50 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-cyan-400 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        animate={{ x: position.x - 24, y: position.y - 24, scale: clicked ? 1.2 : linkHover ? 0.5 : 1, opacity: linkHover ? 0.5 : 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      />
    </>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("INITIALIZING BIOS...");
  
  useEffect(() => {
    const texts = ["LOADING KERNEL...", "MOUNTING NEURAL LACE...", "CONNECTING TO SKYNET...", "DECRYPTING IDENTITY...", "WELCOME, USER."];
    let step = 0;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        if (prev > 20 && step === 0) { setText(texts[1]); step++; }
        if (prev > 40 && step === 1) { setText(texts[2]); step++; }
        if (prev > 70 && step === 2) { setText(texts[3]); step++; }
        if (prev > 90 && step === 3) { setText(texts[4]); step++; }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center text-cyan-400 font-code cursor-none">
      <div className="w-64 mb-4 text-xs">
        <div className="flex justify-between mb-1">
          <span>{text}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-400 transition-all duration-75" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className="absolute bottom-10 text-[10px] text-gray-600">
        CNNETWORK OS v9.0.1 // SECURE BOOT
      </div>
    </div>
  );
};

const CryptoTicker = ({ settings }: { settings: AppSettings }) => {
  const rates: CryptoRate[] = [
    { coin: 'BTC', price: '$94,231', change: '+2.4%' },
    { coin: 'ETH', price: '$4,120', change: '+1.1%' },
    { coin: 'SOL', price: '$145', change: '-0.5%' },
    { coin: 'DOGE', price: '$0.32', change: '+5.0%' },
    { coin: 'TSLA', price: '$342', change: '+1.2%' } 
  ];

  if (!settings.showScanlines) return null; // Using this as toggle for top bar info

  return (
    <div className="bg-black/90 border-b border-white/5 overflow-hidden py-1 flex z-50 fixed top-0 w-full">
      <div className="whitespace-nowrap animate-marquee flex gap-8">
        {[...rates, ...rates, ...rates, ...rates].map((r, i) => (
          <div key={i} className="inline-flex items-center gap-2 text-[10px] font-code">
            <span className="text-gray-400">{r.coin}</span>
            <span className="text-white">{r.price}</span>
            <span className={r.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>{r.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TerminalBlock = ({ onUnlock }: { onUnlock: () => void }) => {
  const [history, setHistory] = useState<string[]>(["Welcome to CNNETWORK Terminal v2.1", "Type 'help' for commands."]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const cmd = input.toLowerCase().trim();
    let response = (TERMINAL_COMMANDS as any)[cmd];
    
    if (cmd === 'clear') {
      setHistory([]);
      setInput("");
      return;
    }

    if (!response) response = `Command not found: ${cmd}`;
    if (cmd === 'hack') onUnlock();

    setHistory(prev => [...prev, `> ${input}`, response]);
    setInput("");
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <div className="w-full h-full bg-black/90 font-code text-sm flex flex-col">
      <div className="bg-gray-900 px-4 py-2 flex items-center gap-2 border-b border-gray-800">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-gray-500 text-xs">root@cnnetwork:~</span>
      </div>
      <div className="p-4 flex-1 overflow-y-auto text-green-400 scrollbar-thin">
        {history.map((line, i) => (
          <div key={i} className="mb-1 opacity-90 break-words">{line}</div>
        ))}
        <div ref={endRef}></div>
        <form onSubmit={handleCommand} className="flex gap-2 mt-2">
          <span className="text-cyan-400">$</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

const MusicWidget = ({ isPlaying, toggle }: { isPlaying: boolean, toggle: () => void }) => {
  return (
    <div className="fixed bottom-24 left-6 z-40 hidden lg:flex items-center gap-4 p-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-full pr-6 hover:border-cyan-500/50 transition-colors group">
      <div className={`w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
        <Radio size={16} className="text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-gray-400 font-code uppercase tracking-wider">Cyber Radio</span>
        <span className="text-xs font-bold text-white w-24 truncate">Synthwave Mix</span>
      </div>
      <button onClick={toggle} className="text-cyan-400 hover:text-white">
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>
      {isPlaying && (
        <div className="flex gap-1 items-end h-4">
          <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-cyan-400" />
          <motion.div animate={{ height: [6, 16, 6] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-purple-400" />
          <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-pink-400" />
        </div>
      )}
    </div>
  );
};

const AdminPanel = ({ isOpen, onClose, settings, updateSettings }: any) => {
  if (!isOpen) return null;
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="fixed inset-0 z-[10001] bg-black/90 backdrop-blur-lg flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-900 border border-red-500/50 rounded-xl p-8 shadow-[0_0_50px_rgba(255,0,0,0.2)]">
        <div className="flex justify-between items-center mb-8 border-b border-red-500/30 pb-4">
           <h2 className="text-2xl font-cyber text-red-500 flex items-center gap-2"><Lock /> ADMIN CONSOLE // RESTRICTED</h2>
           <button onClick={onClose}><X className="text-red-500" /></button>
        </div>
        <div className="grid grid-cols-2 gap-8">
           <div className="space-y-4">
              <h3 className="text-red-400 font-code text-sm uppercase">Threat Level</h3>
              <div className="flex gap-2">
                {['LOW', 'MED', 'HIGH', 'CRITICAL'].map(level => (
                  <button 
                    key={level} 
                    onClick={() => updateSettings({ ...settings, threatLevel: level })}
                    className={`px-3 py-1 rounded text-xs font-bold ${settings.threatLevel === level ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
           </div>
           <div className="space-y-4">
              <h3 className="text-red-400 font-code text-sm uppercase">System Override</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={settings.edgyMode} onChange={e => updateSettings({...settings, edgyMode: e.target.checked})} />
                  Enable Edgy Mode
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={settings.soundEnabled} onChange={e => updateSettings({...settings, soundEnabled: e.target.checked})} />
                  Audio System
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={settings.showScanlines} onChange={e => updateSettings({...settings, showScanlines: e.target.checked})} />
                  CRT Scanlines
                </label>
              </div>
           </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-800 text-xs text-gray-500 font-code">
          SESSION ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
        </div>
      </div>
    </motion.div>
  );
}

// --- MAIN APP ---

function App() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<AppSettings>({
    soundEnabled: true,
    theme: 'dark',
    neonColor: '#00FFFF',
    reducedMotion: false,
    adminMode: false,
    threatLevel: 'LOW',
    edgyMode: false,
    musicPlaying: false,
    ecoMode: false,
    showScanlines: true
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: '1', title: "The Visitor", description: "Accessed the network.", icon: <Globe size={16}/>, unlocked: true },
    { id: '2', title: "Konami Code", description: "Hacked the matrix.", icon: <Code size={16}/>, unlocked: false },
    { id: '3', title: "Tesla Fan", description: "Found the hidden philosophy.", icon: <Battery size={16}/>, unlocked: false },
    { id: '4', title: "Admin Access", description: "Breached the mainframe.", icon: <Lock size={16}/>, unlocked: false }
  ]);
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'alert'} | null>(null);
  
  // Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([{ id: '0', text: "Greetings. I am CN Assistant. Ask me about Avinash's skills, projects, or secrets.", sender: 'bot', timestamp: Date.now() }]);
  const [chatInput, setChatInput] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const { playHover, playClick } = useSound(settings.soundEnabled);

  // Konami Code Listener
  useEffect(() => {
    const keys: string[] = [];
    const konami = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";
    const handler = (e: KeyboardEvent) => {
      keys.push(e.key);
      keys.splice(-konami.length - 1, keys.length - konami.length);
      if (keys.join('').includes(konami)) {
        unlockAchievement('2');
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#00FFFF', '#FF00AA'] });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const unlockAchievement = (id: string) => {
    setAchievements(prev => {
      const idx = prev.findIndex(a => a.id === id);
      if (idx !== -1 && !prev[idx].unlocked) {
        const newArr = [...prev];
        newArr[idx].unlocked = true;
        setToast({ msg: `Achievement Unlocked: ${newArr[idx].title}`, type: 'success' });
        setTimeout(() => setToast(null), 3000);
        return newArr;
      }
      return prev;
    });
  };

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), text: chatInput, sender: 'user', timestamp: Date.now() };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");

    setTimeout(() => {
      let response = "I cannot process that request. Try asking about 'Skills', 'Tesla', or 'Red Team'.";
      const lower = userMsg.text.toLowerCase();
      
      if (lower.includes('skills')) response = "Avinash is an expert in Full-Stack Dev, Ethical Hacking, and Neural Networks. He also has a deep interest in Quantum Computing.";
      if (lower.includes('tesla')) {
        response = "Nikola Tesla is the core inspiration. 'The present is theirs; the future is mine.'";
        unlockAchievement('3');
      }
      if (lower.includes('red team') || lower.includes('story')) response = "Ah, the incident. Avinash neutralized a dark web simulation in 47 seconds using a custom neural firewall. Legendary.";
      if (lower.includes('contact')) response = `Email: ${PERSONAL_DETAILS.email}. Telegram: @jioxt.`;
      if (lower.includes('admin')) response = "Admin access requires the master key. Try clicking the logo 7 times.";
      
      setChatMessages(prev => [...prev, { id: Date.now().toString(), text: response, sender: 'bot', timestamp: Date.now() }]);
    }, 800);
  };

  const handleAdminTrigger = () => {
    // Logic for 7 clicks
    if (settings.adminMode) return;
    setSettings(prev => ({ ...prev, adminMode: true }));
    unlockAchievement('4');
  }

  if (loading) return <Preloader onComplete={() => setLoading(false)} />;

  return (
    <div className={`min-h-screen bg-black text-white relative overflow-x-hidden ${settings.theme === 'light' ? 'bg-gray-100 text-black' : ''}`}>
      <CustomCursor />
      
      {/* --- OVERLAYS --- */}
      <div className="fixed top-0 left-0 w-full h-1 z-[9999] bg-gray-800"><motion.div className="h-full bg-gradient-to-r from-cyan-400 to-pink-500 origin-left" style={{ scaleX }} /></div>
      {settings.showScanlines && <div className="scanlines"></div>}
      <CryptoTicker settings={settings} />

      {/* --- ADMIN MODAL --- */}
      <AdminPanel 
        isOpen={settings.adminMode} 
        onClose={() => setSettings(p => ({...p, adminMode: false}))} 
        settings={settings} 
        updateSettings={setSettings} 
      />

      {/* --- TOAST --- */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[10000] px-6 py-3 bg-black/90 border border-cyan-500 rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.3)] flex items-center gap-3"
          >
            {toast.type === 'success' ? <Zap className="text-yellow-400" /> : <AlertTriangle className="text-red-500" />}
            <span className="font-code text-sm">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-8 left-0 w-full z-40 px-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto bg-black/50 backdrop-blur-md rounded-full px-6 py-3 border border-white/10 shadow-2xl">
          <div 
            className="flex items-center gap-3 group cursor-pointer" 
            onClick={() => {
              // Quick mock for 7 clicks logic
              (window as any).logoClicks = ((window as any).logoClicks || 0) + 1;
              if ((window as any).logoClicks === 7) handleAdminTrigger();
            }}
            onMouseEnter={playHover}
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-cyan-500 rounded-full blur animate-pulse"></div>
              <div className="relative bg-black rounded-full w-full h-full flex items-center justify-center font-bold font-cyber text-cyan-400 text-xs border border-cyan-500">CN</div>
            </div>
            <span className="font-cyber font-bold tracking-widest hidden md:block">NETWORK</span>
          </div>

          <div className="hidden md:flex gap-8 text-xs font-code uppercase tracking-wider text-gray-400">
            {['About', 'Services', 'Skills', 'Projects', 'Contact'].map(item => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onMouseEnter={playHover}
                className="hover:text-cyan-400 transition-colors relative group"
              >
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden lg:flex items-center gap-2 text-[10px] font-code text-gray-500 bg-white/5 px-2 py-1 rounded">
               <Wifi size={10} className="text-green-500" />
               <span>ONLINE</span>
             </div>
             <button onClick={() => setMenuOpen(!menuOpen)} onMouseEnter={playHover} className="md:hidden p-2 text-white"><Menu /></button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center gap-8 font-cyber text-2xl backdrop-blur-xl"
          >
            <button onClick={() => setMenuOpen(false)} className="absolute top-10 right-10 text-gray-500"><X size={32} /></button>
            {['About', 'Services', 'Skills', 'Projects', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-white hover:text-cyan-400 hover:scale-110 transition-transform">
                {item.toUpperCase()}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
        {/* Particle Canvas Mock */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {[...Array(30)].map((_, i) => (
             <motion.div 
               key={i} 
               className="absolute bg-cyan-500/20 rounded-full blur-xl"
               style={{ 
                 width: Math.random() * 300 + 50, 
                 height: Math.random() * 300 + 50,
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`
               }}
               animate={{ y: [0, -100, 0], x: [0, 50, 0], opacity: [0.1, 0.3, 0.1] }}
               transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
             />
           ))}
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 border border-cyan-500/30 rounded-full bg-cyan-900/10 text-cyan-400 text-xs font-code mb-4"
            >
              <span className={`w-2 h-2 rounded-full animate-pulse ${settings.threatLevel === 'CRITICAL' ? 'bg-red-500' : 'bg-cyan-400'}`}></span>
              THREAT LEVEL: {settings.threatLevel}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tighter"
            >
              HELLO, I'M <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 filter drop-shadow-[0_0_15px_rgba(0,255,255,0.4)] glitch-wrapper">
                AVINASH
              </span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="h-8 font-code text-gray-400 text-lg md:text-xl flex items-center gap-2"
            >
              <span>{'>'}</span>
              <span className="text-white">Full-Stack & Neural Network Architect</span>
              <span className="animate-pulse text-cyan-400">_</span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="text-gray-400 max-w-lg leading-relaxed border-l-2 border-gray-700 pl-4"
            >
              Building digital empires on the backbone of Tesla's philosophy. 
              I breach boundaries, architect systems, and deploy the future.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a 
                href="#contact" 
                onMouseEnter={playHover} onClick={playClick}
                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
              >
                <Terminal size={18} /> Initialize
              </a>
              <button 
                onClick={() => setResumeOpen(true)}
                onMouseEnter={playHover}
                className="px-8 py-3 border border-white/20 hover:border-pink-500 hover:text-pink-400 rounded flex items-center gap-2 transition-all hover:scale-105 group"
              >
                <Download size={18} /> Resume.enc <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
            className="relative hidden md:flex items-center justify-center perspective-1000"
          >
             <motion.div 
               whileHover={{ rotateY: 10, rotateX: -10 }}
               className="w-[400px] h-[500px] bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl relative overflow-hidden group transition-all duration-500 shadow-2xl"
             >
               <div className="absolute inset-0 flex items-center justify-center">
                 <Brain size={150} className="text-gray-800 group-hover:text-cyan-900/50 transition-colors duration-500" />
               </div>
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
               
               {/* Holographic Overlays */}
               <div className="absolute top-10 left-10 right-10 bottom-10 border border-cyan-500/20 rounded-lg flex flex-col justify-between p-6 backdrop-blur-sm">
                  <div className="flex justify-between items-start">
                    <Shield className="text-cyan-500/50" />
                    <div className="text-[10px] font-code text-cyan-500/50 flex flex-col text-right">
                      <span>ID: 8492-AX</span>
                      <span>SEC: LEVEL 9</span>
                    </div>
                  </div>
                  <div className="font-code text-xs text-center text-gray-500 mt-auto mb-4">
                     Scanning biometric data...
                  </div>
                  <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 animate-progress-indeterminate"></div>
                  </div>
               </div>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- ABOUT / STORY SECTION --- */}
      <section id="about" className="py-24 relative bg-gray-900/30">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="ORIGIN_STORY">Who Is Avinash?</SectionHeading>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="prose prose-invert">
                <p className="text-lg leading-relaxed text-gray-300">
                  I am not just a developer; I am a <span className="text-cyan-400 font-bold">digital architect</span> obsessed with the unseen mechanics of our reality. My path is illuminated by the genius of <span className="text-pink-500">Nikola Tesla</span>—believing that energy, frequency, and vibration are the keys to the universe, and by extension, the digital realm.
                </p>
              </div>

              {/* Interactive Story Card */}
              <div className="bg-black border border-red-500/30 rounded-xl overflow-hidden hover:border-red-500/80 transition-colors group">
                <div className="p-1 bg-gradient-to-r from-red-900 to-black flex items-center justify-between px-4">
                  <span className="text-xs font-code text-red-400 flex items-center gap-2"><Lock size={10}/> CLASSIFIED FILE</span>
                  <span className="text-[10px] text-red-500/50">READ_ONLY</span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold font-cyber text-white mb-4 group-hover:text-red-400 transition-colors">{PERSONAL_DETAILS.story.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 border-l-2 border-red-500/20 pl-4">
                    {PERSONAL_DETAILS.story.long}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-code text-gray-500">
                     <span>STATUS: RESOLVED</span>
                     <span>IMPACT: CRITICAL</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setQuizOpen(true)} className="p-4 bg-gray-800 rounded hover:bg-gray-700 flex items-center gap-2 text-sm">
                    <Brain className="text-pink-500" size={16}/> Take Tesla Quiz
                  </button>
                  <button onClick={() => unlockAchievement('1')} className="p-4 bg-gray-800 rounded hover:bg-gray-700 flex items-center gap-2 text-sm">
                    <Battery className="text-green-500" size={16}/> Check Energy
                  </button>
              </div>
            </div>

            {/* Stats Dashboard */}
            <div className="bg-black/50 border border-white/10 rounded-xl p-6 backdrop-blur-md">
               <div className="flex items-center justify-between mb-8">
                 <h3 className="font-cyber text-xl">System Performance</h3>
                 <div className="flex gap-2">
                   <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                   <span className="w-3 h-3 bg-yellow-500 rounded-full opacity-30"></span>
                   <span className="w-3 h-3 bg-red-500 rounded-full opacity-30"></span>
                 </div>
               </div>
               
               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      {name: 'Jan', val: 40}, {name: 'Feb', val: 30}, {name: 'Mar', val: 60}, 
                      {name: 'Apr', val: 90}, {name: 'May', val: 80}, {name: 'Jun', val: 120}
                    ]}>
                      <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#00FFFF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#333" fontSize={10} />
                      <YAxis stroke="#333" fontSize={10} />
                      <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333'}} />
                      <Area type="monotone" dataKey="val" stroke="#00FFFF" fillOpacity={1} fill="url(#colorVal)" />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
               
               <div className="grid grid-cols-3 gap-4 mt-6">
                 <div className="text-center">
                   <div className="text-2xl font-bold font-code text-white">10+</div>
                   <div className="text-[10px] text-gray-500 uppercase">Years</div>
                 </div>
                 <div className="text-center">
                   <div className="text-2xl font-bold font-code text-cyan-400">50+</div>
                   <div className="text-[10px] text-gray-500 uppercase">Deployments</div>
                 </div>
                 <div className="text-center">
                   <div className="text-2xl font-bold font-code text-pink-500">100%</div>
                   <div className="text-[10px] text-gray-500 uppercase">Uptime</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- POWERS / TERMINAL --- */}
      <section id="services" className="py-24 bg-black relative border-y border-white/5">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="ROOT_ACCESS">Powers & Utilities</SectionHeading>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="h-[400px] border border-gray-800 rounded-lg overflow-hidden shadow-2xl">
              <TerminalBlock onUnlock={() => setTerminalOpen(true)} />
            </div>
            
            <div className="grid gap-4">
              {POWERS_LIST.map((power, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                  key={idx} 
                  onMouseEnter={playHover}
                  className="bg-white/5 border border-white/5 p-4 rounded hover:bg-white/10 transition-colors flex items-center gap-4 group cursor-help"
                >
                   <div className="p-2 bg-black rounded border border-gray-800 text-cyan-500 group-hover:text-white transition-colors">
                     {power.icon}
                   </div>
                   <div>
                     <h4 className="font-bold text-sm text-gray-200 group-hover:text-cyan-400">{power.name}</h4>
                     <p className="text-xs text-gray-500 group-hover:text-gray-400">{power.desc}</p>
                   </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- PROJECTS --- */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="PORTFOLIO">Deployed Entities</SectionHeading>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((proj) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                key={proj.id} 
                className="group relative bg-gray-900 border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a href={proj.github} className="p-2 bg-white text-black rounded-full hover:scale-110 transition"><Github size={20}/></a>
                    <a href={proj.link} className="p-2 bg-cyan-500 text-black rounded-full hover:scale-110 transition"><ExternalLink size={20}/></a>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold font-cyber text-white group-hover:text-cyan-400 transition-colors">{proj.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Heart size={12} className="text-pink-500" /> {proj.likes}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-3">{proj.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map(t => (
                      <span key={t} className="text-[10px] font-code px-2 py-1 bg-white/5 rounded text-gray-300 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-24 bg-gradient-to-t from-cyan-900/10 to-black relative">
        <div className="container mx-auto px-6 max-w-4xl">
           <SectionHeading subtitle="UPLINK">Establish Connection</SectionHeading>
           
           <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
             
             <div className="grid md:grid-cols-2 gap-12 relative z-10">
               <div>
                 <h3 className="text-2xl font-bold font-cyber mb-6">Transmisson Channels</h3>
                 <div className="space-y-6">
                   <a href={`mailto:${PERSONAL_DETAILS.email}`} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                     <div className="w-10 h-10 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                       <Mail size={20} />
                     </div>
                     <div>
                       <div className="text-xs text-gray-500 uppercase">Email Protocol</div>
                       <div className="text-white font-code text-sm">{PERSONAL_DETAILS.email}</div>
                     </div>
                   </a>

                   <a href={PERSONAL_DETAILS.socials.telegram} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                     <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                       <Send size={20} />
                     </div>
                     <div>
                       <div className="text-xs text-gray-500 uppercase">Secure Chat</div>
                       <div className="text-white font-code text-sm">@jioxt</div>
                     </div>
                   </a>
                   
                   <div className="p-4 border border-dashed border-gray-700 rounded-lg text-center">
                     <p className="text-xs text-gray-500 mb-2">Location Proxy</p>
                     <div className="flex items-center justify-center gap-2 text-white font-bold">
                       <MapPin size={16} className="text-red-500" /> USA / Cyberspace
                     </div>
                   </div>
                 </div>
               </div>

               <form onSubmit={(e) => { e.preventDefault(); confetti(); setToast({msg: 'Transmission Sent Successfully.', type: 'success'}); }} className="space-y-4">
                 <div className="space-y-2">
                   <label className="text-xs text-gray-500 uppercase">Identity</label>
                   <input type="text" className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-cyan-500 outline-none transition-colors" placeholder="Enter Name" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs text-gray-500 uppercase">Frequency</label>
                   <input type="email" className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-cyan-500 outline-none transition-colors" placeholder="Enter Email" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs text-gray-500 uppercase">Payload</label>
                   <textarea rows={4} className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-cyan-500 outline-none transition-colors" placeholder="Your Message..."></textarea>
                 </div>
                 <button className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 font-bold text-white rounded hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all">
                   SEND TRANSMISSION
                 </button>
               </form>
             </div>
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 bg-black border-t border-white/5 font-code text-xs text-gray-600">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-white font-bold mb-2">CNNETWORK <span className="text-cyan-500">SYSTEMS</span></div>
            <div>© 2025 Avinash. All rights reserved.</div>
            <div className="mt-2 text-[10px]">Made with React, TensorFlow & ☕</div>
          </div>
          
          <div className="flex gap-6">
             <a href="#" className="hover:text-white transition-colors">Github</a>
             <a href="#" className="hover:text-white transition-colors">Telegram</a>
             <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>

          <div className="text-right">
            <div>Visitor ID: <span className="text-cyan-500">#8492</span></div>
            <div className="flex items-center gap-2 justify-end mt-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Systems Normal
            </div>
          </div>
        </div>
      </footer>

      {/* --- WIDGETS --- */}
      <MusicWidget isPlaying={settings.musicPlaying} toggle={() => setSettings(p => ({...p, musicPlaying: !p.musicPlaying}))} />
      
      {/* Resume Modal */}
      <AnimatePresence>
        {resumeOpen && (
          <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
             <motion.div initial={{y:50, opacity:0}} animate={{y:0, opacity:1}} exit={{y:50, opacity:0}} className="bg-gray-900 w-full max-w-lg rounded-xl border border-white/10 p-6 shadow-2xl relative">
                <button onClick={() => setResumeOpen(false)} className="absolute top-4 right-4"><X /></button>
                <h2 className="text-xl font-cyber mb-4">Export Identity</h2>
                <div className="space-y-4">
                   <div className="h-40 bg-black/50 rounded border border-dashed border-gray-700 flex items-center justify-center text-gray-500">
                      PDF Preview Generation...
                   </div>
                   <button onClick={() => { setToast({msg: 'Download Started', type: 'success'}); setResumeOpen(false); }} className="w-full py-3 bg-cyan-600 rounded text-white font-bold">Download Encrypted PDF</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quiz Modal */}
      <AnimatePresence>
        {quizOpen && (
          <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
             <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} className="bg-gray-900 w-full max-w-md rounded-xl border border-pink-500/30 p-6 shadow-2xl relative">
                <button onClick={() => setQuizOpen(false)} className="absolute top-4 right-4"><X /></button>
                <h2 className="text-xl font-cyber mb-4 text-pink-500">Tesla Aptitude Test</h2>
                <div className="space-y-4">
                   {QUIZ_QUESTIONS.map((q, i) => (
                     <div key={q.id} className="mb-4">
                        <p className="text-sm text-white mb-2">{i+1}. {q.question}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {q.options.map((opt, idx) => (
                            <button key={idx} onClick={() => { 
                               if (idx === q.answer) {
                                 setToast({msg: 'Correct!', type: 'success'});
                               } else {
                                 setToast({msg: 'Incorrect.', type: 'alert'});
                               }
                            }} className="p-2 bg-black border border-gray-700 rounded text-xs hover:border-pink-500 transition-colors text-left">
                               {opt}
                            </button>
                          ))}
                        </div>
                     </div>
                   ))}
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Chatbot Trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {chatOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-20 right-0 w-80 md:w-96 h-[500px] bg-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-4 bg-cyan-900/20 border-b border-white/10 flex justify-between items-center">
                 <span className="font-cyber text-sm font-bold text-cyan-400">CN Assistant v9.0</span>
                 <button onClick={() => setChatOpen(false)}><X size={16} /></button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-4 font-code text-xs">
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-cyan-600 text-white' : 'bg-white/10 text-gray-300 border border-white/5'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleChat} className="p-4 border-t border-white/10 bg-black/50 flex gap-2">
                <input 
                  value={chatInput} onChange={e => setChatInput(e.target.value)}
                  className="flex-1 bg-transparent border border-white/20 rounded px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none"
                  placeholder="Ask system..."
                />
                <button type="submit" className="p-2 bg-cyan-600 rounded text-white"><Send size={16} /></button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 bg-cyan-600 hover:bg-cyan-500 rounded-full shadow-[0_0_30px_rgba(0,255,255,0.4)] flex items-center justify-center text-white transition-transform hover:scale-110"
        >
          {chatOpen ? <X /> : <MessageSquare />}
        </button>
      </div>

    </div>
  );
}

export default App;