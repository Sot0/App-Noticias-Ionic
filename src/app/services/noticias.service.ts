import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKeyNews;
const apiUrl = environment.apiUrl;
const country = 'mx';

const headers = new HttpHeaders({
  'X-Api-key': apiKey,
  // 'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  // 'Access-Control-Allow-Headers': 'Content-Type'
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage: number = 0;
  categoriaActual:string = '';
  categoriaPage: number = 0;

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>( query: string ) {
    query = apiUrl + query;
    return this.http.get<T>( query, { headers } );
  }

  getTopHeadLines() {
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=${country}&page=${this.headlinesPage}`);
  }

  getTopHeadLinesCategoria( categoria: string ) {
    if(this.categoriaActual === categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=${country}&category=${categoria}&page=${this.categoriaPage}`);
  }

}
