import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VentasService } from 'src/app/Services/Ventas/ventas.service';
import { IVentasSemana, VentasSemana } from 'src/app/Services/Ventas/ventas.interface';

@Component({
  selector: 'app-semanaventa',
  templateUrl: './semanaventa.component.html',
  styleUrls: ['./semanaventa.component.scss'],
})
export class SemanaventaComponent implements OnInit {

  @Input() idSemanaVenta: string;

  fechaInicio: Date;
  ventaSemana: IVentasSemana;

  constructor(
    private modal: ModalController,
    private service: VentasService

  ) {

    this.idSemanaVenta = '';
    this.fechaInicio = new Date();
    this.ventaSemana = VentasSemana.empty();
  }

  ngOnInit() { }

  cerarModal(ob) {
    this.modal.dismiss(ob);
  }

  iniciarVenta() {

    this.ventaSemana.fechaInicio = this.fechaInicio + 'T11:20:45.000+0000';

    this.service.createSemanaVenta(this.ventaSemana)
      .then(data => {
        this.cerarModal(data.RES);
      })
      .catch(error => console.log(error));
  }

}
