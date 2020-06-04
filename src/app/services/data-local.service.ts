import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.cargarFavoritos();
  }

  async presentToast( message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  guardarNoticia( noticia: Article ) {
    const existe = this.noticias.find( noti => noti.title === noticia.title );
    if(!existe) this.noticias.unshift( noticia );
    this.presentToast( 'Agregado a favoritos' );
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritosNesApi');
    if(favoritos) this.noticias = favoritos;
  }

  borrarFavorito( noticia: Article ) {
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title);
    this.storage.set('favoritosNesApi', this.noticias);
    this.presentToast( 'Eliminado de favoritos' );
  }

}
