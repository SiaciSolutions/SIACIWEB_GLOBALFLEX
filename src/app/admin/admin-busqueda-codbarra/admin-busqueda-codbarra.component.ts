import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
// Variable in assets/js/scripts.js file
import { Router,ActivatedRoute,Params,RouterEvent } from '@angular/router';
import { ApiService } from './../../api.service';
import { FormControl } from "@angular/forms";
import {Observable} from 'rxjs';
import {formatDate} from '@angular/common';
import {MatSelectionList} from '@angular/material'
import { BarcodeFormat } from '@zxing/library';



declare var AdminLTE: any;


@Component({
  selector: 'app-admin-busqueda-codbarra',
  templateUrl: './admin-busqueda-codbarra.component.html',
  styleUrls: ['./admin-busqueda-codbarra.component.css']
})



	

export class AdminBusquedaCodBarraComponent implements OnInit {

	usuario;
	empresa;
	public loading : boolean;

	public success
	public success_act
	pedido_status
	patron_cliente
	razon_social_lista;
	exist_razon_social;
	exist_sucursales
	lista_sucursales
	public lista_sucursales_datatable
	public edit_direcc
	public dato_cliente
	public edit_ruta
	public lista_rutas
	scan_patron_articulo = false
	scan_value
	patron_articulo = '';
	searching_articulo
	articulo
	exist_articulo = false
	almacen = '01' 
	
	
	
   @ViewChild('closeBtnScan') closeBtnScan: ElementRef;
   
   formatsEnabled: BarcodeFormat[] = [
  	BarcodeFormat.AZTEC,
	BarcodeFormat.CODABAR,
	BarcodeFormat.CODE_39,
	BarcodeFormat.CODE_93,
	BarcodeFormat.CODE_128,
	BarcodeFormat.DATA_MATRIX,
	BarcodeFormat.EAN_8,
	BarcodeFormat.EAN_13,
	BarcodeFormat.ITF,
	BarcodeFormat.MAXICODE,
	BarcodeFormat.PDF_417,
	BarcodeFormat.QR_CODE,
	BarcodeFormat.RSS_14,
	BarcodeFormat.RSS_EXPANDED,
	BarcodeFormat.UPC_A,
	BarcodeFormat.UPC_E,
	BarcodeFormat.UPC_EAN_EXTENSION,
  ];
  tryHarder = false
  
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  constructor(
  private router: Router, 
  private srv: ApiService, 
  private route: ActivatedRoute)
  
  { 
  this.loading = false;

  
  }
  
  
  title = 'Example of Angular 8 DataTable';
  // dtOptions: DataTables.Settings = {};
  dtOptions:any = {};
	 
   ngOnInit() {
	   
	   	if (!this.srv.isLoggedIn()){
	this.router.navigateByUrl('/')};
	   
	this.route.queryParams.subscribe(params => {
		console.log(params)
        // Defaults to 0 if no query param provided.
        // this.ruc = +params['ruc'] || 0;
		this.usuario = params['usuario'] || this.route.snapshot.paramMap.get('usuario') || 0;
		this.empresa = params['empresa'] || this.route.snapshot.paramMap.get('empresa') || 0;
      });
	  
	let datos = {};
	datos['codemp'] = this.empresa;	
	  

	AdminLTE.init();
	
	}//FIN ONINIT
	handleQrCodeResult(event,param){

				
		var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
		snd.play();
		window.navigator.vibrate([1000]);

		//this.scan_result = true
		this.scan_value = event
		if (param=='art'){
			// this.scan_value = '7862109177580'
			this.patron_articulo=this.scan_value
			this.busca_articulo()
		}

	
		this.closeBtnScan.nativeElement.click();
	
}
scanErrorHandler(event){
		// this.scan_result = true
		// this.scan_value = event
		alert("ScanErrorHandler")
		alert(event)
	
}

scanFailureHandler(event){
		// this.scan_result = true
		// this.scan_value = event
		alert("scanFailure")
		alert(event)
	
}
scanCompleteHandler(event){
	alert("scanCompleteHandler")
	alert(event)
	
	
}
scannerEnabled = false



	close_scanner() {
		// this.scan=false;
		this.scan_patron_articulo=false

		
	}

