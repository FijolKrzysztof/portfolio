import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedProjectsComponent } from './components/animated-projects/animated-projects.component';
import { SkillsProfileComponent } from './components/skills-radar/skills-profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AnimatedProjectsComponent, SkillsProfileComponent],
  template: `
    <div class="portfolio-container">
      <div class="gradient-overlay"></div>
      <main class="main-content">
        <section class="hero-section">
          <h1 class="main-title">Need an IT Department?</h1>
          <h2 class="sub-title">I'm Your One-Person Solution</h2>
          <p class="intro-text">
            From design to deployment, frontend to backend, I handle every aspect of web development.
            Why hire a whole department when you can have one expert who does it all?
          </p>
        </section>

        <section class="skills-section">
          <div class="section-content">
            <h2 class="section-title">Technical Expertise</h2>
            <p class="section-description">
              With a comprehensive skill set spanning multiple domains, I bring full-stack mastery
              to every project. Here's how my expertise breaks down across key areas:
            </p>
            <div class="radar-container">
              <app-skills-profile />
            </div>
          </div>
        </section>

        <section id="projects" class="projects-section">
          <app-animated-projects />
        </section>
      </main>
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
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 2rem;
      position: relative;
    }

    .hero-section {
      margin-bottom: 6rem;
      max-width: 800px;
      padding: 0 1rem;
    }

    .main-title {
      font-size: 3rem;
      font-weight: 700;
      background: linear-gradient(135deg, #fff 0%, #d1d5db 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0;
      line-height: 1.2;
      letter-spacing: -0.02em;
    }

    .sub-title {
      font-size: 2rem;
      font-weight: 600;
      color: #6366f1;
      margin: 1.5rem 0;
      letter-spacing: -0.01em;
    }

    .intro-text {
      font-size: 1.25rem;
      line-height: 1.6;
      color: #9ca3af;
      margin: 0;
      max-width: 650px;
    }

    .skills-section {
      margin-bottom: 6rem;
    }

    .section-content {
      text-align: center;
      max-width: 1000px;
      margin: 0 auto;
    }

    .section-title {
      font-size: 2.25rem;
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
      max-width: 700px;
    }

    .radar-container {
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.01);
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(20px);
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 3rem 1rem;
      }

      .hero-section {
        margin-bottom: 4rem;
      }

      .main-title {
        font-size: 2.5rem;
      }

      .sub-title {
        font-size: 1.75rem;
      }

      .intro-text {
        font-size: 1.125rem;
      }

      .section-title {
        font-size: 2rem;
      }

      .section-description {
        font-size: 1rem;
      }
    }
  `]
})
export class AppComponent {}
