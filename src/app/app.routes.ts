import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BuildingsComponent } from './pages/buildings/buildings.component';
import { FloorPageComponent } from './pages/floor-page/floor-page.component';
import { PolygonEditorComponent } from './pages/polygon-editor/polygon-editor.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'buildings', component: BuildingsComponent },
  { path: 'buildings/:buildingId/floor/:floorId', component: FloorPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'editor', component: PolygonEditorComponent },
  { path: '**', redirectTo: '' }
];
