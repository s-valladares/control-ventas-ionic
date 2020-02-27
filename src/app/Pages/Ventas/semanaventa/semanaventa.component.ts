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
    this.modal.dismiss(ob.RES);
  }

  iniciarVenta() {
    
    this.ventaSemana.fechaInicio = this.fechaInicio + 'T00:46:39.000Z';
    console.log(this.ventaSemana.fechaInicio);
    this.service.createSemanaVenta(this.ventaSemana)
    .then(data => {
      this.cerarModal(data);
    })
      .catch(error => console.log(error));
  }

}
