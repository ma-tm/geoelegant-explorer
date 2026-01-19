
export interface Location {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  category: 'restaurant' | 'landmark' | 'park' | 'museum' | 'other';
  rating?: number;
  address?: string;
}

export interface SearchResult {
  locations: Location[];
  summary: string;
}
