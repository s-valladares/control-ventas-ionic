import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/Services/services.index';
import { IProductos } from 'src/app/Services/interfaces.index';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { ProductosComponent } from '../productos-component/productos.component';
import { Config } from 'src/app/Services/Config/config';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  mProductos: IProductos[];

  constructor(
    private service: ProductosService,
    private toastController: ToastController,
    private modalController: ModalController,
    private alertController: AlertController
  ) {
    this.mProductos = [];
  }

  ngOnInit() {
    this.getAll();

  }

  getAll() {
    this.service.getAll().then(res => {
      this.mProductos = res.rows;
    }).catch(err => {
      console.error(err);
      this.presentToast('Error al obtener productos');
    });
  }

  delete(id: any) {
    this.presentToast('Pendiente');
  }

  nuevo() {
    this.modalPresent('', Config.CREAR);
  }

  verInfo(id) {
    this.modalPresent(id, Config.VER);
  }

  async eliminar(id: any) {
    const alert = await this.alertController.create({
      header: '¿Eliminar?',
      message: '<strong>¿Está seguro de eliminar este producto?</strong>',
      buttons: [
        {
          text: 'No, Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Sí, Seguro',
          handler: () => {
            this.delete(id);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async modalPresent(id: string, tipo: string) {
    const modal = await this.modalController.create({
      component: ProductosComponent,
      componentProps: {
        idProducto: id,
        tipoUso: tipo
      }
    });

    modal.onDidDismiss().then(data => {
      if (data.data) {
        this.mProductos.push(data.data);
      }

    }).catch(error => console.log(error));

    return await modal.present();
  }


}
