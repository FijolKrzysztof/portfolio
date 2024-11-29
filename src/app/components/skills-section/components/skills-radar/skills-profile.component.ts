import { Component, HostListener, OnInit, ElementRef } from '@angular/core';
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
  height = 350;
  radius = 120;
  pointRadius = 4;
  fontSize = 28;
  labelFontSize = 16;
  borderRadius = 20;
  centerY = 175;
  labelDistanceMultiplier = 1.333;
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

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // this.updateDimensions();
    // Inicjalne ustawienie po załadowaniu komponentu
    setTimeout(() => {
      this.adjustToContainer();
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustToContainer();
  }

  private adjustToContainer() {
    const container = this.elementRef.nativeElement.parentElement;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Zachowujemy proporcje 400:450
    const aspectRatio = 350/400;

    if (containerWidth * aspectRatio <= containerHeight) {
      // Szerokość jest ograniczeniem
      this.width = containerWidth;
      this.height = containerWidth * aspectRatio;
    } else {
      // Wysokość jest ograniczeniem
      this.height = containerHeight;
      this.width = containerHeight / aspectRatio;
    }

    // Skalujemy pozostałe wymiary proporcjonalnie
    const scale = this.width / 400; // 400 to bazowa szerokość
    this.radius = 120 * scale;
    this.pointRadius = 4 * scale;
    this.fontSize = 28 * scale;
    this.labelFontSize = 14 * Math.max(scale, 0.8); // Ograniczamy maksymalny rozmiar czcionki
    this.centerY = this.height / 2;

    // Aktualizujemy pozycje punktów i punktów kontrolnych
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
        x: this.radius * 0.72,
        y: 0
      },
      uiux: {
        x: 0,
        y: -this.radius * 0.64
      },
      devops: {
        x: 0,
        y: this.radius * 0.50
      }
    };
  }

  private calculateControlPoints() {
    // Normalne punkty kontrolne
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

    // Punkty kontrolne dla hovera
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
