import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { SkillsSectionComponent } from './components/skills-section/skills-section.component';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { QASectionComponent } from './components/qa-section/qa-section.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    SkillsSectionComponent,
    ProjectsSectionComponent,
    QASectionComponent,
    FooterComponent
  ],
  template: `
    <div class="portfolio-container">
      <div class="gradient-overlay"></div>
      <main class="main-content">
        <app-hero />
        <div class="two-column-layout">
          <app-skills-section />
          <app-projects-section />
        </div>
        <app-qa-section />
      </main>
      <app-footer />
    </div>
  `,
  styles: [`
    .portfolio-container {
      min-height: 100vh;
      background: #161616;
      position: relative;
      color: #e2e8f0;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      overflow: hidden;
    }

    .gradient-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background:
        radial-gradient(circle at 15% 15%, rgba(45, 45, 45, 0.1) 0%, transparent 35%),
        radial-gradient(circle at 85% 85%, rgba(45, 45, 45, 0.1) 0%, transparent 35%);
      pointer-events: none;
    }

    .main-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 4rem 2rem;
      position: relative;
    }

    .two-column-layout {
      display: grid;
      grid-template-columns: minmax(300px, 400px) 1fr;
      gap: 4rem;
      align-items: start;
      margin-bottom: 6rem;
    }

    @media (max-width: 1024px) {
      .two-column-layout {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 3rem 1rem;
      }
    }

    @media (max-width: 640px) {
      .main-content {
        padding: 2rem 1rem;
      }
    }
  `]
})
export class AppComponent {}
