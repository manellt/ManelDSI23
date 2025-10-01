import { Routes } from '@angular/router';
import { FaceSnapG1Component } from './face-snap-g1/face-snap-g1.component';

export const routes: Routes = [
  { path: 'facesnap1', component:FaceSnapG1Component  },   
  { path: '',redirectTo:'facesnap1', pathMatch:'full' } 
];
