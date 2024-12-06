export interface CodeLine {
  text: string;
  class: string;
  isVisible: boolean;
}

export interface Project {
  lines: Array<{ isVisible: boolean; text: string; class: string; }>;
  title: string;
  icon: string;
  shortDescription: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface ProjectSection {
  id: number;
  visibleLines: Array<{ isVisible: boolean; text: string; class: string; }>;
  height: number;
  isTransforming: boolean;
  showCard: boolean;
  isExpanded: boolean;
  project: Project | null;
}

export interface CodeLine {
  isVisible: boolean;
  text: string;
  class: string;
}

export type ProjectKey = 'chatHub' | 'easyTrade' | 'techSpec';
