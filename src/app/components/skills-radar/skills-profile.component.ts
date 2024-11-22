import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills-profile',
  template: `
    <div class="container" [style.width]="containerWidth">
      <svg [attr.viewBox]="viewBox" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg">
            <stop offset="0%" stop-color="#1e1b4b"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </radialGradient>

          <linearGradient id="skillGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="rgba(59, 130, 246, 0.2)">
              <animate attributeName="stop-color"
                       values="rgba(59, 130, 246, 0.2);rgba(99, 102, 241, 0.2);rgba(59, 130, 246, 0.2)"
                       dur="8s"
                       repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" stop-color="rgba(37, 99, 235, 0.1)">
              <animate attributeName="stop-color"
                       values="rgba(37, 99, 235, 0.1);rgba(67, 56, 202, 0.1);rgba(37, 99, 235, 0.1)"
                       dur="8s"
                       repeatCount="indefinite"/>
            </stop>
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="hoverGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="#000000" flood-opacity="0.5"/>
          </filter>

          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1"/>
          </pattern>
        </defs>

        <!-- Background -->
        <rect x="0" y="0" [attr.width]="width" [attr.height]="height" fill="url(#bg)" [attr.rx]="borderRadius"/>
        <rect x="0" y="0" [attr.width]="width" [attr.height]="height" fill="url(#grid)" [attr.rx]="borderRadius"/>

        <!-- Title -->
        <text [attr.x]="width/2" [attr.y]="titleY" fill="white" [attr.font-size]="fontSize"
              text-anchor="middle" font-weight="bold" font-family="Arial, sans-serif"
              class="profile-title">Skills Profile
        </text>

        <!-- Main content -->
        <g [attr.transform]="'translate(' + width/2 + ',' + centerY + ')'">
          <!-- Rotating circular guidelines -->
          <g>
            <circle [attr.r]="radius" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" class="guideline">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="60s"
                repeatCount="indefinite"/>
            </circle>

            <circle [attr.r]="radius * 0.75" fill="none" stroke="rgba(255,255,255,0.09)" stroke-width="1" class="guideline">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 0 0"
                to="0 0 0"
                dur="45s"
                repeatCount="indefinite"/>
            </circle>

            <circle [attr.r]="radius * 0.5" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1" class="guideline">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="30s"
                repeatCount="indefinite"/>
            </circle>

            <circle [attr.r]="radius * 0.25" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" class="guideline">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 0 0"
                to="0 0 0"
                dur="20s"
                repeatCount="indefinite"/>
            </circle>
          </g>

          <!-- Rotating cross lines -->
          <g>
            <line [attr.x1]="-radius * 0.7" [attr.y1]="-radius * 0.7"
                  [attr.x2]="radius * 0.7" [attr.y2]="radius * 0.7"
                  stroke="rgba(255,255,255,0.12)" stroke-width="0.5" class="guideline">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="90s"
                repeatCount="indefinite"/>
            </line>
            <line [attr.x1]="-radius * 0.7" [attr.y1]="radius * 0.7"
                  [attr.x2]="radius * 0.7" [attr.y2]="-radius * 0.7"
                  stroke="rgba(255,255,255,0.12)" stroke-width="0.5" class="guideline">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="90s"
                repeatCount="indefinite"/>
            </line>
          </g>

          <!-- Skill area with gradient animation -->
          <path [attr.d]="getSkillPath()"
                fill="url(#skillGradient)"
                stroke="#3b82f6"
                stroke-width="2"
                opacity="0.7"
                class="skill-area"
                filter="url(#glow)">
            <animate attributeName="opacity"
                     values="0.6;0.8;0.6"
                     dur="4s"
                     repeatCount="indefinite"/>
          </path>

          <!-- Skill points with hover animations -->
          <g>
            <!-- Frontend point -->
            <g class="skill-point" (mouseenter)="onSkillHover('frontend')" (mouseleave)="onSkillLeave()">
              <circle [attr.cx]="-radius * 0.833" cy="0" [attr.r]="pointRadius * 1.5"
                      [class.hovered]="hoveredSkill === 'frontend'"
                      fill="#60a5fa" fill-opacity="0.3">
                <animate attributeName="r"
                         values="6;7;6"
                         dur="2s"
                         repeatCount="indefinite"/>
              </circle>
              <circle [attr.cx]="-radius * 0.833" cy="0" [attr.r]="pointRadius"
                      [class.hovered]="hoveredSkill === 'frontend'"
                      fill="#60a5fa">
                <animate attributeName="r"
                         values="4;5;4"
                         dur="2s"
                         repeatCount="indefinite"/>
              </circle>
            </g>

            <!-- Backend point -->
            <g class="skill-point" (mouseenter)="onSkillHover('backend')" (mouseleave)="onSkillLeave()">
              <circle [attr.cx]="radius * 0.625" cy="0" [attr.r]="pointRadius * 1.5"
                      [class.hovered]="hoveredSkill === 'backend'"
                      fill="#60a5fa" fill-opacity="0.3">
                <animate attributeName="r"
                         values="6;7;6"
                         dur="2s"
                         repeatCount="indefinite"
                         begin="0.5s"/>
              </circle>
              <circle [attr.cx]="radius * 0.625" cy="0" [attr.r]="pointRadius"
                      [class.hovered]="hoveredSkill === 'backend'"
                      fill="#60a5fa">
                <animate attributeName="r"
                         values="4;5;4"
                         dur="2s"
                         repeatCount="indefinite"
                         begin="0.5s"/>
              </circle>
            </g>

            <!-- UI/UX point -->
            <g class="skill-point" (mouseenter)="onSkillHover('uiux')" (mouseleave)="onSkillLeave()">
              <circle cx="0" [attr.cy]="-radius * 0.75" [attr.r]="pointRadius * 1.5"
                      [class.hovered]="hoveredSkill === 'uiux'"
                      fill="#60a5fa" fill-opacity="0.3">
                <animate attributeName="r"
                         values="6;7;6"
                         dur="2s"
                         repeatCount="indefinite"
                         begin="1s"/>
              </circle>
              <circle cx="0" [attr.cy]="-radius * 0.75" [attr.r]="pointRadius"
                      [class.hovered]="hoveredSkill === 'uiux'"
                      fill="#60a5fa">
                <animate attributeName="r"
                         values="4;5;4"
                         dur="2s"
                         repeatCount="indefinite"
                         begin="1s"/>
              </circle>
            </g>

            <!-- DevOps point -->
            <g class="skill-point" (mouseenter)="onSkillHover('devops')" (mouseleave)="onSkillLeave()">
              <circle cx="0" [attr.cy]="radius * 0.417" [attr.r]="pointRadius * 1.5"
                      [class.hovered]="hoveredSkill === 'devops'"
                      fill="#60a5fa" fill-opacity="0.3">
                <animate attributeName="r"
                         values="6;7;6"
                         dur="2s"
                         repeatCount="indefinite"
                         begin="1.5s"/>
              </circle>
              <circle cx="0" [attr.cy]="radius * 0.417" [attr.r]="pointRadius"
                      [class.hovered]="hoveredSkill === 'devops'"
                      fill="#60a5fa">
                <animate attributeName="r"
                         values="4;5;4"
                         dur="2s"
                         repeatCount="indefinite"
                         begin="1.5s"/>
              </circle>
            </g>
          </g>

          <!-- Labels -->
          <g [attr.font-size]="labelFontSize" font-family="Arial, sans-serif" font-weight="500"
             filter="url(#textShadow)" class="skill-labels">
            <text [attr.x]="-radius * labelDistanceMultiplier" y="5"
                  text-anchor="middle" fill="white"
                  [class.hovered]="hoveredSkill === 'frontend'"
                  class="skill-label">Frontend</text>
            <text [attr.x]="radius * labelDistanceMultiplier" y="5"
                  text-anchor="middle" fill="white"
                  [class.hovered]="hoveredSkill === 'backend'"
                  class="skill-label">Backend</text>
            <text x="0" [attr.y]="-radius * (labelDistanceMultiplier * 0.85)"
                  text-anchor="middle" fill="white"
                  [class.hovered]="hoveredSkill === 'uiux'"
                  class="skill-label">UI/UX</text>
            <text x="0" [attr.y]="radius * (labelDistanceMultiplier * 0.85)"
                  text-anchor="middle" fill="white"
                  [class.hovered]="hoveredSkill === 'devops'"
                  class="skill-label">DevOps</text>
          </g>
        </g>
      </svg>
    </div>
  `,
  standalone: true,
  styles: [`
    .container {
      display: block;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      aspect-ratio: 400/450;
    }

    svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .profile-title {
      transform-origin: center;
      transition: font-size 0.3s ease;
    }

    .skill-labels text {
      opacity: 1;
      transition: all 0.3s ease;
    }

    .skill-point {
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .skill-point:hover {
      transform: scale(1.2);
    }

    .skill-area {
      transition: all 0.3s ease;
    }

    .skill-area:hover {
      filter: url(#hoverGlow);
      opacity: 0.9 !important;
    }

    .guideline {
      transition: stroke-width 0.3s ease, opacity 0.3s ease;
    }

    .skill-label {
      transition: all 0.3s ease;
    }

    .skill-label.hovered {
      font-size: 120%;
      fill: #60a5fa;
      filter: url(#hoverGlow);
    }

    circle.hovered {
      fill: #93c5fd;
      filter: url(#hoverGlow);
    }
  `]
})
export class SkillsProfileComponent implements OnInit {
  width = 400;
  height = 450;
  radius = 120;
  pointRadius = 4;
  fontSize = 28;
  labelFontSize = 16;
  borderRadius = 20;
  titleY = 50;
  centerY = 225;
  labelDistanceMultiplier = 1.333;
  viewBox = `0 0 ${this.width} ${this.height}`;
  containerWidth = '100%';
  hoveredSkill: string | null = null;

