import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Point {
  x: number;
  y: number;
}

interface Polygon {
  id: string;
  name: string;
  points: Point[];
  color: string;
  type: 'floor' | 'unit';
  status: 'available' | 'sold' | 'reserved';
  metadata: {
    floorNumber?: number;
    area?: number;
    bedrooms?: number;
    bathrooms?: number;
    price?: number;
  };
}

@Component({
  selector: 'app-polygon-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './polygon-editor.component.html',
  styleUrl: './polygon-editor.component.scss'
})
export class PolygonEditorComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  private ctx!: CanvasRenderingContext2D;
  private image: HTMLImageElement | null = null;
  
  // Canvas state
  canvasWidth = 800;
  canvasHeight = 600;
  scale = 1;
  
  // Polygons
  polygons: Polygon[] = [];
  currentPolygon: Point[] = [];
  selectedPolygonIndex: number | null = null;
  
  // UI state
  isDrawing = false;
  editorMode: 'draw' | 'select' | 'edit' = 'draw';
  polygonType: 'floor' | 'unit' = 'floor';
  
  // New polygon form
  newPolygonName = '';
  newPolygonStatus: 'available' | 'sold' | 'reserved' = 'available';
  newPolygonFloorNumber = 1;
  newPolygonArea = 100;
  newPolygonBedrooms = 2;
  newPolygonBathrooms = 1;
  newPolygonPrice = 100000;
  
  // Colors
  statusColors = {
    available: 'rgba(34, 197, 94, 0.5)',
    sold: 'rgba(239, 68, 68, 0.5)',
    reserved: 'rgba(251, 191, 36, 0.5)'
  };

  imageLoaded = false;
  exportedJson = '';
  showExportModal = false;
  showImportModal = false;
  importJson = '';

  ngAfterViewInit(): void {
    this.initCanvas();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.redraw();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        this.image = new Image();
        this.image.onload = () => {
          // Adjust canvas to image size (with max constraints)
          const maxWidth = 1200;
          const maxHeight = 800;
          
          let width = this.image!.width;
          let height = this.image!.height;
          
          if (width > maxWidth) {
            const ratio = maxWidth / width;
            width = maxWidth;
            height = height * ratio;
          }
          
          if (height > maxHeight) {
            const ratio = maxHeight / height;
            height = height * ratio;
            width = width * ratio;
          }
          
          this.canvasWidth = width;
          this.canvasHeight = height;
          this.scale = width / this.image!.width;
          
          // Update canvas size
          setTimeout(() => {
            const canvas = this.canvasRef.nativeElement;
            canvas.width = this.canvasWidth;
            canvas.height = this.canvasHeight;
            this.ctx = canvas.getContext('2d')!;
            this.imageLoaded = true;
            this.redraw();
          }, 0);
        };
        this.image.src = e.target?.result as string;
      };
      
      reader.readAsDataURL(file);
    }
  }

  onCanvasClick(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (this.editorMode === 'draw') {
      this.currentPolygon.push({ x, y });
      this.redraw();
    } else if (this.editorMode === 'select') {
      this.selectPolygonAt(x, y);
    }
  }

  onCanvasRightClick(event: MouseEvent): void {
    event.preventDefault();
    if (this.editorMode === 'draw' && this.currentPolygon.length > 0) {
      // Remove last point
      this.currentPolygon.pop();
      this.redraw();
    }
  }

  private selectPolygonAt(x: number, y: number): void {
    // Check if click is inside any polygon
    for (let i = this.polygons.length - 1; i >= 0; i--) {
      if (this.isPointInPolygon({ x, y }, this.polygons[i].points)) {
        this.selectedPolygonIndex = i;
        this.loadPolygonToForm(this.polygons[i]);
        this.redraw();
        return;
      }
    }
    this.selectedPolygonIndex = null;
    this.redraw();
  }

  private isPointInPolygon(point: Point, polygon: Point[]): boolean {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y;
      const xj = polygon[j].x, yj = polygon[j].y;
      
      if (((yi > point.y) !== (yj > point.y)) &&
          (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    return inside;
  }

  loadPolygonToForm(polygon: Polygon): void {
    this.newPolygonName = polygon.name;
    this.newPolygonStatus = polygon.status;
    this.polygonType = polygon.type;
    this.newPolygonFloorNumber = polygon.metadata.floorNumber || 1;
    this.newPolygonArea = polygon.metadata.area || 100;
    this.newPolygonBedrooms = polygon.metadata.bedrooms || 2;
    this.newPolygonBathrooms = polygon.metadata.bathrooms || 1;
    this.newPolygonPrice = polygon.metadata.price || 100000;
  }

  completePolygon(): void {
    if (this.currentPolygon.length < 3) {
      alert('A polygon needs at least 3 points!');
      return;
    }

    const polygon: Polygon = {
      id: `polygon-${Date.now()}`,
      name: this.newPolygonName || `${this.polygonType === 'floor' ? 'Floor' : 'Unit'} ${this.polygons.length + 1}`,
      points: [...this.currentPolygon],
      color: this.statusColors[this.newPolygonStatus],
      type: this.polygonType,
      status: this.newPolygonStatus,
      metadata: {
        floorNumber: this.newPolygonFloorNumber,
        area: this.newPolygonArea,
        bedrooms: this.newPolygonBedrooms,
        bathrooms: this.newPolygonBathrooms,
        price: this.newPolygonPrice
      }
    };

    this.polygons.push(polygon);
    this.currentPolygon = [];
    this.resetForm();
    this.redraw();
  }

  cancelDrawing(): void {
    this.currentPolygon = [];
    this.redraw();
  }

  updateSelectedPolygon(): void {
    if (this.selectedPolygonIndex === null) return;
    
    const polygon = this.polygons[this.selectedPolygonIndex];
    polygon.name = this.newPolygonName;
    polygon.status = this.newPolygonStatus;
    polygon.type = this.polygonType;
    polygon.color = this.statusColors[this.newPolygonStatus];
    polygon.metadata = {
      floorNumber: this.newPolygonFloorNumber,
      area: this.newPolygonArea,
      bedrooms: this.newPolygonBedrooms,
      bathrooms: this.newPolygonBathrooms,
      price: this.newPolygonPrice
    };
    
    this.redraw();
  }

  deleteSelectedPolygon(): void {
    if (this.selectedPolygonIndex === null) return;
    
    this.polygons.splice(this.selectedPolygonIndex, 1);
    this.selectedPolygonIndex = null;
    this.resetForm();
    this.redraw();
  }

  private resetForm(): void {
    this.newPolygonName = '';
    this.newPolygonStatus = 'available';
    this.newPolygonFloorNumber = this.polygons.length + 1;
    this.newPolygonArea = 100;
    this.newPolygonBedrooms = 2;
    this.newPolygonBathrooms = 1;
    this.newPolygonPrice = 100000;
  }

  redraw(): void {
    if (!this.ctx) return;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    // Draw image
    if (this.image) {
      this.ctx.drawImage(this.image, 0, 0, this.canvasWidth, this.canvasHeight);
    } else {
      // Draw placeholder
      this.ctx.fillStyle = '#f1f5f9';
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.ctx.fillStyle = '#64748b';
      this.ctx.font = '20px Inter, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Upload an image to start', this.canvasWidth / 2, this.canvasHeight / 2);
    }
    
    // Draw completed polygons
    this.polygons.forEach((polygon, index) => {
      this.drawPolygon(polygon.points, polygon.color, index === this.selectedPolygonIndex);
      this.drawPolygonLabel(polygon);
    });
    
    // Draw current polygon in progress
    if (this.currentPolygon.length > 0) {
      this.drawPolygon(this.currentPolygon, 'rgba(99, 102, 241, 0.5)', false, true);
      
      // Draw points
      this.currentPolygon.forEach((point, index) => {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
        this.ctx.fillStyle = index === 0 ? '#22c55e' : '#6366f1';
        this.ctx.fill();
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
      });
    }
  }

  private drawPolygon(points: Point[], color: string, isSelected: boolean, isInProgress = false): void {
    if (points.length < 2) return;
    
    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }
    
    if (!isInProgress) {
      this.ctx.closePath();
    }
    
    this.ctx.fillStyle = color;
    this.ctx.fill();
    
    this.ctx.strokeStyle = isSelected ? '#1e293b' : 'rgba(0, 0, 0, 0.5)';
    this.ctx.lineWidth = isSelected ? 3 : 2;
    this.ctx.stroke();
  }

  private drawPolygonLabel(polygon: Polygon): void {
    // Calculate centroid
    const centroid = this.getPolygonCentroid(polygon.points);
    
    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.lineWidth = 3;
    this.ctx.font = 'bold 14px Inter, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    
    this.ctx.strokeText(polygon.name, centroid.x, centroid.y);
    this.ctx.fillText(polygon.name, centroid.x, centroid.y);
  }

  private getPolygonCentroid(points: Point[]): Point {
    let x = 0, y = 0;
    points.forEach(p => {
      x += p.x;
      y += p.y;
    });
    return { x: x / points.length, y: y / points.length };
  }

  setMode(mode: 'draw' | 'select' | 'edit'): void {
    this.editorMode = mode;
    if (mode === 'draw') {
      this.selectedPolygonIndex = null;
      this.resetForm();
    }
    this.redraw();
  }

  exportPolygons(): void {
    const imageWidth = this.image?.width || this.canvasWidth;
    const imageHeight = this.image?.height || this.canvasHeight;
    
    // Scale factor from canvas to original image
    const scaleToImage = 1 / this.scale;
    
    const exportData = {
      imageWidth: imageWidth,
      imageHeight: imageHeight,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
      scale: this.scale,
      // Provide the viewBox that should be used with these polygons
      // This matches the original image dimensions for perfect alignment
      viewBox: `0 0 ${imageWidth} ${imageHeight}`,
      polygons: this.polygons.map(p => ({
        ...p,
        // Convert to percentage-based coordinates for responsive use
        pointsPercentage: p.points.map(pt => ({
          x: (pt.x / this.canvasWidth) * 100,
          y: (pt.y / this.canvasHeight) * 100
        })),
        // SVG points scaled to ORIGINAL IMAGE dimensions (for use with viewBox matching image)
        svgPoints: p.points.map(pt => 
          `${Math.round(pt.x * scaleToImage)},${Math.round(pt.y * scaleToImage)}`
        ).join(' '),
        // Also keep canvas-based coordinates if needed
        svgPointsCanvas: p.points.map(pt => `${pt.x},${pt.y}`).join(' ')
      }))
    };
    
    this.exportedJson = JSON.stringify(exportData, null, 2);
    this.showExportModal = true;
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.exportedJson).then(() => {
      alert('Copied to clipboard!');
    });
  }

  downloadJson(): void {
    const blob = new Blob([this.exportedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'polygons.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  openImportModal(): void {
    this.showImportModal = true;
    this.importJson = '';
  }

  importPolygons(): void {
    try {
      const data = JSON.parse(this.importJson);
      if (data.polygons && Array.isArray(data.polygons)) {
        this.polygons = data.polygons.map((p: any) => ({
          ...p,
          color: this.statusColors[p.status as keyof typeof this.statusColors] || this.statusColors.available
        }));
        this.showImportModal = false;
        this.redraw();
      } else {
        alert('Invalid JSON format');
      }
    } catch (e) {
      alert('Invalid JSON');
    }
  }

  clearAll(): void {
    if (confirm('Are you sure you want to clear all polygons?')) {
      this.polygons = [];
      this.currentPolygon = [];
      this.selectedPolygonIndex = null;
      this.resetForm();
      this.redraw();
    }
  }
}
