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
    { image: '/cilios.jpeg', title: 'Extensão de Cílios Volume Russo', category: 'Cílios' },
    { image: '/sombrancelha.jpeg', title: 'Design de Sobrancelhas', category: 'Sombrancelhas' },
    { image: '/make1.jpeg', title: 'Maquiagem Social', category: 'Maquiagem' },
    { image: '/make2.jpeg', title: 'Maquiagem Artística', category: 'Maquiagem' },
    { image: '/cilios2.jpeg', title: 'Lifting de Cílios', category: 'Cílios' },
    { image: '/sombrancelha2.jpeg', title: 'Micropigmentação', category: 'Sombrancelhas' }
  ];

  filteredItems: GalleryItem[] = [];
  selectedCategory: string = 'Todos';
  currentUser: any = null;

  constructor(private router: Router, private authService: AuthService) {
    this.filteredItems = this.portfolioItems;
    this.authService.currentUser.subscribe(x => this.currentUser = x);
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
