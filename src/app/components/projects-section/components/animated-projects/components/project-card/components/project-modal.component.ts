// project-modal.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Project } from '../../../../../../../types/types';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, DialogModule],
  template: `
    <p-dialog
      [(visible)]="visible"
      [modal]="true"
      [draggable]="true"
      [resizable]="false"
      [closable]="true"
      (onHide)="closeModal()"
      [closeOnEscape]="true"
      [showHeader]="false"
      [dismissableMask]="true"
      [blockScroll]="true"
      styleClass="project-dialog"
      [contentStyle]="{ padding: '0' }"
      [baseZIndex]="1000"
      [breakpoints]="{'960px': '75vw', '640px': '90vw'}"
    >
      <div class="modal-header">
        <div class="icon-wrapper">
          <div class="icon" [innerHTML]="project.icon"></div>
        </div>
        <div class="header-content">
          <h2 class="modal-title">{{ project.title }}</h2>
          <p class="modal-subtitle">{{ project.shortDescription }}</p>
        </div>
      </div>

      <div class="modal-content">
        <div class="description-section">
          <h3>About the Project</h3>
          <p class="full-description">{{ project.description }}</p>
        </div>

        <div class="technologies-section">
          <h3>Technologies Used</h3>
          <div class="tech-tags">
            @for (tech of project.tech; track tech) {
              <span class="tech-tag">{{ tech }}</span>
            }
          </div>
        </div>

        <div class="features-section">
          <h3>Key Features</h3>
          <ul class="features-list">
            @for (feature of [1,2,3]; track feature) {
              <li class="feature-item">{{ feature }}</li>
            }
          </ul>
        </div>
      </div>

      <div class="modal-footer">
        @if (project.demoUrl) {
          <a [href]="project.demoUrl" target="_blank" rel="noopener noreferrer" class="action-button demo">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Live Demo
          </a>
        }
        @if (project.githubUrl) {
          <a [href]="project.githubUrl" target="_blank" rel="noopener noreferrer" class="action-button github">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            View Code
          </a>
        }
      </div>
    </p-dialog>
  `,
  styles: [`
    :host ::ng-deep .project-dialog {
      max-width: 800px;
      width: 90vw;
      margin: 0;
    }

    :host ::ng-deep .project-dialog .p-dialog-content {
      background: #1a1b1e;
      color: #fff;
      border-radius: 24px;
      padding: 0;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    :host ::ng-deep .p-dialog-mask.p-component-overlay {
      background: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(8px);
    }

    .modal-header {
      padding: 32px;
      display: flex;
      gap: 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      cursor: move;
    }

    .icon-wrapper {
      flex-shrink: 0;
    }

    .icon {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .header-content {
      flex: 1;
    }

    .modal-title {
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
      color: #fff;
    }

    .modal-subtitle {
      color: #94a3b8;
      margin: 8px 0 0;
      font-size: 1.1rem;
      line-height: 1.5;
    }

    .modal-content {
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .modal-content h3 {
      color: #fff;
      font-size: 1.25rem;
      margin: 0 0 16px;
    }

    .full-description {
      color: #94a3b8;
      line-height: 1.7;
      font-size: 1.1rem;
      margin: 0;
    }

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tech-tag {
      background: rgba(99, 102, 241, 0.1);
      color: #6366f1;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      border: 1px solid rgba(99, 102, 241, 0.2);
    }

    .features-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 12px;
    }

    .feature-item {
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1rem;
    }

    .feature-item::before {
      content: '';
      width: 6px;
      height: 6px;
      background: #6366f1;
      border-radius: 50%;
    }

    .modal-footer {
      padding: 24px 32px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      gap: 16px;
      justify-content: flex-end;
    }

    .action-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .action-button.demo {
      background: #6366f1;
      color: #fff;
    }

    .action-button.demo:hover {
      background: #4f46e5;
      transform: translateY(-2px);
    }

    .action-button.github {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }

    .action-button.github:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
    }

    @media (max-width: 640px) {
      .modal-header {
        padding: 24px;
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }

      .icon-wrapper {
        display: flex;
        justify-content: center;
      }

      .modal-title {
        font-size: 1.5rem;
      }

      .modal-content {
        padding: 24px;
      }

      .modal-footer {
        padding: 24px;
        flex-direction: column;
      }

      .action-button {
        width: 100%;
      }
    }
  `]
})
export class ProjectModalComponent {
  @Input() project!: Project;
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  closeModal() {
    this.visibleChange.emit(false);
  }
}
