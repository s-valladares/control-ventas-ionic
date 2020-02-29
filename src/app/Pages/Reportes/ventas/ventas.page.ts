import { Component, OnInit } from '@angular/core';
import { SemanaventaComponent } from '../../Ventas/semanaventa/semanaventa.component';
import { ModalController } from '@ionic/angular';
import { IVentasSemana } from 'src/app/Services/interfaces.index';
import { VentasService } from 'src/app/Services/services.index';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {

  ventasSemana: IVentasSemana[];

  constructor(
    private modalController: ModalController,
    private service: VentasService
  ) {
    this.ventasSemana = [];
  }

  ngOnInit() {
    this.verVentasSemana();
  }

  nuevo() {
    this.modalPresent('');
  }

  verInfo(id) {
    this.modalPresent(id);
  }

  verVentasSemana() {
    this.service.getAllSemanaVenta()
      .then(res => {
        this.ventasSemana = res.rows;
      })
      .catch(error => console.log(error));
  }


  async modalPresent(id: string) {
    const modal = await this.modalController.create({
      component: SemanaventaComponent,
      componentProps: {
        idSemanaVenta: id
      }
    });

    modal.onDidDismiss().then(data => {
      if (data.data) {
        this.ventasSemana.push(data.data);
      } else {
        this.verVentasSemana();
      }

    }).catch(error => console.log(error));

    return await modal.present();
  }

}
