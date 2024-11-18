// project-card.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Project } from '../../types/types';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="project-card"
      [class.visible]="visible"
      [class.expanded]="expanded">

      <div class="card-main" (click)="onExpand.emit()">
        <div class="icon-section">
          <div class="icon" [innerHTML]="sanitizedIcon"></div>
        </div>

        <div class="content-section">
          <div class="header-content">
            <h3 class="card-title">{{ project.title }}</h3>
            <p class="short-description">{{ project.shortDescription }}</p>
          </div>

          <div class="tech-container">
            @for (tech of project.tech; track tech) {
              <span class="tech-badge">{{ tech }}</span>
            }
          </div>
        </div>

        <div
          class="expand-icon"
          [class.expanded]="expanded"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>

      <div class="side-panel" [class.expanded]="expanded">
        <div class="panel-content">
          <p class="full-description">{{ project.description }}</p>

          <div class="action-buttons">
            @if (project.demoUrl) {
              <a
                [href]="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="action-button demo"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Live Demo
              </a>
            }
            @if (project.githubUrl) {
              <a
                [href]="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="action-button github"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                View Code
              </a>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .project-card {
      background: #1e1e2e;
      border-radius: 12px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      opacity: 0;
      border: 1px solid rgba(100, 108, 255, 0.15);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      display: flex;
      min-height: 120px;
      max-height: 120px;
    }

    .project-card.visible {
      opacity: 1;
      pointer-events: auto;
    }

    .card-main {
      padding: 20px;
      display: flex;
      gap: 20px;
      align-items: center;
      cursor: pointer;
      flex: 1;
      min-width: 0;
    }

    .icon-section {
      flex-shrink: 0;
    }

    .icon {
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(100, 108, 255, 0.1);
      border-radius: 16px;
      padding: 12px;
    }

    .icon svg {
      width: 100%;
      height: 100%;
      color: #646cff;
    }

    .content-section {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .header-content {
      flex: 1;
    }

    .card-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    }

    .short-description {
      color: #94a3b8;
      margin: 4px 0 0;
      font-size: 0.875rem;
      line-height: 1.4;
    }

    .tech-container {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin: 0;
    }

    .tech-badge {
      background: rgba(100, 108, 255, 0.1);
      color: #646cff;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 500;
      white-space: nowrap;
    }

    .expand-icon {
      align-self: center;
      color: #646cff;
      transition: transform 0.3s ease;
    }

    .expand-icon.expanded {
      transform: rotate(-180deg);
    }

    .side-panel {
      background: #252538;
      width: 0;
      overflow: hidden;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }

    .side-panel.expanded {
      width: 300px;
      border-left: 1px solid rgba(100, 108, 255, 0.15);
    }

    .panel-content {
      padding: 20px;
      width: 300px;
    }

    .full-description {
      color: #94a3b8;
      margin: 0 0 20px;
      line-height: 1.6;
      font-size: 0.9375rem;
    }

    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .action-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease;
      width: 100%;
    }

    .action-button.github {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }

    .action-button.demo {
      background: #646cff;
      color: #fff;
    }

    .action-button:hover {
      transform: translateY(-1px);
      filter: brightness(1.1);
    }

    /*@media (max-width: 768px) {*/
    /*  .project-card {*/
    /*    flex-direction: column;*/
    /*    max-height: none;*/
    /*  }*/

    /*  .card-main {*/
    /*    flex-direction: row;*/
    /*    padding: 16px;*/
    /*  }*/

    /*  .icon {*/
    /*    width: 48px;*/
    /*    height: 48px;*/
    /*  }*/

    /*  .tech-container {*/
    /*    display: none;*/
    /*  }*/

    /*  .side-panel.expanded {*/
    /*    position: fixed;*/
    /*    top: 0;*/
    /*    right: 0;*/
    /*    bottom: 0;*/
    /*    width: 100%;*/
    /*    max-width: 100%;*/
    /*    z-index: 1000;*/
    /*    height: 100vh;*/
    /*  }*/

    /*  .panel-content {*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    overflow-y: auto;*/
    /*    padding: 24px;*/
    /*  }*/
    /*}*/

    /*@media (max-width: 480px) {*/
    /*  .card-main {*/
    /*    gap: 12px;*/
    /*  }*/

    /*  .card-title {*/
    /*    font-size: 1.1rem;*/
    /*    white-space: nowrap;*/
    /*    overflow: hidden;*/
    /*    text-overflow: ellipsis;*/
    /*  }*/

    /*  .short-description {*/
    /*    font-size: 0.75rem;*/
    /*    display: -webkit-box;*/
    /*    -webkit-line-clamp: 1;*/
    /*    -webkit-box-orient: vertical;*/
    /*    overflow: hidden;*/
    /*  }*/

    /*  .icon {*/
    /*    width: 40px;*/
    /*    height: 40px;*/
    /*    padding: 8px;*/
    /*  }*/

    /*  .tech-container {*/
    /*    display: none;*/
    /*  }*/
    /*}*/
  `]
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Input() visible = false;
  @Input() expanded = false;
  @Output() onExpand = new EventEmitter<void>();

  get sanitizedIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.project.icon);
  }

  constructor(private sanitizer: DomSanitizer) {}
}
