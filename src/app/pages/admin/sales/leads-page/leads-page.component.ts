import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../../../components/layout/layout.component';
import { PropertyService } from '../../../../services/property.service';
import { SalesLead } from '../../../../models/property.models';
import { CsvExportService } from '../../../../services/csv-export.service';

@Component({
    selector: 'app-leads-page',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, LayoutComponent],
    template: `
    <app-layout>
      <div class="sales-mode-header">
        <div class="container">
          <div class="header-content">
            <button class="btn-back" (click)="onBack()">← Back</button>
            <div class="title-section">
               <h1>Leads Management</h1>
               <span class="subtitle">Global Sales Leads</span>
            </div>
          </div>
        </div>
      </div>

      <div class="container leads-container">
        
        <div class="toolbar">
            <div class="search-box">
                <input type="text" [(ngModel)]="searchTerm" (ngModelChange)="filterLeads()" placeholder="Search leads...">
            </div>
            <div class="toolbar-actions">
                <button class="btn-secondary" (click)="exportLeads()">
                    ⬇ Export Excel
                </button>
                <button class="btn-primary" (click)="toggleAddForm()">
                    {{ showAddForm ? 'Cancel' : '+ Add New Lead' }}
                </button>
            </div>
        </div>

        @if (showAddForm) {
            <div class="card add-form-card">
                <h3>{{ editingId ? 'Edit Lead' : 'Add New Lead' }}</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" [(ngModel)]="newLead.name" placeholder="Name">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" [(ngModel)]="newLead.email" placeholder="Email Address">
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="text" [(ngModel)]="newLead.phone" placeholder="Phone">
                    </div>
                    <div class="form-group">
                        <label>Next Call</label>
                        <input type="date" [(ngModel)]="newLead.nextCallDate">
                    </div>
                    <div class="form-group">
                        <label>Check Interest</label>
                        <select [(ngModel)]="newLead.interest">
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div class="form-group full-width">
                        <label>Notes</label>
                        <textarea [(ngModel)]="newLead.notes" rows="2" placeholder="Notes..."></textarea>
                    </div>
                </div>
                <div class="form-actions">
                    <button class="btn-submit" (click)="saveLead()">
                        {{ editingId ? 'Update Lead' : 'Save Lead' }}
                    </button>
                </div>
            </div>
        }

        <div class="card table-card">
            @if (isLoading) {
                <div class="loading">Loading leads...</div>
            } @else if (filteredLeads.length === 0) {
                <div class="empty-state">No leads found.</div>
            } @else {
                <table class="leads-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Unit</th>
                            <th>Floor</th>
                            <th>Phone</th>
                            <th>Next Call</th>
                            <th>Interest</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @for (lead of filteredLeads; track lead.id) {
                            <tr>
                                <td class="name-cell">{{ lead.name }}</td>
                                <td>{{ lead.email || '-' }}</td>
                                <td>
                                    <span *ngIf="lead.unitName" class="unit-badge">{{ lead.unitName }}</span>
                                    <span *ngIf="!lead.unitName" class="global-badge">Global</span>
                                </td>
                                <td>{{ lead.floorName || '-' }}</td>
                                <td>{{ lead.phone }}</td>
                                <td>{{ lead.nextCallDate || '-' }}</td>
                                <td>
                                    <span class="badge" [class]="lead.interest">{{ lead.interest | titlecase }}</span>
                                </td>
                                <td class="notes-cell">{{ lead.notes }}</td>
                                <td>
                                    <button class="btn-edit" (click)="editLead(lead)">Edit</button>
                                    <button class="btn-delete" (click)="deleteLead(lead)">Remove</button>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            }
        </div>
      </div>
    </app-layout>
  `,
    styles: [`
    .sales-mode-header {
      background: #1e293b;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding: 1rem 0;
      margin-bottom: 2rem;
    }
    .header-content { display: flex; align-items: center; gap: 2rem; }
    .btn-back {
      background: none;
      border: 1px solid rgba(255,255,255,0.2);
      color: #94a3b8;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      &:hover { color: #fff; border-color: #fff; }
    }
    .title-section h1 { margin: 0; font-size: 1.2rem; color: #c9a227; }
    .subtitle { color: #94a3b8; font-size: 0.9rem; }

    .leads-container { padding-bottom: 3rem; }
    
    .toolbar {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.5rem;
    }
    
    .search-box input {
        padding: 0.75rem 1rem;
        border-radius: 8px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        color: #fff;
        width: 300px;
        &:focus { outline: none; border-color: #c9a227; }
    }

    .toolbar-actions {
        display: flex;
        gap: 1rem;
    }

    .btn-secondary {
        background: #334155;
        color: #fff;
        border: 1px solid rgba(255,255,255,0.1);
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        &:hover { background: #475569; }
    }

    .btn-primary {
        background: #c9a227;
        color: #000;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        &:hover { filter: brightness(1.1); }
    }

    .card {
        background: #1e293b;
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.05);
        overflow: auto;
        margin-bottom: 2rem;
    }
    .table-card {
        max-height: 100vh;
    }

    .add-form-card { padding: 1.5rem; }
    .add-form-card h3 { margin-top: 0; color: #fff; margin-bottom: 1rem; }
    
    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    .full-width { grid-column: 1 / -1; }
    
    .form-group label { display: block; color: #94a3b8; margin-bottom: 0.5rem; font-size: 0.9rem; }
    .form-group input, .form-group select, .form-group textarea {
        width: 100%;
        padding: 0.75rem;
        background: rgba(0,0,0,0.2);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 6px;
        color: #fff;
        font-family: inherit;
        &:focus { border-color: #c9a227; outline: none; }
    }

    .btn-submit {
        background: #10b981;
        color: #fff;
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
        &:hover { background: #059669; }
    }

    .leads-table {
        width: 100%;
        border-collapse: collapse;
        color: #e2e8f0;
    }
    
    .leads-table th {
        text-align: left;
        padding: 1rem;
        background: rgba(0,0,0,0.2);
        color: #94a3b8;
        font-weight: 600;
    }
    
    .leads-table td {
        padding: 0.5rem 0.75rem; /* Reduced padding */
        border-bottom: 1px solid rgba(255,255,255,0.05);
        font-size: 0.9rem; /* Reduced font size */
    }

    .name-cell { font-weight: 600; color: #fff; }
    .notes-cell { max-width: 300px; color: #94a3b8; font-size: 0.9rem; }

    .badge {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: bold;
        text-transform: uppercase;
        &.high { background: rgba(239, 68, 68, 0.2); color: #fecaca; }
        &.medium { background: rgba(234, 179, 8, 0.2); color: #fef08a; }
        &.low { background: rgba(34, 197, 94, 0.2); color: #bbf7d0; }
    }

    .btn-delete {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.2);
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        cursor: pointer;
        &:hover { background: rgba(239, 68, 68, 0.2); }
    }
    
    .btn-edit {
        background: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
        border: 1px solid rgba(59, 130, 246, 0.2);
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        cursor: pointer;
        margin-right: 0.5rem;
        &:hover { background: rgba(59, 130, 246, 0.2); }
    }
    
    .unit-badge {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
    }
    .global-badge {
        color: #64748b;
        font-size: 0.8rem;
        font-style: italic;
    }

    .empty-state { padding: 3rem; text-align: center; color: #64748b; }
    .loading { padding: 3rem; text-align: center; color: #fff; }
  `]
})
export class LeadsPageComponent implements OnInit {
    leads: SalesLead[] = [];
    filteredLeads: SalesLead[] = [];
    searchTerm = '';
    showAddForm = false;
    isLoading = true;
    editingId: string | null = null; // Track if we are editing

