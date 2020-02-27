import { Component, OnInit, Input } from '@angular/core';
import { GastoComponent } from './gasto/gasto.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.page.html',
  styleUrls: ['./egresos.page.scss'],
})
export class EgresosPage implements OnInit {



  constructor(
    private modalController: ModalController
  ) {

  }

  ngOnInit() {
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
        idPedido: id
      }
    });

    modal.onDidDismiss().then(data => {
      /*if (data.data) {
        this.mPedidos.push(data.data);
      } else {
        this.getAll();
      }
*/
    }).catch(error => console.log(error));

    return await modal.present();
  }


}
