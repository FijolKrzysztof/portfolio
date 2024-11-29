import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero-section">
      <h1 class="main-title">Need an IT Department?</h1>
      <h2 class="sub-title">I'm Your One-Person Solution</h2>
      <p class="intro-text">
        From design to deployment, frontend to backend, I handle every aspect of web development.
        Why hire a whole department when you can have one expert who does it all?
      </p>
    </section>
  `,
  styles: [`
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

    @media (max-width: 768px) {
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
    }
  `]
})
export class HeroComponent {}
