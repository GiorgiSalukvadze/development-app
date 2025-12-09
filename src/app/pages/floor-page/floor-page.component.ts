import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';
import { FloorViewComponent } from '../../components/floor-view/floor-view.component';
import { UnitModalComponent } from '../../components/unit-modal/unit-modal.component';
import { PropertyService } from '../../services/property.service';
import { Building, Floor, Unit } from '../../models/property.models';

@Component({
  selector: 'app-floor-page',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutComponent, FloorViewComponent, UnitModalComponent],
  templateUrl: './floor-page.component.html',
  styleUrl: './floor-page.component.scss'
})
export class FloorPageComponent implements OnInit {
  building: Building | null = null;
  floor: Floor | null = null;
  selectedUnit: Unit | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const buildingId = params['buildingId'];
      const floorId = params['floorId'];
      this.loadFloorData(buildingId, floorId);
    });
  }

  private loadFloorData(buildingId: string, floorId: string): void {
    this.isLoading = true;
    
    this.propertyService.getBuilding(buildingId).subscribe(building => {
      if (building) {
        this.building = building;
        this.propertyService.getFloor(buildingId, floorId).subscribe(floor => {
          if (floor) {
            this.floor = floor;
          } else {
            // Floor not found, redirect to buildings
            this.router.navigate(['/buildings']);
          }
          this.isLoading = false;
        });
      } else {
        // Building not found, redirect to buildings
        this.router.navigate(['/buildings']);
        this.isLoading = false;
      }
    });
  }

  onUnitSelected(unit: Unit): void {
    this.selectedUnit = unit;
  }

  onBackToBuilding(): void {
    this.router.navigate(['/buildings']);
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
