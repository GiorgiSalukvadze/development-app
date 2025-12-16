import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyService, BuildingHotspot, HomeStat } from '../../../services/property.service';
import { Floor } from '../../../models/property.models';

@Component({
    selector: 'app-admin-hotspot-editor',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-hotspot-editor.component.html',
    styleUrl: './admin-hotspot-editor.component.scss'
})
export class AdminHotspotEditorComponent implements OnInit {
    hotspots: BuildingHotspot[] = [];
    floors: Floor[] = [];
    stats: HomeStat[] = [];

    selectedHotspot: BuildingHotspot | null = null;
    buildingImage = 'assets/town-a.jpeg';

    constructor(private propertyService: PropertyService) { }

    ngOnInit() {
        this.propertyService.getHotspots().subscribe(h => this.hotspots = h);
        this.propertyService.getStats().subscribe(s => this.stats = s);

        // Get floors from the first building for the dropdown
        this.propertyService.getProject().subscribe(project => {
            if (project.buildings.length > 0) {
                this.floors = project.buildings[0].floors;
            }
        });
    }

    addHotspot(event: MouseEvent) {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        const newHotspot: BuildingHotspot = {
            id: 'h-' + Date.now(),
            floorId: this.floors[0]?.id || '',
            x,
            y
        };

        const updated = [...this.hotspots, newHotspot];
        this.propertyService.updateHotspots(updated);
        this.selectedHotspot = newHotspot;
    }

    selectHotspot(hotspot: BuildingHotspot, event: MouseEvent) {
        event.stopPropagation();
        this.selectedHotspot = hotspot;
    }

    updateSelectedHotspot() {
        this.propertyService.updateHotspots(this.hotspots);
    }

    updateHotspotField(field: keyof BuildingHotspot, value: any) {
        if (!this.selectedHotspot) return;
        (this.selectedHotspot as any)[field] = value;
        this.updateSelectedHotspot();
    }

    deleteSelectedHotspot() {
        if (!this.selectedHotspot) return;
        const updated = this.hotspots.filter(h => h.id !== this.selectedHotspot!.id);
        this.propertyService.updateHotspots(updated);
        this.selectedHotspot = null;
    }

    updateStats() {
        this.propertyService.updateStats(this.stats);
        alert('Stats updated!');
    }
}
