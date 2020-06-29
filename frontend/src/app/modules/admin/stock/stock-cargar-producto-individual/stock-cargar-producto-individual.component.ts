import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { Producto, ProductoApi, TipoProducto, TipoProductoApi, Categoria, CategoriaApi } from '../../../../_services/lbservice';


@Component({
  selector: 'app-stock-cargar-producto-individual',
  templateUrl: './stock-cargar-producto-individual.component.html',
  styleUrls: ['./stock-cargar-producto-individual.component.css']
})
export class StockCargarProductoIndividualComponent implements OnInit {

	form: FormGroup;
	fechaActual = new Date();
	producto: Producto;
	categorias: Categoria[];


	constructor(
		private router:Router,
		private productoApi:ProductoApi,
		private tipoApi:TipoProductoApi,
		private categoriaApi:CategoriaApi
		)
	{ 
		this.form = new FormGroup({
			nombre: new FormControl('', [Validators.required]),
			categoria: new FormControl('', [Validators.required]),
			cant: new FormControl('', [Validators.required]),
			vto: new FormControl('', [Validators.required]),
			peso: new FormControl('', [Validators.required]),
      	});

		this.categoriaApi.find().subscribe((categoriaArr:Categoria[])=>{this.categorias = categoriaArr})


      	//Estos serian los datos que quiero obtener del form
      	//y mandar a la api
		this.producto = new Producto;
		this.producto.tipoProducto = new TipoProducto;
		this.producto.cantidad;
		this.producto.vencimiento;
		this.producto.tipoProducto.nombre;
		this.producto.tipoProducto.categoria;
		this.producto.tipoProducto.peso;
	}

	submitProduct(salir){
		//Hay un pequeno workaround aca, se deberian crear tipo productos
		//solo si el nombre no existe, ya que su peso y categoria deberian
		//ser siempre las mismas

		this.producto = new Producto;
		this.producto.tipoProducto = new TipoProducto;

		this.producto.tipoProducto.nombre = this.form.get("nombre").value;
		this.producto.tipoProducto.peso = this.form.get("peso").value;
		this.producto.tipoProducto.categoriaId = this.form.get("categoria").value;
		this.tipoApi.create(this.producto.tipoProducto).subscribe((tipoProducto:TipoProducto)=>{
			this.producto.cantidad = this.form.get("cant").value;
			this.producto.vencimiento = this.form.get("vto").value;
			this.producto.tipoProductoId = tipoProducto.id;
			this.productoApi.create(this.producto).subscribe(()=>{
				alert("Producto creado");
				if (!salir) {
					this.form.reset();}
				else {
					this.router.navigateByUrl("/ver-stock");	
				}
			})		
		});
	}

	ngOnInit() {
	}

}
