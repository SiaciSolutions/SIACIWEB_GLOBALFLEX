import { Component, OnInit,ViewChild } from '@angular/core';
// Variable in assets/js/scripts.js file
import { Router,ActivatedRoute,Params,RouterEvent } from '@angular/router';
import { ApiService } from './../../api.service';
import { FormControl } from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {MatSelectionList} from '@angular/material'
import {NgxImageCompressService} from 'ngx-image-compress';
import { HttpEvent, HttpEventType } from '@angular/common/http';

declare var AdminLTE: any;


@Component({
  selector: 'app-admin-cotizador',
  templateUrl: './admin-cotizador.component.html',
  styleUrls: ['./admin-cotizador.component.css']
})



	

export class AdminCotizadorComponent implements OnInit {
	
	parametros: {usuario: string, empresa: string};
	
	myControl = new FormControl();
	myControl2 = new FormControl();
	filteredOptions: Observable<string[]>;
	filteredarticulo: Observable<string[]>;
	public clientes : boolean;
	public exist_articulo : boolean;
	public exist_razon_social : boolean;
	public razon_social : string;
	public email_cliente : string;
	public subtotal;
	public today= new Date();
	public edit_cant: boolean
	public desc_cant = 0
	public total=0
	public iva_cant = 0
	public iva_cant_new = 0
	desc_porcentaje = 0;
	public iva_porcentaje = 0;
	subtotal_desc = 0;
	public iva_siaci
	public impresor_lista:any = [];
	public supervisor_lista:any = [];
	public jefe_produccion_lista:any = [];
	public vendedores_lista:any = [];
	public observacion_pedido = null
	public cambiar_email:boolean;
	public lista_prec = []
	public nuevo_precio_renglon
	public lista_rutas
	public lista_surcursales
	public change_iva = false
	public tipo_busqueda : boolean;
	public check_agencia
	public val_exist_ppal:boolean
	public val_exist_sucursal:boolean
	// public check_agencia_sucursal:boolean
	public edit_dir_agencia_ppal:boolean
	public habilitar_crear_nueva_sucursal:boolean
// PARA DEFINIR LA RUTA DE LOS PEDIDOS
    public id_nombre_ruta_seleccionado
	public id_direccion_sucursal_seleccionado
	public idruta
	public nombre_ruta
	public id_agencia
	public dir_agencia
	public searching_articulo = false
	public patron_cliente
	public razon_social_lista
	public edit_iva_art
	exist_fecha_entrega = true
	// fecha_entrega = undefined
	fecha_entrega = new FormControl(new Date());
	// date = new FormControl(new Date());
	condiciones_pago = null
	tiempo_entrega = null
	info_adicional = null	
	
	jstoday = '';
	fectra =  new FormControl(new Date());
	// public date : string;
	// clientes;
	usuario = ''
	empresa = ''
	ruc = '';
	patron_articulo = '';
	cantidad_nueva = '';
	ciudad
	vendedor = '01'

	// editART: ARTICULO
	editART: any = []
	dato_cliente
	
	options: any = []
	articulo: any = []
	articulos_seleccionado
	elements_checkedList:any = [];
	masterSelected:boolean;

	
	articulos_pedido: any = []
	// #### PARA MARCAR LA EDICION DEL PRECIO DEL ARTICULO
	public edit_articulos
	
	numtra
	accion_actualizar = false
	almacenes_lista
	almacen
	
	///USADOS
	bandera: boolean = false;
	currentSection: string = 'ingreso';
	estado: string;
	cortador: number;
	cantidad_requerida: number;
	cilindro: string;
	s_i: boolean = false;
	color: boolean = false;
	num: number;
	alto: number;
	ancho: number;
	gap_avance: number;
	gap_columnas: number;
	gap_extremos: number;
	filas: number;
	tipoSeleccionado: string;
	nBobinas: number;
	cRollos: number;
	impresion: number;
	kores: number;
	cstamping: number;
	relam: number;
	mate: number;
	troquel: number;
	brillante: number;
	horas: number;
	combustible: number;
	cyrel: boolean = false;
	gap_de_extremos: number;
	costo: number;
	cantidad: number;
	costomp: number;
	utilidad: number;
	codCot: number;
	datos: any = {};
	codart: string;
	articulos: { codart: string; nomart: string }[] = [];

	
  constructor(
  private router: Router, 
  private srv: ApiService, 
  private route: ActivatedRoute
) 
  
