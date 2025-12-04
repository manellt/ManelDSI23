import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stress-check',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    MatProgressBarModule,
    MatIconModule
  ],
  templateUrl: './stress-check.component.html',
  styleUrls: ['./stress-check.component.scss']
})
export class StressCheckComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  stressForm = this.fb.group({
    mood: [5, [Validators.required]],
    sleep: [7, [Validators.required]],
    activity: [5, [Validators.required]],
    notes: ['']
  });

  // Noms personnalisables pour les critères
  criteriaNames = this.fb.group({
    moodName: ['Humeur'],
    sleepName: ['Sommeil'],
    activityName: ['Activité']
  });

  currentStressLevel = 0;
  currentAdvice = '';
  isLoading = false;

  // Individual advice properties for each criterion
  moodAdvice = '';
  sleepAdvice = '';
  activityAdvice = '';

  get mood() {
    return this.stressForm.get('mood');
  }

  get sleep() {
    return this.stressForm.get('sleep');
  }

  get activity() {
    return this.stressForm.get('activity');
  }

  ngOnInit() {
    // Calculate stress level reactively when form values change
    this.stressForm.valueChanges.subscribe(() => {
      this.calculateStressLevel();
    });

    // Initial calculation
    this.calculateStressLevel();
  }

  private calculateStressLevel() {
    const moodValue = this.mood?.value || 5;
    const sleepValue = this.sleep?.value || 7;
    const activityValue = this.activity?.value || 5;

    // Enhanced calculation with weighted factors
    const moodWeight = 0.4; // Mood has highest impact
    const sleepWeight = 0.35; // Sleep is very important
    const activityWeight = 0.25; // Activity has moderate impact

    // Calculate stress based on deviations from optimal values
    const optimalMood = 9; // Optimal mood
    const optimalSleep = 8; // Optimal sleep hours
    const optimalActivity = 8; // Optimal activity level

    const moodStress = Math.max(0, (optimalMood - moodValue) / optimalMood) * 100;
    const sleepStress = Math.max(0, (optimalSleep - sleepValue) / optimalSleep) * 100;
    const activityStress = Math.max(0, (optimalActivity - activityValue) / optimalActivity) * 100;

    // Weighted average
    const stress = (moodStress * moodWeight) + (sleepStress * sleepWeight) + (activityStress * activityWeight);
    this.currentStressLevel = Math.round(Math.max(0, Math.min(100, stress)));
    this.currentAdvice = this.getDetailedStressAdvice(this.currentStressLevel, moodValue, sleepValue, activityValue);

    // Update individual advice for each criterion
    this.updateAdvice({ mood: moodValue, sleep: sleepValue, activity: activityValue });
  }

  onSubmit() {
    if (this.stressForm.valid) {
      this.isLoading = true;
      // Save result to localStorage
      setTimeout(() => {
        const result = {
          level: this.currentStressLevel,
          advice: this.currentAdvice,
          timestamp: new Date().toISOString(),
          formData: this.stressForm.value
        };
        localStorage.setItem('stressResult', JSON.stringify(result));
        console.log('Données sauvegardées:', result);
        this.isLoading = false;
        // Navigate to advice page
        this.router.navigate(['/advice']);
      }, 1000);
    }
  }

  private getStressAdvice(level: number): string {
    if (level < 30) {
      return 'Votre niveau de stress est faible. Continuez à maintenir un mode de vie sain!';
    } else if (level < 60) {
      return 'Votre niveau de stress est modéré. Pensez à prendre du temps pour vous détendre.';
    } else {
      return 'Votre niveau de stress est élevé. Considérez consulter un professionnel de santé.';
    }
  }

  private getDetailedStressAdvice(level: number, mood: number, sleep: number, activity: number): string {
    let advice = '';

    // Overall stress level advice
    if (level < 30) {
      advice = '🌟 Excellent! Votre niveau de stress est faible. ';
    } else if (level < 60) {
      advice = '⚠️ Attention! Votre niveau de stress est modéré. ';
    } else {
      advice = '🚨 Alerte! Votre niveau de stress est élevé. ';
    }

    // Specific recommendations based on individual values
    const recommendations = [];

    if (mood < 6) {
      recommendations.push('Essayez des activités qui vous rendent heureux comme écouter de la musique ou sortir avec des amis');
    }

    if (sleep < 6) {
      recommendations.push('Priorisez votre sommeil - essayez de dormir au moins 7-8 heures par nuit');
    } else if (sleep > 9) {
      recommendations.push('Vous dormez beaucoup, mais vérifiez si c\'est de qualité');
    }

    if (activity < 4) {
      recommendations.push('Augmentez votre activité physique - même une courte promenade peut aider');
    } else if (activity > 8) {
      recommendations.push('Bravo pour votre activité physique! Continuez ainsi');
    }

    if (recommendations.length > 0) {
      advice += 'Recommandations personnalisées:\n• ' + recommendations.join('\n• ');
    } else {
      advice += 'Vous avez de bonnes habitudes! Continuez à les maintenir.';
    }

    return advice;
  }
  private updateAdvice(values: any) {
  const mood = values.mood;
  const sleep = values.sleep;
  const activity = values.activity;

  /** Humeur */
  if (mood <= 3) {
    this.moodAdvice = "Votre humeur est basse... Essayez de vous détendre un peu et de faire des choses qui vous rendent heureux 🌿";
  } else if (mood <= 6) {
    this.moodAdvice = "Votre humeur est moyenne... De petites choses peuvent l'améliorer 👍";
  } else {
    this.moodAdvice = "Votre humeur est excellente ! Gardez cette énergie positive 🌟";
  }

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

  /** Activité physique */
  if (activity <= 3) {
    this.activityAdvice = "Activité faible... Une courte promenade vous ferait beaucoup de bien 🚶‍♀️";
  } else if (activity <= 6) {
    this.activityAdvice = "Activité acceptable... Vous pourriez en augmenter un peu 💪";
  } else {
    this.activityAdvice = "Activité excellente ! Continuez à la maintenir 👏🔥";
  }
}

}
