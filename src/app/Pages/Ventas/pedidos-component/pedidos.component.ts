import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { IPedidos, Pedidos, IPedidosDetalles, PedidosDetalles } from 'src/app/Services/interfaces.index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PedidosService } from 'src/app/Services/services.index';
import { ProductosComponent } from '../../Productos/productos-component/productos.component';
import { Config } from 'src/app/Services/Config/config';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  @Input() idPedido: string;

  form: FormGroup;
  mPedido: IPedidos;
  mPedidoDetalles: IPedidosDetalles[];
  mPedidoDetalle: IPedidosDetalles;
  fechaHoy: Date;
  totalPedido: number;

  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private alertController: AlertController,

    private service: PedidosService,
    private toastController: ToastController
  ) {
    this.fechaHoy = new Date();
    this.mPedido = Pedidos.empty();
    this.mPedidoDetalles = [];
    this.mPedidoDetalle = PedidosDetalles.empty();
    this.totalPedido = 0;
  }

  ngOnInit() {

    if (this.idPedido !== '') {
      this.getPedidoId();
    }

    // FORMULARIO PARA CREAR UN PEDIDO
    this.form = this.formBuilder.group({
      cliente: ['', [Validators.required]],
      nota: [''],
      entrega: ['', [Validators.required]],
      hora: ['', [Validators.required]]
    });

  }

  getPedidoId() {
    this.service.getId(this.idPedido).then(res => {
      this.mPedido = res;
      this.getDetallesPedidoId();
    }).catch(err => {
      this.presentToast('Error al obtener pedido');
    });
  }

  guardar() {
    this.mPedido = this.form.value as IPedidos;
    this.service.create(this.mPedido)
      .then(res => {
        this.cerarModal(res.RES);
        this.presentToast('Guardado correctamente');
      })
      .catch(error => {
        this.presentToast('Ocurrió un error');
      });

  }

  cerarModal(ob: IPedidos) {
    this.modal.dismiss(ob);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }



  /********* DETALLES DEL PEDIDO */

  getDetallesPedidoId() {
    this.service.getAllDetallesPedidoId(this.idPedido).then(res => {
      this.mPedidoDetalles = res.rows;
      this.calcularTotalPedido();
    }).catch(err => {
      this.presentToast('Error al obtener pedido');
    });
  }

  calcularTotalPedido() {
    this.totalPedido = 0;
    this.mPedidoDetalles.forEach(detalle => {
      this.totalPedido = this.totalPedido + detalle.total;
    });
  }

  agregarProductoPedido() {
    this.modalPresent(this.idPedido, Config.ELEGIR);
  }

  eliminarDetallePedido() {
    this.service.deleteDetallePedido(this.idPedido)
    .then(data => {
      this.presentToast('¡Qué mal Ramírez!');
      this.getDetallesPedidoId();
    });
  }

  async alertaEliminar(id: any) {
    this.idPedido = id;
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
            this.eliminarDetallePedido();
          }
        }
      ]
    });

    await alert.present();
  }

  async modalPresent(id: string, tipo: string) {
    const modal = await this.modalController.create({
      component: ProductosComponent,
      componentProps: {
        idPedido: id,
        tipoUso: tipo
      }
    });

    modal.onDidDismiss().then(data => {
      if (data.data.length !== 0) {
        this.mPedidoDetalles = data.data;
      }

    }).catch(error => this.presentToast('Ocurrió un error'));

    return await modal.present();
  }

}
