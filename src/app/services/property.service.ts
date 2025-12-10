import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Building, Floor, Unit, Project } from '../models/property.models';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  // Your converted JSON data matching the TypeScript structure
private realFloorPolygons = [
  {
    id: "floor-1",
    name: "Floor 1",
    svgPoints: "83,717 601,697 598,675 83,678",
    status: "available" as const,
    floorNumber: 1,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-2",
    name: "Floor 2",
    svgPoints: "85,679 601,676 601,652 89,642",
    status: "available" as const,
    floorNumber: 2,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-3",
    name: "Floor 3",
    svgPoints: "86,643 600,654 599,632 87,607",
    status: "available" as const,
    floorNumber: 3,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-4",
    name: "Floor 4",
    svgPoints: "87,606 600,632 598,607 87,571",
    status: "available" as const,
    floorNumber: 4,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-5",
    name: "Floor 5",
    svgPoints: "89,571 597,610 595,586 89,536",
    status: "available" as const,
    floorNumber: 5,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-6",
    name: "Floor 6",
    svgPoints: "89,536 597,587 594,565 90,501",
    status: "available" as const,
    floorNumber: 6,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-7",
    name: "Floor 7",
    svgPoints: "89,500 597,567 595,545 91,466",
    status: "available" as const,
    floorNumber: 7,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-8",
    name: "Floor 8",
    svgPoints: "92,465 595,545 593,528 94,431",
    status: "available" as const,
    floorNumber: 8,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-9",
    name: "Floor 9",
    svgPoints: "90,430 597,524 594,500 91,396",
    status: "available" as const,
    floorNumber: 9,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-10",
    name: "Floor 10",
    svgPoints: "94,397 594,501 592,479 93,361",
    status: "available" as const,
    floorNumber: 10,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-11",
    name: "Floor 11",
    svgPoints: "91,361 593,480 592,463 92,330",
    status: "available" as const,
    floorNumber: 11,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-12",
    name: "Floor 12",
    svgPoints: "92,329 593,461 591,441 92,294",
    status: "available" as const,
    floorNumber: 12,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-13",
    name: "Floor 13",
    svgPoints: "94,295 592,440 591,416 93,262",
    status: "available" as const,
    floorNumber: 13,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-14",
    name: "Floor 14",
    svgPoints: "92,259 592,418 590,398 94,225",
    status: "available" as const,
    floorNumber: 14,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-15",
    name: "Floor 15",
    svgPoints: "93,225 592,396 589,374 95,193",
    status: "available" as const,
    floorNumber: 15,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-16",
    name: "Floor 16",
    svgPoints: "94,192 590,377 590,354 96,149",
    status: "available" as const,
    floorNumber: 16,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-17",
    name: "Floor 17",
    svgPoints: "95,146 590,351 590,334 98,124",
    status: "available" as const,
    floorNumber: 17,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-18",
    name: "Floor 18",
    svgPoints: "94,124 588,333 588,313 96,91",
    status: "available" as const,
    floorNumber: 18,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-19",
    name: "Floor 19",
    svgPoints: "94,93 589,314 587,295 96,60",
    status: "available" as const,
    floorNumber: 19,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  },
  {
    id: "floor-20",
    name: "Floor 20",
    svgPoints: "96,59 588,295 588,271 96,23",
    status: "available" as const,
    floorNumber: 20,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: []
  }
];
  private demoProject: Project = {
    id: 'project-1',
    name: 'Sunset Residences',
    description: 'Luxury apartments with stunning city views',
    buildings: [
      {
        id: 'building-1',
        name: 'Tower A',
        address: '123 Development Ave, City Center',
        description: 'Premium residential tower',
        totalFloors: 2,
        renderImage: 'assets/town-a.jpeg',
        floors: this.generateFloorsFromPolygons()
      }
    ]
  };

  private selectedBuilding$ = new BehaviorSubject<Building | null>(null);
  private selectedFloor$ = new BehaviorSubject<Floor | null>(null);
  private selectedUnit$ = new BehaviorSubject<Unit | null>(null);

  constructor() {}

  private generateFloorsFromPolygons(): Floor[] {
    return this.realFloorPolygons.map(polygonData => {
      const floorUnits = this.generateUnitsFromPolygons(polygonData);
      const floorStatus = floorUnits.every(u => u.status === 'sold') 
        ? 'sold' 
        : 'available';

      return {
        id: polygonData.id,
        buildingId: 'building-1',
        floorNumber: polygonData.floorNumber,
        name: polygonData.name,
        status: floorStatus,
        polygonPoints: polygonData.svgPoints,
        floorPlanImage: polygonData.floorPlanImage,
        floorPlanViewBox: polygonData.floorPlanViewBox,
        units: floorUnits
      };
    });
  }

  private generateUnitsFromPolygons(floorData: any): Unit[] {
    if (floorData.unitPolygons && floorData.unitPolygons.length > 0) {
      return floorData.unitPolygons.map((unitData: any, index: number) => ({
        id: `${floorData.id}-${unitData.id}`,
        name: unitData.name,
        floorId: floorData.id,
        status: unitData.status,
        area: unitData.area,
        bedrooms: unitData.bedrooms,
        bathrooms: unitData.bathrooms,
        price: unitData.price,
        polygonPoints: unitData.svgPoints,
        description: `Beautiful ${unitData.bedrooms} bedroom apartment on floor ${floorData.floorNumber}`,
        features: [
          'Central heating',
          'Air conditioning',
          'Balcony',
          'Parking space',
          index % 2 === 0 ? 'City view' : 'Garden view'
        ]
      }));
    }
    // Fallback to generated units if no polygon data
    return this.generateUnitsForFloor(floorData.id, floorData.floorNumber);
  }

  private generateUnitsForFloor(floorId: string, floorNumber: number): Unit[] {
    const units: Unit[] = [];
    const unitCount = 4; // 4 units per floor
    
    for (let i = 1; i <= unitCount; i++) {
      // Randomize status for demo - only available or sold
      const statusOptions: ('available' | 'sold')[] = ['available', 'sold'];
      const randomStatus = statusOptions[Math.floor(Math.random() * 2)];
      
      units.push({
        id: `${floorId}-unit-${i}`,
        name: `Unit ${floorNumber}0${i}`,
        floorId: floorId,
        status: randomStatus,
        area: 75 + (i * 15), // Varying sizes
        bedrooms: i <= 2 ? 2 : 3,
        bathrooms: i <= 2 ? 1 : 2,
        price: 150000 + (floorNumber * 10000) + (i * 25000),
        polygonPoints: this.getUnitPolygonPoints(i),
        description: `Beautiful ${i <= 2 ? '2' : '3'} bedroom apartment on floor ${floorNumber}`,
        features: [
          'Central heating',
          'Air conditioning',
          'Balcony',
          'Parking space',
          i > 2 ? 'City view' : 'Garden view'
        ]
      });
    }
    
    return units;
  }

  private getUnitPolygonPoints(unitNumber: number): string {
    // Floor plan is divided into 4 quadrants for units
    // Viewbox is 800x600
    const positions: { [key: number]: string } = {
      1: '50,50 350,50 350,250 50,250',   // Top-left
      2: '400,50 750,50 750,250 400,250', // Top-right
      3: '50,300 350,300 350,550 50,550', // Bottom-left
      4: '400,300 750,300 750,550 400,550' // Bottom-right
    };
    
    return positions[unitNumber] || positions[1];
  }

  // Public methods
  getProject(): Observable<Project> {
    return of(this.demoProject);
  }

  getBuilding(buildingId: string): Observable<Building | undefined> {
    const building = this.demoProject.buildings.find(b => b.id === buildingId);
    return of(building);
  }

  getFloor(buildingId: string, floorId: string): Observable<Floor | undefined> {
    const building = this.demoProject.buildings.find(b => b.id === buildingId);
    const floor = building?.floors.find(f => f.id === floorId);
    return of(floor);
  }

  getUnit(floorId: string, unitId: string): Observable<Unit | undefined> {
    for (const building of this.demoProject.buildings) {
      const floor = building.floors.find(f => f.id === floorId);
      if (floor) {
        const unit = floor.units.find(u => u.id === unitId);
        if (unit) return of(unit);
      }
    }
    return of(undefined);
  }

  // Selection state management
  selectBuilding(building: Building | null): void {
    this.selectedBuilding$.next(building);
    this.selectedFloor$.next(null);
    this.selectedUnit$.next(null);
  }

  selectFloor(floor: Floor | null): void {
    this.selectedFloor$.next(floor);
    this.selectedUnit$.next(null);
  }

  selectUnit(unit: Unit | null): void {
    this.selectedUnit$.next(unit);
  }

  getSelectedBuilding(): Observable<Building | null> {
    return this.selectedBuilding$.asObservable();
  }

  getSelectedFloor(): Observable<Floor | null> {
    return this.selectedFloor$.asObservable();
  }

  getSelectedUnit(): Observable<Unit | null> {
    return this.selectedUnit$.asObservable();
  }

  // Statistics
  getBuildingStats(building: Building): { available: number; sold: number; total: number } {
    let available = 0, sold = 0;
    
    building.floors.forEach(floor => {
      floor.units.forEach(unit => {
        if (unit.status === 'available') available++;
        else sold++;
      });
    });
    
    return { available, sold, total: available + sold };
  }
}
