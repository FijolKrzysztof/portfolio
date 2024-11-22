import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills-profile',
  templateUrl: 'skills-profile.component.html',
  styleUrl: 'skills-profile.component.scss',
  standalone: true
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
