import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryItem {
  image: string;
  category: string;
  title: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedCategory: string = 'Todos';

  galleryItems: GalleryItem[] = [
    { image: '/sombrancelha1.jpeg', category: 'Sombrancelhas', title: 'Sombrancelhas' },
    { image: '/sombrancelha2.jpeg', category: 'Sombrancelhas', title: 'Sombrancelhas' },
    { image: '/sombrancelha3.jpeg', category: 'Sombrancelhas', title: 'Sombrancelhas' },
    { image: '/cilios.jpg', category: 'Cílios', title: 'Cílios' },
    { image: '/maquiagem.jpg', category: 'Maquiagem', title: 'Maquiagem' },
    { image: '/cilios.jpg', category: 'Cílios', title: 'Cílios' },
    { image: '/maquiagem.jpg', category: 'Maquiagem', title: 'Maquiagem' }
  ];

  get filteredItems(): GalleryItem[] {
    if (this.selectedCategory === 'Todos') {
      return this.galleryItems;
    }
    return this.galleryItems.filter(item => item.category === this.selectedCategory);
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
  }
}
