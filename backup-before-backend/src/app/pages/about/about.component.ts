import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  values = [
    {
      icon: 'quality',
      title: 'Quality Excellence',
      description: 'We never compromise on quality. Every detail matters in creating your perfect living space.'
    },
    {
      icon: 'trust',
      title: 'Trust & Transparency',
      description: 'Building lasting relationships through honest communication and reliable service.'
    },
    {
      icon: 'innovation',
      title: 'Innovation First',
      description: 'Embracing cutting-edge technology to transform the real estate experience.'
    },
    {
      icon: 'customer',
      title: 'Customer Centric',
      description: 'Your satisfaction is our priority. We go above and beyond for every client.'
    }
  ];

  team = [
    {
      name: 'Alexander Morrison',
      role: 'CEO & Founder',
      initials: 'AM',
      bio: '20+ years in luxury real estate development'
    },
    {
      name: 'Victoria Chen',
      role: 'Head of Design',
      initials: 'VC',
      bio: 'Award-winning architectural designer'
    },
    {
      name: 'Marcus Thompson',
      role: 'Sales Director',
      initials: 'MT',
      bio: '15 years of premium property sales'
    },
    {
      name: 'Isabella Romano',
      role: 'Customer Relations',
      initials: 'IR',
      bio: 'Dedicated to exceptional client experiences'
    }
  ];

  milestones = [
    { year: '1998', title: 'Company Founded', description: 'Started with a vision to transform real estate' },
    { year: '2005', title: 'First Major Project', description: 'Completed our flagship residential tower' },
    { year: '2012', title: 'National Expansion', description: 'Extended operations to 10 major cities' },
    { year: '2020', title: 'Digital Innovation', description: 'Launched interactive property exploration platform' },
    { year: '2024', title: 'Industry Leader', description: 'Recognized as top innovator in real estate tech' }
  ];
}
