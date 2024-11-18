import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeLine } from '../../types/types';

@Component({
  selector: 'app-code-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-section" [class.transforming]="isTransforming">
      <div class="transform-overlay" [class.active]="isTransforming"></div>
      @for (line of visibleLines; track line) {
        <div class="code-line" [class.visible]="line.isVisible">
          <span [class]="line.class">{{ line.text }}</span>
        </div>
      }
    </div>
  `,
  styles: [`
    .code-section {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 16px;
      border-radius: 8px;
      transition: all 0.3s ease;
      background: transparent;
      z-index: 1;
      font-size: 14px;
      line-height: 1.5;
      height: fit-content;
      display: flex;
      flex-direction: column;
    }

    .code-line {
      min-height: 24px;
      opacity: 0;
      transform: translateY(5px);
      transition: all 0.2s ease;
      white-space: pre;
      font-family: 'Monaco', 'Menlo', monospace;
      display: flex;
      align-items: center;
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

    .transform-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: calc(100% - 32px);
      background: rgba(100, 108, 255, 0.1);
      transform-origin: left;
      transform: scaleX(0);
      z-index: 3;
      border-radius: 8px;
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
export class CodeSectionComponent {
  @Input() visibleLines: CodeLine[] = [];
  @Input() isTransforming = false;
}
