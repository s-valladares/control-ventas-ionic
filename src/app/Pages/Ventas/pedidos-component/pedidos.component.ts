import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { IPedidos } from 'src/app/Services/interfaces.index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PedidosService } from 'src/app/Services/services.index';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  @Input() idPedido: string;

  form: FormGroup;
  mPedido: IPedidos;
  fechaHoy: Date;

  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,

    private service: PedidosService,
    private toastController: ToastController
  ) {
    this.fechaHoy = new Date();
  }

  ngOnInit() {
    console.log(this.fechaHoy);
    this.form = this.formBuilder.group({
      cliente: ['', [Validators.required]],
      nota: [''],
      entrega: ['', [Validators.required]],
      hora: ['', [Validators.required]]
    });

  }

  guardar() {
    this.mPedido = this.form.value as IPedidos;
    console.log(this.mPedido);
    this.service.create(this.mPedido)
      .then(res => {
        this.cerarModal(res.RES);
        this.presentToast('Guardado correctamente');
      })
      .catch(error => {
        console.error(error);
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

}
