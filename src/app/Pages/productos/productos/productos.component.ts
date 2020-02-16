import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductos, Productos, IProductosTipos, ProductosTipos } from 'src/app/Services/interfaces.index';
import { ProductosService } from 'src/app/Services/services.index';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

  @Input() idProducto: string;

  form: FormGroup;
  mProducto: IProductos;
  mTipo: IProductosTipos;
  mProductosTipos: IProductosTipos[];

  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private service: ProductosService,
    private toastController: ToastController
  ) {
    this.mProducto = Productos.empty();
    this.mTipo = ProductosTipos.empty();
  }

  ngOnInit() {
    this.getAllProductosTipos();

    if (this.idProducto !== '') {
      this.getAllProductosId();
    }

    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: [''],
      precio: [0, [Validators.required]],
      tipo: [null, [Validators.required]],
    });

  }

  cerarModal(ob: IProductos) {
    this.modal.dismiss(ob);
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
    this.mProducto.estado = true;
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

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
