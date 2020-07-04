import { Component, OnInit, Input } from '@angular/core';
import { IVentas, Ventas, IPedidosDetalles } from 'src/app/Services/interfaces.index';
import { ModalController, ToastController } from '@ionic/angular';
import { PedidosService } from 'src/app/Services/services.index';

@Component({
  selector: 'app-info-pedido',
  templateUrl: './info-pedido.component.html',
  styleUrls: ['./info-pedido.component.scss'],
})
export class InfoPedidoComponent implements OnInit {

  @Input() detallePedido: IVentas;
  @Input() idPedido: string;

  mPedidoDetalles: IPedidosDetalles[];

  constructor(
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private service: PedidosService,
  ) {

    this.detallePedido = Ventas.empty();
    this.idPedido = '';
    this.mPedidoDetalles = [];
  }

  ngOnInit() {
    this.getDetallesPedidoId();
  }

  getDetallesPedidoId() {
    this.service.getAllDetallesPedidoId(this.idPedido).then(res => {
      this.mPedidoDetalles = res.rows;
    }).catch(err => {
      this.presentToast('Error al obtener pedido');
    });
  }

  alertaEliminar(id) {

  }

  cerarModal() {
    this.modalCtrl.dismiss();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
