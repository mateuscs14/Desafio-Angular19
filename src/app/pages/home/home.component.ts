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
    { image: '/cilios.jpg', title: 'Extensão de Cílios Volume Russo', category: 'Cílios' },
    { image: '/cílios1.jpeg', title: 'Alongamento de Cílios', category: 'Cílios' },
    { image: '/cílios2.jpeg', title: 'Lifting de Cílios', category: 'Cílios' },
    { image: '/sobrancelha1.jpeg', title: 'Design de Sobrancelhas', category: 'Sobrancelhas' },
    { image: '/sobrancelha2.jpeg', title: 'Micropigmentação', category: 'Sobrancelhas' },
    { image: '/sobrancelha3.jpeg', title: 'Brow Lamination', category: 'Sobrancelhas' },
    { image: '/maquiagem.jpg', title: 'Maquiagem Social', category: 'Maquiagem' },
    { image: '/maquiagem2.jpeg', title: 'Maquiagem Artística', category: 'Maquiagem' }
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
