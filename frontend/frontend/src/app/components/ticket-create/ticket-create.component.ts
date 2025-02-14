import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'src/app/models/events';
import { RestAPIService } from '../../services/rest-api-events.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartItem } from 'src/app/models/cart.model';
import { Ticket } from 'src/app/models/tickets';



@Component({
  selector: 'ticket.create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
  resultado: number = 0;
  v1: number = 0;
  v2: number = 0;
  v3: number = 0;
  usernif: any = localStorage.getItem("name");
  @Input() evento: Events = new Events();

  constructor(private cartService: CartService,private router: Router, private route: ActivatedRoute, private rest: RestAPIService) { }

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getEvent(idTemp).subscribe((data: Events) => {
      this.evento = data;
    });
  }

  navigateToItems(): void {
    this.router.navigate(['/item-list']);
  }

  calcularPrecoTotal(): void {
    const padult = Number(this.evento.padult);
    const pkid = Number(this.evento.pkid);
    const pold = Number(this.evento.pold);

    this.resultado = padult * this.v2 + pkid * this.v1 + pold * this.v3;
  }

  adicionarAoCarrinho(): void {
    const evento: CartItem = {
      NomeEvento: this.evento.name,
      price: this.resultado,
      quantityk: this.v1,
      quantitya: this.v2,
      quantityo: this.v3,
      id: this.evento._id,
    };
  
    this.cartService.addToCart(evento);
    this.router.navigate(['/cart']);
  }
  add(): void {
    const ticket: Ticket = {
      name: this.evento.name,
      pkid: this.v1,
      padult: this.v2,
      pold: this.v3,
      events: this.evento.name,
      eventsId: this.evento._id,
      ptotal: this.resultado,
      adm: this.usernif
    };
    this.rest.addItem(ticket).subscribe((data: typeof ticket)=>{
      alert("Comprado");
      console.log(ticket);
    });
  }
  
}