import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-start-button',
  standalone: true,
  template: `
    <button class="start-button" (click)="onClick.emit()">
      <span class="button-text">Show My Projects</span>
      <svg
        class="arrow-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </button>
  `,
  styles: [`
    .start-button {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0 auto 32px;
      padding: 12px 24px;
      background: rgba(255, 255, 255, 0.01);
      border: 1px solid rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(20px);
      color: #f8fafc;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      border-radius: 12px;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .button-text {
      position: relative;
      top: 1px;
    }

    .arrow-icon {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .start-button:hover {
      border-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }

    .start-button:hover .arrow-icon {
      transform: translateX(4px);
    }

    .start-button:active {
      transform: translateY(0);
    }

    @media (max-width: 640px) {
      .start-button {
        padding: 10px 20px;
        font-size: 0.875rem;
        margin-bottom: 24px;
      }

      .arrow-icon {
        width: 18px;
        height: 18px;
      }
    }
  `]
})
export class StartButtonComponent {
  @Output() onClick = new EventEmitter<void>();
}
