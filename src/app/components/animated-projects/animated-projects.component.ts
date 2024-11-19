import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartButtonComponent } from '../start-button/start-button.component';
import { EditorHeaderComponent } from '../editor-header/editor-header.component';
import { CodeSectionComponent } from '../code-section/code-section.component';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { Project, ProjectSection } from '../../types/types';

@Component({
  selector: 'app-animated-projects',
  standalone: true,
  imports: [
    CommonModule,
    StartButtonComponent,
    EditorHeaderComponent,
    CodeSectionComponent,
    ProjectCardComponent
  ],
  template: `
    <app-start-button
      *ngIf="!isStarted"
      (onClick)="startAnimation()"
    />

    <div class="container" [class.visible]="isStarted">
      <div class="code-editor">
        <app-editor-header />
        <div class="animation-container">
          @for (section of projectSections; track section.id) {
            <div class="section-wrapper" [style.height.px]="section.height">
              <app-code-section
                [visibleLines]="section.visibleLines"
                [isTransforming]="section.isTransforming"
              />
              @if (section.project) {
                <app-project-card
                  [project]="section.project"
                  [visible]="section.showCard"
                  [expanded]="section.isExpanded"
                  (onExpand)="expandProject(section)"
                />
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      background: #0a0a0a;
      color: #fff;
      min-height: 100vh;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .container {
      width: min(800px, 100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      padding: 0 20px;
    }

    .container.visible {
      opacity: 1;
      visibility: visible;
    }

    .code-editor {
      background: #1a1a1a;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 0 30px rgba(100, 108, 255, 0.1);
      width: 100%;
    }

    .animation-container {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .section-wrapper {
      position: relative;
      min-height: 50px;
      transition: height 0.3s ease;
      margin-bottom: 40px;
    }
  `]
})
export class AnimatedProjectsComponent implements OnInit {
  isStarted = false;
  projectSections: ProjectSection[] = [];

