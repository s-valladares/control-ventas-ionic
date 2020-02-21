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


  mPedido: IPedidos;
  mDetallePedido: IPedidosDetalles;
  mPedidoDetalles: IPedidosDetalles[];

  constructor(
    private service: PedidosService,
    private toastController: ToastController,
    private modal: ModalController
  ) {

    this.mDetallePedido = PedidosDetalles.empty();
    this.mPedido = Pedidos.empty();
    this.mPedidoDetalles = [];
  }

  ngOnInit() {
    console.log('id pedido', this.idPedido);
  }



  confirmar() {
    this.mPedido.id = this.idPedido;
    this.mDetallePedido.pedido = this.mPedido;
    this.mDetallePedido.producto = this.producto;

    this.mDetallePedido.subtotal = (this.mDetallePedido.producto.precio * this.mDetallePedido.cantidad);
    this.mDetallePedido.total = this.mDetallePedido.subtotal + this.mDetallePedido.adicional;

    this.service.newDetallePedido(this.mDetallePedido)
      .then(res => {
        this.presentToast('Vamos bien Ramírez');
        this.getDetallesPedidoId();
      })
      .catch(error => {
        console.log(error);
        this.presentToast('Ocurrió un error');
      });

  }

  getDetallesPedidoId() {
    this.service.getAllDetallesPedidoId(this.idPedido).then(res => {
      this.mPedidoDetalles = res.rows;
      this.cerarModal();
    }).catch(err => {
      this.presentToast('Error al obtener pedido');
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

  cerarModal() {

    this.modal.dismiss(this.mPedidoDetalles);
  }


}
