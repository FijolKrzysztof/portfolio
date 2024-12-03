import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Project } from '../../../../../../../types/types';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, DialogModule],
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.95) translateY(10px)'
        }),
        animate('200ms ease-out', style({
          opacity: 1,
          transform: 'scale(1) translateY(0)'
        }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({
          opacity: 0,
          transform: 'scale(0.95) translateY(10px)'
        }))
      ])
    ])
  ],
  template: `
    <p-dialog
      [(visible)]="visible"
      [modal]="true"
      [draggable]="false"
      [resizable]="false"
      [closable]="true"
      (onHide)="closeModal()"
      [closeOnEscape]="true"
      [showHeader]="false"
      [dismissableMask]="true"
      [blockScroll]="true"
      styleClass="project-dialog"
      [contentStyle]="{ padding: '0', background: '#1a1b1e' }"
      [baseZIndex]="1000"
      [breakpoints]="{'960px': '75vw', '640px': '90vw'}"
      appendTo="body"
      [style]="{position: 'fixed'}"
    >
      <div class="modal-container" [@modalAnimation]>
        <div class="modal-header">
          <div class="close-button" (click)="closeModal()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </div>
          <div class="icon-wrapper">
            <div class="icon" [innerHTML]="project.icon"></div>
          </div>
          <div class="header-content">
            <h2 class="modal-title">{{ project.title }}</h2>
            <p class="modal-subtitle">{{ project.shortDescription }}</p>
          </div>
        </div>

        <div class="modal-content custom-scrollbar">
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
      </div>
    </p-dialog>
  `,
  styles: [`
    :host ::ng-deep .project-dialog {
      max-width: 700px;
      width: 90vw;
      margin: 1.5rem auto;
      height: auto;
      max-height: calc(100vh - 3rem);
    }

    :host ::ng-deep .project-dialog .p-dialog-content {
      padding: 0;
      border-radius: 20px;
      background: #1a1b1e !important;
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      overflow: hidden;
    }

    :host ::ng-deep .p-dialog-mask.p-component-overlay {
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
    }

    .modal-container {
      display: flex;
      flex-direction: column;
      max-height: calc(100vh - 3rem);
      background: #1a1b1e;
    }

    .modal-header {
      padding: 24px;
      display: flex;
      gap: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
      background: #1a1b1e;
    }

    .close-button {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .close-button:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: rotate(90deg);
    }

    .icon-wrapper {
      flex-shrink: 0;
    }

    .icon {
      width: 72px;
      height: 72px;
      background: #212226;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .header-content {
      flex: 1;
    }

    .modal-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0;
      color: #fff;
      line-height: 1.2;
    }

    .modal-subtitle {
      color: #94a3b8;
      margin: 8px 0 0;
      font-size: 1rem;
      line-height: 1.5;
    }

    .modal-content {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 28px;
      overflow-y: auto;
      max-height: calc(100vh - 250px);
      background: #1a1b1e;
    }

    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
    }

    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
    }

    .modal-content h3 {
      color: #fff;
      font-size: 1.1rem;
      margin: 0 0 16px;
      font-weight: 600;
    }

    .full-description {
      color: #94a3b8;
      line-height: 1.7;
      font-size: 1rem;
      margin: 0;
    }

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tech-tag {
      background: #212226;
      color: #818cf8;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      border: 1px solid rgba(99, 102, 241, 0.2);
      transition: all 0.2s ease;
    }

    .tech-tag:hover {
      background: #2a2b31;
      transform: translateY(-1px);
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
      font-size: 0.95rem;
      padding-left: 16px;
      position: relative;
    }

    .feature-item::before {
      content: '';
      position: absolute;
      left: 0;
      width: 6px;
      height: 6px;
      background: #818cf8;
      border-radius: 50%;
    }

    .modal-footer {
      padding: 20px 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      background: #1a1b1e;
    }

    .action-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 0.95rem;
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
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }

    .action-button.github {
      background: #212226;
      color: #fff;
    }

    .action-button.github:hover {
      background: #2a2b31;
      transform: translateY(-2px);
    }

    @media (max-width: 640px) {
      .modal-header {
        padding: 20px;
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
        padding: 20px;
      }

      .modal-footer {
        padding: 20px;
        flex-direction: column;
      }

      .action-button {
        width: 100%;
      }

      :host ::ng-deep .project-dialog {
        margin: 1rem;
        width: calc(100vw - 2rem);
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
