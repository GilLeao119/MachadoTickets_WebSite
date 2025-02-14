import { Component, Input, OnInit } from '@angular/core';
import { AuthRestServiceService } from '../../services/auth-rest-service.service';
import { Adm } from 'src/app/models/adm';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/models/tickets';
import { object1 } from 'src/app/models/object';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  currentUser: Adm | null = null;
  @Input() adm!: Adm;
  usernif: any = localStorage.getItem("name");
  tickets: Ticket[] = [];
  object1: object1 = new object1();



  constructor(private authService: AuthRestServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.getTickets();
  }

  getUserDetails(): void {
    var nif = localStorage.getItem("name");
    if (nif !== null) {
      this.authService.getUser(nif).subscribe((data: Adm) => {
        this.currentUser = data;
      });
    }
  }

  getTickets(): void {
    var nif = localStorage.getItem("name");
    if (nif !== null) {
      this.authService.getTickets(nif).subscribe((data: Ticket[]) => {
        console.log(data);
        this.tickets = data;
        console.log(this.object1.tickets);
      });
    }
  }
  
  
}
