import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute,Params,RouterEvent } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormControl } from "@angular/forms";
import {Observable} from 'rxjs';
import {formatDate} from '@angular/common';
import {MatSelectionList} from '@angular/material'
import {DataTableDirective} from 'angular-datatables';

declare var AdminLTE: any;

@Component({
  selector: 'app-admin-lista-cotizaciones',
  templateUrl: './admin-lista-cotizaciones.component.html',
  styleUrls: ['./admin-lista-cotizaciones.component.css']
})

export class AdminListaContizacionesComponent implements OnInit {
	@ViewChild(DataTableDirective) 
	datatableElement: DataTableDirective;
    dtOptions:any = {};
	usuario;
	empresa;
	codIngProd;
	lista_pedidos
	lista_cotizacion
	lista_pedidos_tabla
	lista_cotizacion_tabla
	public loading : boolean;
	public espera_exitoso_pedido : boolean;
	public espera_generar_pdf : boolean;
	public error_envio_correo : boolean;
	public success
	public success_act
	pedido_status
	public edit_ruta
	lista_rutas
	fecha_entrega_busqueda
	listado_original
	fecha_desde
	fecha_hasta
	descripcion_error
	

  constructor(
  private router: Router, 
  private srv: ApiService, 
  private route: ActivatedRoute)
  
  { this.loading = true;
	this.espera_exitoso_pedido = false;
	this.espera_generar_pdf = false;
	this.error_envio_correo = false;
  
  }
  
  
  title = 'Example of Angular 8 DataTable';
	 
   ngOnInit() {
	   
	   	if (!this.srv.isLoggedIn()){
	this.router.navigateByUrl('/')};
	   
	this.route.queryParams.subscribe(params => {
		console.log(params)
		this.usuario = params['usuario'] || this.route.snapshot.paramMap.get('usuario') || 0;
		this.empresa = params['empresa'] || this.route.snapshot.paramMap.get('empresa') || 0;
		this.pedido_status = params['pedido'] || this.route.snapshot.paramMap.get('pedido');
      });
	   
	 if (this.pedido_status == 'success'){
		 this.success = true
	 }else if (this.pedido_status == 'success_act'){
		 this.success_act = true
	 }
	 console.log("SUCCESS STATUS")
	 console.log(this.success)
	const datos = {};
	datos['codemp'] = this.empresa;	
	datos['usuario'] = this.usuario;
	datos['tipacc'] = this.srv.getTipacc()
	console.log (this.usuario)
	console.log (this.empresa)
	console.log (datos)
 
	var newdate = new Date();
	newdate.setDate(newdate.getDate() -30 ); 
	
	this.fecha_desde  = formatDate(newdate, 'yyyy-MM-dd', 'en-US', '-0500');
	console.log (this.fecha_desde)
	this.fecha_hasta  = formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '-0500');
	datos['fecha_desde'] = this.fecha_desde
	datos['fecha_hasta'] = this.fecha_hasta
	
	this.srv.lista_cotizacion(datos).subscribe(
	   data => {
		   console.log(data)
		   console.log ("EJECUTADA DATA")
			this.lista_cotizacion_tabla = data
		}); 
		
		setTimeout(()=> {	
			console.log("TIME OUT")
			this.lista_cotizacion = this.lista_cotizacion_tabla
			this.listado_original = this.lista_cotizacion
			
			
		this.dtOptions = {
			order: [0, 'desc'],
			dom: 'Bfrtip',
			buttons: [{
                extend: 'print',
                filename: 'LISTA_COTIZACIÓN_DE_PRODUCTOS_SIACI_WEB'+this.usuario
            },
            {
                extend: 'excel',
                filename: 'LISTA_COTIZACIÓN_DE_PRODUCTOS_SIACI_WEB'+this.usuario
            }],
			columnDefs: [
			 { "width": "200px", "targets": 0 }
			],
			fixedColumns: true,
			pageLength: 10,
			processing: true
		};
		
			this.loading = false;
			}, 3000)
	
	AdminLTE.init();
	
	}  
  
    buscar_ingProd_fecha(): void {
		let datos = {};
		this.loading = true;
		datos['codemp'] = this.empresa;	
		datos['codagencia'] = this.srv.getCodAgencia();	
		datos['usuario'] = this.usuario;
		datos['fecha_desde'] = this.fecha_desde
		datos['fecha_hasta'] = this.fecha_hasta
	    datos['codalm'] = this.srv.getCodAgencia();	
		datos['api_url'] = this.srv.apiUrl+':'+this.srv.port;
	
	this.srv.lista_cotizacion(datos).subscribe(
	   data => {
		   console.log(data)
		   console.log ("EJECUTADA DATA")
			this.lista_cotizacion_tabla = data
		}); 
		
		setTimeout(()=> {	
			console.log("TIME OUT")
			this.lista_cotizacion = this.lista_cotizacion_tabla
			this.listado_original = this.lista_cotizacion
				
		this.dtOptions = {
			order: [0, 'desc'],
			dom: 'Bfrtip',
			buttons: [{
                extend: 'print',
                filename: 'LISTA_COTIZACIÓN_DE_PRODUCTOS_SIACI_WEB'
            },
            {
                extend: 'excel',
                filename: 'LISTA_COTIZACIÓN_DE_PRODUCTOS_SIACI_WEB'
            }],
			columnDefs: [
			 { "width": "200px", "targets": 0 }
			],
			fixedColumns: true,
			pageLength: 10,
			processing: true

		};

			this.loading = false;
				
			}, 3000)
		
  }
  
  
   ver_listado_completo(): void {
	   
	   const datos = {};
	datos['codemp'] = this.empresa;	
	datos['usuario'] = this.usuario;
	datos['tipacc'] = this.srv.getTipacc()

	this.srv.lista_cotizacion(datos).subscribe(
	   data => {
		   console.log(data)
		   console.log ("EJECUTADA DATA")
			this.lista_cotizacion = data
			this.render_table(this.lista_cotizacion_tabla);
		});   
  }
  
    render_table(new_list): void {

		this.loading = true
		this.lista_cotizacion_tabla = undefined
		setTimeout(()=> {	
			console.log("TIME OUT")
			this.lista_cotizacion_tabla = new_list
		
			this.dtOptions = {
				order: [0, 'desc'],
				dom: 'Bfrtip',
				buttons: [{
					extend: 'print',
					filename: 'LISTA_COTIZACIÓN_DE_PRODUCTOS_SIACI_WEB'+this.usuario
				},
				{
					extend: 'excel',
					filename: 'LISTA_COTIZACIÓN_DE_PRODUCTOS_SIACI_WEB'+this.usuario
				}],
				columnDefs: [
				 { "width": "200px", "targets": 0 }
				],
				fixedColumns: true,
				pageLength: 10,
				 processing: true
			};
			this.loading = false;
		}, 2000)
  }	

	eliminar_cotizacion(CodCot): void {
		let datos = {};
		this.loading = true;
		datos['codemp'] = this.empresa;	
		datos['CodCot'] = CodCot;	
		
	
		if (confirm("******* ESTAS SEGURO DE ELIMINAR ESTA COTIZACIÓN ?  *******..???")){
			this.srv.eliminar_cotizacion(datos).subscribe(
			   data => {
				   console.log (data)
				   if (data['STATUS'] == 'EXITOSO'){
					 alert("Cotización ha sido eliminada con Exito..!!!")
					   
				   }else{
					alert("Error al eliminar Cotización por el siguiente error: "+data['STATUS'] )
				   }
				   
					this.ngOnInit()
				}); 
		}else{
			this.loading = false;
		}
		
	}
		
}