import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(
    private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService,
    private platform: Platform,
  ) { }

  ngOnInit() {}

  abrirNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

    let guardarBorrarBtn;
    if(this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Borrar favorito',
        icon: 'trash',
        cssClass: 'action-sheet-dark',
        handler: () => {
          this.dataLocalService.borrarFavorito( this.noticia );
        }
      };
    } else {
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-sheet-dark',
        handler: () => {
          this.dataLocalService.guardarNoticia( this.noticia );
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        guardarBorrarBtn, {
        text: 'Compartir',
        icon: 'share-social',
        cssClass: 'action-sheet-dark',
        handler: () => {
          this.compartirNoticia();
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-sheet-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  compartirNoticia() {

    if(this.platform.is('cordova')) {
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );
    } else {
      if (navigator['share']) {
        navigator['share']({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        console.log('Esta opción no es compatible con tu dispositivo');
      }
    }


  }

}
