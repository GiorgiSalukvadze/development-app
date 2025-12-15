import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Floor, Unit } from '../../models/property.models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-floor-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './floor-view.component.html',
  styleUrl: './floor-view.component.scss'
})
export class FloorViewComponent implements OnInit {
  @Input() floor!: Floor;
  @Output() unitSelected = new EventEmitter<Unit>();
  @Output() goBack = new EventEmitter<void>();

  hoveredUnit: Unit | null = null;
  tappedUnit: Unit | null = null;
  mousePosition: { x: number; y: number } = { x: 0, y: 0 };

  ngOnInit(): void {
    // Clean up units on initialization
    this.cleanUpUnits();
  }

  private cleanUpUnits(): void {
    if (!this.floor?.units) return;
    
    // Remove units with invalid polygon data
    this.floor.units = this.floor.units.filter(unit => {
      // Check if polygonPoints is valid
      if (!unit.polygonPoints || unit.polygonPoints.trim() === '') {
        return false; // Remove units without polygon points
      }
      
      // Check if polygonPoints has valid coordinates
      const points = unit.polygonPoints.split(' ').filter(p => p.trim() !== '');
      if (points.length < 3) {
        return false; // Remove units with less than 3 points (not a polygon)
      }
      
      // Check if coordinates are valid numbers
      const isValid = points.every(point => {
        const [x, y] = point.split(',').map(Number);
        return !isNaN(x) && !isNaN(y);
      });
      
      return isValid;
    });
    
    console.log(`Cleaned up units. Now have ${this.floor.units.length} valid units.`);
  }

  // Rest of your existing methods remain the same...
  onUnitClick(unit: Unit, event?: MouseEvent): void {
    const isMobile = window.innerWidth <= 600;
    
    if (isMobile) {
      // First tap: show info
      if (this.tappedUnit?.id !== unit?.id) {
        this.tappedUnit = unit;
        this.hoveredUnit = unit;
        if (event) {
          this.mousePosition = { x: event.clientX, y: event.clientY };
          event.stopPropagation();
        }
        return;
      }
      // Second tap: open modal
      this.unitSelected.emit(unit);
    } else {
      // Desktop: immediate action
      this.unitSelected.emit(unit);
    }
  }

  onUnitHover(unit: Unit | null, event?: MouseEvent): void {
    const isMobile = window.innerWidth <= 600;
    if (isMobile) {
      return;
    }
    this.hoveredUnit = unit;
    if (event) {
      this.updateMousePosition(event);
    }
  }

  onMouseMove(event: MouseEvent): void {
    const isMobile = window.innerWidth <= 600;
    if (this.hoveredUnit && !isMobile) {
      this.updateMousePosition(event);
    }
  }

  private updateMousePosition(event: MouseEvent): void {
    this.mousePosition = { x: event.clientX, y: event.clientY };
  }

  onContainerClick(event: MouseEvent): void {
    const isMobile = window.innerWidth <= 600;
    if (isMobile && event.target === event.currentTarget) {
      this.tappedUnit = null;
      this.hoveredUnit = null;
    }
  }

  onBackClick(): void {
    this.goBack.emit();
  }

  getUnitColor(unit: Unit): string {
    return 'transparent';
  }

  getUnitHoverColor(unit: Unit): string {
    if (unit.status === 'sold') return 'rgba(239, 68, 68, 0.7)';
    return 'rgba(34, 197, 94, 0.7)';
  }

  getUnitStrokeColor(unit: Unit): string {
    return 'transparent';
  }

  getUnitHoverStrokeColor(unit: Unit): string {
    if (unit.status === 'sold') return '#dc2626';
    return '#16a34a';
  }

  getUnitCenter(unit: Unit): { x: number; y: number } {
    const points = unit.polygonPoints.split(' ').map(p => {
      const [x, y] = p.split(',').map(Number);
      return { x, y };
    });
    
    const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
    const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;
    
    return { x: centerX, y: centerY };
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  }

  getFloorStats(): { available: number; sold: number } {
    return {
      available: this.floor.units.filter(u => u.status === 'available').length,
      sold: this.floor.units.filter(u => u.status === 'sold').length
    };
  }
}