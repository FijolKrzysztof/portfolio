import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../types/types';

@Component({
  selector: 'app-project-card',
  standalone: true,
  template: `
    <div
      class="project-card"
      [class.visible]="visible"
      [class.expanded]="expanded"
      (click)="onExpand.emit()">
      <h3 class="card-title">{{ project.title }}</h3>
      <div class="project-content" [class.expanded]="expanded">
        <p>{{ project.description }}</p>
        <div class="tech-container">
          @for (tech of project.tech; track tech) {
            <span class="tech-badge">{{ tech }}</span>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .project-card {
      background: #1a1a1a;
      border-radius: 8px;
      padding: 16px;
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
      height: auto;
    }

    .project-card:not(.expanded) {
      height: 110px;
      overflow: hidden;
    }

    .card-title {
      font-size: 1.5rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
      margin: 0 0 8px 0;
      line-height: 1.2;
    }

    .project-content {
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .project-card p {
      color: #888;
      margin: 0 0 8px 0; /* Zmniejszony margines dolny z 12px */
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
      margin-bottom: 12px; /* Większy margines w trybie rozszerzonym */
    }

    .tech-container {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin: 0; /* Usunięty margines */
    }

    .tech-badge {
      background: rgba(100, 108, 255, 0.1);
      color: #646cff;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 0.8rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    }
  `]
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Input() visible = false;
  @Input() expanded = false;
  @Output() onExpand = new EventEmitter<void>();
}
