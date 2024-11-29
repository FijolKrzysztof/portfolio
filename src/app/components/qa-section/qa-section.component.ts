import { Component } from '@angular/core';

@Component({
  selector: 'app-qa-section',
  standalone: true,
  template: `
    <section class="qa-section">
      <h2 class="section-title">About Me</h2>
      <p class="section-description">
        Learn more about my approach to development and what makes me stand out
      </p>

      <div class="qa-container">
        <div class="qa-item">
          <h3 class="qa-title">Who Am I?</h3>
          <p class="qa-content">
            I'm a passionate full-stack developer with an insatiable drive for excellence.
            I believe in continuous growth and pushing boundaries in everything I do.
          </p>
        </div>

        <div class="qa-item">
          <h3 class="qa-title">What Makes Me Different?</h3>
          <p class="qa-content">
            I don't just write code - I craft solutions. My unique blend of technical expertise
            and creative problem-solving allows me to tackle challenges from multiple angles.
          </p>
        </div>

        <div class="qa-item">
          <h3 class="qa-title">Why Work With Me?</h3>
          <p class="qa-content">
            You get a dedicated professional who treats your project as their own.
            I bring the expertise of an entire IT department with the efficiency of a single point of contact.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .qa-section {
      width: 100%;
      padding: 0 1rem;
    }

    .section-title {
      font-size: 2rem;
      font-weight: 600;
      color: #f8fafc;
      margin: 0 0 1rem;
      letter-spacing: -0.02em;
      text-align: center;
    }

    .section-description {
      font-size: 1.125rem;
      line-height: 1.6;
      color: #9ca3af;
      margin: 0 0 3rem;
      text-align: center;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .qa-container {
      max-width: 800px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.01);
      border: 1px solid rgba(255, 255, 255, 0.03);
      border-radius: 24px;
      backdrop-filter: blur(20px);
      padding: 2rem;
    }

    .qa-item {
      padding: 2rem 0;
    }

    .qa-item:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    }

    .qa-item:first-child {
      padding-top: 0;
    }

    .qa-item:last-child {
      padding-bottom: 0;
    }

    .qa-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #f8fafc;
      margin: 0 0 1rem;
      letter-spacing: -0.02em;
    }

    .qa-content {
      font-size: 1.125rem;
      line-height: 1.6;
      color: #94a3b8;
      margin: 0;
      max-width: 650px;
    }

    @media (max-width: 768px) {
      .qa-section {
        margin-bottom: 4rem;
      }

      .section-title {
        font-size: 1.75rem;
      }

      .section-description {
        font-size: 1rem;
      }

      .qa-container {
        padding: 1.5rem;
      }

      .qa-item {
        padding: 1.5rem 0;
      }

      .qa-title {
        font-size: 1.25rem;
      }

      .qa-content {
        font-size: 1rem;
      }
    }
  `]
})
export class QASectionComponent {}
