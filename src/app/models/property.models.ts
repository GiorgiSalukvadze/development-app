// Data models for the real estate visualization platform

export type UnitStatus = 'available' | 'sold';

export interface Unit {
  id: string;
  name: string;
  floorId: string;
  status: UnitStatus;
  area: number; // in square meters
  bedrooms: number;
  bathrooms: number;
  price: number;
  polygonPoints: string; // SVG polygon points
  description?: string;
  features?: string[];
  images?: string[];
}

export interface Floor {
  id: string;
  buildingId: string;
  floorNumber: number;
  name: string;
  status: UnitStatus; // Computed based on units
  polygonPoints: string; // SVG polygon points for building view
  floorPlanImage?: string; // Background image for floor plan
  floorPlanViewBox?: string; // SVG viewBox for floor plan (e.g., "0 0 1227 836")
  units: Unit[];
}

export interface Building {
  id: string;
  name: string;
  address: string;
  description: string;
  totalFloors: number;
  renderImage: string; // Main building render image
  floors: Floor[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  buildings: Building[];
}
