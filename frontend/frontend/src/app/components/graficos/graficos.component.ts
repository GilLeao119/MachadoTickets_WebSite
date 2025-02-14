import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Ticket } from 'src/app/models/tickets';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit, AfterViewInit {
  @Input() ticket: Ticket = new Ticket(); // Alterado para um único objeto Ticket
  @ViewChild('graficoTickets', { static: true }) graficoTickets!: ElementRef;

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.graficoTickets) {
      const canvas = this.graficoTickets.nativeElement as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error('O elemento canvas não foi encontrado.');
        return;
      }

      // Obtenha as informações necessárias do ticket
      const quantidadeTickets = this.ticket.name;

      // Crie o gráfico utilizando o Chart.js
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Quantidade de Tickets'],
          datasets: [{
            label: 'Quantidade de Tickets',
            data: [quantidadeTickets],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
