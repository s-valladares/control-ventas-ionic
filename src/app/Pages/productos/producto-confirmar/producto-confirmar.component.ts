import { Component, OnInit, Input } from '@angular/core';
import { IProductos, IPedidosDetalles, PedidosDetalles, IPedidos, Pedidos } from 'src/app/Services/interfaces.index';
import { PedidosService } from 'src/app/Services/services.index';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-producto-confirmar',
  templateUrl: './producto-confirmar.component.html',
  styleUrls: ['./producto-confirmar.component.scss'],
})
export class ProductoConfirmarComponent implements OnInit {

  @Input() producto: IProductos;
  @Input() idPedido: string;
  
  cantidad: number;
  mPedido: IPedidos;
  mDetallePedido: IPedidosDetalles;

  constructor(
    private service: PedidosService,
    private toastController: ToastController,
    private modalCtrl2: ModalController
  ) {
    this.cantidad = 0;
    this.mDetallePedido = PedidosDetalles.empty();
    this.mPedido = Pedidos.empty();
   }

  ngOnInit() {
    console.log(this.idPedido);
  }



  confirmar() {
    this.mPedido.id = this.idPedido;
    this.mDetallePedido.cantidad = this.cantidad;
    this.mDetallePedido.pedido = this.mPedido;
    this.mDetallePedido.producto = this.producto;

    this.mDetallePedido.total = this.mDetallePedido.producto.precio * this.cantidad;

    this.service.newDetallePedido(this.mDetallePedido)
      .then(res => {
        this.presentToast('Vamos bien Ramírez');
        this.cerarModal(res.RES);
      })
      .catch(error => {
        console.error(error);
        this.presentToast('Ocurrió un error');
      });

  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  cerarModal(ob: IPedidosDetalles) {
    this.modalCtrl2.dismiss(ob);
  }


}
