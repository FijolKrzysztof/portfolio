import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartButtonComponent } from './components/start-button.component';
import { CodeSectionComponent } from './components/code-section.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { Project, ProjectKey, ProjectSection } from '../../../../types/types';
import { PROJECTS } from '../../../../data/projects';

@Component({
  selector: 'app-animated-projects',
  standalone: true,
  imports: [
    CommonModule,
    StartButtonComponent,
    CodeSectionComponent,
    ProjectCardComponent
  ],
  template: `
    <div class="projects-container" (click)="skipAnimation($event)">
      <app-start-button
        *ngIf="!isStarted"
        (onClick)="startAnimation()"
      />

      <div class="container" [class.visible]="isStarted">
        <div class="code-editor">
          <div class="animation-container">
            @for (section of projectSections; track section.id) {
              <div class="section-wrapper" [style.height.px]="section.height">
                <app-code-section
                  [visibleLines]="section.visibleLines"
                  [isTransforming]="section.isTransforming"
                />
                @if (section.project) {
                  <app-project-card
                    [project]="section.project"
                    [visible]="section.showCard"
                    [expanded]="section.isExpanded"
                    (onExpand)="expandProject(section)"
                  />
                }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .projects-container {
      width: 100%;
      color: #f8fafc;
    }

    .container {
      width: 100%;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      margin: 0 auto;
    }

    .container.visible {
      opacity: 1;
      visibility: visible;
    }

    .code-editor {
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.01);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 24px;
      border: 1px solid rgba(255, 255, 255, 0.03);
      width: 100%;
    }

    .animation-container {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .section-wrapper {
      position: relative;
      min-height: 50px;
      transition: height 0.3s ease;
      margin-bottom: 40px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    @media (max-width: 1024px) {
      .code-editor {
        padding: 20px;
      }
    }

    @media (max-width: 640px) {
      .code-editor {
        padding: 16px;
      }

      .section-wrapper {
        margin-bottom: 24px;
      }
    }
  `]
})
export class AnimatedProjectsComponent implements OnInit {
  isStarted = false;
  projectSections: ProjectSection[] = [];
  private shouldSkip = false;
  private isAnimating = false;

  private readonly projects: Record<ProjectKey, Project> = PROJECTS;

  ngOnInit() {
    this.projectSections = Object.keys(this.projects).map((key, index) => ({
      id: index,
      visibleLines: [],
      height: 0,
      isTransforming: false,
      showCard: false,
      isExpanded: false,
      project: null
    }));
  }

  skipAnimation(event: MouseEvent) {
    if (event.target instanceof Element &&
      (event.target.closest('button.start-button') || !this.isStarted || !this.isAnimating)) {
      return;
    }

    event.stopPropagation();
    this.shouldSkip = true;
  }

  async startAnimation() {
    this.isStarted = true;
    this.shouldSkip = false;
    this.isAnimating = true;

    for (const [key, project] of Object.entries(this.projects)) {
      const sectionIndex = Object.keys(this.projects).indexOf(key);

      if (this.shouldSkip) {
        await this.finishAllAnimations();
        break;
      }

      await this.typeCode(project, sectionIndex);
      if (this.shouldSkip) {
        await this.finishAllAnimations();
        break;
      }

      await this.sleep(200);
      if (this.shouldSkip) {
        await this.finishAllAnimations();
        break;
      }

      await this.transformToCard(project, sectionIndex);
      if (this.shouldSkip) {
        await this.finishAllAnimations();
        break;
      }

      await this.sleep(300);
    }

    this.isAnimating = false;
  }

  private async finishAllAnimations() {
    const projects = Object.entries(this.projects);

    for (const [key, project] of projects) {
      const sectionIndex = Object.keys(this.projects).indexOf(key);
      const section = this.projectSections[sectionIndex];
      if (!section.showCard) {
        section.height = project.lines.length * 17;
        section.visibleLines = project.lines.map(line => ({ ...line, isVisible: true }));
      }
    }

    for (const [key, project] of projects) {
      const sectionIndex = Object.keys(this.projects).indexOf(key);
      const section = this.projectSections[sectionIndex];

      if (!section.showCard) {
        section.isTransforming = true;
        section.project = project;
        await this.sleep(50);
        section.showCard = true;
        section.height = 120;
        await this.sleep(100);
      }
    }

    this.isAnimating = false;
    this.shouldSkip = false;
  }

  expandProject(section: ProjectSection) {
    if (!section.showCard) return;

    section.isExpanded = !section.isExpanded;
    section.height = section.isExpanded ? 140 : 120;
  }

  private async typeCode(project: Project, sectionIndex: number) {
    const section = this.projectSections[sectionIndex];
    section.height = project.lines.length * 17;

    for (const line of project.lines) {
      if (this.shouldSkip) break;

      const newLine = { ...line, isVisible: false };
      section.visibleLines = [...section.visibleLines, newLine];

      if (!this.shouldSkip) {
        for (let i = 0; i <= line.text.length; i++) {
          if (this.shouldSkip) break;
          await this.sleep(Math.random() * 5 + 2);
        }
      }

      section.visibleLines[section.visibleLines.length - 1].isVisible = true;
      if (!this.shouldSkip) {
        await this.sleep(10);
      }
    }
  }

  private async transformToCard(project: Project, sectionIndex: number) {
    const section = this.projectSections[sectionIndex];
    section.isTransforming = true;
    section.project = project;

    if (!this.shouldSkip) {
      await this.sleep(150);
    }
    section.showCard = true;

    if (!this.shouldSkip) {
      await this.sleep(250);
    }
    section.height = 120;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
