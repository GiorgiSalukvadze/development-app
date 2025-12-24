// Data models for the real estate visualization platform

export type UnitStatus = 'available' | 'sold';

export interface SalesLead {
  id?: string;
  name: string;
  email?: string;
  phone: string;
  notes: string;
  firstCallDate?: string;
  nextCallDate?: string;
  interest: 'high' | 'medium' | 'low';
  unitName?: string;
  floorName?: string;
  unitId?: string;
}

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
  condition?: string;
  description?: string;
  features?: string[];
  images?: string[];
  salesLeads?: SalesLead[];
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
  leads?: SalesLead[];
}
