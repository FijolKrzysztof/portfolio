export interface CodeLine {
  text: string;
  class: string;
  isVisible: boolean;
}

export interface Project {
  lines: CodeLine[];
  title: string;
  description: string;
  tech: string[];
}

export interface ProjectSection {
  id: number;
  visibleLines: CodeLine[];
  height: number | 'auto';
  isTransforming: boolean;
  showCard: boolean;
  isExpanded: boolean;
  project: Project | null;
}
