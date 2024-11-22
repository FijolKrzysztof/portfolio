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

  controlPoints = {
    normal: {
      frontend_uiux: { x: 0, y: 0 },
      uiux_backend: { x: 0, y: 0 },
      backend_devops: { x: 0, y: 0 },
      devops_frontend: { x: 0, y: 0 }
    },
    hover: {
      frontend_uiux: { x: 0, y: 0 },
      uiux_backend: { x: 0, y: 0 },
      backend_devops: { x: 0, y: 0 },
      devops_frontend: { x: 0, y: 0 }
    }
  };

  skills = ['frontend', 'backend', 'uiux', 'devops'];
  isHovered = false;

  constructor() {}

  ngOnInit() {
    this.updateDimensions();
    this.calculatePointPositions();
    this.calculateControlPoints();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateDimensions();
    this.calculatePointPositions();
    this.calculateControlPoints();
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

  private calculateControlPoints() {
    // Normalne punkty kontrolne (mniejsze zakrzywienie)
    const normalCurve = 0.3;
    this.controlPoints.normal = {
      frontend_uiux: {
        x: (this.pointPositions.frontend.x + this.pointPositions.uiux.x) * normalCurve,
        y: (this.pointPositions.frontend.y + this.pointPositions.uiux.y) * normalCurve
      },
      uiux_backend: {
        x: (this.pointPositions.uiux.x + this.pointPositions.backend.x) * normalCurve,
        y: (this.pointPositions.uiux.y + this.pointPositions.backend.y) * normalCurve
      },
      backend_devops: {
        x: (this.pointPositions.backend.x + this.pointPositions.devops.x) * normalCurve,
        y: (this.pointPositions.backend.y + this.pointPositions.devops.y) * normalCurve
      },
      devops_frontend: {
        x: (this.pointPositions.devops.x + this.pointPositions.frontend.x) * normalCurve,
        y: (this.pointPositions.devops.y + this.pointPositions.frontend.y) * normalCurve
      }
    };

    // Punkty kontrolne dla hovera (większe zakrzywienie)
    const hoverCurve = 0.5;
    this.controlPoints.hover = {
      frontend_uiux: {
        x: (this.pointPositions.frontend.x + this.pointPositions.uiux.x) * hoverCurve,
        y: (this.pointPositions.frontend.y + this.pointPositions.uiux.y) * hoverCurve
      },
      uiux_backend: {
        x: (this.pointPositions.uiux.x + this.pointPositions.backend.x) * hoverCurve,
        y: (this.pointPositions.uiux.y + this.pointPositions.backend.y) * hoverCurve
      },
      backend_devops: {
        x: (this.pointPositions.backend.x + this.pointPositions.devops.x) * hoverCurve,
        y: (this.pointPositions.backend.y + this.pointPositions.devops.y) * hoverCurve
      },
      devops_frontend: {
        x: (this.pointPositions.devops.x + this.pointPositions.frontend.x) * hoverCurve,
        y: (this.pointPositions.devops.y + this.pointPositions.frontend.y) * hoverCurve
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
    const { frontend, uiux, backend, devops } = this.pointPositions;
    const cp = this.isHovered ? this.controlPoints.hover : this.controlPoints.normal;

    return `
      M ${frontend.x},${frontend.y}
      Q ${cp.frontend_uiux.x},${cp.frontend_uiux.y} ${uiux.x},${uiux.y}
      Q ${cp.uiux_backend.x},${cp.uiux_backend.y} ${backend.x},${backend.y}
      Q ${cp.backend_devops.x},${cp.backend_devops.y} ${devops.x},${devops.y}
      Q ${cp.devops_frontend.x},${cp.devops_frontend.y} ${frontend.x},${frontend.y}
    `;
  }

  getPointPosition(skill: string): { x: number, y: number } {
    return this.pointPositions[skill as keyof typeof this.pointPositions];
  }

  onSkillHover(skill: string) {
    this.hoveredSkill = skill;
    this.isHovered = true;
  }

  onSkillLeave() {
    this.hoveredSkill = null;
    this.isHovered = false;
  }
}
