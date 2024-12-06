import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Project } from '../../../../../../types/types';
import { ProjectModalComponent } from './components/project-modal.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, ProjectModalComponent],
  template: `
    <div
      class="project-card"
      [class.visible]="visible()"
      [class.expanded]="expanded()"
      role="article">

      <div class="card-main" (click)="isModalOpen = true">
        <div class="icon-section">
          <div class="icon" [innerHTML]="sanitizedIcon"></div>
        </div>

        <div class="content-section">
          <div class="header-content">
            <h3 class="card-title">{{ project().title }}</h3>
            <p class="short-description hide-mobile">{{ project().shortDescription }}</p>
          </div>

          <div class="action-buttons hide-mobile">
            @if (project().demoUrl) {
              <a
                [href]="project().demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="action-button demo"
                (click)="$event.stopPropagation()"
                aria-label="Open demo in new tab"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Demo
              </a>
            }
            @if (project().githubUrl) {
              <a
                [href]="project().githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="action-button github"
                (click)="$event.stopPropagation()"
                aria-label="View code on GitHub in new tab"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" aria-hidden="true">
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
      [project]="project()"
      [(visible)]="isModalOpen"
      (visibleChange)="isModalOpen = $event"
    />
  `,
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  readonly sanitizer = inject(DomSanitizer);

  project = input.required<Project>();
  visible = input<boolean>(false);
  expanded = input<boolean>(false);
  onExpand = output<void>();

  isModalOpen = false;

  get sanitizedIcon() {
    return this.sanitizer.bypassSecurityTrustHtml(this.project().icon);
  }
}
