import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Building, Floor, Unit, Project } from '../models/property.models';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private realFloorPolygons = [
    {
      id: "floor-1",
      name: "Floor 1",
      svgPoints: "38.5,262 93.5,149 591.5,350 590.5,377 107.5,197 37.5,273 38.5,282",
      status: "available" as const,
      floorNumber: 1,
      floorPlanImage: "assets/floor-a.jpg",
      // ViewBox must match ORIGINAL image dimensions (1227x836)
      // svgPoints coordinates must also be scaled to these dimensions
      floorPlanViewBox: "0 0 1227 836",
      unitPolygons: [
        {
          id: "unit-1",
          name: "Unit 101",
          // Coordinates scaled from canvas (1174x800) to image (1227x836): multiply by ~1.045
          svgPoints: "18,256 126,256 127,389 145,390 146,408 164,408 163,428 123,423 19,416 22,418",
          status: "available" as const,
          area: 100,
          bedrooms: 2,
          bathrooms: 1,
          price: 150000
        },
        {
          id: "unit-2",
          name: "Unit 102",
          svgPoints: "229,402 233,257 131,258 130,386 146,391 147,403",
          status: "available" as const,
          area: 100,
          bedrooms: 2,
          bathrooms: 1,
          price: 160000
        }
      ]
    },
    {
      id: "floor-2", 
      name: "Floor 2",
      svgPoints: "109.5,198 591.5,377.25 591.5,398.25 110.5,232.25",
      status: "available" as const,
      floorNumber: 2,
      floorPlanImage: "assets/floor-a.jpg",
      floorPlanViewBox: "0 0 1227 836",
      unitPolygons: [
        {
          id: "unit-1",
          name: "Unit 201",
          svgPoints: "18,256 126,256 127,389 145,390 146,408 164,408 163,428 123,423 19,416 22,418",
          status: "sold" as const,
          area: 100,
          bedrooms: 2,
          bathrooms: 1,
          price: 155000
        },
        {
          id: "unit-2",
          name: "Unit 202",
          svgPoints: "229,402 233,257 131,258 130,386 146,391 147,403",
          status: "available" as const,
          area: 100,
          bedrooms: 2,
          bathrooms: 1,
          price: 165000
        }
      ]
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
