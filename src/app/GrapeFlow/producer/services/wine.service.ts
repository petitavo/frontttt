import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wine } from '../model/wine.entity';

@Injectable({
  providedIn: 'root'
})
export class WineService {
  private apiUrl = 'http://localhost:3000/vinos';  // Cambia esta URL según tu API

  constructor(private http: HttpClient) {}

  getPopularWines(): Observable<Wine[]> {
    return this.http.get<Wine[]>(this.apiUrl);
  }
}
