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
      width: 800px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
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

    .section-wrapper:last-child {
      margin-bottom: 0;
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
      description: "Modern real-time chat app with dark mode interface and multiple channels. Features include user presence indicators, message reactions, file sharing, and end-to-end encryption. The app supports both private messaging and public channels, with advanced moderation tools for channel administrators.",
      tech: ["Angular", "Socket.io", "TailwindCSS", "Firebase"]
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
      description: "Modern e-commerce platform with responsive design. Features a dynamic product catalog, real-time inventory tracking, advanced search with filters, secure payment processing, and an intuitive admin dashboard for managing products and orders.",
      tech: ["Angular", "NgRx", "Stripe", "TailwindCSS"]
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
      description: "Intuitive trading platform for beginners with real-time data. Features interactive charts with technical indicators, portfolio tracking, automated trading strategies, and comprehensive educational resources for new traders.",
      tech: ["Angular", "D3.js", "WebSocket", "TailwindCSS"]
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

    if (section.isExpanded) {
      setTimeout(() => {
        section.height = 'auto';
      }, 10);
    } else {
      section.height = 120;
    }
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
