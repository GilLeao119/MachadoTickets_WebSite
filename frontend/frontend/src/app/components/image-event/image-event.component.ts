import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestAPIService } from 'src/app/services/rest-api-events.service';

@Component({
  selector: 'app-image-event',
  templateUrl: './image-event.component.html',
  styleUrls: ['./image-event.component.css']
})
export class ImageEventComponent implements OnInit{

  @Input() eventId!: string;
  imageUrl!: string | ArrayBuffer | null;

  constructor(
    private route: ActivatedRoute,
    private imageService: RestAPIService
  ){}

  ngOnInit(){
    this.getImageUrl();
  }

  getImageUrl() {
    this.imageService.getImageUrl(this.eventId).subscribe(
      (image: Blob) => {
        this.createImageUrl(image);
      },
      (error) => {
        console.log('Erro ao obter a imagem:', error);
      }
    );
  }
  
  createImageUrl(image: Blob) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(image);
  }

}