  { 
  this.tipo_busqueda = true
  this.clientes = false;
  this.exist_articulo = false;
  this.exist_razon_social = false;
  this.edit_cant = false;
  this.masterSelected = false;
  this.cantidad_nueva = '1';
  this.cambiar_email = false;
  this.check_agencia = false
  // this.check_agencia_sucursal = false
  this.val_exist_ppal = true
  this.val_exist_sucursal = true
  this.edit_dir_agencia_ppal = false
  this.habilitar_crear_nueva_sucursal = false
 

  this.route.params.subscribe(val => {
	if (!this.srv.isLoggedIn()){
	this.router.navigateByUrl('/')};
	
	this.route.queryParams.subscribe(params => {
		console.log(params)
		// Defaults to 0 if no query param provided.
		// this.ruc = +params['ruc'] || 0;
		this.usuario = params['usuario'] || this.route.snapshot.paramMap.get('usuario') || 0;
		this.empresa = params['empresa'] || this.route.snapshot.paramMap.get('empresa') || 0;
		this.codCot = params['codCot'] || this.route.snapshot.paramMap.get('codCot') || 0;
		
		console.log("LUEGO DE ENTRADA")
	if (this.codCot == 0){
		this.codCot = undefined
		this.accion_actualizar = false
		this.bandera = false
		window.scrollTo(0,0);
		//this.ingProducto_nuevo()
	}else {
		window.scrollTo(0,0);
		this.accion_actualizar = true
		this.bandera = false
		this.buscar_encabezado_cotizador();
	}
		
	  });
	console.log(this.usuario)
	console.log(this.empresa)
	console.log(this.codCot)
   }); //FIN ROUTING
	
  } //FIN COSNTRUCTOR

  
	buscar_encabezado_cotizador() {
		const datos = {};
		datos['codemp'] = this.empresa;	
		datos['usuario'] = this.usuario;
		datos['codCot'] = this.codCot;
		
		
		this.srv.get_cotizador(datos).subscribe(data => {
			console.log(data)
			console.log ("EJECUTADA DATA CONSULTA")

			let fecha =formatDate(this.today, 'yyyy-MM-dd', 'en-US', '-0500');
			this.cortador = data['cortador']
			this.cantidad_requerida = data['cantidad_requerida']
			this.cilindro = data['cilindro']
			this.s_i = data['si']
			this.color = data['color']
			this.num = data['numero']
			this.alto = data['alto']
			this.ancho = data['ancho']
			this.gap_avance = data['gap_avance']
			this.gap_columnas = data['gap_columnas']
			this.gap_extremos = data['gap_extremos']
			this.filas = data['filas']
			this.tipoSeleccionado = data['tipo']
			this.nBobinas = data['numero_bobinas']
			this.cRollos = data['cantidad_rollos']
			this.impresion = data['pvp_impresion']
			this.kores = data['pvp_kores']
			this.cstamping = data['cold_stamping']
			this.relam = data['relam_delam']
			this.mate = data['costo_laminado_mate']
			this.troquel = data['pvp_troquel']
			this.brillante = data['costo_laminado_brillante']
			this.horas  = data['horas_produccion']
			this.combustible = data['transporte_combustible']
			this.cyrel = data['cyrel']
			this.gap_de_extremos = data['gap_de_extremos']
			this.costo = data['costo_cm2']
			this.cantidad = data['cantidad_cyreles']
			this.costomp = data['costomp']
			this.utilidad = data['utilidad']
			this.codart = data['codart']
			});
	
		}	
  
	showIngresoDatos() {
		this.currentSection = 'ingreso';
	}
	showDatos() {
		this.currentSection = 'datos';
	}

    ngOnInit() {
		AdminLTE.init();
		this.obtener_articulos();
	}
	
	obtener_articulos(){
		let datos = {
			codemp: this.empresa,
		  };
  
		  this.srv.obtener_articulos(datos).subscribe(
			data=>{
				this.articulos = data
			}
		)
	}
	
	formato_fecha (fecha){
		return formatDate(fecha, 'dd-MM-yyyy', 'en-US', '-0500')
	}
	