	busca_articulo() { 
		if (this.patron_articulo && this.almacen){
			this.searching_articulo = true
			let datos = {};
			datos['nomart']  = this.patron_articulo;
			datos['codemp']  = this.empresa;
			datos['codalm']  = this.almacen;
			datos['codpro']  = 'PROGNR0001';
			this.srv.articulos_ingresos(datos).subscribe(
				data => {
						let longitud_data = data.length

						if (longitud_data > 0 ) {
							console.log(data)
							this.articulo = data;
							this.exist_articulo = true;
							this.searching_articulo = false
							let datos_busqueda = {}
							datos_busqueda['empresa']= datos['codemp']
							datos_busqueda['usuario'] = this.usuario
							datos_busqueda['codart'] = data[0]['codart']
							datos_busqueda['codbarra']=1
							//https://localhost:4405/admin/crear_productos?usuario=VANESSA&empresa=01&codart=LC-T3466-WIRELESS
							console.log(datos_busqueda)
							this.router.navigate(['/admin/crear_productos', datos_busqueda]);
							
	
							
						}else {
							alert("Antículo no encontrado con la palabra clave ingresada <<"+this.patron_articulo+">>");
							this.searching_articulo = false
							this.exist_articulo = false;
							this.patron_articulo = undefined;
						}
			});
			}else  { 
				alert("Por favor llene el artículo / almacen");
			}
	}
	
	
	busqueda_razon_social() { 
	if (this.patron_cliente){
		
		this.exist_sucursales = false
		
		const datos = {};
		datos['codemp'] = this.empresa;
		datos['patron_cliente'] = this.patron_cliente;
			this.srv.busqueda_razon_social(datos).subscribe(data => {
				// console.log(data)
				
				
				let longitud_data = data.length

			if (longitud_data > 0 ) {
				console.log(data)

				this.razon_social_lista = data;
				this.exist_razon_social = true;
				// this.searching_articulo = false
				
		
				
			}else {
				alert("Razon Social no encontrado con la palabra clave ingresada <<"+this.patron_cliente+">>");
				// this.searching_articulo = false
				this.exist_razon_social = false;
			}

			}); 
		}else  { 
			alert("Por favor llenar el campo Razon Social");
		}
	 }
	 
	 
	buscar_sucursales(rz,codcli) {
		 console.log ("Seleccion de cliente")
		 this.loading = true;
		
		this.dato_cliente= {"nomcli":rz,"codcli":codcli}
		// console.log (this.dato_cliente)
	
		let datos = {}
		datos['codemp'] = this.empresa;	
		datos['codcli'] = codcli

		this.srv.cosulta_sucursales(datos).subscribe(data => {
				// console.log(data)
				let longitud_data = data.length

			if (longitud_data > 0 ) {
				console.log(data)
				this.lista_sucursales = data
				// this.exist_sucursales = true
				
				// this.loading = false;

				// this.razon_social_lista = data;
				// this.exist_razon_social = true;
				
		setTimeout(()=> {	
			console.log("TIME OUT")
			this.lista_sucursales_datatable = this.lista_sucursales
			
			
		this.dtOptions = {
			order: [0, 'asc'],
			dom: 'Bfrtip',
			// buttons: ['print','excel'],  ///SI SIRVEEE
			buttons: [{
                extend: 'print',
                filename: 'LISTA_PEDIDOS_SIACI_WEB'+this.usuario
            },
            {
                extend: 'excel',
                filename: 'LISTA_PEDIDOS_SIACI_WEB'+this.usuario
            }],
			columnDefs: [
            // { width: 200, targets: 0 }
			 { "width": "200px", "targets": 0 }
			],
			fixedColumns: true,
			pageLength: 10,

			 processing: true
		  // data:this.dtUsers,
		  // columns: [{title: 'User ID', data: 'id'},
				// {title: 'First Name', data: 'firstName'},
				// {title: 'Last Name', data: 'lastName' }]
		};
		
				this.exist_sucursales = true
				this.loading = false;	
			
			
			}, 2000)
			}else {
				alert("Agencias no creadas para esta Razón Social: "+rz);
				// this.searching_articulo = false
				this.exist_sucursales = false;
				this.loading = false;
			}

			}); 

	 }
	 
	public edit_dir_sucursal(sucursal){
		console.log ("##### EDIT DIR SUCURSAL  ####")
		console.log (sucursal)
		// console.log (sucursal["codart"])
		this.edit_direcc=sucursal
		// this.get_prec_produc(articulos["codart"])

	}
	
	public update_dato_sucursal(id_agencia,new_dato,dato){
		console.log ("##### EDIT DIR SUCURSAL  ####")
		
		let datos = {};
		if (dato == 'D'){
			datos['codemp'] = this.empresa;
			datos['dir_agencia'] = new_dato
			datos['id_agencia'] = id_agencia
			datos['dato'] = dato
		}
		if (dato == 'R'){
			datos['codemp'] = this.empresa;
			datos['idruta'] = new_dato
			datos['id_agencia'] = id_agencia
			datos['dato'] = dato
		}


		// (datos['dir_agencia'],datos['id_agencia'])
		this.srv.update_dato_sucursal(datos).subscribe(data => {
				console.log(data)
				
				
				// let longitud_data = data.length

			// if (longitud_data > 0 ) {
				// console.log(data)

				// this.razon_social_lista = data;
				// this.exist_razon_social = true;
				// // this.searching_articulo = false
				
		
				
			// }else {
				// alert("Razon Social no encontrado con la palabra clave ingresada <<"+this.patron_cliente+">>");
				// // this.searching_articulo = false
				// this.exist_razon_social = false;
			// }

			}); 
		
		this.edit_direcc=undefined
		this.buscar_sucursales(this.dato_cliente['nomcli'],this.dato_cliente['codcli'])
		

	}
	
	public edit_ruta_sucursal(sucursal){
		console.log ("##### EDIT RUTA SUCURSAL  ####")
		console.log (sucursal)
		this.edit_ruta=sucursal
	
	}
	
	 
	 
	
	

	

	
	
}
