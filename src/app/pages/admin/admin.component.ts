import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LayoutComponent } from '../../components/layout/layout.component';
import { AdminAuthService } from '../../services/admin-auth.service';
import { PropertyService } from '../../services/property.service';
import { Building, Floor, Project, Unit } from '../../models/property.models';

import { AdminHotspotEditorComponent } from './admin-hotspot-editor/admin-hotspot-editor.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LayoutComponent, AdminHotspotEditorComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isAuthenticated = false;
  authMessage = '';
  activeTab: 'units' | 'home' = 'units'; // New toggle
  project: Project | null = null;
  selectedBuildingId: string | null = null;
  selectedFloorId: string | null = null;
  featuresText: Record<string, string> = {};
  private subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AdminAuthService,
    private propertyService: PropertyService
  ) {
    this.loginForm = this.fb.group({
      username: ['admin', Validators.required],
      password: ['admin123', Validators.required]
    });
  }

  ngOnInit(): void {
    this.subs.push(
      this.authService.isAuthenticated().subscribe(isAuthed => {
        this.isAuthenticated = isAuthed;
      }),
      this.propertyService.getProject().subscribe(project => {
        this.project = project;
        if (!this.selectedBuildingId && project?.buildings.length) {
          this.selectedBuildingId = project.buildings[0].id;
        }
        if (this.selectedBuildingId && !this.selectedFloorId) {
          const firstFloor = this.currentBuilding?.floors[0];
          this.selectedFloorId = firstFloor?.id ?? null;
        }
        // hydrate editable feature text helpers
        this.featuresText = {};
        project?.buildings.forEach(b =>
          b.floors.forEach(f =>
            f.units.forEach(u => {
              this.featuresText[u.id] = (u.features || []).join(', ');
            })
          )
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  get currentBuilding(): Building | undefined {
    return this.project?.buildings.find(b => b.id === this.selectedBuildingId);
  }

  get currentFloor(): Floor | undefined {
    return this.currentBuilding?.floors.find(f => f.id === this.selectedFloorId);
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.authMessage = 'Please enter credentials.';
      return;
    }
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(ok => {
      this.authMessage = ok ? 'Logged in.' : 'Invalid credentials.';
    });
  }

  logout(): void {
    this.authService.logout();
  }

  onBuildingChange(id: string): void {
    this.selectedBuildingId = id;
    const floors = this.currentBuilding?.floors ?? [];
    this.selectedFloorId = floors[0]?.id ?? null;
  }

  onFloorChange(id: string): void {
    this.selectedFloorId = id;
  }

  markUnitSold(unit: Unit): void {
    if (!this.currentBuilding || !this.currentFloor) return;
    this.propertyService.markUnitSold(this.currentBuilding.id, this.currentFloor.id, unit.id).subscribe();
  }

  markUnitAvailable(unit: Unit): void {
    if (!this.currentBuilding || !this.currentFloor) return;
    this.propertyService.markUnitAvailable(this.currentBuilding.id, this.currentFloor.id, unit.id).subscribe();
  }

  markFloorSold(): void {
    if (!this.currentBuilding || !this.currentFloor) return;
    this.propertyService.markFloorSold(this.currentBuilding.id, this.currentFloor.id).subscribe();
  }

  saveUnit(unit: Unit): void {
    if (!this.currentBuilding || !this.currentFloor) return;
    const featuresText = this.featuresText[unit.id] ?? (unit.features || []).join(', ');
    const features = featuresText
      .split(',')
      .map(f => f.trim())
      .filter(f => !!f);

    this.propertyService.updateUnitDetails(
      this.currentBuilding.id,
      this.currentFloor.id,
      unit.id,
      {
        name: unit.name,
        price: Number(unit.price),
        area: Number(unit.area),
        bedrooms: Number(unit.bedrooms),
        bathrooms: Number(unit.bathrooms),
        status: unit.status,
        condition: unit.condition,
        description: unit.description,
        features
      }
    ).subscribe();
  }

  resetData(): void {
    this.propertyService.resetProject();
  }
}

