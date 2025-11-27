import React from 'react';
import { Terminal, Cpu, Shield, Database, Code, Zap, Radio, Brain, Lock, Wifi, Key, Battery, Globe, Server, Smartphone, Eye } from 'lucide-react';
import { Project, Skill, Testimonial, QuizQuestion } from './types';

export const PERSONAL_DETAILS = {
  name: "Avinash",
  alias: "CNNETWORK",
  email: "cnnetwork332@gmail.com",
  location: "United States (Proxy)",
  roles: [
    "Full-Stack & Neural Network Developer",
    "AI Architect",
    "Neural Engineer",
    "Digital God",
    "Cyber Alchemist",
    "Tesla Visionary",
    "Red Team Operator"
  ],
  socials: {
    telegram: "https://t.me/jioxt",
    telegramChannel: "https://t.me/cnnetworkofficial",
    github: "https://github.com/CNNETWORKS"
  },
  quotes: [
    { text: "The present is theirs; the future, for which I really worked, is mine.", author: "Nikola Tesla" },
    { text: "I don't care that they stole my idea . . I care that they don't have any of their own.", author: "Nikola Tesla" },
    { text: "Code is the only law that cannot be bribed.", author: "Avinash" },
    { text: "We don't hack computers. We hack reality.", author: "CNNETWORK" },
    { text: "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.", author: "Nikola Tesla" }
  ],
  story: {
    title: "The Red Team Incident",
    short: "Neutralized a simulated global dark web threat in 47 seconds.",
    long: "In a high-stakes cyber-defense simulation classified 'Critical', I infiltrated a mock dark web network. While standard operatives scanned for open ports, I deployed a custom neural firewall that reverse-engineered the threat vector's DNA. In seconds, the simulation was neutralized, saving virtual millions. The method remains undisclosed."
  }
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Neural Network Firewall',
    description: 'A self-adaptive security system simulating a neural interface to block intrusion attempts in real-time. Adapts to attack patterns instantly.',
    tech: ['Python', 'TensorFlow', 'React', 'Node.js'],
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
    link: '#',
    github: 'https://github.com/CNNETWORKS',
    likes: 1240
  },
  {
    id: '2',
    title: 'Quantum Ledger Core',
    description: 'Experimental blockchain visualization using quantum state algorithms for transaction validation. A glimpse into the post-encryption era.',
    tech: ['Rust', 'WebAssembly', 'Three.js'],
    category: 'Blockchain',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    link: '#',
    github: 'https://github.com/CNNETWORKS',
    likes: 892
  },
  {
    id: '3',
    title: 'OSINT Telegram Bot',
    description: 'Advanced data retrieval automation tool capable of synthesizing public data points into coherent profiles. The eye that sees all.',
    tech: ['Python', 'Telegram API', 'MongoDB'],
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    link: 'https://t.me/cnnetworkofficial',
    github: 'https://github.com/CNNETWORKS',
    likes: 2105
  },
  {
    id: '4',
    title: 'Cyberpunk Vision AR',
    description: 'Immersive AR experience filtering the real world through a neon-dystopian lens. Scan reality, see the code.',
    tech: ['A-Frame', 'React', 'WebGL'],
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1535378437327-10ff28d3092c?w=800&q=80',
    link: '#',
    github: 'https://github.com/CNNETWORKS',
    likes: 1543
  },
  {
    id: '5',
    title: 'Tesla Energy Optimizer',
    description: 'AI-driven grid management simulator inspired by Nikola Tesla\'s wireless power theories.',
    tech: ['Python', 'Keras', 'D3.js'],
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    link: '#',
    github: 'https://github.com/CNNETWORKS',
    likes: 777
  },
  {
    id: '6',
    title: 'Dark Web Crawler',
    description: 'Ethical research tool for mapping onion networks and identifying vulnerability nodes.',
    tech: ['Go', 'Tor', 'GraphDB'],
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    link: '#',
    github: 'https://github.com/CNNETWORKS',
    likes: 1337
  }
];

