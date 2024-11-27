import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedProjectsComponent } from './components/animated-projects/animated-projects.component';
import { SkillsProfileComponent } from './components/skills-radar/skills-profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AnimatedProjectsComponent, SkillsProfileComponent],
  template: `
    <div class="app-container">
      <header class="header">
        <h1 class="title">Developer Portfolio</h1>
        <nav class="nav">
          <a href="#skills" class="nav-link">Skills</a>
          <a href="#projects" class="nav-link">Projects</a>
        </nav>
      </header>

      <main class="main">
        <section id="skills" class="skills-section">
          <app-skills-profile />
        </section>

        <section id="projects" class="projects-section">
          <app-animated-projects />
        </section>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(to bottom, #0f172a, #1e1b4b);
      color: white;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .header {
      padding: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(8px);
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .title {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
      background: linear-gradient(to right, #60a5fa, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .nav {
      display: flex;
      gap: 1.5rem;
    }

    .nav-link {
      color: white;
      text-decoration: none;
      font-weight: 500;
      opacity: 0.8;
      transition: opacity 0.2s;

      &:hover {
        opacity: 1;
      }
    }

    .main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .skills-section {
      margin-bottom: 4rem;
    }

    .projects-section {
      padding: 2rem;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 1rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 640px) {
      .header {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        text-align: center;
      }

      .main {
        padding: 1rem;
      }

      .projects-section {
        padding: 1rem;
      }
    }
  `]
})
export class AppComponent {}
