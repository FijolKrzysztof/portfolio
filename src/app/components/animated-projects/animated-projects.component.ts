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
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M12 21a8 8 0 0 0 8-8c0-3.5-2-6.5-5-7.5C15 5 14 4 12 4c-2 0-3 1-3 2.5C6 7.5 4 10.5 4 13a8 8 0 0 0 8 8Z" />
  <path d="M8 13s1.5 2 4 2 4-2 4-2" />
  <path d="M9 10h.01" />
  <path d="M15 10h.01" />
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
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M20 7h-3m-1 0h-2M4 7h10" />
  <path d="M20 12h-7m-1 0H4" />
  <path d="M20 17H4" />
  <rect x="3" y="3" width="18" height="18" rx="2" />
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
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
  <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
  <path d="M12 3v6" />
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
