import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CodeLine {
  text: string;
  class: string;
}

interface Project {
  lines: CodeLine[];
  title: string;
  description: string;
  tech: string[];
}

@Component({
  selector: 'app-animated-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      *ngIf="!isStarted"
      class="start-button"
      (click)="startAnimation()">
      Show My Projects >
    </button>

    <div class="container" [class.visible]="isStarted">
      <div class="code-editor">
        <div class="editor-header">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <div class="animation-container">
          @for (section of projectSections; track section.id) {
            <div class="section-wrapper" [style.height.px]="section.height">
              <div class="code-section" [class.transforming]="section.isTransforming">
                <div
                  class="transform-overlay"
                  [class.active]="section.isTransforming">
                </div>
                @for (line of section.visibleLines; track line) {
                  <div class="code-line" [class.visible]="line.isVisible">
                    <span [class]="line.class">{{ line.text }}</span>
                  </div>
                }
              </div>
              <div
                class="project-card"
                [class.visible]="section.showCard"
                [class.expanded]="section.isExpanded"
                *ngIf="section.project"
                (click)="expandProject(section)">
                <h3>{{ section.project.title }}</h3>
                <div class="project-content" [class.expanded]="section.isExpanded">
                  <p>{{ section.project.description }}</p>
                  <div class="tech-container">
                    @for (tech of section.project.tech; track tech) {
                      <span class="tech-badge">{{ tech }}</span>
                    }
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Monaco', 'Menlo', monospace;
    }

    :host {
      display: block;
      background: #0a0a0a;
      color: #fff;
      min-height: 100vh;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .start-button {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 16px 32px;
      background: transparent;
      border: 1px solid #646cff;
      color: #646cff;
      font-size: 1.2rem;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .start-button:hover {
      background: #646cff;
      color: #fff;
      transform: translate(-50%, -50%) scale(1.05);
    }

    .container {
      width: 600px;
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

    .editor-header {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .dot:nth-child(1) { background: #ff5f56; }
    .dot:nth-child(2) { background: #ffbd2e; }
    .dot:nth-child(3) { background: #27c93f; }

    .animation-container {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .section-wrapper {
      position: relative;
      min-height: 50px;
      transition: height 0.3s ease;
      margin-bottom: 20px;
    }

    .section-wrapper:last-child {
      margin-bottom: 0;
    }

    .code-section {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 20px;
      border-radius: 8px;
      transition: all 0.3s ease;
      background: transparent;
      z-index: 1;
    }

    .code-line {
      min-height: 24px;
      opacity: 0;
      transform: translateY(5px);
      transition: all 0.2s ease;
    }

    .code-line.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .purple { color: #b392f0; }
    .blue { color: #79b8ff; }
    .yellow { color: #ffab70; }
    .green { color: #85e89d; }
    .orange { color: #ffab70; }
    .comment { color: #6a737d; }
    .white { color: #fff; }

    .project-card {
      background: #1a1a1a;
      border-radius: 8px;
      padding: 20px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      opacity: 0;
      border: 1px solid rgba(100, 108, 255, 0.2);
      transition: all 0.3s ease;
      pointer-events: none;
      cursor: pointer;
    }

    .project-card.visible {
      opacity: 1;
      pointer-events: auto;
    }

    .project-card.expanded {
      position: relative;
    }

    .project-card h3 {
      font-size: 1.5rem;
      margin-bottom: 10px;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    }

    .project-content {
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .project-card p {
      color: #888;
      margin-bottom: 15px;
      line-height: 1.5;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .project-content.expanded p {
      -webkit-line-clamp: unset;
    }

    .tech-container {
      display: flex;
      gap: 8px;
    }

    .tech-badge {
      background: rgba(100, 108, 255, 0.1);
      color: #646cff;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 0.8rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    }

    .transform-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(100, 108, 255, 0.1);
      transform-origin: left;
      transform: scaleX(0);
      z-index: 3;
    }

    .transform-overlay.active {
      animation: sweepRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    .code-section.transforming .code-line {
      animation: fadeOut 0.2s forwards;
    }

    @keyframes sweepRight {
      0% {
        transform: scaleX(0);
        background: rgba(100, 108, 255, 0.1);
      }
      50% {
        transform: scaleX(1);
        background: rgba(100, 108, 255, 0.2);
      }
      100% {
        transform: scaleX(0);
        transform-origin: right;
        background: rgba(100, 108, 255, 0.1);
      }
    }

    @keyframes fadeOut {
      to {
        opacity: 0;
        transform: translateX(10px);
      }
    }
  `]
})
export class AnimatedProjectsComponent implements OnInit {
  isStarted = false;
  projectSections: any[] = [];

  private readonly projects: Record<string, Project> = {
    chatHub: {
      lines: [
        { text: "// ChatHub - Real-time messaging", class: "comment" },
        { text: "@Component({", class: "purple" },
        { text: "  selector: 'chat-hub',", class: "blue" },
        { text: "  template: `", class: "white" },
        { text: "    <div class=\"chat-container\">", class: "orange" },
        { text: "      <message-list/>", class: "orange" },
        { text: "    </div>`", class: "orange" },
        { text: "})", class: "purple" }
      ],
      title: "ChatHub",
      description: "Modern real-time chat app with dark mode interface and multiple channels. Features include user presence indicators, message reactions, file sharing, and end-to-end encryption. The app supports both private messaging and public channels, with advanced moderation tools for channel administrators.",
      tech: ["Angular", "Socket.io", "TailwindCSS", "Firebase"]
    },
    techSpec: {
      lines: [
        { text: "// TechSpec - Modern store", class: "comment" },
        { text: "@Component({", class: "purple" },
        { text: "  selector: 'tech-spec',", class: "blue" },
        { text: "  template: `", class: "white" },
        { text: "    <div class=\"store\">", class: "orange" },
        { text: "      <product-grid/>", class: "orange" },
        { text: "    </div>`", class: "orange" },
        { text: "})", class: "purple" }
      ],
      title: "TechSpec",
      description: "Modern e-commerce platform with responsive design. Features a dynamic product catalog, real-time inventory tracking, advanced search with filters, secure payment processing, and an intuitive admin dashboard for managing products and orders.",
      tech: ["Angular", "NgRx", "Stripe", "TailwindCSS"]
    },
    easyTrade: {
      lines: [
        { text: "// EasyTrade - Trading made simple", class: "comment" },
        { text: "@Component({", class: "purple" },
        { text: "  selector: 'easy-trade',", class: "blue" },
        { text: "  template: `", class: "white" },
        { text: "    <div class=\"trading-app\">", class: "orange" },
        { text: "      <market-chart/>", class: "orange" },
        { text: "    </div>`", class: "orange" },
        { text: "})", class: "purple" }
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

  expandProject(section: any) {
    if (!section.showCard) return;

    section.isExpanded = !section.isExpanded;

    if (section.isExpanded) {
      // Dajemy czas na animację przed zmianą height
      setTimeout(() => {
        section.height = 'auto';
      }, 10);
    } else {
      section.height = 145;
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
    section.height = 145;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
