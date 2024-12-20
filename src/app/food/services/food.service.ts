import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllFoods(): Observable<any> {
    return this.http.get(`${this.apiUrl}/food`);
  }
}
