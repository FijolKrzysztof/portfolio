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
            <stop offset="0%" stop-color="rgba(59, 130, 246, 0.2)"/>
            <stop offset="100%" stop-color="rgba(37, 99, 235, 0.1)"/>
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
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
          <!-- Circular guidelines -->
          <circle [attr.r]="radius" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
          <circle [attr.r]="radius * 0.75" fill="none" stroke="rgba(255,255,255,0.09)" stroke-width="1"/>
          <circle [attr.r]="radius * 0.5" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
          <circle [attr.r]="radius * 0.25" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>

          <!-- Cross lines -->
          <line [attr.x1]="0" [attr.y1]="-radius" [attr.x2]="0" [attr.y2]="radius"
                stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>
          <line [attr.x1]="-radius" [attr.y1]="0" [attr.x2]="radius" [attr.y2]="0"
                stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>

          <!-- Skill points -->
          <g fill="#60a5fa" filter="url(#glow)">
            <circle [attr.cx]="-radius * 0.833" cy="0" [attr.r]="pointRadius * 1.5" fill-opacity="0.3"/>
            <circle [attr.cx]="-radius * 0.833" cy="0" [attr.r]="pointRadius"/>
            <circle [attr.cx]="radius * 0.625" cy="0" [attr.r]="pointRadius * 1.5" fill-opacity="0.3"/>
            <circle [attr.cx]="radius * 0.625" cy="0" [attr.r]="pointRadius"/>
            <circle cx="0" [attr.cy]="-radius * 0.75" [attr.r]="pointRadius * 1.5" fill-opacity="0.3"/>
            <circle cx="0" [attr.cy]="-radius * 0.75" [attr.r]="pointRadius"/>
            <circle cx="0" [attr.cy]="radius * 0.417" [attr.r]="pointRadius * 1.5" fill-opacity="0.3"/>
            <circle cx="0" [attr.cy]="radius * 0.417" [attr.r]="pointRadius"/>
          </g>

          <!-- Skill area -->
          <path [attr.d]="getSkillPath()"
                fill="url(#skillGradient)"
                stroke="#3b82f6"
                stroke-width="2"
                opacity="0.7"
                filter="url(#glow)">
            <animate attributeName="opacity"
                     values="0.5;0.7;0.5"
                     dur="3s"
                     repeatCount="indefinite"/>
          </path>

          <!-- Labels -->
          <g [attr.font-size]="labelFontSize" font-family="Arial, sans-serif" font-weight="500"
             filter="url(#textShadow)" class="skill-labels">
            <text [attr.x]="-radius * labelDistanceMultiplier" y="5" text-anchor="middle" fill="white">Frontend</text>
            <text [attr.x]="radius * labelDistanceMultiplier" y="5" text-anchor="middle" fill="white">Backend</text>
            <text x="0" [attr.y]="-radius * (labelDistanceMultiplier * 0.85)" text-anchor="middle" fill="white">UI/UX</text>
            <text x="0" [attr.y]="radius * (labelDistanceMultiplier * 0.85)" text-anchor="middle" fill="white">DevOps</text>
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
  `]
})
export class SkillsProfileComponent implements OnInit {
  // Basic dimensions
  width = 400;
  height = 450;
  radius = 120;
  pointRadius = 4;
  fontSize = 28;
  labelFontSize = 16;
  borderRadius = 20;
  titleY = 50;
  centerY = 225;
  labelDistanceMultiplier = 1.333; // Nowa zmienna do kontrolowania odległości etykiet
  viewBox = `0 0 ${this.width} ${this.height}`;
  containerWidth = '100%';

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
      // Bardzo małe ekrany
      this.fontSize = 24;
      this.labelFontSize = 16;
      this.pointRadius = 3;
      this.titleY = 40;
      this.radius = 90;
      this.centerY = 200;
      this.labelDistanceMultiplier = 1.5; // Większa odległość etykiet na małych ekranach
    } else if (containerWidth < 600) {
      // Małe ekrany
      this.fontSize = 26;
      this.labelFontSize = 15;
      this.pointRadius = 3.5;
      this.titleY = 45;
      this.radius = 100;
      this.centerY = 215;
      this.labelDistanceMultiplier = 1.4; // Średnia odległość etykiet
    } else {
      // Większe ekrany
      this.fontSize = 28;
      this.labelFontSize = 14;
      this.pointRadius = 4;
      this.titleY = 50;
      this.radius = 120;
      this.centerY = 225;
      this.labelDistanceMultiplier = 1.333; // Oryginalna odległość etykiet
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
}
