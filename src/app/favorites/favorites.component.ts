// favorites.component.ts
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
// Correct import based on your folder structure:
import { Location } from '../shared/models/location.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites: Location[] = [];
  isLoading = false;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.isLoading = true;
    this.locationService.getFavorites().subscribe({
      next: (favorites) => {
        this.favorites = favorites;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading favorites:', err);
        this.isLoading = false;
      }
    });
  }

  toggleFavorite(location: Location): void {
    this.locationService.toggleFavorite(location.id!, !location.favorite).subscribe({
      next: () => {
        location.favorite = !location.favorite;
        // Remove from favorites list if unfavorited
        if (!location.favorite) {
          this.favorites = this.favorites.filter(fav => fav.id !== location.id);
        }
      },
      error: (err) => {
        console.error('Error toggling favorite:', err);
      }
    });
  }
}