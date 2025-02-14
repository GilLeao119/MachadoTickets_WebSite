import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/tickets';
import { Events } from '../models/events';

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

  constructor(private http: HttpClient) { }

  getEvento(id:string): Observable<Ticket> {
    return this.http.get<Ticket>(endpoint+'show/'+id);
  }

  getEvent(id: string): Observable<Events> {
    return this.http.get<Events>(endpoint + 'show/' + id);
  }

  
}
