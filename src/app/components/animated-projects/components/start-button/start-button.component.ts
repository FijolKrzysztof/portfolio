import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-start-button',
  standalone: true,
  template: `
    <button class="start-button" (click)="onClick.emit()">
      Show My Projects >
    </button>
  `,
  styles: [`
    .start-button {
      display: block;
      margin: 40px auto;
      padding: 16px 32px;
      background: transparent;
      border: 1px solid #646cff;
      color: #646cff;
      font-size: 1.2rem;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .start-button:hover {
      background: #646cff;
      color: #fff;
      transform: scale(1.05);
    }
  `]
})
export class StartButtonComponent {
  @Output() onClick = new EventEmitter<void>();
}
