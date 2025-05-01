import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocationService } from '../../services/location.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-details-location',
   imports: [CommonModule],
   standalone: true,
  templateUrl: './details-location.component.html',
  styleUrls: ['./details-location.component.css']
})
export class DetailsLocationComponent implements OnInit {
  location: any;
  errorMessage: string | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    console.log('Initializing DetailsLocationComponent');
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', idParam);
    if (!idParam) {
      this.errorMessage = "ID de location non fourni";
      this.isLoading = false;
      return;
    }

    const id = +idParam; // Convertir en number
    console.log('Parsed ID:', id);
    if (isNaN(id)) {
      this.errorMessage = "ID de location invalide";
      this.isLoading = false;
      return;
    }

    this.http.get(`http://localhost:8000/api/locations/${id}`).subscribe(
      (response: any) => {
        // Si votre backend retourne { data: {...} }
        this.location = response.data || response;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = "Erreur lors du chargement des détails";
        this.isLoading = false;
        console.error('Error fetching location details:', error);
      }
    );
  }
}