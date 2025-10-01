import { Component, OnInit } from '@angular/core';
import { FaceSnap } from './models/face-snap.model';
import { FaceSnapG1Component } from './face-snap-g1/face-snap-g1.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FaceSnapG1Component],   
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mySnap!: FaceSnap;

  ngOnInit(): void {
    this.mySnap = new FaceSnap(
      'Archibald',
      'Mon meilleur ami depuis tout petit !',
      new Date(),
      0,
      'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg'
    );
  }
}
