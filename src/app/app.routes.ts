import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BuildingsComponent } from './pages/buildings/buildings.component';
import { FloorPageComponent } from './pages/floor-page/floor-page.component';
import { PolygonEditorComponent } from './pages/polygon-editor/polygon-editor.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'buildings', component: BuildingsComponent },
  { path: 'buildings/:buildingId/floor/:floorId', component: FloorPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'editor', component: PolygonEditorComponent },
  { path: 'admin', component: AdminComponent },
  {
    path: 'admin/sales/dashboard',
    loadComponent: () => import('./pages/admin/sales/sales-dashboard/sales-dashboard.component').then(m => m.SalesDashboardComponent)
  },
  {
    path: 'admin/sales/buildings/:buildingId',
    loadComponent: () => import('./pages/admin/sales/sales-building-page/sales-building-page.component').then(m => m.SalesBuildingPageComponent)
  },
  {
    path: 'admin/sales/buildings/:buildingId/floor/:floorId',
    loadComponent: () => import('./pages/admin/sales/sales-floor-page/sales-floor-page.component').then(m => m.AdminSalesFloorPageComponent)
  },
  {
    path: 'admin/sales/leads',
    loadComponent: () => import('./pages/admin/sales/leads-page/leads-page.component').then(m => m.LeadsPageComponent)
  },
  { path: '**', redirectTo: '' }
];
