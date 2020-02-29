import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IEgresos, Egresos } from 'src/app/Services/Egresos/egresos.interface';
import { ModalController, ToastController } from '@ionic/angular';
import { EgresosService } from 'src/app/Services/Egresos/egresos.service';
import { VentasService } from 'src/app/Services/Ventas/ventas.service';
import { IVentasSemana, VentasSemana } from 'src/app/Services/Ventas/ventas.interface';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.scss'],
})
export class GastoComponent implements OnInit {

  @Input() idGasto: string;

  form: FormGroup;
  mGastoSelected: IEgresos;
  mVentasSemana: IVentasSemana[];
  mVentaSemana: IVentasSemana;
  mGastos: IEgresos[];
  fechaHoy: Date;
  lastDate: any = {};
  errorTotal = false;

  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private service: EgresosService,
    private serviceVentas: VentasService,
    private toastController: ToastController
  ) {
    this.mGastoSelected = Egresos.empty();
    this.mGastos = [];
    this.mVentasSemana = [];
    this.idGasto = '';
    this.fechaHoy = new Date();
    this.mVentaSemana = VentasSemana.empty();
  }

  ngOnInit() {
    this.generarFormularioGasto();
    this.verVentasSemana();
    this.verGastoId();
  }

  verVentasSemana() {
    this.serviceVentas.getAllSemanaVenta()
      .then(res => {
        this.mVentasSemana = res.rows;
        this.getLastDate();
      })
      .catch(error => console.log(error));
  }

  verGastoId() {
    this.service.getId(this.idGasto)
      .then(res => {
        this.mGastoSelected = res;
        this.mVentaSemana = res.ventaSemana;
      })
      .catch(error => console.log(error));
  }

  onSubmitGasto() {

    this.mGastoSelected = this.form.value as IEgresos;
    if (this.mGastoSelected.total === 0) {
      this.errorTotal = true;
      return;
    }

    if (this.mGastoSelected.ventaSemana.id === '') {
      this.mGastoSelected.ventaSemana = this.lastDate;
    }

    this.guardar();
  }

  guardar() {
    this.service.create(this.mGastoSelected)
      .then(data => {
        this.cerarModal(data.RES);
        this.presentToast('Guardado correctamente');
      })
      .catch(error => this.presentToast('Ocurrió un error'));
  }

  getLastDate() {
    this.lastDate = this.mVentasSemana.reduce((r, a) => {
      return r.fechaInicio > a.fechaInicio ? r : a;
    });
  }

  generarFormularioGasto() {
    // FORMULARIO PARA CREAR UN PEDIDO
    return this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: [''],
      fechaGasto: ['', [Validators.required]],
      ventaSemana: [VentasSemana.empty()],
      total: [0, [Validators.required]]
    });
  }

  cerarModal(obj) {
    this.modal.dismiss(obj);
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
