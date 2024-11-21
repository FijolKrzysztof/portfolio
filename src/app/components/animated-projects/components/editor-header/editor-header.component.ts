import { Component } from '@angular/core';

@Component({
  selector: 'app-editor-header',
  standalone: true,
  template: `
    <div class="editor-header">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  `,
  styles: [`
    .editor-header {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .dot:nth-child(1) { background: #ff5f56; }
    .dot:nth-child(2) { background: #ffbd2e; }
    .dot:nth-child(3) { background: #27c93f; }
  `]
})
export class EditorHeaderComponent {}
