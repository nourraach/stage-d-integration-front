// src/app/shared/models/location.model.ts
export interface Photo {
    id?: number;
    chemin: string;
    location?: Location;
  }
  
  export interface ApiResponse {
    status: string;
    data: Location[];
  }
  
  export interface Location {
    id?: number;
    description: string;
    prix: number;
    superficie: number;
    type: string;
    disponibilite: boolean;
    meuble: boolean;
    adresse: string;
    ville: string;
    photos?: Photo[];
    favorite: boolean;
  }