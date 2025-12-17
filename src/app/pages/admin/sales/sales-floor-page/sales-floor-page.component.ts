import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminLayoutComponent } from '../../../../components/admin-layout/admin-layout.component';
import { FloorViewComponent } from '../../../../components/floor-view/floor-view.component';
import { AdminSalesLeadModalComponent } from '../sales-lead-modal/sales-lead-modal.component';
import { PropertyService } from '../../../../services/property.service';
import { Building, Floor, Unit, SalesLead } from '../../../../models/property.models';

@Component({
  selector: 'app-admin-sales-floor-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, AdminLayoutComponent, FloorViewComponent, AdminSalesLeadModalComponent],
  template: `
    <app-admin-layout>
      <div class="sales-mode-header">
        <div class="container">
          <div class="header-content">
            <button class="btn-back" (click)="onBack()">← Dashboard</button>
            <div class="title-section">
               <h1>Sales Mode</h1>
               <div class="location-selector">
                   <span class="building-name">{{ building?.name }}</span>
                   <span class="divider">/</span>
                   <select 
                        class="floor-select" 
                        [ngModel]="floorId" 
                        (ngModelChange)="onFloorChange($event)"
                        *ngIf="building">
                       <option *ngFor="let f of building?.floors" [value]="f.id">
                           {{ f.name }}
                       </option>
                   </select>
               </div>
            </div>
            <div class="mode-badge">Admin Write Access</div>
          </div>
        </div>
      </div>

      <div class="sales-view-container">
        @if (isLoading) {
           <div class="loading">Loading...</div>
        } @else if (floor) {
           <app-floor-view 
             [floor]="floor"
             [showLeads]="true"
             (unitSelected)="onUnitSelected($event)"
             (goBack)="onBack()">
           </app-floor-view>
        }
      </div>

      @if (selectedUnit) {
        <app-sales-lead-modal
          [unit]="selectedUnit"
          (close)="selectedUnit = null"
          (save)="onSaveLead($event)"
          (markAsSold)="onMarkAsSold()"
          (markAsAvailable)="onMarkAsAvailable()">
        </app-sales-lead-modal>
      }
    </app-admin-layout>
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
    .location-selector {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #fff;
    }
    .building-name { font-weight: 500; }
    .divider { color: #64748b; }
    
    .floor-select {
        background: #0f172a;
        color: #fff;
        border: 1px solid rgba(255,255,255,0.2);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-family: inherit;
        font-size: 0.9rem;
        cursor: pointer;
        outline: none;
        
        &:hover { border-color: rgba(255,255,255,0.4); }
        &:focus { border-color: #c9a227; }
    }
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
    }
    .loading { color: #fff; text-align: center; padding: 2rem; }
  `]
})
export class AdminSalesFloorPageComponent implements OnInit {
  building: Building | null = null;
  floor: Floor | null = null;
  selectedUnit: Unit | null = null;
  isLoading = true;
  buildingId = '';
  floorId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.buildingId = params['buildingId'];
      this.floorId = params['floorId'];
      this.loadData();
    });
  }

  loadData() {
    this.isLoading = true;
    this.propertyService.getBuilding(this.buildingId).subscribe(b => {
      this.building = b || null;
      this.propertyService.getFloor(this.buildingId, this.floorId).subscribe(f => {
        this.floor = f || null;
        this.isLoading = false;
      });
    });
  }

  onUnitSelected(unit: Unit) {
    this.selectedUnit = unit;
  }

  onSaveLead(leads: SalesLead[]) {
    if (!this.selectedUnit) return;

    // Optimistic / Immediate Local Update to ensure UI reflects change instantly
    this.selectedUnit.salesLeads = leads;

    this.propertyService.updateUnitLeads(this.buildingId, this.floorId, this.selectedUnit.id, leads)
      .subscribe(() => {
        // Success - no alert needed, just close
        this.selectedUnit = null;
        // this.loadData(); // Removed to prevent reverting to stale cache
      });
  }

  onMarkAsSold() {
    if (!this.selectedUnit) return;
    if (confirm('Are you sure you want to mark this unit as SOLD?')) {
      this.propertyService.markUnitSold(this.buildingId, this.floorId, this.selectedUnit.id)
        .subscribe(() => {
          alert('Unit marked as SOLD');
          this.selectedUnit = null;
          this.loadData();
        });
    }
  }

  onMarkAsAvailable() {
    if (!this.selectedUnit) return;
    if (confirm('Are you sure you want to mark this unit as AVAILABLE?')) {
      this.propertyService.markUnitAvailable(this.buildingId, this.floorId, this.selectedUnit.id)
        .subscribe(() => {
          alert('Unit marked as AVAILABLE');
          this.selectedUnit = null;
          this.loadData();
        });
    }
  }

  onFloorChange(newFloorId: string) {
    if (newFloorId === this.floorId) return;
    this.router.navigate(['/admin/sales/buildings', this.buildingId, 'floor', newFloorId]);
  }

  onBack() {
    this.router.navigate(['/admin']);
  }
}