export const SKILLS: Skill[] = [
  { name: 'Ethical Hacking', level: 98, icon: <Shield size={20} />, category: 'Core', description: 'Penetration testing, Vulnerability assessment' },
  { name: 'Neural Networks', level: 95, icon: <Brain size={20} />, category: 'Core', description: 'Deep Learning, TensorFlow, PyTorch' },
  { name: 'Full-Stack Dev', level: 100, icon: <Code size={20} />, category: 'Core', description: 'React, Next.js, Node.js, TypeScript' },
  { name: 'Python / AI', level: 92, icon: <Cpu size={20} />, category: 'Core', description: 'Automation, ML Models, Scripting' },
  { name: 'OSINT', level: 99, icon: <Radio size={20} />, category: 'Advanced', description: 'Open Source Intelligence Gathering' },
  { name: 'Cryptography', level: 88, icon: <Lock size={20} />, category: 'Advanced', description: 'Encryption, Blockchain Security' },
  { name: 'Database Arch', level: 96, icon: <Database size={20} />, category: 'Tools', description: 'MongoDB, PostgreSQL, Redis' },
  { name: 'Quantum Comp', level: 85, icon: <Zap size={20} />, category: 'Future', description: 'Quantum Algorithms, Qiskit' },
  { name: 'Tesla Tech', level: 90, icon: <Battery size={20} />, category: 'Future', description: 'Sustainable Energy Systems' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Conner",
    role: "CTO",
    company: "Skynet Systems",
    text: "Avinash's code is so clean it feels like it was written by a machine from the future. The neural interface he built changed everything.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
  },
  {
    name: "Neo Anderson",
    role: "Lead Architect",
    company: "Matrix Corp",
    text: "He sees the code behind the world. CNNETWORK isn't just a brand, it's a statement of digital dominance.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
  },
  {
    name: "Elon M.",
    role: "CEO",
    company: "Space Exploration",
    text: "This guy actually understands what I mean when I talk about first principles. A true visionary engineer.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
  }
];

export const POWERS_LIST = [
  { name: "Advanced OSINT Retrieval", desc: "Aggregates fragmented digital footprints into a singular profile.", icon: <Eye size={18}/> },
  { name: "Neural Pattern Recognition", desc: "Identifies anomalies in code and network traffic with 99.9% accuracy.", icon: <Brain size={18}/> },
  { name: "Automated Bot Deployment", desc: "Self-replicating bot swarms for data management and analysis.", icon: <Smartphone size={18}/> },
  { name: "Crypto Vulnerability Scan", desc: "Detects weakness in smart contracts before deployment.", icon: <Shield size={18}/> },
  { name: "Social Graph Analysis", desc: "Maps connections between entities using heuristic algorithms.", icon: <Globe size={18}/> },
  { name: "Digital Footprint Tracing", desc: "Recovers lost data trails from the deep web abyss.", icon: <Server size={18}/> }
];

export const TERMINAL_COMMANDS = {
  help: "Available commands: help, scan, whoami, social, hack, clear, contact, projects, tesla, exit",
  whoami: "User: Guest | Clearance: Low | Location: Detected",
  scan: "Scanning network... [||||||||||] 100% -> No threats detected. System Secure.",
  social: "Telegram: @jioxt | Channel: @cnnetworkofficial | GitHub: CNNETWORKS",
  hack: "Initiating dummy exploit... Access Denied. Nice try.",
  contact: "Opening communication channel... Email: cnnetwork332@gmail.com",
  tesla: "Accessing Tesla Archives... 'The scientists of today think deeply instead of clearly. One must be sane to think clearly, but one can think deeply and be quite insane.'",
  exit: "Terminating session..."
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: '1', question: "What was Nikola Tesla's dream for global energy?", options: ["Coal Power", "Wireless Energy Transfer", "Nuclear Fission", "Solar Farms"], answer: 1 },
  { id: '2', question: "Which frequency is considered significant in Tesla's theories?", options: ["440 Hz", "432 Hz", "50 Hz", "60 Hz"], answer: 1 },
  { id: '3', question: "What does the 'CN' in CNNETWORK stand for?", options: ["Cyber Net", "Central Node", "Cyber Neural", "Computer Network"], answer: 2 } // Assuming Cyber Neural based on context
];