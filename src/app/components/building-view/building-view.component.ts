import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Building, Floor } from '../../models/property.models';
import { PropertyService } from '../../services/property.service';
import { FilterByStatusPipe } from '../../pipes/filter-by-status.pipe';

@Component({
  selector: 'app-building-view',
  standalone: true,
  imports: [CommonModule, FilterByStatusPipe],
  templateUrl: './building-view.component.html',
  styleUrl: './building-view.component.scss'
})
export class BuildingViewComponent implements OnInit, OnChanges {
  @Input() building!: Building;
  @Input() showLeads = false;
  @Output() floorSelected = new EventEmitter<Floor>();

  hoveredFloor: Floor | null = null;
  tappedFloor: Floor | null = null;
  mousePosition: { x: number; y: number } = { x: 0, y: 0 };
  stats: { available: number; sold: number; total: number } = {
    available: 0,
    sold: 0,
    total: 0
  };
  leadStats: { total: number; high: number; medium: number; low: number } = {
    total: 0, high: 0, medium: 0, low: 0
  };

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.updateStats();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['building'] && !changes['building'].firstChange) {
      this.updateStats();
    }
  }

  private updateStats(): void {
    if (this.building) {
      this.stats = this.propertyService.getBuildingStats(this.building);
      this.calculateLeadStats();
    }
  }

  private calculateLeadStats(): void {
    let total = 0, high = 0, medium = 0, low = 0;
    this.building.floors.forEach(floor => {
      floor.units.forEach(unit => {
        if (unit.salesLeads) {
          total += unit.salesLeads.length;
          high += unit.salesLeads.filter(l => l.interest === 'high').length;
          medium += unit.salesLeads.filter(l => l.interest === 'medium').length;
          low += unit.salesLeads.filter(l => l.interest === 'low').length;
        }
      });
    });
    this.leadStats = { total, high, medium, low };
  }

  getFloorLeadCount(floor: Floor): number {
    if (!floor.units) return 0;
    return floor.units.reduce((acc, unit) => acc + (unit.salesLeads ? unit.salesLeads.length : 0), 0);
  }

  getFloorInterestCount(floor: Floor, interest: 'high' | 'medium' | 'low'): number {
    if (!floor.units) return 0;
    return floor.units.reduce((acc, unit) => {
      const count = unit.salesLeads ? unit.salesLeads.filter(l => l.interest === interest).length : 0;
      return acc + count;
    }, 0);
  }

  onFloorClick(floor: Floor, event: MouseEvent): void {
    // Check if mobile/touch device
    const isMobile = window.innerWidth <= 600;

    if (isMobile) {
      // First tap: show info
      if (this.tappedFloor?.id !== floor?.id) {
        this.tappedFloor = floor;
        this.hoveredFloor = floor;
        // Set tooltip position near the tap
        this.mousePosition = { x: event.clientX, y: event.clientY };
        event.stopPropagation();
        return;
      }
      // Second tap: navigate
      this.floorSelected.emit(floor);
    } else {
      // Desktop: immediate navigation
      this.floorSelected.emit(floor);
    }
  }

  onFloorHover(floor: Floor | null, event?: MouseEvent): void {
    const isMobile = window.innerWidth <= 600;
    // On mobile, don't handle hover - let click handle everything
    if (isMobile) {
      return;
    }
    this.hoveredFloor = floor;
    if (event) {
      this.updateMousePosition(event);
    }
  }

  onMouseMove(event: MouseEvent): void {
    // Don't follow mouse on mobile
    const isMobile = window.innerWidth <= 600;
    if (this.hoveredFloor && !isMobile) {
      this.updateMousePosition(event);
    }
  }

  private updateMousePosition(event: MouseEvent): void {
    this.mousePosition = { x: event.clientX, y: event.clientY };
  }

  onContainerClick(event: MouseEvent): void {
    // Close mobile tooltip when clicking outside floors
    const isMobile = window.innerWidth <= 900;
    if (isMobile && event.target === event.currentTarget) {
      this.tappedFloor = null;
      this.hoveredFloor = null;
    }
  }

  getFloorColor(floor: Floor): string {
    // Completely transparent by default, color only shown on hover
    return 'transparent';
  }

  getFloorHoverColor(floor: Floor): string {
    if (floor.status === 'sold') return 'rgba(239, 68, 68, 0.8)';
    return 'rgba(34, 197, 94, 0.8)';
  }

  getFloorStrokeColor(floor: Floor): string {
    // Subtle stroke by default
    return 'rgba(255, 255, 255, 0.2)';
  }

  getFloorHoverStrokeColor(floor: Floor): string {
    if (floor.status === 'sold') return '#dc2626';
    return '#16a34a';
  }

  // Calculate the center point of a polygon from SVG points string
  getPolygonCenter(polygonPoints: string): { x: number; y: number } {
    const points = polygonPoints.split(' ').map(p => {
      const [x, y] = p.split(',').map(Number);
      return { x, y };
    });

    const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
    const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;

    return { x: centerX, y: centerY };
  }
}
