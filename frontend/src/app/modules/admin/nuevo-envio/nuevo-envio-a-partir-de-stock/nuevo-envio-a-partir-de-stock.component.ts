import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Producto, Item, Volumen, EnvioParaBeneficiario, Traslado, Donacion } from '../../../../_services/lbservice/models';
import { ProductoApi, DonacionApi, ItemApi, VolumenApi, EnvioParaBeneficiarioApi, TrasladoApi } from '../../../../_services/lbservice';
import { MockStockService } from '../../../../_services/stockservice/mock-stock.service';

@Component({
  selector: 'app-nuevo-envio-a-partir-de-stock',
  templateUrl: './nuevo-envio-a-partir-de-stock.component.html',
  styleUrls: ['./nuevo-envio-a-partir-de-stock.component.css']
})
export class NuevoEnvioAPartirDeStockComponent implements OnInit {

  form : FormGroup;
  productosEnStock : Producto[] = [];
  productosEnEnvio : Producto[] = [];

  @Output() enviarProductos = new EventEmitter<Producto[]>();
  constructor(private stock:MockStockService) {
  	this.stock.getProductos().then((productos)=>{this.productosEnStock=productos; console.log(productos)});
    this.form = new FormGroup({
            id: new FormControl(),
            cantidad: new FormControl()
          });
  }

  ngOnInit() {
  }

  //Toma del form la id y la cantidad
  //Controla que queden suficientes
  //Descuenta la cantidad
  //Crea el producto y lo agrega a productosEnEnvio
  //Limpia los input
  //Lo envia al padre
  agregarAEnvio(){
    let id = this.form.get("id").value - 1;
    let cant = this.form.get("cantidad").value;
    this.form.reset();
    if (id >= this.productosEnStock.length || id<0){
      alert("Elija la id de uno de los productos de la lista");
      return;
    }
    if (this.productosEnStock[id].cantidad < cant){
      alert("No hay suficiente stock de ese producto");
      return;
    }
    this.productosEnStock[id].cantidad= this.productosEnStock[id].cantidad - cant;
    let producto = new Producto;
    producto.cantidad = cant;
    producto.vencimiento = this.productosEnStock[id].vencimiento;
    producto.tipoProductoId = this.productosEnStock[id].tipoProductoId;
    //Falta crear los tipoProductos y asociarlos en el servicio
    producto.tipoProducto = this.productosEnStock[id].tipoProducto;
    this.productosEnEnvio.push(producto);
    this.enviarProductos.emit(this.productosEnEnvio);
  }
}