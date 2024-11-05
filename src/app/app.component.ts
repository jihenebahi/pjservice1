import { Component } from '@angular/core';
import { ItemService } from './item.service'; // Importer le service

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newItem: string = ''; 
  isRandom: boolean = true; 
  buttonLabel: string = 'Appliquer des couleurs aléatoires'; 
  sortMode: number = 0; 
  sortButtonLabel: string = 'Trier Ascendant'; 
  isListVisible: boolean = true; 
  displayButtonLabel: string = 'Cacher la liste'; 

  constructor(private itemService: ItemService) {} // Injection du service

  // Méthode pour ajouter un élément
  addItem() {
    this.itemService.addItem(this.newItem);
  }

  // Méthode pour supprimer le dernier élément
  removeLastItem() {
    this.itemService.removeLastItem();
  }

  // Méthode pour obtenir la couleur en fonction de l'index
  getColor(index: number) {
    return this.itemService.getColor(index, this.isRandom);
  }

  // Méthode pour basculer le mode couleur
  toggleColorMode() {
    this.isRandom = !this.isRandom;
    if (this.isRandom) {
      this.buttonLabel = 'Appliquer des couleurs cycliques';
      this.itemService.generateRandomColors();
    } else {
      this.buttonLabel = 'Appliquer des couleurs aléatoires';
    }
  }

  // Méthode pour trier la liste
  sortList() {
    this.sortMode = (this.sortMode + 1) % 3;
    this.itemService.sortItems(this.sortMode);
    this.sortButtonLabel = this.sortMode === 0 ? 'Trier Descendant' : this.sortMode === 1 ? 'Trier Aléatoire' : 'Trier Ascendant';
  }

  // Méthode pour afficher ou cacher la liste
  toggleListVisibility() {
    this.isListVisible = !this.isListVisible;
    this.displayButtonLabel = this.isListVisible ? 'Cacher la liste' : 'Afficher la liste';
  }

  // Obtenir les éléments pour l'affichage dans la liste
  get items(): string[] {
    return this.itemService.getItems();
  }
}