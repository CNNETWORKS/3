import React from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  image: string;
  category: 'AI' | 'Web' | 'Security' | 'Blockchain';
  likes?: number;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon: React.ReactNode;
  category: 'Core' | 'Advanced' | 'Tools' | 'Future';
  description?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

export interface AppSettings {
  soundEnabled: boolean;
  theme: 'dark' | 'light';
  neonColor: string;
  reducedMotion: boolean;
  adminMode: boolean;
  threatLevel: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  edgyMode: boolean;
  musicPlaying: boolean;
  ecoMode: boolean;
  showScanlines: boolean;
}

export interface CryptoRate {
  coin: string;
  price: string;
  change: string;
}

export interface TerminalCommand {
  cmd: string;
  output: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number; // index
}