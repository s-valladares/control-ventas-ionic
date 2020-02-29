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
  }

  ngOnInit() {
    this.generarFormularioGasto();
    this.verVentasSemana();
  }

  verVentasSemana() {
    this.serviceVentas.getAllSemanaVenta()
      .then(res => {
        this.mVentasSemana = res.rows;
      })
      .catch(error => console.log(error));
  }

  select() {
    console.log('select');
  }

  guardar() {
    this.mGastoSelected = this.form.value as IEgresos;
    console.log(this.mGastoSelected);

    this.service.create(this.mGastoSelected)
      .then(data => {
        this.cerarModal();
        this.presentToast('Guardado correctamente');
      });
  }

  generarFormularioGasto() {
    // FORMULARIO PARA CREAR UN PEDIDO
    return this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: [''],
      fechaGasto: ['', [Validators.required]],
      ventaSemana: [VentasSemana.empty(), [Validators.required]],
      total: [0, [Validators.required]]
    });
  }

  cerarModal() {
    this.modal.dismiss(this.mGastoSelected);
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
