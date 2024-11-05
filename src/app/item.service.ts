import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items: string[] = [];
  private randomColors: string[] = [];

  // Méthode pour obtenir les éléments
  getItems(): string[] {
    return this.items;
  }

  // Méthode pour ajouter un nouvel élément
  addItem(item: string): void {
    if (item.trim()) {
      this.items.push(item);
    }
  }

  // Méthode pour supprimer le dernier élément
  removeLastItem(): void {
    if (this.items.length > 0) {
      this.items.pop();
    }
  }

  // Méthode pour générer des couleurs aléatoires
  generateRandomColors(): void {
    this.randomColors = this.items.map(() => this.getRandomColor());
  }

  // Méthode pour obtenir une couleur pour un index donné
  getColor(index: number, isRandom: boolean): string {
    const colors = ['red', 'blue', 'green'];
    if (isRandom) {
      return this.randomColors[index] || this.getRandomColor();
    } else {
      return colors[index % colors.length];
    }
  }

  // Méthode pour générer une couleur aléatoire
  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Méthode pour trier la liste
  sortItems(mode: number): void {
    if (mode === 0) {
      this.items.sort(); // Ascendant
    } else if (mode === 1) {
      this.items.sort((a, b) => b.localeCompare(a)); // Descendant
    } else {
      this.items = this.items
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value); // Aléatoire
    }
  }
}
