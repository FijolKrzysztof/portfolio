import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedProjectsComponent } from './components/animated-projects/animated-projects.component';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule, AnimatedProjectsComponent],
  template: `
    <section id="projects" class="projects-section">
      <h2 class="section-title">Featured Projects</h2>
      <p class="section-description">
        Here are some of my recent projects that showcase my technical capabilities
        and problem-solving approach:
      </p>
      <app-animated-projects />
    </section>
  `,
  styles: [`
    .projects-section {
      width: 100%;
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
export class ProjectsSectionComponent {}
