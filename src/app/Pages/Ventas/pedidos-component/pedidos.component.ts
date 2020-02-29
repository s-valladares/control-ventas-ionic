import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductosComponent } from '../../Productos/productos-component/productos.component';
import { Config } from 'src/app/Services/Config/config';

import {
  IPedidos,
  Pedidos,
  IPedidosDetalles,
  PedidosDetalles,
  IVentas,
  Ventas,
  VentasSemana,
  IVentasSemana
} from 'src/app/Services/interfaces.index';
import {
  PedidosService,
  VentasService
} from 'src/app/Services/services.index';

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
  mVenta: IVentas;
  fechaHoy: Date;
  totalPedido: number;

  mVentasSemana: IVentasSemana[];
  mVentaSemana: IVentasSemana;
  lastDate: any = {};

  errorPedido: boolean;

  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private alertController: AlertController,

    private service: PedidosService,
    private serviceVentas: VentasService,
    private toastController: ToastController
  ) {
    this.fechaHoy = new Date();
    this.mPedido = Pedidos.empty();
    this.mVenta = Ventas.empty();
    this.mPedidoDetalles = [];
    this.mPedidoDetalle = PedidosDetalles.empty();
    this.totalPedido = 0;
    this.mVentasSemana = [];
    this.mVentaSemana = VentasSemana.empty();

    this.errorPedido = false;
  }

  ngOnInit() {

    this.generarFormularioPedido();
    this.verVentasSemana();

    if (this.idPedido !== '') {
      this.getPedidoId();
    }
  }

  getPedidoId() {
    this.service.getId(this.idPedido).then(res => {
      this.mPedido = res;
      this.getDetallesPedidoId();
    }).catch(err => {
      this.presentToast('Error al obtener pedido');
    });
  }

  onSubmitPedido() {

    this.mPedido = this.form.value as IPedidos;
    this.mPedido.estado = true;

    if (this.mPedido.ventaSemana.id === '') {
      this.mPedido.ventaSemana = this.lastDate;
    }

    this.guardar();
  }

  guardar() {

    this.service.create(this.mPedido)
      .then(res => {
        this.cerarModal(res.RES);
        this.presentToast('Guardado correctamente');
      })
      .catch(error => {
        this.presentToast('Ocurrió un error');
      });

  }

  cerarModal(ob) {
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
        this.calcularTotalPedido();
        this.getDetallesPedidoId();
      });
  }

  registrarVenta() {
    this.mVenta.total = this.totalPedido;
    this.mVenta.pedido = this.mPedido;

    if (this.totalPedido === 0) {
      this.errorPedido = true;
      return;
    }

    this.serviceVentas.create(this.mVenta)
      .then(res => {
        alert('Venta registrada');
        this.presentToast('Venta registrada');
        this.cerarModal('');
      }).catch(error => {

        this.presentToast('Ocurrió un error');
      });
  }

  verVentasSemana() {
    this.serviceVentas.getAllSemanaVenta()
      .then(res => {
        this.mVentasSemana = res.rows;
        this.getLastDate();
      })
      .catch(error => console.log(error));
  }

  getLastDate() {
    this.lastDate = this.mVentasSemana.reduce((r, a) => {
      return r.fechaInicio > a.fechaInicio ? r : a;
    });
  }

  generarFormularioPedido() {
    // FORMULARIO PARA CREAR UN PEDIDO
    return this.form = this.formBuilder.group({
      ventaSemana: [VentasSemana.empty()],
      cliente: ['', [Validators.required]],
      nota: [''],
      entrega: ['', [Validators.required]],
      hora: ['', [Validators.required]]
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
        this.calcularTotalPedido();
      }

    }).catch(error => this.presentToast('Ocurrió un error'));

    return await modal.present();
  }

}
