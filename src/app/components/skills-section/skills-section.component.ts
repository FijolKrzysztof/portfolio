import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsProfileComponent } from './components/skills-radar/skills-profile.component';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule, SkillsProfileComponent],
  template: `
    <section class="skills-section">
      <div class="section-content">
        <h2 class="section-title">Technical Expertise</h2>
        <p class="section-description">
          With a comprehensive skill set spanning multiple domains, I bring full-stack mastery
          to every project. Here's how my expertise breaks down across key areas:
        </p>
        <div class="radar-container" (mouseenter)="handleHover()">
          <span class="corner-hint" [class.fade-out]="isHintHidden">Interactive</span>
          <app-skills-profile />
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills-section {
      position: sticky;
      top: 2rem;
    }

    .section-content {
      text-align: center;
    }

    .section-title {
      font-size: 2rem;
      font-weight: 600;
      color: #f8fafc;
      margin: 0 0 1.5rem;
      letter-spacing: -0.02em;
    }

    .section-description {
      font-size: 1.125rem;
      line-height: 1.6;
      color: #9ca3af;
      margin: 0 auto 3rem;
    }

    .radar-container {
      position: relative;
      width: 100%;
      background: rgba(255, 255, 255, 0.01);
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(20px);
      overflow: hidden;
    }

    .corner-hint {
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 0.75rem;
      color: #64748b;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.03);
      z-index: 1;
      animation: pulse 2s infinite;
    }

    .corner-hint.fade-out {
      animation: fadeOut 0.8s ease-out forwards;
    }

    @keyframes pulse {
      0% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.02); }
      100% { opacity: 0.4; transform: scale(1); }
    }

    @keyframes fadeOut {
      0% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(-10px) scale(0.95);
        visibility: hidden;
      }
    }

    @media (max-width: 1024px) {
      .skills-section {
        position: relative;
        top: 0;
      }

      .radar-container {
        max-width: 400px;
        margin: 0 auto;
      }
    }

    @media (max-width: 768px) {
      .section-title {
        font-size: 1.75rem;
      }

      .section-description {
        font-size: 1rem;
      }
    }
  `]
})
export class SkillsSectionComponent {
  isHintHidden = false;

  handleHover() {
    setTimeout(() => {
      this.isHintHidden = true;
    }, 2000);
  }
}