  private readonly projects: Record<string, Project> = {
    chatHub: {
      lines: [
        { isVisible: false, text: "@ProjectCard({", class: "purple" },
        { isVisible: false, text: "  selector: 'app-chat-hub',", class: "white" },
        { isVisible: false, text: "  styles: [", class: "blue" },
        { isVisible: false, text: "    surface: {", class: "orange" },
        { isVisible: false, text: "      display: 'flex',", class: "yellow" },
        { isVisible: false, text: "      background: '#1e1e2e',", class: "yellow" },
        { isVisible: false, text: "      borderRadius: '12px',", class: "yellow" },
        { isVisible: false, text: "      gap: '1.25rem'", class: "yellow" },
        { isVisible: false, text: "    },", class: "orange" },
        { isVisible: false, text: "    // Card layout configuration", class: "comment" },
        { isVisible: false, text: "    title: 'ChatHub',", class: "green" },
        { isVisible: false, text: "    icon: `", class: "blue" },
        { isVisible: false, text: "      <svg viewBox=\"0 0 24 24\">", class: "white" },
        { isVisible: false, text: "        <path d=\"M12 21a8 8 0 0 0 8-8c0-3.5-2-6.5-5-7.5\"/>", class: "purple" },
        { isVisible: false, text: "        <path d=\"M8 13s1.5 2 4 2 4-2 4-2\"/>", class: "purple" },
        { isVisible: false, text: "      </svg>", class: "white" },
        { isVisible: false, text: "    `,", class: "blue" },
        { isVisible: false, text: "})", class: "purple" }
      ],
      title: "ChatHub",
      icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#60A5FA;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="128" height="128" rx="32" fill="#0F172A"/>
        <path d="M32 40 H96 A16 16 0 0 1 112 56 V72 A16 16 0 0 1 96 88 H72 L64 104 L56 88 H32 A16 16 0 0 1 16 72 V56 A16 16 0 0 1 32 40" fill="url(#chatGradient)"/>
        <path d="M44 64 A4 4 0 0 0 52 64 A4 4 0 0 0 44 64" fill="white"/>
        <path d="M60 64 A4 4 0 0 0 68 64 A4 4 0 0 0 60 64" fill="white"/>
        <path d="M76 64 A4 4 0 0 0 84 64 A4 4 0 0 0 76 64" fill="white"/>
      </svg>`,
      shortDescription: "Intuitive real-time chat application with responsive design",
      description: "Advanced conversational AI platform featuring multiple chatbot personalities, each with unique expertise and communication styles. Users can engage in real-time conversations with AI assistants specialized in various domains - from technical support to creative writing. The platform includes features like conversation history, personality switching, and natural language understanding.",
      tech: ["Angular", "OpenAI", "Socket.io", "TailwindCSS"],
      githubUrl: "https://github.com/yourusername/chat-hub",
      demoUrl: "https://chat-hub-demo.vercel.app"
    },
    techSpec: {
      lines: [
        { isVisible: false, text: "@ProjectCard({", class: "purple" },
        { isVisible: false, text: "  selector: 'app-tech-spec',", class: "white" },
        { isVisible: false, text: "  styles: [", class: "blue" },
        { isVisible: false, text: "    surface: {", class: "orange" },
        { isVisible: false, text: "      display: 'flex',", class: "yellow" },
        { isVisible: false, text: "      background: '#1e1e2e',", class: "yellow" },
        { isVisible: false, text: "      borderRadius: '12px',", class: "yellow" },
        { isVisible: false, text: "      gap: '1.25rem'", class: "yellow" },
        { isVisible: false, text: "    },", class: "orange" },
        { isVisible: false, text: "    // Tech spec component styles", class: "comment" },
        { isVisible: false, text: "    title: 'TechSpec',", class: "green" },
        { isVisible: false, text: "    icon: `", class: "blue" },
        { isVisible: false, text: "      <svg viewBox=\"0 0 24 24\">", class: "white" },
        { isVisible: false, text: "        <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/>", class: "purple" },
        { isVisible: false, text: "        <path d=\"M20 7h-3m-1 0h-2M4 7h10\"/>", class: "purple" },
        { isVisible: false, text: "      </svg>", class: "white" },
        { isVisible: false, text: "    `,", class: "blue" },
        { isVisible: false, text: "})", class: "purple" }
      ],
      title: "TechSpec",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <!-- Tło -->
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#22d3ee;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Główny kształt - zaokrąglony kwadrat -->
  <rect x="2" y="2" width="28" height="28" rx="8"
        fill="url(#grad)" />

  <!-- Litera T stylizowana na tech/minimalistyczny design -->
  <path d="M8 8h16v4h-6v12h-4V12H8V8z"
        fill="rgba(0,0,0,0.85)"
        stroke="none" />

  <!-- Dekoracyjny element - "obwód" -->
  <path d="M24 16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2"
        fill="none"
        stroke="rgba(0,0,0,0.85)"
        stroke-width="2"
        stroke-linecap="round" />
</svg>
`,
      shortDescription: "Modern e-commerce platform for tech products",
      description: "Feature-rich e-commerce platform designed specifically for technology products. Includes advanced filtering, real-time inventory tracking, detailed product specifications, customer reviews, and secure payment processing. The admin dashboard provides comprehensive analytics and inventory management tools.",
      tech: ["Angular", "NgRx", "Stripe", "TailwindCSS"],
      githubUrl: "https://github.com/yourusername/tech-spec",
      demoUrl: "https://tech-spec-demo.vercel.app"
    },
    easyTrade: {
      lines: [
        { isVisible: false, text: "@ProjectCard({", class: "purple" },
        { isVisible: false, text: "  selector: 'app-easy-trade',", class: "white" },
        { isVisible: false, text: "  styles: [", class: "blue" },
        { isVisible: false, text: "    surface: {", class: "orange" },
        { isVisible: false, text: "      display: 'flex',", class: "yellow" },
        { isVisible: false, text: "      background: '#1e1e2e',", class: "yellow" },
        { isVisible: false, text: "      borderRadius: '12px',", class: "yellow" },
        { isVisible: false, text: "      gap: '1.25rem'", class: "yellow" },
        { isVisible: false, text: "    },", class: "orange" },
        { isVisible: false, text: "    // Trading app interface", class: "comment" },
        { isVisible: false, text: "    title: 'EasyTrade',", class: "green" },
        { isVisible: false, text: "    icon: `", class: "blue" },
        { isVisible: false, text: "      <svg viewBox=\"0 0 24 24\">", class: "white" },
        { isVisible: false, text: "        <path d=\"M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0\"/>", class: "purple" },
        { isVisible: false, text: "        <path d=\"M12 3v6\"/>", class: "purple" },
        { isVisible: false, text: "      </svg>", class: "white" },
        { isVisible: false, text: "    `,", class: "blue" },
        { isVisible: false, text: "})", class: "purple" }
      ],
      title: "EasyTrade",
      icon: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Tło -->
  <rect width="100" height="100" rx="20" fill="#1E293B"/>

