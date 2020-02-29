import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { VentasService, ReportesService } from 'src/app/Services/services.index';
import { IVentasSemana, VentasSemana, IVentas, Ventas } from 'src/app/Services/interfaces.index';
import { InfoPedidoComponent } from '../../Reportes/otros/info-pedido/info-pedido.component';

@Component({
  selector: 'app-semanaventa',
  templateUrl: './semanaventa.component.html',
  styleUrls: ['./semanaventa.component.scss'],
})
export class SemanaventaComponent implements OnInit {

  @Input() idSemanaVenta: string;

  fechaInicio: Date;
  ventaSemana: IVentasSemana;

  totalVentasSemana: IVentas[];

  dineroVentas: number;
  numeroVentas: number;

  ventaLastTime: IVentas;
  fechaSemana: any;
  mVenta: IVentas;

  constructor(
    private modalC: ModalController,
    private service: VentasService,
    private serviceReportes: ReportesService,
    private toastController: ToastController

  ) {

    this.idSemanaVenta = '';
    this.fechaInicio = new Date();
    this.ventaSemana = VentasSemana.empty();
    this.totalVentasSemana = [];

    this.ventaLastTime = Ventas.empty();

    this.numeroVentas = 0;
    this.dineroVentas = 0;
    this.fechaSemana = '';
    this.mVenta = Ventas.empty();
  }

  ngOnInit() {
    if (this.idSemanaVenta !== '') {
      this.verVentasPorSemana();
    }
  }

  cerarModal(ob) {
    this.modalC.dismiss(ob);
  }

  iniciarVenta() {

    this.ventaSemana.fechaInicio = this.fechaInicio + 'T11:20:45.000+0000';

    this.service.createSemanaVenta(this.ventaSemana)
      .then(data => {
        this.cerarModal(data.RES);
      })
      .catch(error => console.log(error));
  }

  verVentasPorSemana() {
    this.serviceReportes.getVentasPorSemana(this.idSemanaVenta)
      .then(data => {
        this.totalVentasSemana = data.rows;
        this.calcularDineroVentas();
        this.getventaLastTime();
        console.log(this.totalVentasSemana);
      })
      .catch(error => {
        this.presentToast('Ocurrió un error');
        console.log(error);
      });
  }

  verInfo(venta: IVentas) {
    this.mVenta = venta;
    this.modalPresent();
  }

  getventaLastTime() {
    this.ventaLastTime = this.totalVentasSemana.reduce((r, a) => {
      return r.pedido.hora > a.pedido.hora ? r : a;
    });
    this.fechaSemana = this.totalVentasSemana[0].pedido.ventaSemana.fechaInicio;
  }

  calcularDineroVentas() {
    this.dineroVentas = 0;
    this.totalVentasSemana
      .forEach(v => {
        this.dineroVentas = this.dineroVentas + v.total;
      });
  }

  async modalPresent() {
    const modal = await this.modalC.create({
      component: InfoPedidoComponent,
      componentProps: {
        detallePedido: this.mVenta,
        idPedido: this.mVenta.pedido.id
      }
    });

    return await modal.present();
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
