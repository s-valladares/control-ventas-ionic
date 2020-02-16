import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/Services/services.index';
import { IPedidos } from 'src/app/Services/interfaces.index';
import { ToastController, ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  mPedidos: IPedidos[];

  constructor(
    private service: PedidosService,
    private toastController: ToastController,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().then(res => {
      this.mPedidos = res.rows;
    }).catch(err => {
      console.error(err);
      this.presentToast('Error al obtener pedidos');
    });
  }


  delete(id: any) {
    this.presentToast('Pendiente');
  }

  nuevo() {
    this.modalPresent('');
  }

  verInfo(id) {
    this.modalPresent(id);
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

  async modalPresent(id: string) {
    /*const modal = await this.modalController.create({
      component: ProductosComponent,
      componentProps: {
        idProducto: id
      }
    });

    modal.onDidDismiss().then(data => {
      if (data.data) {
        this.mProductos.push(data.data);
      }

    }).catch(error => console.log(error));

    return await modal.present();*/
  }

}
