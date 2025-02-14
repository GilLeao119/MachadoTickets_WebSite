import { Component, Input, OnInit } from '@angular/core';
import { AuthRestServiceService } from '../../services/auth-rest-service.service';
import { Adm } from 'src/app/models/adm';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  currentUser: Adm | null = null; // Change the property type to Adm or null
  @Input() adm!: Adm; //= new Adm();
  usernif: any = localStorage.getItem("name");
  
  constructor(private authService: AuthRestServiceService,private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    //const currentUser = this.authService.getCurrentUser();
    var nif = localStorage.getItem("name");
    if (nif !== null) {this.authService.getUser(nif).subscribe((data: Adm) => {
      this.currentUser = data;});// Guarda o evento correspondente ao ID passado na rota, usando o serviço 'EventRestService'
      
    };

  }

  
        seeTickets(): void{
          this.router.navigate(['/ticket-list']);
        }



  
}
