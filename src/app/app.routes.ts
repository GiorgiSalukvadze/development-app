import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BuildingsComponent } from './pages/buildings/buildings.component';
import { FloorPageComponent } from './pages/floor-page/floor-page.component';
import { PolygonEditorComponent } from './pages/polygon-editor/polygon-editor.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'buildings', component: BuildingsComponent },
  { path: 'buildings/:buildingId/floor/:floorId', component: FloorPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'editor', component: PolygonEditorComponent },
  // Admin routes - protected
  { path: 'admin/login', component: AdminLoginComponent },
  { 
    path: 'admin', 
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/sales/buildings/:buildingId/floor/:floorId',
    loadComponent: () => import('./pages/admin/sales/sales-floor-page/sales-floor-page.component').then(m => m.AdminSalesFloorPageComponent),
    canActivate: [adminGuard]
  },
  { path: '**', redirectTo: '' }
];
