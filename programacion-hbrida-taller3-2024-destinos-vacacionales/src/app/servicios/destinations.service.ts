import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Destination } from '../model/destination';
import { Http } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {
  private apiKey = '5ae2e3f221c38a28845f05b67e6ef4d74ea092e5d92cdc73011c0992';
  private destinationsSource = new BehaviorSubject<Destination[]>([
    { id: 1, name: 'La Bombonera, Buenos Aires', country: 'Argentina', image: 'assets/img/bombonera.jpg', cost: 160000.00 },
    { id: 2, name: 'Muelle De Las Almas, Chiloé', country: 'Chile', image: 'assets/img/muelledelasalmas.jpg', cost:105000.00 },
    { id: 3, name: 'Parque Tantauco', country: 'Chiloé', image: 'assets/img/parquetantauco.jpg', cost: 100000.00 },
    { id: 4, name: 'Pan de Azucar, Rio de Janeiro', country: 'Brasil', image: 'assets/img/Playa 3.jpg', cost: 900000.00 },
  ]);

  currentDestinations = this.destinationsSource.asObservable();

  constructor() {}

  changeTravelCost(id: number, newCost: number) {
    const destinations = [...this.destinationsSource.getValue()];
    const index = destinations.findIndex(dest => dest.id === id);
    if (index !== -1) {
      destinations[index].cost = newCost; 
      this.destinationsSource.next(destinations);
    }
  }

deleteDestination(id: number) {
  const destinations = this.destinationsSource.getValue();
  const updatedDestinations = destinations.filter(destination => destination.id !== id);
  this.destinationsSource.next(updatedDestinations);
}

updateDestinations(destinations: Destination[]) {
  this.destinationsSource.next(destinations);
}

async getAutosuggest(query: string) {
  try {
    const response = await Http.get({
      url: `https://api.opentripmap.com/0.1/en/places/autosuggest?name=${query}`,
      headers: { 'X-Api-Key': this.apiKey }
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

}