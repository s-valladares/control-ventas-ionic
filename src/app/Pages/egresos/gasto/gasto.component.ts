import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IEgresos, Egresos } from 'src/app/Services/Egresos/egresos.interface';
import { ModalController, ToastController } from '@ionic/angular';
import { EgresosService } from 'src/app/Services/Egresos/egresos.service';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.scss'],
})
export class GastoComponent implements OnInit {

  @Input() idGasto: string;

  form: FormGroup;
  mGastoSelected: IEgresos;
  mGastos: IEgresos[];
  fechaHoy: Date;

  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private service: EgresosService,
    private toastController: ToastController
  ) {
    this.mGastoSelected = Egresos.empty();
    this.mGastos = [];
    this.idGasto = '';
    this.fechaHoy = new Date();
  }

  ngOnInit() {

    // FORMULARIO PARA CREAR UN PEDIDO
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: [''],
      fechaGasto: ['', [Validators.required]],
      total: [0, [Validators.required]]
    });
  }

  guardar(){
    this.mGastoSelected = this.form.value as IEgresos;
    this.service.create(this.mGastoSelected)
    .then(data => {
      this.cerarModal();
      this.presentToast('Guardado correctamente');
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