    newLead: SalesLead = {
        name: '',
        email: '',
        phone: '',
        notes: '',
        firstCallDate: '',
        nextCallDate: '',
        interest: 'medium'
    };

    constructor(
        private propertyService: PropertyService,
        private router: Router,
        private csvExportService: CsvExportService
    ) { }

    ngOnInit() {
        this.loadLeads();
    }

    loadLeads() {
        this.isLoading = true;
        this.propertyService.getLeads().subscribe(leads => {
            this.leads = leads;
            this.filterLeads();
            this.isLoading = false;
        });
    }

    filterLeads() {
        if (!this.searchTerm) {
            this.filteredLeads = this.leads;
            return;
        }
        const term = this.searchTerm.toLowerCase();
        this.filteredLeads = this.leads.filter(l =>
            l.name.toLowerCase().includes(term) ||
            l.phone.includes(term) ||
            l.notes?.toLowerCase().includes(term) ||
            (l.email && l.email.toLowerCase().includes(term)) ||
            (l.unitName && l.unitName.toLowerCase().includes(term)) ||
            (l.nextCallDate && l.nextCallDate.includes(term))
        );
    }

    saveLead() {
        if (!this.newLead.name) return;

        if (this.editingId) {
            const leadToUpdate = { ...this.newLead, id: this.editingId };
            this.propertyService.updateLead(leadToUpdate).subscribe(() => {
                this.loadLeads();
                this.resetForm();
            });
        } else {
            this.propertyService.addLead(this.newLead).subscribe(() => {
                this.loadLeads();
                this.resetForm();
            });
        }
    }

    editLead(lead: SalesLead) {
        this.editingId = lead.id || null;
        this.newLead = { ...lead }; // Copy data to form
        this.showAddForm = true;
    }

    deleteLead(lead: SalesLead) {
        if (!lead.id) return;
        if (!confirm('Are you sure you want to remove this lead?')) return;

        this.propertyService.deleteLead(lead.id).subscribe(() => {
            this.loadLeads();
        });
    }

    resetForm() {
        this.showAddForm = false;
        this.editingId = null;
        this.newLead = {
            name: '',
            email: '',
            phone: '',
            notes: '',
            nextCallDate: '',
            interest: 'medium'
        };
    }

    exportLeads() {
        if (!this.filteredLeads || this.filteredLeads.length === 0) {
            alert('No leads to export.');
            return;
        }

        const exportData = this.filteredLeads.map(lead => ({
            Name: lead.name,
            Email: lead.email || '',
            Phone: lead.phone,
            Unit: lead.unitName || 'Global',
            Floor: lead.floorName || '',
            'Next Call': lead.nextCallDate || '',
            Interest: lead.interest,
            Notes: lead.notes || ''
        }));

        const dateStr = new Date().toISOString().slice(0, 10);
        this.csvExportService.downloadFile(exportData, `Sales_Leads_${dateStr}`);
    }

    toggleAddForm() {
        if (this.showAddForm) {
            this.resetForm();
        } else {
            this.resetForm();
            this.showAddForm = true;
        }
    }

    onBack() {
        // Go back to sales view (building) or admin
        // Hardcoded to building-1 for now as that's the main path
        this.router.navigate(['/admin/sales/buildings/building-1']);
    }
}
