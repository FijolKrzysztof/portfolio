import { Component } from '@angular/core';

@Component({
  selector: 'app-qa-section',
  standalone: true,
  template: `
    <section class="qa-section">
      <div class="content-wrapper">
        <div class="qa-grid">
          <div class="qa-item">
            <h2 class="qa-question">Who Am I?</h2>
            <p class="qa-answer">
              I'm a passionate full-stack developer with an insatiable drive for excellence.
              I believe in continuous growth and pushing boundaries in everything I do.
            </p>
          </div>

          <div class="qa-item">
            <h2 class="qa-question">What Makes Me Different?</h2>
            <p class="qa-answer">
              I don't just write code - I craft solutions. My unique blend of technical expertise
              and creative problem-solving allows me to tackle challenges from multiple angles.
            </p>
          </div>

          <div class="qa-item">
            <h2 class="qa-question">Why Work With Me?</h2>
            <p class="qa-answer">
              You get a dedicated professional who treats your project as their own.
              I bring the expertise of an entire IT department with the efficiency of a single point of contact.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .qa-section {
      margin: 0 auto;
      padding: 0 1rem;
    }

    .content-wrapper {
      max-width: 800px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.01);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.03);
      padding: 3rem;
    }

    .qa-item:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      padding-bottom: 2.5rem;
    }

    .qa-question {
      font-size: 1.75rem;
      font-weight: 600;
      color: #f8fafc;
      margin: 0 0 1rem;
      letter-spacing: -0.02em;
    }

    .qa-answer {
      font-size: 1.125rem;
      line-height: 1.6;
      color: #94a3b8;
      margin: 0;
    }

    @media (max-width: 768px) {
      .content-wrapper {
        padding: 2rem;
      }

      .qa-item:not(:last-child) {
        padding-bottom: 2rem;
      }

      .qa-question {
        font-size: 1.5rem;
      }

      .qa-answer {
        font-size: 1rem;
      }
    }

    @media (max-width: 640px) {
      .content-wrapper {
        padding: 1.5rem;
      }
    }
  `]
})
export class QASectionComponent {}
