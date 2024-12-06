import { PROJECT_ICONS } from './project-icons';
import { PROJECT_CODE_SECTIONS } from './project-code-sections';
import { Project, ProjectKey } from '../types/types';

export const PROJECTS: Record<ProjectKey, Project> = {
  chatHub: {
    title: "ChatHub",
    shortDescription: "Intuitive real-time chat application with responsive design",
    description: "ChatHub is a modern, responsive chat application built with Angular and Tailwind CSS. It features a sleek dark mode interface, real-time messaging, and multiple chat channels. This project is a demo/mockup showcasing modern design patterns and UI interactions.",
    features: [
      "🌗 Modern dark mode interface",
      "💬 Multiple chat channels with different topics",
      "🎨 Sleek animations and transitions",
      "😊 Emoji support",
      "📸 Image sharing capabilities",
      "📍 Message pinning functionality",
      "🔍 Real-time chat search",
      "📱 Fully responsive design",
      "⚡ Instant message responses",
      "🖥️ Expandable view mode",
    ],
    tech: [
      "Angular 18",
      "Tailwind CSS",
      "TypeScript",
      "RxJS",
    ],
    githubUrl: "https://github.com/FijolKrzysztof/chat-hub",
    demoUrl: "https://fijolkrzysztof.github.io/chat-hub",
    icon: PROJECT_ICONS.chatHub,
    lines: PROJECT_CODE_SECTIONS.chatHub
  },
  easyTrade: {
    title: "EasyTrade",
    shortDescription: "Professional trading platform for beginners",
    description: "EasyTrade is a modern, intuitive trading platform designed for beginners to learn and practice stock trading. The application features a clean interface, educational resources, and risk-free trading simulation to help users build confidence in trading mechanics and market understanding.",
    features: [
      "💰 Persistent balance and portfolio tracking",
      "🔄 Quick and intuitive stock trading",
      "📈 Interactive market charts",
      "🥧 Visual portfolio breakdown",
      "📖 Comprehensive trading guides",
      "📚 Stock market dictionary",
      "🎓 Practice portfolio simulation",
      "💡 Trading tips and strategies",
      "👥 Beginner-friendly forum",
      "👨‍🏫 Expert trader profiles",
      "💭 Trading advice section",
      "🔔 Customizable price alerts",
      "📅 Market event reminders",
      "✉️ Transaction notifications",
      "🎯 Performance tracking",
    ],
    tech: ["Angular", "D3.js", "WebSocket", "TailwindCSS"],
    githubUrl: "https://github.com/FijolKrzysztof/easy-trade",
    demoUrl: "https://fijolkrzysztof.github.io/easy-trade",
    icon: PROJECT_ICONS.easyTrade,
    lines: PROJECT_CODE_SECTIONS.easyTrade
  },
  techSpec: {
    title: "TechSpec",
    shortDescription: "Modern e-commerce platform for tech products",
    description: "A modern, responsive e-commerce layout built with Angular and TailwindCSS. This project is a demo/mockup showcasing modern design patterns and UI interactions.",
    features: [
      "Responsive layout for all devices",
      "Smooth animations and transitions",
      "Modern card-based product display",
      "Product search functionality",
      "Interactive shopping cart",
      "Product cards with specs",
      "Responsive navigation",
      "Animated interactions",
      "Standalone Angular components",
      "TailwindCSS for styling",
      "Custom SVG icons",
      "TypeScript",
      "RxJS for state demo"
    ],
    tech: [
      "Angular 18",
      "TypeScript 5",
      "TailwindCSS 3"
    ],
    githubUrl: "https://github.com/FijolKrzysztof/tech-shop",
    demoUrl: "https://fijolkrzysztof.github.io/tech-shop",
    icon: PROJECT_ICONS.techSpec,
    lines: PROJECT_CODE_SECTIONS.techSpec
  }
};
