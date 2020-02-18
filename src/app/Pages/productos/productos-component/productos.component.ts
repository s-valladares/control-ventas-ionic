import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductos, Productos, IProductosTipos, ProductosTipos } from 'src/app/Services/interfaces.index';
import { ProductosService } from 'src/app/Services/services.index';
import { Config } from 'src/app/Services/Config/config';
import { ProductoConfirmarComponent } from '../producto-confirmar/producto-confirmar.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

  @Input() idProducto: string;
  @Input() idPedido: string;
  @Input() tipoUso: string;

  form: FormGroup;
  mProducto: IProductos;
  mProductos: IProductos[];
  mTipo: IProductosTipos;
  mProductosTipos: IProductosTipos[];

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private service: ProductosService,
    private toastController: ToastController
  ) {
    this.mProducto = Productos.empty();
    this.mTipo = ProductosTipos.empty();

    this.mProductos = [];
  }

  ngOnInit() {

    if (this.tipoUso === Config.CREAR || this.tipoUso === Config.VER) {
      this.getAllProductosTipos();
      this.getAllProductosId();

    }
    if (this.tipoUso === Config.CREAR) {
      this.form = this.formBuilder.group({
        nombre: ['', [Validators.required]],
        descripcion: [''],
        precio: [0, [Validators.required]],
        tipo: [null, [Validators.required]],
      });
    }

    if (this.tipoUso === Config.ELEGIR) {
      this.getAllProductos()
    }



  }

  // METODO QUE ME SIRVE PARA VER LOS PRODUCTOS Y ELEGIR PARA EL PEDIDO
  getAllProductos() {
    this.service.getAll().then(res => {
      this.mProductos = res.rows;
    }).catch(err => {
      console.error(err);
      this.presentToast('Error al obtener productos');
    });
  }

  elegirProducto(producto: IProductos) {
    this.mProducto = producto;
    this.modalConfirmarProducto();
  }


  getAllProductosTipos() {
    this.service.getAllTipos().then(res => {
      this.mProductosTipos = res.rows;
    }).catch(err => {
      console.error(err);
      this.presentToast('Error al obtener productos');
    });
  }

  getAllProductosId() {
    this.service.getId(this.idProducto).then(res => {
      this.mTipo = res.tipo;
      this.mProducto = res;
    }).catch(err => {
      console.error(err);
      this.presentToast('Error al obtener producto');
    });
  }

  guardar() {
    this.mProducto = this.form.value as IProductos;
    console.log(this.mProducto);
    this.service.create(this.mProducto)
      .then(res => {
        this.cerarModal(res.RES);
        this.presentToast('Guardado correctamente');
      })
      .catch(error => {
        console.error(error);
        this.presentToast('Ocurrió un error');
      });

  }



  // EVENTOS ------------------------------
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  cerarModal(ob: IProductos) {
    this.modalCtrl.dismiss(ob);
  }

  async modalConfirmarProducto() {
    console.log(this.mProducto);
    const modal = await this.modalCtrl.create({
      component: ProductoConfirmarComponent,
      componentProps: {
        producto: this.mProducto,
        idPedido: this.idPedido
      }
    });

    modal.onDidDismiss().then(data => {
      if (data.data) {
        // this.mProductos.push(data.data);
      }

    }).catch(error => console.log(error));

    return await modal.present();
  }

}
