import { PROJECT_ICONS } from './project-icons';
import { PROJECT_CODE_SECTIONS } from './project-code-sections';
import { Project, ProjectKey } from '../types/types';

export const PROJECTS: Record<ProjectKey, Project> = {
  chatHub: {
    title: "ChatHub",
    shortDescription: "Intuitive real-time chat application with responsive design",
    description: "Advanced conversational AI platform featuring multiple chatbot personalities...",
    tech: ["Angular", "OpenAI", "Socket.io", "TailwindCSS"],
    githubUrl: "https://github.com/yourusername/chat-hub",
    demoUrl: "https://chat-hub-demo.vercel.app",
    icon: PROJECT_ICONS.chatHub,
    lines: PROJECT_CODE_SECTIONS.chatHub
  },
  easyTrade: {
    title: "EasyTrade",
    shortDescription: "Professional trading platform for beginners",
    description: "User-friendly cryptocurrency trading platform designed for both beginners...",
    tech: ["Angular", "D3.js", "WebSocket", "TailwindCSS"],
    githubUrl: "https://github.com/yourusername/easy-trade",
    demoUrl: "https://easy-trade-demo.vercel.app",
    icon: PROJECT_ICONS.easyTrade,
    lines: PROJECT_CODE_SECTIONS.easyTrade
  },
  techSpec: {
    title: "TechSpec",
    shortDescription: "Modern e-commerce platform for tech products",
    description: "Feature-rich e-commerce platform designed specifically for technology products...",
    tech: ["Angular", "NgRx", "Stripe", "TailwindCSS"],
    githubUrl: "https://github.com/yourusername/tech-spec",
    demoUrl: "https://tech-spec-demo.vercel.app",
    icon: PROJECT_ICONS.techSpec,
    lines: PROJECT_CODE_SECTIONS.techSpec
  }
};
