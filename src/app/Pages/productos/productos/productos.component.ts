import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {}

  cerarModal() {
    this.modal.dismiss();
  }

}
