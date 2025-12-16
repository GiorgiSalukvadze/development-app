import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';
import { PropertyService, BuildingHotspot, HomeStat } from '../../services/property.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  stats$: Observable<HomeStat[]> | undefined;
  hotspots$: Observable<BuildingHotspot[]> | undefined;

  features = [
    {
      icon: 'view',
      title: 'Interactive 3D Views',
      description: 'Explore every floor and unit with our cutting-edge interactive building visualization technology.'
    },
    {
      icon: 'realtime',
      title: 'Real-Time Availability',
      description: 'See live unit status updates—know instantly what\'s available, reserved, or sold.'
    },
    {
      icon: 'details',
      title: 'Complete Unit Details',
      description: 'Access floor plans, pricing, amenities, and all specifications for every unit at your fingertips.'
    },
    {
      icon: 'secure',
      title: 'Secure Reservations',
      description: 'Reserve your dream unit online with our secure, streamlined booking process.'
    }
  ];

  testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'First-Time Buyer',
      image: 'SM',
      quote: 'The interactive tour made finding our perfect apartment so easy. We could explore every floor without leaving our couch!'
    },
    {
      name: 'James Chen',
      role: 'Real Estate Investor',
      image: 'JC',
      quote: 'As an investor, having real-time availability and detailed floor plans in one place is invaluable. Highly recommend!'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Family Buyer',
      image: 'ER',
      quote: 'We loved being able to compare different units side by side. The whole family could be part of the decision process.'
    }
  ];

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.stats$ = this.propertyService.getStats();
    this.hotspots$ = this.propertyService.getHotspots();
  }

  getAvailableUnitsCount(floorId: string): number {
    return this.propertyService.lookupFloor(floorId)?.units.filter(u => u.status === 'available').length || 0;
  }

  getFloorName(floorId: string): string {
    return this.propertyService.lookupFloor(floorId)?.name || 'Unknown Floor';
  }
}
