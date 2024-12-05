import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #portal>
      @if (visible) {
        <div class="modal-backdrop" (click)="closeModal()">
          <div class="modal-content" (click)="$event.stopPropagation()">
            @for (item of [].constructor(36); track $index) {
              <div class="modal-fragment"></div>
            }

            <div class="modal-inner">
              <div class="modal-header">
                <div class="close-button" (click)="closeModal()">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                </div>
                <div class="icon-wrapper">
                  <div class="icon" [innerHTML]="sanitizedIcon"></div>
                </div>
                <div class="header-content">
                  <h2 class="modal-title">{{ project.title }}</h2>
                  <p class="modal-subtitle">{{ project.shortDescription }}</p>
                </div>
              </div>

              <div class="modal-body custom-scrollbar">
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
                    @for (feature of project.features; track feature) {
                      <li>{{ feature }}</li>
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
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: 'project-modal.component.scss',
})
export class ProjectModalComponent implements AfterViewInit, OnDestroy {
  @Input() project!: any;
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @ViewChild('portal') portal!: ElementRef;

  constructor(private sanitizer: DomSanitizer) {}

  ngAfterViewInit() {
    document.body.appendChild(this.portal.nativeElement);
  }

  ngOnDestroy() {
    if (this.portal?.nativeElement) {
      document.body.removeChild(this.portal.nativeElement);
    }
  }

  get sanitizedIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.project.icon);
  }

  closeModal() {
    this.visibleChange.emit(false);
  }
}

// Interfejs Project
export interface Project {
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  tech: string[];
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
}
