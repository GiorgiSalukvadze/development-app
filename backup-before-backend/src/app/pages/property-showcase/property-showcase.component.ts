import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Building, Floor, Unit, Project } from '../../models/property.models';
import { BuildingViewComponent } from '../../components/building-view/building-view.component';
import { UnitModalComponent } from '../../components/unit-modal/unit-modal.component';

@Component({
  selector: 'app-property-showcase',
  standalone: true,
  imports: [
    CommonModule,
    BuildingViewComponent,
    UnitModalComponent
  ],
  templateUrl: './property-showcase.component.html',
  styleUrl: './property-showcase.component.scss'
})
export class PropertyShowcaseComponent implements OnInit {
  project: Project | null = null;
  currentBuilding: Building | null = null;
  selectedUnit: Unit | null = null;
  
  isLoading = true;

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProject();
  }

  private loadProject(): void {
    this.propertyService.getProject().subscribe({
      next: (project) => {
        this.project = project;
        // Auto-select first building
        if (project.buildings.length > 0) {
          this.currentBuilding = project.buildings[0];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading project:', error);
        this.isLoading = false;
      }
    });
  }

  onFloorSelected(floor: Floor): void {
    if (this.currentBuilding && floor.status !== 'sold') {
      // Navigate to the floor page with URL params
      this.router.navigate(['/buildings', this.currentBuilding.id, 'floor', floor.id]);
    }
  }

  onUnitSelected(unit: Unit): void {
    this.selectedUnit = unit;
  }

  onCloseModal(): void {
    this.selectedUnit = null;
  }

  onRequestInfo(unit: Unit): void {
    console.log('Request info for unit:', unit);
    alert(`Thank you for your interest in ${unit.name}! Our sales team will contact you shortly.`);
    this.selectedUnit = null;
  }
}
