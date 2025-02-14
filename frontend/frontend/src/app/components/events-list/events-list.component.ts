import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestAPIService } from '../../services/rest-api-events.service';
import { object1 } from 'src/app/models/object';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  object1: object1 = new object1();
  
  imageBaseUrl: string = 'http://localhost:3000/api/v1/api/images/';

  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    
    this.getEvents();
    
    this.dtOptions = {pagingType: 'full_numbers',
    serverSide: true,
    ajax: (dataTablesParameters: any, callback) => {
      this.rest.getEvents().subscribe((data: object1) => {
        callback({
          data: data.eventos.map(evento => ({
            id: evento._id,
            imagem: this.imageBaseUrl + evento.file,
            name: evento.name,
          }))
        });
      });
    },
    columns: [
      {
        title: 'id',
        data: 'id'
      },
      {
        title:'imagem',
        data: 'imagem',
        render: function(data: any, type: any, full: any) {
          return '<img src="' + data + '" alt="Imagem do Evento" width="50" height="50">';
        }
      },
      {
        title: 'name',
        data: 'name'
      }
    ]
  };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    }

    getEvents() {
      this.rest.getEvents().subscribe((data: object1) => {
        console.log(data);
        data.eventos = data.eventos.filter(evento => evento.name && evento.name.trim().length > 0);
        this.object1 = data;
        this.dtTrigger.next(data.eventos);
      });
    }

  view(id: string) {
    this.router.navigate(['/ticket-create/' + id]);
  }
  constructor(private rest: RestAPIService, private route: ActivatedRoute, private router: Router) {

  }
}