	//VALIDADOR DATOS AL CREAR
	validar_datos(): boolean { 
		console.log("### VALIDAR DATOS ###");
		this.filas = Number(this.filas);
	
		if (this.cortador == null || isNaN(this.cortador)) {
			alert("Por favor, ingresar valor para cortador");
			return false;
		} 
		if (!this.cilindro) {
			alert("Por favor, ingresar valor para cilindro");
			return false;
		} 
		if (this.cantidad_requerida == null || isNaN(this.cantidad_requerida)) {
			alert("Por favor, ingresar la cantidad requerida");
			return false;
		} 
		if (this.num == null || isNaN(this.num)) {
			alert("Por favor, ingresar N°");
			return false;
		} 
		if (this.alto == null || isNaN(this.alto)) {
			alert("Por favor, ingresar el alto");
			return false;
		} 
		if (this.ancho == null || isNaN(this.ancho)) {
			alert("Por favor, ingresar el ancho");
			return false;
		} 
		if (this.gap_avance == null || isNaN(this.gap_avance)) {
			alert("Por favor, ingresar valor para gap avance");
			return false;
		} 
		if (this.gap_columnas == null || isNaN(this.gap_columnas)) {
			alert("Por favor, ingresar valor para gap columnas");
			return false;
		} 
		if (this.gap_extremos == null || isNaN(this.gap_extremos)) {
			alert("Por favor, ingresar valor para gap extremos");
			return false;
		} 
		if (this.filas == null || isNaN(this.filas)) {
			alert("Por favor, ingresar valor para filas");
			return false;
		} 
		if (this.nBobinas == null || isNaN(this.nBobinas)) {
			alert("Por favor, ingresar n° de bobinas");
			return false;
		} 
		if (this.cRollos == null || isNaN(this.cRollos)) {
			alert("Por favor, ingresar cantidad de rollos");
			return false;
		} 
		if (this.impresion == null || isNaN(this.impresion)) {
			alert("Por favor, ingresar P.V.P. de impresión");
			return false;
		} 
		if (this.kores == null || isNaN(this.kores)) {
			alert("Por favor, ingresar P.V.P. de kores");
			return false;
		} 
		if (this.cstamping == null || isNaN(this.cstamping)) {
			alert("Por favor, ingresar cold stamping");
			return false;
		} 
		if (this.relam == null || isNaN(this.relam)) {
			alert("Por favor, ingresar relam delam");
			return false;
		} 
		if (this.mate == null || isNaN(this.mate)) {
			alert("Por favor, ingresar costo laminado mate");
			return false;
		} 
		if (this.troquel == null || isNaN(this.troquel)) {
			alert("Por favor, ingresar P.V.P. troquel");
			return false;
		} 
		if (this.brillante == null || isNaN(this.brillante)) {
			alert("Por favor, ingresar costo laminado brillante");
			return false;
		} 
		if (this.horas == null || isNaN(this.horas)) {
			alert("Por favor, ingresar horas de producción");
			return false;
		} 
		if (this.combustible == null || isNaN(this.combustible)) {
			alert("Por favor, ingresar transporte combustible");
			return false;
		} 
		if ((this.gap_de_extremos == null || isNaN(this.gap_de_extremos)) && this.cyrel  ) {
			alert("Por favor, ingresar gap de extremos de Cyrel");
			return false;
		}else{
			this.gap_de_extremos = 0
		}
		if ((this.costo == null || isNaN(this.costo)) && this.cyrel) {
			alert("Por favor, ingresar costo cm2");
			return false;
		}else{
			this.costo = 0
		} 
		if ((this.cantidad == null || isNaN(this.cantidad)) && this.cyrel) {
			alert("Por favor, ingresar cantidad de Cyreles");
			return false;
		}else{
			this.cantidad = 0
		}
		if (this.costomp == null || isNaN(this.costomp)) {
			alert("Por favor, ingresar costo unitario mp");
			return false;
		}
		if (this.utilidad == null || isNaN(this.utilidad)) {
			alert("Por favor, ingresar porcentaje de utilidad");
			return false;
		}
		if (this.codart == null) {
			alert("Por favor, seleccionar un articulo");
			return false;
		}
	
		return true;
	}
	
