import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Project } from '../../../../../../types/types';
import { ProjectModalComponent } from './components/project-modal.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, ProjectModalComponent],
  template: `
    <div
      class="project-card"
      [class.visible]="visible"
      [class.expanded]="expanded">

      <div class="card-main" (click)="isModalOpen = true">
        <div class="icon-section">
          <div class="icon" [innerHTML]="sanitizedIcon"></div>
        </div>

        <div class="content-section">
          <div class="header-content">
            <h3 class="card-title">{{ project.title }}</h3>
            <p class="short-description hide-mobile">{{ project.shortDescription }}</p>
          </div>

          <div class="action-buttons hide-mobile">
            @if (project.demoUrl) {
              <a [href]="project.demoUrl" target="_blank" rel="noopener noreferrer" class="action-button demo" (click)="$event.stopPropagation()">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Demo
              </a>
            }
            @if (project.githubUrl) {
              <a [href]="project.githubUrl" target="_blank" rel="noopener noreferrer" class="action-button github" (click)="$event.stopPropagation()">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                Code
              </a>
            }
          </div>
        </div>
      </div>
    </div>

    <app-project-modal
      [project]="project"
      [(visible)]="isModalOpen"
      (visibleChange)="isModalOpen = $event"
    />
  `,
  styles: [`
    .project-card {
      background: rgba(255, 255, 255, 0.01);
      border-radius: 16px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      opacity: 0;
      border: 1px solid rgba(255, 255, 255, 0.03);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
      overflow: hidden;
      backdrop-filter: blur(20px);
      display: flex;
      height: 120px;
    }

    .project-card.visible {
      opacity: 1;
      pointer-events: auto;
    }

    .card-main {
      padding: 24px;
      display: flex;
      gap: 24px;
      align-items: center;
      cursor: pointer;
      flex: 1;
      min-width: 0;
      transition: all 0.3s ease;
    }

    .icon-section {
      flex-shrink: 0;
    }

    .icon {
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.01);
      border: 1px solid rgba(255, 255, 255, 0.03);
      border-radius: 14px;
      padding: 12px;
      transition: all 0.3s ease;
    }

    .card-main:hover .icon {
      transform: scale(1.05);
      border-color: rgba(255, 255, 255, 0.1);
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
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      color: #f8fafc;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      transition: color 0.3s ease;
    }

    .card-main:hover .card-title {
      color: #6366f1;
    }

    .short-description {
      color: #94a3b8;
      margin: 4px 0 0;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .action-buttons {
      display: flex;
      gap: 8px;
    }

    .action-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease;
      border: 1px solid rgba(255, 255, 255, 0.03);
    }

    .action-button.github {
      background: rgba(255, 255, 255, 0.01);
      color: #f8fafc;
    }

    .action-button.github:hover {
      border-color: rgba(255, 255, 255, 0.1);
    }

    .action-button.demo {
      background: rgba(99, 102, 241, 0.1);
      border-color: rgba(99, 102, 241, 0.2);
      color: #6366f1;
    }

    .action-button.demo:hover {
      background: rgba(99, 102, 241, 0.15);
      border-color: rgba(99, 102, 241, 0.3);
    }

    .action-button:hover {
      transform: translateY(-1px);
    }

    @media (max-width: 550px) {
      .card-main {
        gap: 12px;
        padding: 16px;
      }

      .icon {
        width: 40px;
        height: 40px;
        padding: 8px;
      }

      .card-title {
        font-size: 1.1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .content-section {
        justify-content: center;
      }

      .hide-mobile {
        display: none;
      }

      .icon-section {
        display: flex;
        align-items: center;
      }
    }
  `]
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Input() visible = false;
  @Input() expanded = false;
  @Output() onExpand = new EventEmitter<void>();

  isModalOpen = false;

  get sanitizedIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.project.icon);
  }

  constructor(private sanitizer: DomSanitizer) {}
}
