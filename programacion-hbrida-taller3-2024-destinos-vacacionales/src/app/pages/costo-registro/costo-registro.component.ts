import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { DestinationsService } from 'src/app/servicios/destinations.service';
import { NavController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-costo-registro',
  templateUrl: './costo-registro.component.html',
  styleUrls: ['./costo-registro.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,IonButton,IonInput,IonItem,IonLabel,IonContent,IonItem, IonTitle,IonInput,IonHeader,IonToolbar, IonButtons]
})

export class CostoRegistroComponent  implements OnInit {

  travelCost: number = 0;
  destinationId: number;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private destinationsService: DestinationsService
  ) {
    this.destinationId = 0;
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id'] && params['currentCost']) {
        this.destinationId = params['id'];
        this.travelCost = params['currentCost'];
      }
    });
  }

  submitCost() {
    this.destinationsService.changeTravelCost(this.destinationId, this.travelCost);
    this.navCtrl.back();
  }

  cancel() {
    this.navCtrl.back();
  } 
}
