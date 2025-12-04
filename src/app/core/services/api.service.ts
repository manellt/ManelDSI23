import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private googleApiUrl = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
  private backendUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCalendarEvents(apiKey: string, token: string) {
    return this.http.get(`${this.googleApiUrl}?key=${apiKey}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getStressAnalysis(data: any) {
    return this.http.post(`${this.backendUrl}/openai/analyze-stress`, data);
  }
}