  <!-- Wykres świecowy -->
  <g stroke="#38BDF8" stroke-width="2">
    <!-- Świece -->
    <line x1="20" y1="30" x2="20" y2="70" />
    <rect x="18" y="35" width="4" height="20" fill="#38BDF8"/>

    <line x1="35" y1="25" x2="35" y2="75" />
    <rect x="33" y="55" width="4" height="15" fill="#38BDF8"/>

    <line x1="50" y1="20" x2="50" y2="80" />
    <rect x="48" y="30" width="4" height="35" fill="#38BDF8"/>

    <line x1="65" y1="25" x2="65" y2="75" />
    <rect x="63" y="40" width="4" height="25" fill="#38BDF8"/>

    <line x1="80" y1="30" x2="80" y2="70" />
    <rect x="78" y="45" width="4" height="15" fill="#38BDF8"/>
  </g>

  <!-- Linia trendu -->
  <path
    d="M15 65 Q 30 60, 45 50 T 85 35"
    fill="none"
    stroke="#22C55E"
    stroke-width="2"
  />

  <!-- Znaczniki poziomów -->
  <g fill="#CBD5E1" font-size="8">
    <circle cx="15" cy="25" r="2"/>
    <circle cx="15" cy="50" r="2"/>
    <circle cx="15" cy="75" r="2"/>
  </g>
</svg>
`,
      shortDescription: "Professional trading platform for beginners",
      description: "User-friendly cryptocurrency trading platform designed for both beginners and experienced traders. Features real-time price charts, portfolio tracking, automated trading strategies, and comprehensive educational resources. Includes advanced charting tools, multiple timeframe analysis, and trade automation capabilities.",
      tech: ["Angular", "D3.js", "WebSocket", "TailwindCSS"],
      githubUrl: "https://github.com/yourusername/easy-trade",
      demoUrl: "https://easy-trade-demo.vercel.app"
    }
  };

  ngOnInit() {
    this.projectSections = Object.keys(this.projects).map((key, index) => ({
      id: index,
      visibleLines: [],
      height: 0,
      isTransforming: false,
      showCard: false,
      isExpanded: false,
      project: null
    }));
  }

  async startAnimation() {
    this.isStarted = true;

    for (const [key, project] of Object.entries(this.projects)) {
      const sectionIndex = Object.keys(this.projects).indexOf(key);
      await this.typeCode(project, sectionIndex);
      await this.sleep(200);
      await this.transformToCard(project, sectionIndex);
      await this.sleep(300);
    }
  }

  expandProject(section: ProjectSection) {
    if (!section.showCard) return;

    section.isExpanded = !section.isExpanded;
    section.height = section.isExpanded ? 140 : 120;
  }

  private async typeCode(project: Project, sectionIndex: number) {
    const section = this.projectSections[sectionIndex];
    section.height = project.lines.length * 16;

    for (const line of project.lines) {
      const newLine = { ...line, isVisible: false };
      section.visibleLines = [...section.visibleLines, newLine];

      for (let i = 0; i <= line.text.length; i++) {
        await this.sleep(Math.random() * 5 + 2);
      }

      section.visibleLines[section.visibleLines.length - 1].isVisible = true;
      await this.sleep(10);
    }
  }

  private async transformToCard(project: Project, sectionIndex: number) {
    const section = this.projectSections[sectionIndex];
    section.isTransforming = true;
    section.project = project;

    await this.sleep(150);
    section.showCard = true;

    await this.sleep(250);
    section.height = 120;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
