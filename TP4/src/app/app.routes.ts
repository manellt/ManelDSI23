import { Routes } from '@angular/router';
import { FaceSnapComponent } from './face-snap-g1/face-snap-g1.component';

export const routes: Routes = [
  { path: 'facesnap1', component:FaceSnapComponent  },   
  { path: '',redirectTo:'facesnap1', pathMatch:'full' } 
];
