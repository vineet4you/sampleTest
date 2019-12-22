import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
   url = 'https://bills.developer.exilent.systems';
  create(createBill): Observable<any> {
    return this.http.post(`${this.url}/api/v1/bills`, {createBill});
  }
}