	//VALIDAR DATOS AL ACTUALIZAR
	validar_datos_actualizar() {
		console.log("### VALIDAR DATOS ###");
		this.filas = Number(this.filas);
	
		if (this.cortador == null || isNaN(this.cortador)) {
			alert("Por favor, ingresar valor para cortador");
			return false;
		} 
		if (!this.cilindro) {
			alert("Por favor, ingresar valor para cilindro");
			return false;
		} 
		if (this.cantidad_requerida == null || isNaN(this.cantidad_requerida)) {
			alert("Por favor, ingresar la cantidad requerida");
			return false;
		} 
		if (this.num == null || isNaN(this.num)) {
			alert("Por favor, ingresar N°");
			return false;
		} 
		if (this.alto == null || isNaN(this.alto)) {
			alert("Por favor, ingresar el alto");
			return false;
		} 
		if (this.ancho == null || isNaN(this.ancho)) {
			alert("Por favor, ingresar el ancho");
			return false;
		} 
		if (this.gap_avance == null || isNaN(this.gap_avance)) {
			alert("Por favor, ingresar valor para gap avance");
			return false;
		} 
		if (this.gap_columnas == null || isNaN(this.gap_columnas)) {
			alert("Por favor, ingresar valor para gap columnas");
			return false;
		} 
		if (this.gap_extremos == null || isNaN(this.gap_extremos)) {
			alert("Por favor, ingresar valor para gap extremos");
			return false;
		} 
		if (this.filas == null || isNaN(this.filas)) {
			alert("Por favor, ingresar valor para filas");
			return false;
		} 
		if (this.nBobinas == null || isNaN(this.nBobinas)) {
			alert("Por favor, ingresar n° de bobinas");
			return false;
		} 
		if (this.cRollos == null || isNaN(this.cRollos)) {
			alert("Por favor, ingresar cantidad de rollos");
			return false;
		} 
		if (this.impresion == null || isNaN(this.impresion)) {
			alert("Por favor, ingresar P.V.P. de impresión");
			return false;
		} 
		if (this.kores == null || isNaN(this.kores)) {
			alert("Por favor, ingresar P.V.P. de kores");
			return false;
		} 
		if (this.cstamping == null || isNaN(this.cstamping)) {
			alert("Por favor, ingresar cold stamping");
			return false;
		} 
		if (this.relam == null || isNaN(this.relam)) {
			alert("Por favor, ingresar relam delam");
			return false;
		} 
		if (this.mate == null || isNaN(this.mate)) {
			alert("Por favor, ingresar costo laminado mate");
			return false;
		} 
		if (this.troquel == null || isNaN(this.troquel)) {
			alert("Por favor, ingresar P.V.P. troquel");
			return false;
		} 
		if (this.brillante == null || isNaN(this.brillante)) {
			alert("Por favor, ingresar costo laminado brillante");
			return false;
		} 
		if (this.horas == null || isNaN(this.horas)) {
			alert("Por favor, ingresar horas de producción");
			return false;
		} 
		if (this.combustible == null || isNaN(this.combustible)) {
			alert("Por favor, ingresar transporte combustible");
			return false;
		} 
		if ((this.gap_de_extremos == null || isNaN(this.gap_de_extremos)) && this.cyrel ) {
			alert("Por favor, ingresar gap de extremos de Cyrel");
			return false;
		}else{
			this.gap_de_extremos = 0
		}
		if ((this.costo == null || isNaN(this.costo)) && this.cyrel) {
			alert("Por favor, ingresar costo cm2");
			return false;
		}else{
			this.costo = 0
		} 
		if ((this.cantidad == null || isNaN(this.cantidad)) && this.cyrel) {
			alert("Por favor, ingresar cantidad de Cyreles");
			return false;
		}else{
			this.cantidad = 0
		}
		if (this.costomp == null || isNaN(this.costomp)) {
			alert("Por favor, ingresar costo unitario mp");
			return false;
		}
		if (this.utilidad == null || isNaN(this.utilidad)) {
			alert("Por favor, ingresar porcentaje de utilidad");
			return false;
		}
		if (this.codart == null) {
			alert("Por favor, seleccionar un articulo");
			return false;
		}
		return true
	}

	calcular_cotizacion() {
		let datos = {
			codemp: this.empresa,
			cortador: this.cortador,
			cantidad_requerida: this.cantidad_requerida,
			num: this.num,
			alto: this.alto,
			ancho: this.ancho,
			gap_avance: this.gap_avance,
			gap_columnas: this.gap_columnas,
			gap_extremos: this.gap_extremos,
			filas: this.filas,
			nBobinas: this.nBobinas,
			cRollos: this.cRollos,
			impresion: this.impresion,
			kores: this.kores,
			cstamping: this.cstamping,
			relam: this.relam,
			mate: this.mate,
			troquel: this.troquel,
			brillante: this.brillante,
			horas: this.horas,
			combustible: this.combustible,
			gap_de_extremos: this.gap_de_extremos,
			costo: this.costo,
			cantidad: this.cantidad,
			costomp: this.costomp,
			utilidad: this.utilidad
		  };
  
		  this.srv.calcular_cotizacion(datos).subscribe(
			data=>{
				this.datos = data
				console.log(this.datos)
				this.bandera = true;
			}
		)	
	}

