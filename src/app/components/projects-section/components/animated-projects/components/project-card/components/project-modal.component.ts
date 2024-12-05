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
            <div class="modal-fragment"></div>
            <div class="modal-fragment"></div>
            <div class="modal-fragment"></div>
            <div class="modal-fragment"></div>
            <div class="modal-fragment"></div>
            <div class="modal-fragment"></div>
            <div class="modal-fragment"></div>
            <div class="modal-fragment"></div>
            <div class="modal-fragment"></div>
            <div class="modal-fragment"></div>
            <div class="modal-fragment"></div>
            <div class="modal-fragment"></div>
            <div class="modal-fragment"></div>
            <div class="modal-fragment"></div>
            <div class="modal-fragment"></div>
            <div class="modal-fragment"></div>

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
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0);
      backdrop-filter: blur(0);
      z-index: 1000;
      display: grid;
      place-items: center;
      animation: backdropReveal 0.6s forwards cubic-bezier(0.33, 1, 0.68, 1);
    }

    .modal-content {
      width: min(800px, 90vw);
      height: min(90vh, 100%);
      position: relative;
      overflow: hidden;
      border-radius: 16px;
      background: transparent;
    }

    .modal-fragment {
      position: absolute;
      background: #1a1b1e;
      border: 1px solid rgba(255, 255, 255, 0.1);
      width: 25%;
      height: 25%;
      z-index: 1;
      transform-origin: center center;
      opacity: 0;
    }

    /* Pozycje fragmentów */
    .modal-fragment:nth-child(1) { top: 0; left: 0; }
    .modal-fragment:nth-child(2) { top: 0; left: 25%; }
    .modal-fragment:nth-child(3) { top: 0; left: 50%; }
    .modal-fragment:nth-child(4) { top: 0; left: 75%; }
    .modal-fragment:nth-child(5) { top: 25%; left: 0; }
    .modal-fragment:nth-child(6) { top: 25%; left: 25%; }
    .modal-fragment:nth-child(7) { top: 25%; left: 50%; }
    .modal-fragment:nth-child(8) { top: 25%; left: 75%; }
    .modal-fragment:nth-child(9) { top: 50%; left: 0; }
    .modal-fragment:nth-child(10) { top: 50%; left: 25%; }
    .modal-fragment:nth-child(11) { top: 50%; left: 50%; }
    .modal-fragment:nth-child(12) { top: 50%; left: 75%; }
    .modal-fragment:nth-child(13) { top: 75%; left: 0; }
    .modal-fragment:nth-child(14) { top: 75%; left: 25%; }
    .modal-fragment:nth-child(15) { top: 75%; left: 50%; }
    .modal-fragment:nth-child(16) { top: 75%; left: 75%; }

    @keyframes fragmentAppear {
      0% {
        opacity: 0;
        transform: scale(0.3) rotate(45deg);
      }
      50% {
        opacity: 0.7;
        transform: scale(1.1) rotate(-5deg);
      }
      100% {
        opacity: 1;
        transform: scale(1) rotate(0);
      }
    }

    /* Perfekcyjnie równa przekątna */
    .modal-fragment:nth-child(1) { animation: fragmentAppear 0.6s 0.1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }   /* Przekątna 0 */
    .modal-fragment:nth-child(2),
    .modal-fragment:nth-child(5) { animation: fragmentAppear 0.6s 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }   /* Przekątna 1 */
    .modal-fragment:nth-child(3),
    .modal-fragment:nth-child(6),
    .modal-fragment:nth-child(9) { animation: fragmentAppear 0.6s 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }   /* Przekątna 2 */
    .modal-fragment:nth-child(4),
    .modal-fragment:nth-child(7),
    .modal-fragment:nth-child(10),
    .modal-fragment:nth-child(13) { animation: fragmentAppear 0.6s 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }  /* Przekątna 3 */
    .modal-fragment:nth-child(8),
    .modal-fragment:nth-child(11),
    .modal-fragment:nth-child(14) { animation: fragmentAppear 0.6s 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }  /* Przekątna 4 */
    .modal-fragment:nth-child(12),
    .modal-fragment:nth-child(15) { animation: fragmentAppear 0.6s 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }  /* Przekątna 5 */
    .modal-fragment:nth-child(16) { animation: fragmentAppear 0.6s 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }  /* Przekątna 6 */

    /* Animacja modala po przekątnej */
    .modal-inner {
      position: relative;
      z-index: 2;
      height: 100%;
      display: flex;
      flex-direction: column;
      background: #1a1b1e;
      opacity: 0;
      clip-path: polygon(0 0, 0 0, 0 0, 0 0);
      animation: diagonalReveal 1s 0.5s forwards ease-out;
    }

    @keyframes diagonalReveal {
      0% {
        opacity: 0;
        clip-path: polygon(0 0, 0 0, 0 0, 0 0);
      }
      20% {
        opacity: 1;
        clip-path: polygon(0 0, 25% 0, 25% 25%, 0 25%);
      }
      40% {
        clip-path: polygon(0 0, 50% 0, 50% 50%, 0 50%);
      }
      60% {
        clip-path: polygon(0 0, 75% 0, 75% 75%, 0 75%);
      }
      80% {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
      100% {
        opacity: 1;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
    }

    /* Header Styles */
    .modal-header {
      padding: 24px;
      display: flex;
      gap: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
      align-items: center;
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
      width: 64px;
      height: 64px;
      background: #212226;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .header-content {
      flex: 1;
      min-width: 0;
    }

    .modal-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
      color: #fff;
    }

    .modal-subtitle {
      color: #94a3b8;
      margin: 8px 0 0;
      font-size: 0.95rem;
    }

    /* Body Styles */
    .modal-body {
      padding: 24px;
      flex: 1;
      overflow-y: auto;
    }

    .description-section,
    .technologies-section,
    .features-section {
      margin-bottom: 28px;
    }

    h3 {
      color: #fff;
      font-size: 1.1rem;
      margin: 0 0 16px;
      font-weight: 600;
    }

    .full-description {
      color: #94a3b8;
      line-height: 1.7;
      font-size: 0.95rem;
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
      transform: translateY(-1px);
      background: #2a2b31;
    }

    .features-list {
      list-style: none;
      padding: 0;
      margin: 0;
      color: #94a3b8;
    }

    .features-list li {
      margin-bottom: 8px;
      padding-left: 24px;
      position: relative;
    }

    .features-list li::before {
      content: "→";
      position: absolute;
      left: 0;
      color: #818cf8;
    }

    /* Footer Styles */
    .modal-footer {
      padding: 20px 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }

    .action-button {
      display: inline-flex;
      align-items: center;
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

    /* Scrollbar Styles */
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

    /* Animations */
    @keyframes mergeFragment {
      0% {
        transform: scale(0) rotate(45deg);
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: scale(1) rotate(0);
        opacity: 1;
      }
    }

    @keyframes backdropReveal {
      0% {
        background: rgba(0, 0, 0, 0);
        backdrop-filter: blur(0);
      }
      100% {
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(8px);
      }
    }

    /* Responsive Styles */
    @media (max-width: 640px) {
      .modal-header {
        padding: 20px;
      }

      .icon {
        width: 48px;
        height: 48px;
        padding: 8px;
      }

      .modal-title {
        font-size: 1.25rem;
      }

      .modal-body {
        padding: 20px;
      }

      .modal-footer {
        padding: 16px 20px;
        flex-direction: column;
      }

      .action-button {
        width: 100%;
        justify-content: center;
      }
    }
  `]
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
