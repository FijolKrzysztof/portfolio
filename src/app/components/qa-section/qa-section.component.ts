import { Component } from '@angular/core';

@Component({
  selector: 'app-qa-section',
  standalone: true,
  template: `
    <section class="qa-section">
      <h2 class="section-title">About Me</h2>
      <p class="section-description">
        Let me share a bit about who I am and what drives me in web development
      </p>

      <div class="qa-container">
        <div class="qa-item">
          <h3 class="qa-title">Who Am I?</h3>
          <p class="qa-content">
            I'm a web developer who finds joy in turning ideas into beautiful, functional websites.
            When I'm not coding, you'll find me pushing my boundaries - whether it's taking ice baths,
            martial arts, or traveling solo across Southeast Asia. I believe the best growth happens outside your comfort zone.
          </p>
        </div>

        <div class="qa-item">
          <h3 class="qa-title">What Makes Me Different?</h3>
          <p class="qa-content">
            I believe that great websites are born from understanding both code and people.
            While I love diving deep into technical challenges, I'm equally passionate about
            creating interfaces that feel intuitive and bring genuine value to users.
          </p>
        </div>

        <div class="qa-item">
          <h3 class="qa-title">Why Work With Me?</h3>
          <p class="qa-content">
            I take full ownership of the projects I work on. Share your vision with me, and you can
            focus on running your business while I handle the technical side. I pride myself on finding
            the right solutions and delivering results you can count on.
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
