import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../../../components/layout/layout.component';
import { BuildingViewComponent } from '../../../../components/building-view/building-view.component';
import { PropertyService } from '../../../../services/property.service';
import { Building, Floor } from '../../../../models/property.models';

@Component({
  selector: 'app-admin-sales-building-page',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutComponent, BuildingViewComponent],
  template: `
    <app-layout>
      <div class="sales-mode-header">
        <div class="container">
          <div class="header-content">
            <button class="btn-back" (click)="onBack()">← Dashboard</button>
            <div class="title-section">
               <h1>Sales Mode</h1>
               <span class="location">{{ building?.name || 'Loading...' }}</span>
            </div>
            <div class="mode-badge">Building View</div>
          </div>
        </div>
      </div>

      <div class="sales-view-container">
        @if (isLoading) {
           <div class="loading">Loading building data...</div>
        } @else if (building) {
           <app-building-view 
             [building]="building"
             [showLeads]="true"
             (floorSelected)="onFloorSelected($event)">
           </app-building-view>
        } @else {
            <div class="error">Building not found.</div>
        }
      </div>
    </app-layout>
  `,
  styles: [`
    .sales-mode-header {
      background: #1e293b;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding: 1rem 0;
    }
    .header-content {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    .btn-back {
      background: none;
      border: 1px solid rgba(255,255,255,0.2);
      color: #94a3b8;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      &:hover { color: #fff; border-color: #fff; }
    }
    .title-section {
      h1 { margin: 0; font-size: 1.2rem; color: #c9a227; }
      .location { color: #fff; font-size: 1rem; }
    }
    .mode-badge {
      margin-left: auto;
      background: #c9a227;
      color: #000;
      padding: 0.25rem 0.75rem;
      border-radius: 50px;
      font-weight: bold;
      font-size: 0.8rem;
    }
    .sales-view-container {
      padding: 2rem 0;
      min-height: 80vh;
      display: flex;
      justify-content: center;
    }
    .loading, .error { color: #fff; text-align: center; padding: 2rem; }
  `]
})
export class AdminSalesBuildingPageComponent implements OnInit {
  building: Building | null = null;
  isLoading = true;
  buildingId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.buildingId = params['buildingId'];
      this.loadData();
    });
  }

  loadData() {
    this.isLoading = true;
    this.propertyService.getProject().subscribe(project => {
      if (project) {
        this.building = project.buildings.find(b => b.id === this.buildingId) || null;
      }
      if (this.building) {
        this.isLoading = false;
      }
    });
  }

  onFloorSelected(floor: Floor) {
    // Navigate to the floor sales view we created earlier
    this.router.navigate(['/admin/sales/buildings', this.buildingId, 'floor', floor.id]);
  }

  onBack() {
    this.router.navigate(['/admin']);
  }
}
