import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Unit } from '../../models/property.models';

@Component({
  selector: 'app-unit-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unit-modal.component.html',
  styleUrl: './unit-modal.component.scss'
})
export class UnitModalComponent implements OnInit {
  @Input() unit!: Unit;
  @Output() close = new EventEmitter<void>();
  @Output() requestInfo = new EventEmitter<Unit>();

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

  onRequestInfo(): void {
    this.requestInfo.emit(this.unit);
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