  constructor() {}

  ngOnInit() {
    this.updateDimensions();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateDimensions();
  }

  private updateDimensions() {
    const containerWidth = window.innerWidth;

    if (containerWidth < 400) {
      this.fontSize = 24;
      this.labelFontSize = 16;
      this.pointRadius = 3;
      this.titleY = 40;
      this.radius = 90;
      this.centerY = 200;
      this.labelDistanceMultiplier = 1.5;
    } else if (containerWidth < 600) {
      this.fontSize = 26;
      this.labelFontSize = 15;
      this.pointRadius = 3.5;
      this.titleY = 45;
      this.radius = 100;
      this.centerY = 215;
      this.labelDistanceMultiplier = 1.4;
    } else {
      this.fontSize = 28;
      this.labelFontSize = 14;
      this.pointRadius = 4;
      this.titleY = 50;
      this.radius = 120;
      this.centerY = 225;
      this.labelDistanceMultiplier = 1.333;
    }
  }

  getSkillPath(): string {
    const frontendX = -this.radius * 0.833;
    const frontendY = 0;
    const uiuxX = 0;
    const uiuxY = -this.radius * 0.75;
    const backendX = this.radius * 0.625;
    const backendY = 0;
    const devopsX = 0;
    const devopsY = this.radius * 0.417;

    return `M ${frontendX},${frontendY} L ${uiuxX},${uiuxY} L ${backendX},${backendY} L ${devopsX},${devopsY} Z`;
  }

  onSkillHover(skill: string) {
    this.hoveredSkill = skill;
  }

  onSkillLeave() {
    this.hoveredSkill = null;
  }
}