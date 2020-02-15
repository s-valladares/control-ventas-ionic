import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/Services/services.index';
import { IProductos } from 'src/app/Services/interfaces.index';
import { Config } from '../../../Services/Config/config';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  mProductos: IProductos[];

  constructor(
    private service: ProductosService,
    private toastController: ToastController
  ) {
    this.mProductos = [];
   }

  ngOnInit() {
    this.getAllProductos();
  }

  getAllProductos() {
    this.service.getAll().then(res => {
      this.mProductos = res;
      console.log(this.mProductos);
    }).catch(err => {
      console.error(err);
      this.presentToast('Error al obtener productos');
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }


}
