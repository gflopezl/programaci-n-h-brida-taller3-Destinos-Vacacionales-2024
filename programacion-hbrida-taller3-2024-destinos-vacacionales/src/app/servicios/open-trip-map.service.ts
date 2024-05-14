import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root'
})
export class OpenTripMapService {
  private apiKey = '5ae2e3f221c38a28845f05b67e6ef4d74ea092e5d92cdc73011c0992';

  constructor() {}

  async getAutosuggest(query: string): Promise<any> {
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
