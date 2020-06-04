import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  categorias = [
    'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
  ];
  categoriaActiva: string = this.categorias[0];
  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService ) {}

  ngOnInit() {
    this.cargarNoticias(this.categorias[0]);
  }

  cambioCategoria( event ) {
    this.noticias = [];
    this.categoriaActiva = event.detail.value;
    this.cargarNoticias(this.categoriaActiva);
  }

  cargarNoticias( categoria: string, event? ) {
    this.noticiasService.getTopHeadLinesCategoria(categoria)
    .subscribe(resp => {
      if(resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      this.noticias.push( ...resp.articles );
      if(event) {
        event.target.complete();
      }
    });
  }

  loadData( event ) {
    this.cargarNoticias(this.categoriaActiva, event);
  }

}
