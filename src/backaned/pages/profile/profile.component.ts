import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatProgressBarModule, MatIconModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  stressLevel = 0;
  advice = '';
  timestamp = '';

  ngOnInit() {
    const result = JSON.parse(localStorage.getItem('stressResult') || '{}');
    this.stressLevel = result.level || 0;
    this.advice = result.advice || '';
 
    this.timestamp = result.timestamp || '';
  }
}
