import { Component, OnInit, Input } from '@angular/core';
import { GastoComponent } from './gasto/gasto.component';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { EgresosService } from 'src/app/Services/Egresos/egresos.service';
import { IEgresos } from 'src/app/Services/Egresos/egresos.interface';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.page.html',
  styleUrls: ['./egresos.page.scss'],
})
export class EgresosPage implements OnInit {

  mEgresos: IEgresos[];

  constructor(
    private modalController: ModalController,
    private service: EgresosService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {

    this.mEgresos = [];

  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll()
      .then(data => {
        this.mEgresos = data.rows;
      })
      .catch(error => {
        console.log(error);
        this.presentToast('Ocurrió un error');
      });
  }

  nuevo() {
    this.modalPresent('');
  }

  verInfo(id) {
    this.modalPresent(id);
  }

  async modalPresent(id: string) {
    const modal = await this.modalController.create({
      component: GastoComponent,
      componentProps: {
        idGasto: id
      }
    });

    modal.onDidDismiss().then(data => {
      if (data.data) {
        this.mEgresos.push(data.data);
      } else {
        this.getAll();
      }

    }).catch(error => console.log(error));

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
