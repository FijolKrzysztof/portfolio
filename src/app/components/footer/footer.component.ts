import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="social-section">
      <div class="content-wrapper">
        <h2 class="social-title">Let's Connect</h2>
        <div class="social-links">
          <a href="https://github.com/FijolKrzysztof" target="_blank" rel="noopener noreferrer" class="social-link">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" stroke-width="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            GitHub
          </a>
          <a href="https://linkedin.com/in/krzysztof-fijol" target="_blank" rel="noopener noreferrer" class="social-link">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" stroke-width="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .social-section {
      padding: 0 1rem;
    }

    .content-wrapper {
      max-width: 800px;
      margin: 0 auto;
      padding: 3rem;
    }

    .social-title {
      font-size: 1.75rem;
      font-weight: 600;
      color: #f8fafc;
      margin: 0 0 1.5rem;
      text-align: center;
      letter-spacing: -0.02em;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
    }

    .social-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.5rem;
      background: rgba(255, 255, 255, 0.01);
      border: 1px solid rgba(255, 255, 255, 0.03);
      border-radius: 12px;
      color: #f8fafc;
      text-decoration: none;
      font-size: 1.125rem;
      font-weight: 500;
      transition: all 0.3s ease;
      backdrop-filter: blur(20px);
    }

    .social-link:hover {
      transform: translateY(-2px);
      border-color: rgba(255, 255, 255, 0.1);
      color: #6366f1;
    }

    .social-link:hover svg {
      stroke: #6366f1;
    }

    .social-link svg {
      transition: stroke 0.3s ease;
    }

    @media (max-width: 640px) {
      .social-section {
        margin-top: 4rem;
      }

      .social-title {
        font-size: 1.5rem;
      }

      .social-links {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
      }

      .social-link {
        justify-content: center;
        font-size: 1rem;
        padding: 0.75rem 1rem;
      }
    }
  `]
})
export class FooterComponent {}
