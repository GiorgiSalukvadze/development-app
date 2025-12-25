import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Unit, SalesLead } from '../../models/property.models';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-unit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit-modal.component.html',
  styleUrl: './unit-modal.component.scss'
})
export class UnitModalComponent implements OnInit {
  @Input() unit!: Unit;
  @Input() buildingName?: string;
  @Input() floorName?: string;
  @Output() close = new EventEmitter<void>();

  showForm = false;
  isSubmitting = false;

  startStr = new Date().toISOString().split('T')[0];

  lead: Partial<SalesLead> = {
    name: '',
    email: '',
    phone: '',
    notes: '',
    interest: 'medium',
    nextCallDate: this.startStr
  };

  constructor(private propertyService: PropertyService) { }

  currentImageIndex = 0;

  // Demo images for the gallery
  galleryImages: string[] = [
    './assets/4.jpg',
    './assets/3.png',
    './assets/2.png',
    './assets/1.png'
  ];

  ngOnInit(): void {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  onClose(): void {
    document.body.style.overflow = '';
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onClose();
    }
  }

  onToggleForm(): void {
    this.showForm = !this.showForm;
  }

  onSubmitLead(): void {
    if (!this.lead.name || !this.lead.phone) {
      alert('Please enter at least Name and Phone.');
      return;
    }

    this.isSubmitting = true;

    // Construct full lead object
    const finalLead: SalesLead = {
      name: this.lead.name!,
      phone: this.lead.phone!,
      email: this.lead.email || '',
      notes: this.lead.notes || '',
      interest: 'medium',
      nextCallDate: this.lead.nextCallDate,
      // Context
      unitId: this.unit.id,
      unitName: this.unit.name,
      floorName: this.floorName || '',
      // We can't easily get Building ID here without more inputs, but unit context is key
    };

    console.log('Submitting public lead:', finalLead);

    this.propertyService.addLead(finalLead).subscribe({
      next: () => {
        alert('Thank you! We will contact you shortly.');
        this.isSubmitting = false;
        this.showForm = false;
        // Optional: Close modal completely?
        // this.onClose();
      },
      error: (err) => {
        console.error(err);
        alert('Something went wrong. Please try again.');
        this.isSubmitting = false;
      }
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.galleryImages.length;
  }

  prevImage(): void {
    this.currentImageIndex = this.currentImageIndex === 0
      ? this.galleryImages.length - 1
      : this.currentImageIndex - 1;
  }

  selectImage(index: number): void {
    this.currentImageIndex = index;
  }

  getStatusClass(): string {
    return this.unit.status;
  }
}