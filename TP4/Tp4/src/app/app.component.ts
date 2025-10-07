import { Component, OnInit } from '@angular/core';
import { FaceSnapComponent } from './face-snap-g1/face-snap-g1.component';
import { CommonModule } from '@angular/common';
import { FaceSnap } from './models/face-snap.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FaceSnapComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faceSnaps!: FaceSnap[];

  
  ngOnInit() {
    this.faceSnaps = [
      {
        title: 'Archibald',
        description: 'Mon meilleur ami depuis tout petit !', // Correction: "Mon" au lieu de "Non"
        imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg', // Correction: année 2015
        createdDate: new Date(), // Correction: createdDate au lieu de createdbate
        snaps: 0
      },
      {
        title: 'Three Rock Mountain',
        description: 'Endroit magnifique', // Correction orthographe
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Three_Rock_Mountain_Southern_Tor.jpg/2880px-Three_Rock_Mountain_Southern_Tor.jpg', // Correction URL
        createdDate: new Date(), // Correction: createdDate
        snaps: 0
      },
      {
        title: 'Un bon repas',
        description: 'Mmmh que c\'est bon !', // Correction orthographe
        imageUrl: 'https://wtop.com/wp-content/uploads/2020/06/HEALTHYFRESH.jpg',
        createdDate: new Date(), // Correction: createdDate
        snaps: 0
      }
    ];
  }}
