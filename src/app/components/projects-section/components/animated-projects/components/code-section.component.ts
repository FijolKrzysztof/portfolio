import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeLine } from '../../../../../types/types';

@Component({
  selector: 'app-code-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-section" [class.transforming]="isTransforming()" [class.hidden]="isTransforming()">
      <div class="transform-overlay" [class.active]="isTransforming()"></div>
      @for (line of visibleLines(); track line) {
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
      padding: 12px;
      border-radius: 8px;
      transition: all 0.3s ease;
      background: transparent;
      z-index: 1;
      font-size: 12px;
      line-height: 1.2;
      height: fit-content;
      display: flex;
      flex-direction: column;
    }

    .code-section.hidden {
      pointer-events: none;
      visibility: hidden;
    }

    .code-line {
      min-height: 16px;
      opacity: 0;
      transform: translateY(3px);
      transition: all 0.2s ease;
      white-space: pre;
      font-family: 'Monaco', 'Menlo', monospace;
      display: flex;
      align-items: center;
      padding: 0 0 1px;
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
      height: calc(100% - 24px);
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
  visibleLines = input<CodeLine[]>([]);
  isTransforming = input<boolean>(false);
}
