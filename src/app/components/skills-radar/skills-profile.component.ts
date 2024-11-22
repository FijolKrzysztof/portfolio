import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills-profile',
  templateUrl: './skills-profile.component.html',
  styleUrls: ['./skills-profile.component.scss'],
  standalone: true,
  imports: [CommonModule]
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
  pointPositions = {
    frontend: { x: 0, y: 0 },
    backend: { x: 0, y: 0 },
    uiux: { x: 0, y: 0 },
    devops: { x: 0, y: 0 }
  };

  skills = ['frontend', 'backend', 'uiux', 'devops'];

  constructor() {}

  ngOnInit() {
    this.updateDimensions();
    this.calculatePointPositions();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateDimensions();
    this.calculatePointPositions();
  }

  private calculatePointPositions() {
    this.pointPositions = {
      frontend: {
        x: -this.radius * 0.833,
        y: 0
      },
      backend: {
        x: this.radius * 0.625,
        y: 0
      },
      uiux: {
        x: 0,
        y: -this.radius * 0.75
      },
      devops: {
        x: 0,
        y: this.radius * 0.417
      }
    };
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
    const frontendX = this.pointPositions.frontend.x;
    const frontendY = this.pointPositions.frontend.y;
    const uiuxX = this.pointPositions.uiux.x;
    const uiuxY = this.pointPositions.uiux.y;
    const backendX = this.pointPositions.backend.x;
    const backendY = this.pointPositions.backend.y;
    const devopsX = this.pointPositions.devops.x;
    const devopsY = this.pointPositions.devops.y;

    return `M ${frontendX},${frontendY} L ${uiuxX},${uiuxY} L ${backendX},${backendY} L ${devopsX},${devopsY} Z`;
  }

  getPointPosition(skill: string): { x: number, y: number } {
    if (this.hoveredSkill !== skill) {
      return this.pointPositions[skill as keyof typeof this.pointPositions];
    }

    const basePos = this.pointPositions[skill as keyof typeof this.pointPositions];
    const moveFactor = 15; // stała wartość przesunięcia w pikselach

    console.log('movement', skill, basePos, moveFactor)

    switch(skill) {
      case 'uiux':
        return { x: basePos.x, y: basePos.y - moveFactor };
      case 'devops':
        return { x: basePos.x, y: basePos.y + moveFactor };
      case 'frontend':
        return { x: basePos.x - moveFactor, y: basePos.y };
      case 'backend':
        return { x: basePos.x + moveFactor, y: basePos.y };
      default:
        return basePos;
    }
  }

  onSkillHover(skill: string) {
    this.hoveredSkill = skill;
  }

  onSkillLeave() {
    this.hoveredSkill = null;
  }
}