   	generar_cotizacion() {
	   if (this.validar_datos()){
		this.calcular_cotizacion()
		this.jstoday = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '-0500');
			let datos = {
				codemp: this.empresa,
				codart: this.codart,
				fecha: this.jstoday,
				cortador: this.cortador,
				cantidad_requerida: this.cantidad_requerida,
				cilindro: this.cilindro,
				si: this.s_i,
				color: this.color,
				num: this.num,
				alto: this.alto,
				ancho: this.ancho,
				gap_avance: this.gap_avance,
				gap_columnas: this.gap_columnas,
				gap_extremos: this.gap_extremos,
				filas: this.filas,
				tipoSeleccionado: this.tipoSeleccionado,
				nBobinas: this.nBobinas,
				cRollos: this.cRollos,
				impresion: this.impresion,
				kores: this.kores,
				cstamping: this.cstamping,
				relam: this.relam,
				mate: this.mate,
				troquel: this.troquel,
				brillante: this.brillante,
				horas: this.horas,
				combustible: this.combustible,
				cyrel: this.cyrel,
				gap_de_extremos: this.gap_de_extremos,
				costo: this.costo,
				cantidad: this.cantidad,
				costomp: this.costomp,
				putilidad: this.utilidad
		  	};
	  
		  	this.srv.generar_cotizacion(datos).subscribe(
				data=>{
					this.estado = data['status']
					console.log(this.estado)
					this.reset()
					alert('Cotización generada con éxito')
				}
			)
   		}else{
			alert("Por favor llene todos los campos")
		}
	}//FIN GENERA ING PRODUCTOS
	
	actualizar_cotizacion() {
		if (this.validar_datos_actualizar()){
			this.calcular_cotizacion()
		 	this.jstoday = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '-0500');
			 let datos = {
				 codCot: this.codCot,
				 codemp: this.empresa,
				 codart: this.codart,
				 fecha: this.jstoday,
				 cortador: this.cortador,
				 cantidad_requerida: this.cantidad_requerida,
				 cilindro: this.cilindro,
				 si: this.s_i,
				 color: this.color,
				 num: this.num,
				 alto: this.alto,
				 ancho: this.ancho,
				 gap_avance: this.gap_avance,
				 gap_columnas: this.gap_columnas,
				 gap_extremos: this.gap_extremos,
				 filas: this.filas,
				 tipoSeleccionado: this.tipoSeleccionado,
				 nBobinas: this.nBobinas,
				 cRollos: this.cRollos,
				 impresion: this.impresion,
				 kores: this.kores,
				 cstamping: this.cstamping,
				 relam: this.relam,
				 mate: this.mate,
				 troquel: this.troquel,
				 brillante: this.brillante,
				 horas: this.horas,
				 combustible: this.combustible,
				 cyrel: this.cyrel,
				 gap_de_extremos: this.gap_de_extremos,
				 costo: this.costo,
				 cantidad: this.cantidad,
				 costomp: this.costomp,
				 putilidad: this.utilidad
			   };
	   
			   this.srv.actualizar_cotizacion(datos).subscribe(
				 data=>{
					 this.estado = data['status']
					 console.log(this.estado)
					 this.reset()
					 alert('Cotización actualizada con éxito')
				 }
		   )
 
			}else{
			 alert("Por favor llene todos los campos")
		 }
	 }//FIN GENERA ING PRODUCTOS
	 
	
	reset() {
		this.cortador = null
		this.cantidad_requerida = null
		this.cilindro = null
		this.s_i = false
		this.color = false
		this.num = null
		this.alto = null
		this.ancho = null
		this.gap_avance = null
		this.gap_columnas = null
		this.gap_extremos = null
		this.filas = null
		this.tipoSeleccionado = null
		this.nBobinas = null
		this.cRollos = null
		this.impresion = null
		this.kores = null
		this.cstamping = null
		this.relam = null
		this.mate = null
		this.troquel = null
		this.brillante = null
		this.horas = null
		this.combustible = null
		this.cyrel = false
		this.gap_de_extremos = null
		this.costo = null
		this.cantidad = null
		this.costomp = null
		this.utilidad = null
		this.codart = null
	}

	ver_detalle(){
		if (this.validar_datos()){
			this.calcular_cotizacion()
			this.currentSection = 'datos';
			this.bandera = true;
			const element = document.querySelector('.datos');
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}else{
			alert("Por favor llene todos los campos")
		}	
	}
  
}
