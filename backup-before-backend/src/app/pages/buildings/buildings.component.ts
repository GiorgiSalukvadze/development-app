import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';
import { PropertyShowcaseComponent } from '../property-showcase/property-showcase.component';

@Component({
  selector: 'app-buildings',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutComponent, PropertyShowcaseComponent],
  templateUrl: './buildings.component.html',
  styleUrl: './buildings.component.scss'
})
export class BuildingsComponent {
}
