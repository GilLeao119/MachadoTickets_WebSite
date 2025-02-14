import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestServiceService } from '../../services/auth-rest-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  nif: string;
  email: string;
  password: string;
  points: string;

  constructor(
    private router: Router,
    private authService: AuthRestServiceService
  ) {
    this.nif = '';
    this.email = '';
    this.password = '';
    this.points = "0";
  }

  ngOnInit(): void {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe((user: any) => {
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('nif', this.nif); // Armazena o nome do usuário
        localStorage.setItem('email', this.email);
        this.router.navigate(['/events-list']);
      } else {
        alert('Erro no login!');
      }
    });
  }

  register(): void {
    this.authService
      .register(this.nif, this.email, this.password)
      .subscribe((user: any) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('name', this.nif); // Armazena o nome do usuário
          localStorage.setItem('email', this.email);
          this.router.navigate(['/events-list']);
        } else {
          alert('Erro no login!');
        }
      });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('name'); // Remove o nome do usuário ao fazer logout
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}