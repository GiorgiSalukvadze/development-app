import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Unit, SalesLead } from '../../../../models/property.models';

@Component({
  selector: 'app-sales-lead-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-backdrop" (click)="close.emit()">
      <div class="modal-content" (click)="$event.stopPropagation()">

        
        <div class="modal-header">
          <h2>Lead Management</h2>
          <p class="unit-name">{{ unit.name }} - {{ unit.area }}m² - {{ unit.status | titlecase }}</p>
        </div>
        
        <div class="tabs">
            <button class="tab-btn" [class.active]="activeTab === 'add'" (click)="activeTab = 'add'">Add New Lead</button>
            <button class="tab-btn" [class.active]="activeTab === 'view'" (click)="activeTab = 'view'">View Leads ({{ unit.salesLeads?.length || 0 }})</button>
        </div>

        <div class="modal-body" *ngIf="activeTab === 'add'">
          <div class="form-group">
            <label>Customer Name</label>
            <input type="text" [(ngModel)]="newLead.name" placeholder="John Doe" class="form-input">
          </div>

          <div class="form-group">
            <label>Email Address</label>
            <input type="email" [(ngModel)]="newLead.email" placeholder="john@example.com" class="form-input">
          </div>
          
          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" [(ngModel)]="newLead.phone" placeholder="+1 234 567 8900" class="form-input">
          </div>

          <div class="form-group-row">
            <div class="form-group">
                <label>Next Call</label>
                <input type="date" [(ngModel)]="newLead.nextCallDate" class="form-input">
            </div>
          </div>
          
          <div class="form-group">
            <label>Interest Level</label>
            <div class="interest-options">
              <button 
                type="button" 
                class="interest-btn high" 
                [class.active]="newLead.interest === 'high'"
                (click)="newLead.interest = 'high'">
                High 🔥
              </button>
              <button 
                type="button" 
                class="interest-btn medium" 
                [class.active]="newLead.interest === 'medium'"
                (click)="newLead.interest = 'medium'">
                Medium 👍
              </button>
              <button 
                type="button" 
                class="interest-btn low" 
                [class.active]="newLead.interest === 'low'"
                (click)="newLead.interest = 'low'">
                Low 🤷
              </button>
            </div>
          </div>
          
          <div class="form-group">
            <label>Notes</label>
            <textarea [(ngModel)]="newLead.notes" rows="4" placeholder="Client preferences, budget, timeline..." class="form-textarea"></textarea>
          </div>
        </div>

        <div class="modal-body list-view" *ngIf="activeTab === 'view'">
            @if (!unit.salesLeads || unit.salesLeads.length === 0) {
                <div class="empty-state">No leads recorded for this unit yet.</div>
            } @else {
                <div class="leads-list">
                    @for (lead of unit.salesLeads; track lead.name; let i = $index) {
                        <div class="lead-card">
                            <div class="lead-header">
                                <span class="lead-name">{{ lead.name }}</span>
                                <div class="header-right">
                                    <span class="lead-interest" [class]="lead.interest">{{ lead.interest | titlecase }}</span>
                                    <button class="btn-delete" (click)="onDeleteLead(i)" title="Delete Lead">×</button>
                                </div>
                            </div>
                            <div class="lead-details">
                                <span class="lead-email" *ngIf="lead.email">{{ lead.email }}</span>
                                <span class="lead-phone">{{ lead.phone }}</span>
                            </div>
                            <div class="lead-dates" *ngIf="lead.nextCallDate">
                                📅 Next Call: {{ lead.nextCallDate }}
                            </div>
                            <div class="lead-notes" *ngIf="lead.notes">{{ lead.notes }}</div>
                        </div>
                    }
                </div>
            }
        </div>
        
        <div class="modal-footer">
          <div class="status-actions">
            @if(unit.status === 'available') {
               <button class="btn-mark-sold" (click)="markAsSold.emit()">Mark Unit as SOLD</button>
            } @else {
               <button class="btn-mark-available" (click)="markAsAvailable.emit()">Mark Unit as Available</button>
            }
          </div>
          <button *ngIf="activeTab === 'add'" class="btn-primary" (click)="onSave()" [disabled]="isSaving">
            {{ isSaving ? 'Saving...' : 'Save Lead Info' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85); /* Darker solid background instead of blur */
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.3s ease-out;
    }
    
    
    .modal-content {
      background: #0f172a; /* Solid Slate 900 */
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      width: 100%;
      max-width: 550px;
      padding: 0;
      position: relative;
      box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1), 
        0 10px 15px -3px rgba(0, 0, 0, 0.1), 
        0 25px 50px -12px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      max-height: 85vh;
      overflow: hidden;
      animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .modal-header {
      padding: 2rem 2rem 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      background: linear-gradient(to bottom, rgba(255,255,255,0.03), transparent);
      
      h2 {
        color: #f1f5f9;
        margin: 0 0 0.5rem 0;
        font-size: 1.5rem;
        font-weight: 700;
        letter-spacing: -0.025em;
        background: linear-gradient(to right, #fff, #94a3b8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .unit-name {
        color: #64748b;
        margin: 0;
        font-size: 0.9rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        &::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #c9a227;
        }
      }
    }

    .tabs {
        display: flex;
        padding: 0 2rem;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        background: rgba(15, 23, 42, 0.3);
        
        .tab-btn {
            background: none;
            border: none;
            color: #64748b;
            font-size: 0.95rem;
            cursor: pointer;
            padding: 1rem 1.5rem;
            position: relative;
            transition: all 0.3s;
            font-weight: 500;

            &:hover { color: #cbd5e1; }
            
            &.active {
                color: #c9a227;
                font-weight: 600;
                
                &::after {
                    content: '';
                    position: absolute;
                    bottom: -1px;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: #c9a227;
                    box-shadow: 0 -2px 10px rgba(201, 162, 39, 0.5);
                }
            }
        }
    }
    
    .modal-body {
        flex: 1;
        overflow-y: auto;
        padding: 2rem;
        
        /* Custom Scrollbar */
        &::-webkit-scrollbar { width: 6px; }
        &::-webkit-scrollbar-track { background: transparent; }
        &::-webkit-scrollbar-thumb { 
            background: rgba(255, 255, 255, 0.1); 
            border-radius: 10px; 
            &:hover { background: rgba(255, 255, 255, 0.2); }
        }
    }

    .list-view {
        padding-right: 1.5rem; /* Adjust for scrollbar */
    }

    .empty-state {
        color: #64748b;
        text-align: center;
        padding: 4rem 1rem;
        border: 2px dashed rgba(255,255,255,0.05);
        border-radius: 12px;
        background: rgba(255,255,255,0.01);
    }

    .leads-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .lead-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        padding: 1.25rem;
        transition: all 0.2s;

        &:hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.1);
            transform: translateY(-1px);
        }

        .lead-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.75rem;
            
            .lead-name { color: #f1f5f9; font-weight: 600; font-size: 1.05rem; }
            .lead-interest { 
                font-size: 0.7rem; 
                padding: 0.35rem 0.75rem; 
                border-radius: 20px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                font-weight: 700;
                
                &.high { color: #fecaca; background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.3); }
                &.medium { color: #fef08a; background: rgba(234, 179, 8, 0.2); border: 1px solid rgba(234, 179, 8, 0.3); }
                &.low { color: #bbf7d0; background: rgba(34, 197, 94, 0.2); border: 1px solid rgba(34, 197, 94, 0.3); }
            }
        }
        .lead-phone { 
            color: #94a3b8; 
            font-size: 0.9rem; 
            margin-bottom: 0.75rem; 
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .lead-notes { 
            color: #cbd5e1; 
            font-size: 0.9rem; 
            background: rgba(0,0,0,0.2);
            padding: 0.75rem;
            border-radius: 8px;
            line-height: 1.5;
        }
    }
    
    .form-group {
      margin-bottom: 1.75rem;
      
      label {
        display: block;
        color: #94a3b8;
        margin-bottom: 0.5rem;
        font-size: 0.85rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }
    
    .form-input, .form-textarea {
      width: 100%;
      padding: 1rem;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      color: #f1f5f9;
      font-family: inherit;
      font-size: 0.95rem;
      transition: all 0.2s;
      
      &:hover { border-color: rgba(255,255,255,0.2); }
      
      &:focus {
        outline: none;
        border-color: #c9a227;
        background: rgba(0, 0, 0, 0.4);
        box-shadow: 0 0 0 4px rgba(201, 162, 39, 0.1);
      }

      &::placeholder { color: #475569; }
    }
    
    .interest-options {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
    
    .interest-btn {
      padding: 1rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: #94a3b8;
      cursor: pointer;
      transition: all 0.2s;
      font-weight: 500;
      position: relative;
      overflow: hidden;
      
      &:hover { 
        background: rgba(255, 255, 255, 0.08); 
        transform: translateY(-2px);
      }
      
      &.active {
        font-weight: 700;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        
        &.high { background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1)); border-color: #ef4444; color: #ef4444; }
        &.medium { background: linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(234, 179, 8, 0.1)); border-color: #eab308; color: #eab308; }
        &.low { background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1)); border-color: #22c55e; color: #22c55e; }
      }
    }
    
    .modal-footer {
      margin-top: auto; 
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      border-top: 1px solid rgba(255,255,255,0.05);
      padding: 1.5rem 2rem;
      background: rgba(15, 23, 42, 0.3);
      flex-shrink: 0; 
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #c9a227, #b49110);
      color: #0f172a;
      border: none;
      padding: 0.85rem 2rem;
      border-radius: 10px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(201, 162, 39, 0.2);
      transition: all 0.2s;
      
      &:hover { 
        transform: translateY(-1px);
        box-shadow: 0 6px 12px rgba(201, 162, 39, 0.3);
        filter: brightness(1.1);
      }
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        filter: grayscale(1);
        transform: none;
      }
    }

    .status-actions {
        display: flex;
        gap: 0.75rem;
    }

    .btn-mark-sold {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #ef4444;
      padding: 0.6rem 1rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      &:hover { background: rgba(239, 68, 68, 0.2); border-color: #ef4444; }
    }
    
    .btn-mark-available {
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      color: #22c55e;
      padding: 0.6rem 1rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      &:hover { background: rgba(34, 197, 94, 0.2); border-color: #22c55e; }
    }

    .lead-details {
        display: flex;
        gap: 1rem;
        color: #94a3b8;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }
    .lead-email { color: #3b82f6; }

    .form-group-row {
        display: flex;
        gap: 1rem;
        .form-group { flex: 1; }
    }
    
    .lead-dates {
        background: rgba(255, 255, 255, 0.05);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.85rem;
        color: #e2e8f0;
        margin-bottom: 0.5rem;
        display: inline-block;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
  `]
})
export class AdminSalesLeadModalComponent implements OnInit {
  @Input() unit!: Unit;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<SalesLead[]>(); // Continues to emit array
  @Output() markAsSold = new EventEmitter<void>();
  @Output() markAsAvailable = new EventEmitter<void>();

  activeTab: 'add' | 'view' = 'add';
  isSaving = false;

  onDeleteLead(index: number) {
    if (!this.unit.salesLeads) return;
    const currentLeads = [...this.unit.salesLeads];
    currentLeads.splice(index, 1);
    this.save.emit(currentLeads);
  }

  newLead: SalesLead = {
    name: '',
    email: '',
    phone: '',
    notes: '',
    firstCallDate: '',
    nextCallDate: '',
    interest: 'medium'
  };

  ngOnInit() {
    // If we have leads, default to viewing them? Or stick to adding?
    // Let's stick to 'add' as default for quick entry, user can switch to view.
    if (this.unit.salesLeads && this.unit.salesLeads.length > 0) {
      // Optional: logic to decide default tab
    }
  }

  onSave() {
    if (this.isSaving) return;
    this.isSaving = true;

    // Create a copy of existing leads or empty array
    const currentLeads = this.unit.salesLeads ? [...this.unit.salesLeads] : [];
    // Add new lead
    currentLeads.push({ ...this.newLead });

    // Emit the full updated array
    this.save.emit(currentLeads);
  }
}
