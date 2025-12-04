import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advice',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss']
})
export class AdviceComponent implements OnInit {
  stressLevel = 0;
  stressCategory = '';
  adviceList: string[] = [];
  tips: string[] = [];

  // Individual values and advices
  formData: any = {};
  moodAdvice = '';
  sleepAdvice = '';
  activityAdvice = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const result = JSON.parse(localStorage.getItem('stressResult') || '{}');
    this.stressLevel = result.level || 0;
    this.formData = result.formData || {};
    this.setAdviceBasedOnLevel();
    this.setPersonalizedAdvice();
  }

  private setAdviceBasedOnLevel() {
    if (this.stressLevel < 30) {
      this.stressCategory = 'Faible';
      this.adviceList = [
        'Continuez vos bonnes habitudes de vie',
        'Maintenez une activité physique régulière',
        'Privilégiez le sommeil de qualité',
        'Gardez un équilibre alimentation-sommeil'
      ];
      this.tips = [
        'Pratiquez la méditation 5 minutes par jour',
        'Faites des promenades dans la nature',
        'Cultivez des relations sociales positives',
        'Prenez du temps pour vos loisirs'
      ];
    } else if (this.stressLevel < 60) {
      this.stressCategory = 'Modéré';
      this.adviceList = [
        'Identifiez les sources de stress dans votre vie',
        'Pratiquez des techniques de relaxation',
        'Établissez des limites claires travail/vie privée',
        'Augmentez votre activité physique'
      ];
      this.tips = [
        'Essayez la respiration profonde (4-7-8)',
        'Faites du sport 3 fois par semaine',
        'Limitez le temps d\'écran le soir',
        'Parlez de vos préoccupations à un proche'
      ];
    } else {
      this.stressCategory = 'Élevé';
      this.adviceList = [
        'Consultez un professionnel de santé',
        'Évaluez sérieusement vos sources de stress',
        'Mettez en place des changements immédiats',
        'Priorisez votre santé mentale'
      ];
      this.tips = [
        'Contactez un psychologue ou thérapeute',
        'Pratiquez des exercices de relaxation quotidiens',
        'Réduisez temporairement votre charge de travail',
        'Demandez de l\'aide à votre entourage'
      ];
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  private setPersonalizedAdvice() {
    const mood = this.formData.mood || 5;
    const sleep = this.formData.sleep || 7;
    const activity = this.formData.activity || 5;

    // Personalized advice based on individual values
    this.setMoodAdvice(mood);
    this.setSleepAdvice(sleep);
    this.setActivityAdvice(activity);
  }

  private setMoodAdvice(mood: number) {
    /** Humeur */
    if (mood <= 3) {
      this.moodAdvice = "Votre humeur est basse... Essayez de vous détendre un peu et de faire des choses qui vous rendent heureux 🌿";
    } else if (mood <= 6) {
      this.moodAdvice = "Votre humeur est moyenne... De petites choses peuvent l'améliorer 👍";
    } else {
      this.moodAdvice = "Votre humeur est excellente ! Gardez cette énergie positive 🌟";
    }
  }

  private setSleepAdvice(sleep: number) {
    /** Sommeil */
    if (sleep < 5) {
      this.sleepAdvice = "Moins que nécessaire... Vous devez vous reposer davantage 😴";
    } else if (sleep < 7) {
      this.sleepAdvice = "Sommeil moyen... Ça pourrait être mieux 😉";
    } else if (sleep <= 9) {
      this.sleepAdvice = "Sommeil excellent ! 👌";
    } else {
      this.sleepAdvice = "Beaucoup de sommeil... Vérifiez si votre sommeil est vraiment reposant.";
    }
  }

  private setActivityAdvice(activity: number) {
    /** Activité physique */
    if (activity <= 3) {
      this.activityAdvice = "Activité faible... Une courte promenade vous ferait beaucoup de bien 🚶‍♀️";
    } else if (activity <= 6) {
      this.activityAdvice = "Activité acceptable... Vous pourriez en augmenter un peu 💪";
    } else {
      this.activityAdvice = "Activité excellente ! Continuez à la maintenir 👏🔥";
    }
  }

  retakeTest() {
    this.router.navigate(['/stress-check']);
  }
}
