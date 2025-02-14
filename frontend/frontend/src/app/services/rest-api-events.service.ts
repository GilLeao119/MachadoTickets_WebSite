import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { object1 } from '../models/object';
import { Events } from '../models/events'
import { Ticket } from '../models/tickets';

const endpoint = 'http://localhost:3000/api/v1/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestAPIService {
  getEvents() {
    return this.http.get<object1>('http://localhost:3000/api/v1/api/list');
  }
  getEvent(id:string): Observable<Events> {
    return this.http.get<Events>(endpoint+'show/'+id);
  }

  getImageUrl(id: string): Observable<Blob> {
    return this.http.get(endpoint + 'image/' + id, { responseType: 'blob' });
  }

  addItem (item:Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(endpoint + 'create', item, httpOptions);
  }

  constructor(private http: HttpClient) { }
  
}