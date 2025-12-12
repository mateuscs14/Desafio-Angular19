import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface GalleryItem {
  image: string;
  title: string;
  category: string;
}

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isScrolled = false;
  isMenuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  portfolioItems: GalleryItem[] = [
    { image: '/cilios.jpg', title: 'Extensão de Cílios (Volume Brasileiro)', category: 'Cílios' },
    { image: '/cílios1.jpeg', title: 'Extensão de Cílios (Volume Fox)', category: 'Cílios' },
    { image: '/cílios2.jpeg', title: 'Extensão de Cílios (Volume Mega Brasileiro)', category: 'Cílios' },
    { image: '/cílios3.jpeg', title: 'Extensão de Cílios (Volume U)', category: 'Cílios' },
    { image: '/cílios4.jpeg', title: 'Look Francês', category: 'Cílios' },
    { image: '/cílios5.jpeg', title: 'Colar cílios postiços', category: 'Cílios' },
    { image: '/cílios6.jpeg', title: 'Extensão de Cílios (Volume Brasileiro)', category: 'Cílios' },
    { image: '/sobrancelha1.jpeg', title: 'Design de Sobrancelhas', category: 'Sobrancelhas' },
    { image: '/sobrancelha2.jpeg', title: 'Micropigmentação', category: 'Sobrancelhas' },
    { image: '/sobrancelha3.jpeg', title: 'Brow Lamination', category: 'Sobrancelhas' },
    { image: '/Sobrancelha4.jpeg', title: 'Design de Sobrancelhas', category: 'Sobrancelhas' },
    { image: '/maquiagem.jpg', title: 'Maquiagem', category: 'Maquiagem' },
    { image: '/maquiagem2.jpeg', title: 'Maquiagem', category: 'Maquiagem' }
  ];

  filteredItems: GalleryItem[] = [];
  selectedCategory: string = 'Todos';
  currentUser: any = null;
  selectedImage: string | null = null;

  constructor(private router: Router, private authService: AuthService) {
    this.filteredItems = this.portfolioItems;
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  openImage(image: string) {
    this.selectedImage = image;
  }

  closeImage() {
    this.selectedImage = null;
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'Todos') {
      this.filteredItems = this.portfolioItems;
    } else {
      this.filteredItems = this.portfolioItems.filter(item => item.category === category);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
  }
}
