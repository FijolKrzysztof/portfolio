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
        { isVisible: false, text: "@Component({", class: "purple" },
        { isVisible: false, text: "  selector: 'chat-hub',", class: "blue" },
        { isVisible: false, text: "  template: `", class: "white" },
        { isVisible: false, text: "    <div class=\"chat-container\">", class: "orange" },
        { isVisible: false, text: "      <message-list/>", class: "orange" },
        { isVisible: false, text: "    </div>`", class: "orange" },
        { isVisible: false, text: "})", class: "purple" }
      ],
      title: "ChatHub",
      icon: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <rect width="256" height="256" fill="none"/>
    <path fill="currentColor" d="M128 24a104 104 0 0 0-91.2 154l-8.5 30A12 12 0 0 0 40 220l30-8.5A104 104 0 1 0 128 24zm0 192a88 88 0 0 1-44.9-12.3 12 12 0 0 0-6.1-1.7 12 12 0 0 0-3.3.5l-21.1 6 6-21.1a12 12 0 0 0-1.2-9.4A88 88 0 1 1 128 216z"/>
    <path fill="currentColor" d="M82 108a14 14 0 1 1 14-14 14 14 0 0 1-14 14zm46 0a14 14 0 1 1 14-14 14 14 0 0 1-14 14zm46 0a14 14 0 1 1 14-14 14 14 0 0 1-14 14z"/>
  </svg>`,
      shortDescription: "AI-powered chat platform with multiple bot personalities",
      description: "Advanced conversational AI platform featuring multiple chatbot personalities, each with unique expertise and communication styles. Users can engage in real-time conversations with AI assistants specialized in various domains - from technical support to creative writing. The platform includes features like conversation history, personality switching, and natural language understanding.",
      tech: ["Angular", "OpenAI", "Socket.io", "TailwindCSS"],
      githubUrl: "https://github.com/yourusername/chat-hub",
      demoUrl: "https://chat-hub-demo.vercel.app"
    },
    techSpec: {
      lines: [
        { isVisible: false, text: "@Component({", class: "purple" },
        { isVisible: false, text: "  selector: 'tech-spec',", class: "blue" },
        { isVisible: false, text: "  template: `", class: "white" },
        { isVisible: false, text: "    <div class=\"store\">", class: "orange" },
        { isVisible: false, text: "      <product-grid/>", class: "orange" },
        { isVisible: false, text: "    </div>`", class: "orange" },
        { isVisible: false, text: "})", class: "purple" }
      ],
      title: "TechSpec",
      icon: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16zm0 160H40V56h176v144zM80 84a12 12 0 0 1 12-12h72a12 12 0 0 1 0 24H92a12 12 0 0 1-12-12zm0 48a12 12 0 0 1 12-12h72a12 12 0 0 1 0 24H92a12 12 0 0 1-12-12zm0 48a12 12 0 0 1 12-12h72a12 12 0 0 1 0 24H92a12 12 0 0 1-12-12z"/>
      </svg>`,
      shortDescription: "Modern e-commerce platform for tech products",
      description: "Feature-rich e-commerce platform designed specifically for technology products. Includes advanced filtering, real-time inventory tracking, detailed product specifications, customer reviews, and secure payment processing. The admin dashboard provides comprehensive analytics and inventory management tools.",
      tech: ["Angular", "NgRx", "Stripe", "TailwindCSS"],
      githubUrl: "https://github.com/yourusername/tech-spec",
      demoUrl: "https://tech-spec-demo.vercel.app"
    },
    easyTrade: {
      lines: [
        { isVisible: false, text: "@Component({", class: "purple" },
        { isVisible: false, text: "  selector: 'easy-trade',", class: "blue" },
        { isVisible: false, text: "  template: `", class: "white" },
        { isVisible: false, text: "    <div class=\"trading-app\">", class: "orange" },
        { isVisible: false, text: "      <market-chart/>", class: "orange" },
        { isVisible: false, text: "    </div>`", class: "orange" },
        { isVisible: false, text: "})", class: "purple" }
      ],
      title: "EasyTrade",
      icon: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 24a104 104 0 1 0 104 104A104.2 104.2 0 0 0 128 24zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88zm44-92a12 12 0 0 1 0 24h-44a12 12 0 0 1-12-12V84a12 12 0 0 1 24 0v40z"/>
        <path d="M76 140l36-36m68 0l-36 36m-32-80v40m64-40v40"/>
      </svg>`,
      shortDescription: "Intuitive cryptocurrency trading platform",
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
    section.height = project.lines.length * 24 + 40;

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
