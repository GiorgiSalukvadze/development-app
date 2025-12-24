import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../../../../components/layout/layout.component';
import { PropertyService } from '../../../../services/property.service';
import { Project, Unit, Building, Floor } from '../../../../models/property.models';

interface HighValueUnit {
    unitName: string;
    price: number;
    floorName: string;
    buildingName: string;
}

@Component({
    selector: 'app-sales-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule, LayoutComponent],
    template: `
    <app-layout>
      <div class="dashboard-header">
        <div class="container">
          <h1>Sales Dashboard</h1>
          <p class="subtitle">Real-time project performance overview</p>
        </div>
      </div>

      <div class="container dashboard-content">
        
        <!-- KPI Cards -->
        <div class="kpi-grid">
            <div class="card kpi-card revenue">
                <div class="kpi-icon">$</div>
                <div class="kpi-data">
                    <span class="label">Total Revenue</span>
                    <span class="value">{{ totalRevenue | currency:'USD':'symbol':'1.0-0' }}</span>
                </div>
            </div>

            <div class="card kpi-card sold">
                <div class="kpi-icon">🏠</div>
                <div class="kpi-data">
                    <span class="label">Units Sold</span>
                    <span class="value">{{ soldCount }} <small>/ {{ totalCount }}</small></span>
                </div>
            </div>

            <div class="card kpi-card available">
                <div class="kpi-icon">✨</div>
                <div class="kpi-data">
                    <span class="label">Available</span>
                    <span class="value">{{ availableCount }}</span>
                </div>
            </div>

            <div class="card kpi-card rate">
                <div class="kpi-icon">📈</div>
                <div class="kpi-data">
                    <span class="label">Sold Rate</span>
                    <span class="value">{{ occupancyRate | number:'1.1-1' }}%</span>
                </div>
            </div>
        </div>

        <!-- Progress Bar -->
        <div class="card progress-section">
            <h3>Sales Progress</h3>
            <div class="progress-bar-container">
                <div class="progress-fill" [style.width.%]="occupancyRate"></div>
            </div>
            <div class="progress-labels">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
            </div>
        </div>

        <!-- High Value Transactions -->
        <div class="card transactions-section">
            <h3>High Value Transactions (Top 5)</h3>
            <div class="table-responsive">
                <table class="dashboard-table">
                    <thead>
                        <tr>
                            <th>Unit</th>
                            <th>Building</th>
                            <th>Floor</th>
                            <th class="text-right">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let unit of topSoldUnits">
                            <td class="primary-text">{{ unit.unitName }}</td>
                            <td>{{ unit.buildingName }}</td>
                            <td>{{ unit.floorName }}</td>
                            <td class="text-right price-text">{{ unit.price | currency:'USD':'symbol':'1.0-0' }}</td>
                        </tr>
                        <tr *ngIf="topSoldUnits.length === 0">
                            <td colspan="4" class="empty-text">No sold units yet.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

      </div>
    </app-layout>
    `,
    styles: [`
    .dashboard-header {
        background: #0f172a;
        padding: 2rem 0;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        margin-bottom: 2rem;
    }
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
    }
    h1 { margin: 0; color: #fff; font-size: 2rem; }
    .subtitle { color: #94a3b8; margin: 0.5rem 0 0; }

    .kpi-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .card {
        background: #1e293b;
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.05);
        padding: 1.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .kpi-card {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .kpi-icon {
        font-size: 2rem;
        background: rgba(255,255,255,0.05);
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
    }

    .kpi-data {
        display: flex;
        flex-direction: column;
    }

    .label { color: #94a3b8; font-size: 0.9rem; margin-bottom: 0.25rem; }
    .value { color: #fff; font-size: 1.5rem; font-weight: bold; }
    .value small { font-size: 1rem; color: #64748b; font-weight: normal; }

    .revenue .value { color: #10b981; }
    .rate .value { color: #3b82f6; }

    .progress-section h3, .transactions-section h3 {
        color: #fff;
        margin-top: 0;
        margin-bottom: 1.5rem;
    }

    .progress-bar-container {
        height: 24px;
        background: rgba(255,255,255,0.1);
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 0.5rem;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #10b981, #3b82f6);
        transition: width 1s ease-out;
    }

    .progress-labels {
        display: flex;
        justify-content: space-between;
        color: #64748b;
        font-size: 0.8rem;
    }

    .dashboard-table {
        width: 100%;
        border-collapse: collapse;
        color: #e2e8f0;
    }

    .dashboard-table th {
        text-align: left;
        padding: 1rem;
        background: rgba(0,0,0,0.2);
        color: #94a3b8;
        font-weight: 600;
        border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    
    .dashboard-table td {
        padding: 1rem;
        border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .primary-text { color: #fff; font-weight: 500; }
    .price-text { color: #10b981; font-weight: 600; font-family: monospace; font-size: 1rem; }
    .text-right { text-align: right; }
    .empty-text { text-align: center; color: #64748b; padding: 2rem; }
    `]
})
export class SalesDashboardComponent implements OnInit {
    totalRevenue = 0;
    soldCount = 0;
    totalCount = 0;
    availableCount = 0;
    occupancyRate = 0;
    topSoldUnits: HighValueUnit[] = [];

    constructor(private propertyService: PropertyService) { }

    ngOnInit() {
        this.propertyService.getProject().subscribe(project => {
            if (project && project.buildings) {
                this.calculateStats(project.buildings);
            }
        });
    }

    calculateStats(buildings: Building[]) {
        let revenue = 0;
        let sold = 0;
        let total = 0;
        const soldUnits: HighValueUnit[] = [];

        buildings.forEach(b => {
            b.floors.forEach(f => {
                f.units.forEach(u => {
                    total++;
                    if (u.status === 'sold') {
                        sold++;
                        const price = u.price || 0;
                        revenue += price;
                        soldUnits.push({
                            unitName: u.name,
                            price: price,
                            floorName: f.name || `Floor ${f.floorNumber}`,
                            buildingName: b.name
                        });
                    }
                });
            });
        });

        this.totalRevenue = revenue;
        this.soldCount = sold;
        this.totalCount = total;
        this.availableCount = total - sold;
        this.occupancyRate = total > 0 ? (sold / total) * 100 : 0;

        // Sort by price descending and take top 5
        this.topSoldUnits = soldUnits.sort((a, b) => b.price - a.price).slice(0, 5);
    }
}
