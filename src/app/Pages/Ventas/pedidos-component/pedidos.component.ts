import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IPedidos } from 'src/app/Services/interfaces.index';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  @Input() idPedido: string;

  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {}

  cerarModal(ob: IPedidos) {
    this.modal.dismiss(ob);
  }

}
