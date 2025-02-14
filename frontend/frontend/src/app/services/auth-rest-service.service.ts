import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Adm } from '../models/adm';
import { map } from 'rxjs/operators';
import { Ticket } from '../models/tickets';
import { object1 } from '../models/object';
import { Tick } from 'chart.js/dist/core/core.scale';

const endpoint = 'http://localhost:3000/api/v1/auth/show/:id';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthRestServiceService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/v1/auth/login', new LoginModel(email, password));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/v1/auth/register', new RegisterModel(name, email, password));
  }

  getLoginName(): string | null {
    return localStorage.getItem('name'); // Retorna o nome armazenado na chave "name"
  }

  getCurrentUser(): any {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }

  getUser(id: string): Observable<Adm> {
    const currentUser = this.getCurrentUser();
    
    if (currentUser && currentUser.id === id) {
      // Returns an Observable that emits the current user stored in the service
      return of(currentUser);
    } else {
      // Gets the user details from the backend using the provided ID
      return this.http.get<Adm>(`${endpoint.replace(':id', id)}`, httpOptions);
    }
  }

   getUserPoints(id: string): Observable<number> {
    return this.http.get<number>(`${endpoint.replace(':id', id)}/points`, httpOptions);
  }
  
  getTickets(id: string): Observable<Ticket[]> {
    const currentUser = this.getCurrentUser();
    
    if (currentUser && currentUser.id === id) {
      // Returns an Observable that emits the current user stored in the service
      return of(currentUser);
    } else {
      // Gets the user details from the backend using the provided ID
      return this.http.get<Ticket[]>(`http://localhost:3000/api/v1/auth/tickets/`+id, httpOptions);
    }
  }
  
}

export class LoginModel {
  constructor(public email: string, public password: string) {}
}

export class RegisterModel {
  constructor(public name: string, public email: string, public password: string) {}
}
