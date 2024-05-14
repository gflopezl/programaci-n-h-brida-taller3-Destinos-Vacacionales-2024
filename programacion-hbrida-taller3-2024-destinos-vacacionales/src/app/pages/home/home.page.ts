import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonIcon, IonThumbnail } from '@ionic/angular/standalone';
import { Destination } from 'src/app/model/destination'; 
import { DestinationsService } from 'src/app/servicios/destinations.service';
import { addIcons } from 'ionicons';
import { airplaneOutline, cameraOutline, trashOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular/standalone';
import { Camera, CameraResultType } from '@capacitor/camera';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,IonHeader, IonToolbar, IonTitle, IonContent,IonSearchbar,IonList,IonItem,IonLabel, IonButton,IonIcon,IonThumbnail],
})

export class HomePage {
  searchTerm = '';
  destinations: Destination[] = [];
  filteredDestinations: Destination[] = [];
  apiSearchResults: any[] = []; 
  wishList: Destination[] = []; 

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private destinationsService: DestinationsService
  ) {
    this.destinationsService.currentDestinations.subscribe(destinations => this.destinations = destinations);
    addIcons({ 
      'camera-outline': cameraOutline, 
      'trash-outline': trashOutline, 
      'airplane-outline': airplaneOutline 
    });
  }

  ngOnInit() {
    this.destinationsService.currentDestinations.subscribe(destinations => {
      this.destinations = destinations;
      this.filteredDestinations = destinations;
    });
  }
  
  async searchTermChanged(event: any) {
    const searchTerm = event.detail.value;
    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredDestinations = this.destinations.filter(destination => 
        destination.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      try {
        const results = await this.destinationsService.getAutosuggest(searchTerm);
        this.apiSearchResults = results;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      this.filteredDestinations = this.destinations;
      this.apiSearchResults = [];
    }
  }
  
  async openCamera(destination: Destination) {
    try {
      const image = await Camera.getPhoto({ 
        quality: 90, 
        allowEditing: true, 
        resultType: CameraResultType.Uri 
      });
  
      const imageUrl = image.webPath; 
  
      if (imageUrl) {
        this.updateDestinationImage(destination.id, imageUrl);
      } else {
        console.error('No se pudo obtener la imagen.');
      }
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }

  updateDestinationImage(destinationId: number, imageUrl: string) {
    const index = this.destinations.findIndex(d => d.id === destinationId);
    if (index !== -1) {
      this.destinations[index].image = imageUrl;
      this.destinationsService.updateDestinations(this.destinations);
    }
  }
  async confirmDelete(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que quieres eliminar este destino?',
      buttons: [
        { text: 'Cancelar', role: 'cancel', cssClass: 'secondary', handler: () => { console.log('Eliminación cancelada'); } }, 
        { text: 'Eliminar', handler: () => { this.destinationsService.deleteDestination(id); console.log('Destino eliminado'); } }
      ]
    });

    await alert.present();
  }

  openCostRegistration(destination: Destination) {
    this.navCtrl.navigateForward(['/costo-registro'], { queryParams: { id: destination.id, currentCost: destination.cost } });
  }

  addToWishList(destination: Destination) {
    if (!this.wishList.find(dest => dest.id === destination.id)) {
      this.wishList.push(destination);
      console.log('Destino añadido a la lista de deseos:', destination);
    } else {
      console.log('El destino ya está en la lista de deseos.');
    }
  }

}