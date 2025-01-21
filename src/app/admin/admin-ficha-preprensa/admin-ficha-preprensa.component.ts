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
  selector: 'app-admin-ficha-preprensa',
  templateUrl: './admin-ficha-preprensa.component.html',
  styleUrls: ['./admin-ficha-preprensa.component.css']
})



	

export class AdminFichaPreprensaComponent implements OnInit {
	
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
	src = "../../assets/idfichaimg_articulos/subir-imagen.png"
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
	vendedor : string = 'VENDEDOR GENERAL'

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
	idficha
	accion_actualizar = false
	almacenes_lista
	almacen
	
	// INGENIERIA PRODUCTO
	nombre_comercial: string;
	contacto: string = null;
	producto: string = null;
	buffer: string = null;
	proveedor: string = null;
	enviado_por: string = null;
	nombre_vendedor: string = null;
	nombre_etiqueta: string = null; 
	orden_venta: string = null;
	enviado_a: string = null;

	
	mat_prima1: string = null;
	mat_prima2: string = null;
	maquina: string = null;
	ancho: number  = null;
	troquel: string = null;
	no_cilindro: number = null;
	gap_ancho: number = null;
	rep_ancho: number = null;
	avance :number = null;
	desarrollo_cilindro: number = null;
	gap_avance: number = null;

	//binarios
	uv_total: boolean; 
	uv_sobre_impr: boolean;
	uv_select: boolean;
	relam_delam: boolean;
	hot_stamping: boolean;
	cold_foil: boolean;
	repujado_ing_prod: boolean;
	lami_mate: boolean;
	laminado_brillan: boolean;
	primario_C: boolean;
	primario_M: boolean;
	primario_Y: boolean;
	primario_K: boolean;
	//fin binarios

	rep_avance: number = null;
	tipo: string = null;
	forma: string = null;
	tipo_impresion_ex: string = 'EXTERIOR';
	muestra:string = 'NO';
	corte_seg: string = null;
	layflat: number = null;
	ancho_rollo: number = null;

	
	//SECCION NUMERO
	anilox_vM: number = null;
	anilox_vY: number = null;
	anilox_vK: number = null;
	anilox_1: number = null;
	anilox_2: number = null;
	anilox_3: number = null;
	anilox_4: number = null;
	anilox_5: number = null;
	anilox_6: number = null;
	anilox_7: number = null ;


	existe_cliche: string='SI'; 
	etiq_fila_cliente: string = null;
	etiq_fila_produccion: string = null;
	tipo_tinta: string = null;
	tipo_corte: string = null;
	acabado1: string = null;
	acabado2: string = null;
	acabado3: string = null;
	acabado4: string = null;
	observacion: string = null;
	

	//SECCION SIN USO

	tinta_sticky_vC: string = null;
	tinta_sticky_vM: string = null;
	tinta_sticky_vY: string = null;
	tinta_sticky_vK: string = null;
	tinta_sticky_1: string = null;
	tinta_sticky_2: string = null;
	tinta_sticky_3: string = null;
	tinta_sticky_4: string = null;
	tinta_sticky_5: string = null;
	tinta_sticky_6: string = null;
	tinta_sticky_7: string = null;


	diametro_rollo: number = null;
	peso_rollo: number = null;
	medida_dispensado: number = null;
	taca: string;
	//SECCION SIN USO
	embon_ext: string = 'NO APLICA';
	embon_int: string = 'NO APLICA';
	
	//VARIABLES PARA CARGAR LA IMAGEN
	loading
	nombre_archivo
	progress
	subida_exitosa
	imageFile
	uploadedFiles
	localUrl
	sizeOfOriginalImage
	loading_subida
	img_etiqueta
	imgResultAfterCompress
 	sizeOFCompressedImage
 	localCompressedURl
	formData:any

	///////////7
	requiere_cliche: string = 'NO';
	solicitado_por: string = null;
	autorizado_por: string = null;
	jefe_prod: string;

    tiptra
	// getConfCambioVendedorPed()
	
	public color_lista = [
		{"color_ls": "1", "nom_doc": "1"},
		{"color_ls": "2", "nom_doc": "2"},
		{"color_ls": "3", "nom_doc": "3"},
		{"color_ls": "4", "nom_doc": "4"},
		{"color_ls": "5", "nom_doc": "5"},
		{"color_ls": "6", "nom_doc": "6"},
		{"color_ls": "7", "nom_doc": "7"}
	];

	public impresion_ex_lista = [
		{"tipo_impresion_ex": "EXTERIOR"},
		{"tipo_impresion_ex": "INTERIOR"}
	];
	public lista_si_no = [
		{"valor": "SI"},
		{"valor": "NO"}
	];

	
	
	public formato_etiqueta = [
		{"tipo_etiqueta": "Rectangular", "nom_doc": "RECTANGULAR"},
		{"tipo_etiqueta": "Cuadrado", "nom_doc": "CUADRADO"},
		{"tipo_etiqueta": "Circular", "nom_doc": "CIRCULAR"},
		{"tipo_etiqueta": "Especial", "nom_doc": "ESPECIAL"},
		{"tipo_etiqueta": "Otros", "nom_doc": "OTROS"}
	];
	
	public h_w_lista = [
		{"hw_lista": "H", "nom_doc": "H"},
		{"hw_lista": "W", "nom_doc": "W"}
	];

	public tinta_sticky_lista = [
		{"ts_lista": "Sin/Bl", "nom_doc": "Sin/Bl"},
		{"ts_lista": "Sin/Be", "nom_doc": "Sin/Be"},
		{"ts_lista": "Sin/Am", "nom_doc": "Sin/Am"},
		{"ts_lista": "Act/Bl", "nom_doc": "Act/Bl"},
		{"ts_lista": "Act/Be", "nom_doc": "Act/Be"},
		{"ts_lista": "Act/Am", "nom_doc": "Act/Am"},
		{"ts_lista": "Naz/Bl", "nom_doc": "Naz/Bl"},
		{"ts_lista": "Naz/Be", "nom_doc": "Naz/Be"},
		{"ts_lista": "Naz/Am", "nom_doc": "Naz/Am"}
	];

	public emboext_lista = [
		{"emboext_ls": "NO APLICA", "nom_doc": "NO APLICA"},
		{"emboext_ls": "R1", "nom_doc": "R1"},
		{"emboext_ls": "R2", "nom_doc": "R2"},
		{"emboext_ls": "R3", "nom_doc": "R3"},
		{"emboext_ls": "R4", "nom_doc": "R4"},
		{"emboext_ls": "R5", "nom_doc": "R5"},
		{"emboext_ls": "R6", "nom_doc": "R6"},
		{"emboext_ls": "R7", "nom_doc": "R7"},
		{"emboext_ls": "R8", "nom_doc": "R8"}
		
	];

	public emboint_lista = [
		{"emboint_ls": "NO APLICA", "nom_doc": "NO APLICA"},
		{"emboint_ls": "R101", "nom_doc": "R101"},
		{"emboint_ls": "R102", "nom_doc": "R102"},
		{"emboint_ls": "R103", "nom_doc": "R103"},
		{"emboint_ls": "R104", "nom_doc": "R104"},
		{"emboint_ls": "R105", "nom_doc": "R105"},
		{"emboint_ls": "R106", "nom_doc": "R106"},
		{"emboint_ls": "R107", "nom_doc": "R107"}
	];


  tipo_doc
  //tipo_impresion_ex:string = 'EXTERIOR'
 // muestra:string = 'NO'
  //existe_cliche:string='SI'

  constructor(
  private router: Router, 
  private srv: ApiService, 
  private route: ActivatedRoute,
  private imageCompress: NgxImageCompressService
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
 

     this.subtotal = this.articulos_pedido.reduce((acc,obj,) => acc + (obj.prec01 * obj.cant),0);
    console.log("Subtotal: ", this.subtotal)
	
		  
	this.route.params.subscribe(val => {
		if (!this.srv.isLoggedIn()){
		this.router.navigateByUrl('/')};
		
		this.route.queryParams.subscribe(params => {
			console.log(params)
			// Defaults to 0 if no query param provided.
			// this.ruc = +params['ruc'] || 0;
			this.usuario = params['usuario'] || this.route.snapshot.paramMap.get('usuario') || 0;
			this.empresa = params['empresa'] || this.route.snapshot.paramMap.get('empresa') || 0;
			this.idficha = params['idficha'] || this.route.snapshot.paramMap.get('idficha') || 0;
			
			console.log("LUEGO DE ENTRADA")
		if (this.idficha == 0){
			this.idficha = undefined
			this.accion_actualizar = false
			window.scrollTo(0,0);
			this.ingProducto_nuevo()
		}else {
			window.scrollTo(0,0);
			this.accion_actualizar = true
			this.reload_ingProducto()
			
		}
			
		  });
		
		console.log(this.usuario)
		console.log(this.empresa)
		console.log(this.idficha)
		
		
		
		

	   }
	); //FIN ROUTING
  } //FIN COSNTRUCTOR
  

   ngOnInit() {
	   

	AdminLTE.init();
	
	}

/* 	vendedores_ficha_tecnica */
	
	//BUSQUEDA DE CLIENTE
	busqueda_razon_social() { 
		if (this.patron_cliente){
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

	select_razon_social(ident,ruc,rz,correo,codcli,dircli) {
		console.log ("Seleccion de cliente")
	   
	   this.dato_cliente= {"nomcli":rz,"rucced":ruc,"email":correo,"codcli":codcli,"dircli":dircli}
		// ['codemp', 'nomcli','rucced','codcli','email','dircli','ciucli','telcli','telcli2']
	   this.tipo_doc = ident 
	   this.ruc = ruc
	   this.razon_social = rz
	   this.email_cliente = correo
	   this.clientes = true;
	   this.exist_razon_social = false;
	   this.patron_cliente = undefined;
	}
	
	// ######## ING. DE PRODUCTO NUEVO   ##########
	public ingProducto_nuevo(){
		// this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '-0500');
		this.jstoday = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '-0500');
		// this.fectra = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '-0500');
		console.log (this.jstoday)
		console.log (this.fectra)

		console.log (this.today)
		console.log (this.fecha_entrega)
		
		this.reset()
		
		
	////PARA BUSCAR IVA Y SETEAR IVA DEFECTO
		this.srv.iva().subscribe(data => {
			console.log ("**** IVA DE SIACI ***")
			console.log (data)
		  this.iva_siaci = data;
		  
		    let iva_defecto 
			this.iva_siaci.map(function(dato){
			if(dato.codiva == 'S'){
				console.log("SETEANDO IVA DEFECTO")
				iva_defecto = dato.poriva;
				}
			return dato;
			});
		
		console.log(iva_defecto)
		this.iva_porcentaje = iva_defecto
		});
		


		
	////PARA RESPONSABLES FIRMAS
		const datos = {};
		datos['codemp'] = this.empresa;
		datos['usuario'] = this.usuario;
		datos['codagencia'] = this.srv.getCodAgencia();
		console.log (datos)
			
		this.srv.impreso(datos).subscribe(
		   data => {
			   console.log("OBTENIENDO RESPONSABLE IMPRESION")
			   console.log(data)
			   let option_defecto_final = {"codus": "01", "usuario": "*** OTRO RESPONSABLE IMPRESION ***"};
			   this.impresor_lista = data
			   this.impresor_lista.push(option_defecto_final)
			   console.log("RESPONSABLE IMPRESION LISTA")
			   console.log(this.impresor_lista)
			});

	////PARA LISTAR LOS VENDEDORES 
	this.srv.vendedores_ficha_tecnica(datos).subscribe(data => {
		console.log ("**** VENDEDORES SIACI***")
		console.log (data)
		this.vendedores_lista = data


	});
			
/* 		this.srv.supervisor(datos).subscribe(
			data => {
				console.log("OBTENIENDO SUPERVISOR")
				console.log(data)
				let option_defecto_final = {"codus": "01", "usuario": "*** OTRO SUPERVISOR ***"};
				this.supervisor_lista = data
				this.supervisor_lista.push(option_defecto_final)
				console.log("SUPERVISOR LISTA")
				console.log(this.supervisor_lista)
			}); */
			
/* 			this.srv.jefe_produccion(datos).subscribe(
				data => {
					console.log("OBTENIENDO PRODUCCION")
					console.log(data)
					let option_defecto_final = {"codus": "01", "usuario": "*** OTRA PRODUCCION ***"};
					this.jefe_produccion_lista = data
					this.jefe_produccion_lista.push(option_defecto_final) 
					console.log("PRODUCCION LISTA")
					console.log(this.jefe_produccion_lista)
				}); */
	   this.tiptra = '1'

		
		// console.log("#####  IVA DEFECTO   #####")
		// console.log(this.iva_porcentaje)
		console.log ("#### CONFIGURACION CORREO PEDIDOS ####")
		console.log (this.srv.getConfCorreoPedCli())
			
	}
	
	
	// ########RECARGA ING. DE PRODUCTO   ##########
	public reload_ingProducto(){
		// this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '-0500');
		this.jstoday = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '-0500');
		
		const datos = {};
		datos['codemp'] = this.empresa;
		datos['usuario'] = this.usuario;
		console.log (datos)

		this.srv.impreso(datos).subscribe(
			data => {
				console.log("OBTENIENDO RESPONSABLE IMPRESION")
				console.log(data)
				let option_defecto_final = {"codus": "01", "usuario": "*** OTRO RESPONSABLE IMPRESION ***"};
				this.impresor_lista = data
				this.impresor_lista.push(option_defecto_final)
				console.log("RESPONSABLE IMPRESION LISTA")
				console.log(this.impresor_lista)
			 });

		////PARA LISTAR LOS VENDEDORES 
		this.srv.vendedores_ficha_tecnica(datos).subscribe(data => {
			console.log ("**** VENDEDORES SIACI***")
			console.log (data)
			this.vendedores_lista = data


		});


/* 		this.srv.supervisor(datos).subscribe(
			data => {
				console.log("OBTENIENDO SUPERVISOR")
				console.log(data)
				let option_defecto_final = {"codus": "01", "usuario": "*** OTRO SUPERVISOR ***"};
				this.supervisor_lista = data
				this.supervisor_lista.push(option_defecto_final)
				console.log("SUPERVISOR LISTA")
				console.log(this.supervisor_lista)
			});
			
			this.srv.jefe_produccion(datos).subscribe(
				data => {
					console.log("OBTENIENDO PRODUCCION")
					console.log(data)
					let option_defecto_final = {"codus": "01", "usuario": "*** OTRA PRODUCCION ***"};
					this.jefe_produccion_lista = data
					this.jefe_produccion_lista.push(option_defecto_final) 
					console.log("PRODUCCION LISTA")
					console.log(this.jefe_produccion_lista)
				}); */

		this.buscar_ficha_tecnica_preprensa();
	}

	
	buscar_ficha_tecnica_preprensa() {
	const datos = {};
	datos['codemp'] = this.empresa;	
	datos['usuario'] = this.usuario;
	datos['idficha'] = this.idficha;
	
	
	this.srv.get_ficha_tecnica_preprensa(datos).subscribe(data => {
		console.log(data)
		console.log ("EJECUTADA DATA CONSULTA ING_PROD")
		
		 // usuario = data['num_pedido']
		this.clientes = true;

		// this.fectra = data['fectra']
		let fecha = new Date(data['fecha'])
		//PARA COLOCAR LA FECHA CORRECTA Y NO LA FECHA -1
		fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())
		console.log("***** FECHA DE BASE DE DATOS CORREGIDA *****")
		console.log(fecha)
		
		this.fectra = new FormControl(fecha);
		// this.fectra_msg = formatDate(this.fectra['value'], 'yyyy-MM-dd', 'en-US', '-0500')

		console.log (data['fecIngProd'])
		
		// this.fectra = new Date(data['fectra'])
		
		// this.fecult = data['fecult']
		this.razon_social = data['razon_social']
		this.ruc = data['ruc']
	//	this.nombre_comercial= data['nombre_comercial']
		this.contacto = data['contacto']
		this.producto= data['producto']
		this.buffer = data['buffer']
		this.proveedor = data['proveedor']
		this.enviado_por = data['enviado_por']
		this.nombre_etiqueta = data['nombre_etiqueta']
		this.orden_venta = data['orden_venta']
		this.enviado_a = data['enviado_a']

		this.mat_prima1 = data['mat_prima1']
		this.mat_prima2 = data['mat_prima2']
		this.maquina = data['maquina']
		this.ancho = data['ancho']
		this.no_cilindro = data['no_cilindro']
		this.gap_ancho = data['gap_ancho']
		this.avance = data['avance']
		this.desarrollo_cilindro = data['desarrollo_cilindro']
		this.gap_avance = data['gap_avance']

		
		///// fin candidato binarios
		this.rep_avance = data['rep_avance']
		this.tipo = data['tipo']
		this.forma = data['forma']
		this.tipo_impresion_ex = data['tipo_impresion_ex']
		this.muestra = data['muestra']
		this.corte_seg = data['corte_seg']
		this.layflat = data['layflat']

		this.ancho_rollo = data['ancho_rollo'] === 0 ? '' : data['ancho_rollo'];
		
			
		this.existe_cliche = data['existe_cliche']
		this.etiq_fila_cliente = data['etiq_fila_cliente']
		this.etiq_fila_produccion = data['etiq_fila_produccion']
		this.tipo_tinta = data['tipo_tinta']
		this.tipo_corte = data['tipo_corte']
		this.acabado1 = data['acabado1']
		this.acabado2 = data['acabado2']
		this.acabado3 = data['acabado3']
		this.acabado4 = data['acabado4']
		this.observacion = data['observacion']
		this.troquel = data['troquel']
		this.embon_ext = data['embon_ext']
		this.embon_int = data['embon_int'];
		this.vendedor = data['vendedor'];
		this.rep_ancho = data['rep_ancho']
		
		

		this.requiere_cliche = data['requiere_cliche']
		this.solicitado_por = data['solicitado_por']
		this.autorizado_por = data['autorizado_por']
		this.jefe_prod = data['jefe_prod']

		this.dato_cliente= {"nomcli":this.razon_social,"idficha":this.idficha}
	//	console.log ("****** DATO CLIENTE *******")
	//	console.log (this.dato_cliente)
 
		});

	}//  FIN BUSCAR ING. DE PRODUCTO


	reset_valores_inferiores(valor){
		console.log ("###### RESET VALORES #####")
		console.log (valor)
		console.log (this.rep_avance)


/* 		rep_avance: string = null;
	tipo: string = null;
	forma: string = null;
	tipo_impresion_ex: string = null;
	muestra: string = null;
	corte_seg: string = null;
	layflat: string = null;

	ancho_rollo: number = null;
	anilox_vM: number = null;
	anilox_vY: number = null;
	anilox_vK: number = null;
	anilox_1: number = null;
	anilox_2: number = null;
	anilox_3: number = null;
	anilox_4: number = null;
	anilox_5: number = null;
	anilox_6: number = null;
	anilox_7: number = null ;
	existe_cliche: string = null;
	etiq_fila_cliente: string = null;
	etiq_fila_produccion: string = null;
	tipo_tinta: string = null;
	tipo_corte: string = null;
	acabado1: string = null;
	acabado2: string = null;
	acabado3: string = null;
	acabado4: string = null;
	observacion: string = null;
	rep_ancho: string = null;
	tinta_sticky_vC: string = null;
	tinta_sticky_vM: string = null;
	tinta_sticky_vY: string = null;
	tinta_sticky_vK: string = null;
	tinta_sticky_1: string = null;
	tinta_sticky_2: string = null;
	tinta_sticky_3: string = null;
	tinta_sticky_4: string = null;
	tinta_sticky_5: string = null;
	tinta_sticky_6: string = null;
	tinta_sticky_7: string = null;
 */
	/*	if (!this.primario_C && valor=='primario_C'){
			this.ancho_rollo = null
			this.existe_cliche = null
			this.tinta_sticky_vC = null
		}
		if (!this.primario_M && valor=='primario_M'){
			this.anilox_vM = null
			this.etiq_fila_cliente = null
			this.tinta_sticky_vM = null
		}
		if (!this.primario_Y && valor=='primario_Y'){
			this.anilox_vY = null
			this.etiq_fila_produccion = null
			this.tinta_sticky_vY = null
		}
		if (!this.primario_K && valor=='primario_K'){
			this.anilox_vK = null
			this.tipo_tinta = null
			this.tinta_sticky_vK = null
		}*/
	}
	
	formato_fecha (fecha){
		return formatDate(fecha, 'dd-MM-yyyy', 'en-US', '-0500')
	}

	tipo_entrada() {
		console.log("tipo de entrada...!!!")
		console.log(this.tipo_busqueda)
		if (this.tipo_busqueda == false){
			this.tipo_busqueda = true;
		}else {
			this.tipo_busqueda = false;
		}
		console.log("tipo de entrada luego del cambio...!!!")
		console.log(this.tipo_busqueda)
	}

	fileChange(element) {
		this.loading = true
		this.subida_exitosa = false
		this.uploadedFiles = element.target.files;
		
		console.log ("ARCHIVO CARGADO")
		console.log (this.uploadedFiles)

		this.nombre_archivo = this.uploadedFiles[0].name
		var reader = new FileReader();
		console.log ("ARCHIVO COMPRESION")

		reader.onload = (element: any) => {
				this.localUrl = element.target.result;


				this.compressFile(this.localUrl,this.nombre_archivo)
		};

		console.log (element.target.files[0])
		// this.uploadedFiles = element.target.files[0];
		reader.readAsDataURL(element.target.files[0]);

	}

	compressFile(image,fileName) {
		console.log ("INICIO COMPRIMIR ARCHIVO")
		console.log (image)
		console.log (fileName)

		var orientation = -1;
		this.sizeOfOriginalImage = this.imageCompress.byteCount(image)/(1024*1024);
		console.warn('Size in bytes is now:',  this.sizeOfOriginalImage);

		this.imageCompress.compressFile(image, orientation, 50, 50).then(
			result => {
				this.imgResultAfterCompress = result;
				this.localCompressedURl = result;
				this.sizeOFCompressedImage = this.imageCompress.byteCount(result)/(1024*1024)
				console.warn('Size in bytes after compression:',  this.sizeOFCompressedImage);// create file from byte

				const imageName = fileName;
				console.log (result)
				// call method that creates a blob from dataUri
				const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
				//imageFile created below is the new compressed file which can be send to API in form data
				// const imageFile = new File([result], imageName, { type: 'image/jpeg' });
				this.imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
				console.log ("imageFile")
				console.log (this.imageFile)
				this.uploadedFiles = this.imageFile
				this.loading = false
					}
		).catch(error => {
        	console.error("Error durante la compresión:", error);
        	this.loading = false; // Asegúrate de finalizar el estado de carga en caso de error
    	});

	}

	dataURItoBlob(dataURI) {
		const byteString = window.atob(dataURI);
		const arrayBuffer = new ArrayBuffer(byteString.length);
		const int8Array = new Uint8Array(arrayBuffer);for (let i = 0; i < byteString.length; i++) {
		int8Array[i] = byteString.charCodeAt(i);
		}const blob = new Blob([int8Array], { type: 'image/jpeg' });
		return blob;
	}

	upload() {
		console.log ("##### UPLOAD #######")
		console.log (this.uploadedFiles)
		console.log (this.nombre_archivo)
		
		this.subida_exitosa = false
		this.formData = new FormData();
		
		this.formData.append("uploads", this.uploadedFiles, this.nombre_archivo);
		// this.formData.append("dir",this.empresa+"_"+this.numtra);
		this.formData.append("codemp",this.empresa);
		this.formData.append("idficha",this.idficha);
		
		console.log ("##### COD ING PRODUCTO #######")
		console.log(this.idficha);
		this.loading = true

		
		console.log ("#### FORMDATA  #####")
		console.log (this.formData)
		// this.progress = 10
		let loading_subida = false

		this.srv.upload_imagen_ing_producto(this.formData).subscribe(
		(event: HttpEvent<any>) => {
			switch (event.type) {
			case HttpEventType.Sent:
				console.log('Request has been made!');
				break;
			case HttpEventType.ResponseHeader:
				console.log('Response header has been received!');
				break;
			case HttpEventType.UploadProgress:
				this.progress = Math.round(event.loaded / event.total * 100);
				console.log(`Uploaded! ${this.progress}%`);
				break;
			case HttpEventType.Response:
				console.log('Archivo subido con exito!!!!', event.body);
					// this.lista_imagenes();
					loading_subida = true;
					
					
					
				setTimeout(() => {
				this.progress = 0;
				this.subida_exitosa = true
				this.imageFile = false
				this.nombre_archivo = 'Seleccione archivo'
				this.loading = false

				}, 1500);


			}
		});
		console.log ("#### RETORNO  #####") 
		return true
		
	}

	//VALIDADOR DA DATOS AL CREAR
	validar_datos() {
		console.log ("### VALIDAR DATOS ###")
		
		if(!this.razon_social){
			alert("Por favor, ingresar la razón social de la Empresa.")
			return false
		}
		else if(!this.ruc){
			alert("Por favor, ingresar el ruc.")
			return false
		}

		//else if(!this.nombre_comercial){
		//	alert("Por favor, ingresar el nombre comercial.")
		//	return false;
		//}
/* 		else if(!this.contacto){
			alert("Por favor, ingresar la contacto.")
			return false;
		} */
		else if(!this.producto){
			alert("Por favor, ingresar el PRODUCTO.")
			return false;
		}
/* 		else if(!this.buffer){
			alert("Por favor, ingresar la medida de ancho.")
			return false;
		} */
/* 		else if(!this.proveedor){
			alert("Por favor, ingresar el proveedor.")
			return false;
		} */
/* 		else if(!this.enviado_por){
			alert("Por favor, ingresar la enviado_por.")
			return false;
		} */
/* 		else if(!this.orden_venta){
			alert("Por favor, ingresar el material a imprmir.")
			return false;
		} */
/* 		else if(!this.enviado_a){
			alert("Por favor, ingresar el ancho del material.")
			return false;
		} */
		else if(!this.vendedor){
			alert("Por favor, ingresar el VENDEDOR.")
			return false;
		}
 		else if(!this.mat_prima1){
			alert("Por favor, ingresar el MATERIA PRIMA 1")
			return false;
		}
/* 		else if(!this.mat_prima2){
			alert("Por favor, ingresar el mat_prima2.")
			return false;
		}
		else if(!this.maquina){
			alert("Por favor, ingresar el color seleccionado.")
			return false;
		} */
		else if(!this.ancho){
			alert("Por favor, ingresar el ANCHO")
			return false;
		}
		else if(!this.gap_ancho || this.gap_ancho == 0){
			alert("Por favor, ingresar las GAP ANCHO")
			return false;
		}
		else if(!this.avance){
			alert("Por favor, ingresar el AVANCE")
			return false;
		}
		else if(!this.rep_ancho){
			alert("Por favor, ingresar REP ANCHO")
			return false;
		}
/* 		else if(!this.desarrollo_cilindro){
			alert("Por favor, ingresar el codigo del cilindro.")
			return false;
		} */
/* 		else if(!this.gap_avance){
			alert("Por favor, ingresar el codigo del troquel.")
			return false;
		} */
		
		
	/* 	else if(!this.rep_avance){
			alert("Por favor, ingresar el Pantone 1.")
			return false;
		}
		else if(!this.tipo){
			alert("Por favor, ingresar el Pantone 2.")
			return false;
		}
		else if(!this.forma){
			alert("Por favor, ingresar el Pantone 3.")
			return false;
		}
		else if(!this.tipo_impresion_ex){
			alert("Por favor, ingresar el Pantone 4.")
			return false;
		}
		else if(!this.muestra){
			alert("Por favor, ingresar el Pantone 5.")
			return false;
		}
		else if(!this.corte_seg){
			alert("Por favor, ingresar el Pantone 6.")
			return false;
		}
		else if(!this.layflat){
			alert("Por favor, ingresar el Pantone 7.")
			return false;
		}
		
		else if(!this.anilox_1 || this.anilox_1 == 0){
			alert("Por favor, ingresar el anilox 1.")
			return false;
		}
		else if(!this.anilox_2 || this.anilox_2 == 0){
			alert("Por favor, ingresar el anilox 2.")
			return false;
		}
		else if(!this.anilox_3 || this.anilox_3 == 0){
			alert("Por favor, ingresar el anilox 3.")
			return false;
		}
		else if(!this.anilox_4 || this.anilox_4 == 0){
			alert("Por favor, ingresar el anilox 4.")
			return false;
		}
		else if(!this.anilox_5 || this.anilox_5 == 0){
			alert("Por favor, ingresar el anilox 5.")
			return false;
		}
		else if(!this.anilox_6 || this.anilox_6 == 0){
			alert("Por favor, ingresar el anilox 6.")
			return false;
		}
		else if(!this.anilox_7 || this.anilox_7 == 0){
			alert("Por favor, ingresar el anilox 7.")
			return false;
		}
		
		else if(!this.tipo_corte){
			alert("Por favor, ingresar el fabricante 1.")
			return false;
		}
		else if(!this.acabado1){
			alert("Por favor, ingresar el fabricante 2.")
			return false;
		}
		else if(!this.acabado2){
			alert("Por favor, ingresar el fabricante 3.")
			return false;
		}
		else if(!this.acabado3){
			alert("Por favor, ingresar el fabricante 4.")
			return false;
		}
		else if(!this.acabado4){
			alert("Por favor, ingresar el fabricante 5.")
			return false;
		}
		else if(!this.observacion){
			alert("Por favor, ingresar el fabricante 6.")
			return false;
		}
/* 		else if(!this.troquel){
			alert("Por favor, seleccionar el tipo de dispensado.")
			return false;
		} */
/* 		else if(!this.diametro_rollo || this.diametro_rollo == 0){
			alert("Por favor, ingresar el  diametro del rollo.")
			return false;
		} */
/* 		else if(!this.peso_rollo || this.peso_rollo == 0){
			alert("Por favor, ingresar el peso del rollo.")
			return false;
		} */
/* 		else if(!this.medida_dispensado || this.medida_dispensado == 0){
			alert("Por favor, ingresar la medida del dispensado.")
			return false;
		} */
/* 		else if(!this.taca){
			alert("Por favor, seleccionar Taca.")
			return false;
		} */
		else if(this.embon_ext == 'NO APLICA' && this.embon_int == 'NO APLICA'){
			alert("Por favor, ingresar algún tipo de Embobinado")
			return false;
		}
		else if(this.embon_ext != 'NO APLICA' && this.embon_int != 'NO APLICA'){
			alert("Por favor, Solo debe seleccionar un tipo de Embobinado")
			return false;
		}
		//COMPROBACION DE LA IMAGEN
/* 		else if (!this.localCompressedURl && !this.localUrl) {
			alert("Por favor, seleccione una imagen.");
			return false;
		} */
		///
/* 		else if(!this.requiere_cliche){
			alert("Por favor, ingrese un ejecutivo de ventas.");
			return false;
		} */
		else if(!this.solicitado_por){
			alert("Por favor, seleccione SELECCIONADO POR");
			return false;
		}
		else if(!this.autorizado_por){
			alert("Por favor, seleccione AUTORIZADO POR");
			return false;
		}
/* 		else if(!this.jefe_prod){
			alert("Por favor, seleccione un jefe de producción.");
			return false;
		} */

		return true
	}

	//VALIDAR DATOS AL ACTUALIZAR
	validar_datos_actualizar() {
		console.log ("### VALIDAR DATOS ###")
		
		if(!this.razon_social){
			alert("Por favor, ingresar la razón social de la Empresa.")
			return false
		}
		else if(!this.ruc){
			alert("Por favor, ingresar el ruc.")
			return false
		}

		//else if(!this.nombre_comercial){
		//	alert("Por favor, ingresar el nombre comercial.")
		//	return false;
		//}
		else if(!this.contacto){
			alert("Por favor, ingresar la contacto.")
			return false;
		}
		else if(!this.producto){
			alert("Por favor, ingresar la medida de alto.")
			return false;
		}
		else if(!this.buffer){
			alert("Por favor, ingresar la medida de ancho.")
			return false;
		}
		else if(!this.proveedor){
			alert("Por favor, ingresar el proveedor.")
			return false;
		}
		else if(!this.enviado_por){
			alert("Por favor, ingresar la enviado_por.")
			return false;
		}
/* 		else if(!this.nombre_etiqueta){
			alert("Por favor, ingresar la nombre_etiqueta.")
			return false;
		} */
		else if(!this.orden_venta){
			alert("Por favor, ingresar el material a imprmir.")
			return false;
		}
		else if(!this.enviado_a){
			alert("Por favor, ingresar el ancho del material.")
			return false;
		}
		else if(!this.mat_prima1){
			alert("Por favor, ingresar el mat_prima1.")
			return false;
		}
		else if(!this.mat_prima2){
			alert("Por favor, ingresar el mat_prima2.")
			return false;
		}
		else if(!this.maquina){
			alert("Por favor, ingresar el color seleccionado.")
			return false;
		}
		else if(!this.ancho){
			alert("Por favor, ingresar el REP. DES.")
			return false;
		}
/* 		else if(!this.no_cilindro || this.no_cilindro == 0){
			alert("Por favor, ingresar las no_cilindro.")
			return false;
		} */
		else if(!this.gap_ancho || this.gap_ancho == 0){
			alert("Por favor, ingresar las gap_ancho.")
			return false;
		}
		else if(!this.avance){
			alert("Por favor, ingresar el formato seleccionado.")
			return false;
		}
/* 		else if(!this.desarrollo_cilindro){
			alert("Por favor, ingresar el codigo del cilindro.")
			return false;
		} */
/* 		else if(!this.gap_avance){
			alert("Por favor, ingresar el codigo del troquel.")
			return false;
		} */
		
		
	/* 	else if(!this.rep_avance){
			alert("Por favor, ingresar el Pantone 1.")
			return false;
		}
		else if(!this.tipo){
			alert("Por favor, ingresar el Pantone 2.")
			return false;
		}
		else if(!this.forma){
			alert("Por favor, ingresar el Pantone 3.")
			return false;
		}
		else if(!this.tipo_impresion_ex){
			alert("Por favor, ingresar el Pantone 4.")
			return false;
		}
		else if(!this.muestra){
			alert("Por favor, ingresar el Pantone 5.")
			return false;
		}
		else if(!this.corte_seg){
			alert("Por favor, ingresar el Pantone 6.")
			return false;
		}
		else if(!this.layflat){
			alert("Por favor, ingresar el Pantone 7.")
			return false;
		}
		
		else if(!this.anilox_1 || this.anilox_1 == 0){
			alert("Por favor, ingresar el anilox 1.")
			return false;
		}
		else if(!this.anilox_2 || this.anilox_2 == 0){
			alert("Por favor, ingresar el anilox 2.")
			return false;
		}
		else if(!this.anilox_3 || this.anilox_3 == 0){
			alert("Por favor, ingresar el anilox 3.")
			return false;
		}
		else if(!this.anilox_4 || this.anilox_4 == 0){
			alert("Por favor, ingresar el anilox 4.")
			return false;
		}
		else if(!this.anilox_5 || this.anilox_5 == 0){
			alert("Por favor, ingresar el anilox 5.")
			return false;
		}
		else if(!this.anilox_6 || this.anilox_6 == 0){
			alert("Por favor, ingresar el anilox 6.")
			return false;
		}
		else if(!this.anilox_7 || this.anilox_7 == 0){
			alert("Por favor, ingresar el anilox 7.")
			return false;
		}
		
		else if(!this.tipo_corte){
			alert("Por favor, ingresar el fabricante 1.")
			return false;
		}
		else if(!this.acabado1){
			alert("Por favor, ingresar el fabricante 2.")
			return false;
		}
		else if(!this.acabado2){
			alert("Por favor, ingresar el fabricante 3.")
			return false;
		}
		else if(!this.acabado3){
			alert("Por favor, ingresar el fabricante 4.")
			return false;
		}
		else if(!this.acabado4){
			alert("Por favor, ingresar el fabricante 5.")
			return false;
		}
		else if(!this.observacion){
			alert("Por favor, ingresar el fabricante 6.")
			return false;
		}
		else if(!this.rep_ancho){
			alert("Por favor, ingresar el fabricante 7.")
			return false;
		}
		
		else if(!this.tinta_sticky_1){
			alert("Por favor, ingresar el tinta/sticky 1.")
			return false;
		}
		else if(!this.tinta_sticky_2){
			alert("Por favor, ingresar el tinta/sticky 2.")
			return false;
		}
		else if(!this.tinta_sticky_3){
			alert("Por favor, ingresar el tinta/sticky 3.")
			return false;
		}
		else if(!this.tinta_sticky_4){
			alert("Por favor, ingresar el tinta/sticky 4.")
			return false;
		}
		else if(!this.tinta_sticky_5){
			alert("Por favor, ingresar el tinta/sticky 5.")
			return false;
		}
		else if(!this.tinta_sticky_6){
			alert("Por favor, ingresar el tinta/sticky 6.")
			return false;
		}
		else if(!this.tinta_sticky_7){
			alert("Por favor, ingresar el tinta/sticky 7.")
			return false;
		} */
		else if(!this.troquel){
			alert("Por favor, seleccionar el tipo de dispensado.")
			return false;
		}
	/* 	else if(!this.diametro_rollo || this.diametro_rollo == 0){
			alert("Por favor, ingresar el  diametro del rollo.")
			return false;
		} */
	/* 	else if(!this.peso_rollo || this.peso_rollo == 0){
			alert("Por favor, ingresar el peso del rollo.")
			return false;
		} */
	/* 	else if(!this.medida_dispensado || this.medida_dispensado == 0){
			alert("Por favor, ingresar la medida del dispensado.")
			return false;
		} */
		else if(!this.taca){
			alert("Por favor, seleccionar Taca.")
			return false;
		}
		else if(!this.embon_ext){
			alert("Por favor, ingresar el embobinado Exterior.")
			return false;
		}
		//COMPROBACION DE LA IMAGEN
		///else if (!this.localCompressedURl && !this.localUrl) {
			//alert("Por favor, seleccione una imagen.");
			//return false;
		//}
		///
		else if(!this.requiere_cliche){
			alert("Por favor, ingrese un ejecutivo de ventas.");
			return false;
		}
		else if(!this.solicitado_por){
			alert("Por favor, seleccione un responsable de impresion.");
			return false;
		}
		else if(!this.autorizado_por){
			alert("Por favor, seleccione supervisor responsable.");
			return false;
		}
		else if(!this.jefe_prod){
			alert("Por favor, seleccione un jefe de producción.");
			return false;
		}

		return true
	}

	generar_ficha_tecnica_preprensa() {
		
	   if (this.validar_datos()){   
		
			let encabezado_ficha_tec_preprensa= {}
			//********PRIMER CUADRO */
			encabezado_ficha_tec_preprensa['codemp'] = this.empresa;
			encabezado_ficha_tec_preprensa['fecIngProd'] = formatDate(this.fectra['value'], 'yyyy-MM-dd', 'en-US', '-0500');
			encabezado_ficha_tec_preprensa['razon_social'] = this.razon_social;
			encabezado_ficha_tec_preprensa['ruc'] = this.ruc;
			//encabezado_ficha_tec_preprensa['nombre_comercial'] = this.nombre_comercial;
			encabezado_ficha_tec_preprensa['contacto'] = this.contacto;
			encabezado_ficha_tec_preprensa['producto'] = this.producto;
			encabezado_ficha_tec_preprensa['buffer'] = this.buffer;
			encabezado_ficha_tec_preprensa['proveedor'] = this.proveedor;
			encabezado_ficha_tec_preprensa['enviado_por'] = this.enviado_por;
			encabezado_ficha_tec_preprensa['nombre_etiqueta'] = this.nombre_etiqueta;
			encabezado_ficha_tec_preprensa['orden_venta'] = this.orden_venta;
			encabezado_ficha_tec_preprensa['enviado_a'] = this.enviado_a;

			//**********SEGUNDO CUADRO */
 			encabezado_ficha_tec_preprensa['mat_prima1'] = this.mat_prima1;
			encabezado_ficha_tec_preprensa['mat_prima2'] = this.mat_prima2;
			encabezado_ficha_tec_preprensa['maquina'] = this.maquina;
			encabezado_ficha_tec_preprensa['ancho'] = this.ancho;
			encabezado_ficha_tec_preprensa['no_cilindro'] = this.no_cilindro;
			encabezado_ficha_tec_preprensa['troquel'] = this.troquel;
			encabezado_ficha_tec_preprensa['gap_ancho'] = this.gap_ancho;
			encabezado_ficha_tec_preprensa['rep_ancho'] = this.rep_ancho;
			encabezado_ficha_tec_preprensa['avance'] = this.avance;
			encabezado_ficha_tec_preprensa['desarrollo_cilindro'] = this.desarrollo_cilindro;
			encabezado_ficha_tec_preprensa['gap_avance'] = this.gap_avance;
			encabezado_ficha_tec_preprensa['rep_avance'] = this.rep_avance;
			encabezado_ficha_tec_preprensa['layflat'] = this.layflat;
			encabezado_ficha_tec_preprensa['ancho_rollo'] = this.ancho_rollo;

			encabezado_ficha_tec_preprensa['tipo'] = this.tipo;
			encabezado_ficha_tec_preprensa['forma'] = this.forma;
			encabezado_ficha_tec_preprensa['tipo_impresion_ex'] = this.tipo_impresion_ex;
			encabezado_ficha_tec_preprensa['muestra'] = this.muestra;
			encabezado_ficha_tec_preprensa['corte_seg'] = this.corte_seg;


			
/* 			if(this.desarrollo_cilindro){
				encabezado_ficha_tec_preprensa['desarrollo_cilindro'] = this.desarrollo_cilindro;
			}else{
				encabezado_ficha_tec_preprensa['desarrollo_cilindro'] = 0;
			} */
			
			
						
			/* if(this.layflat){
				encabezado_ficha_tec_preprensa['layflat'] = this.layflat; 
			}else{
				encabezado_ficha_tec_preprensa['layflat']  = 0;
			}

			if(this.ancho_rollo){
				encabezado_ficha_tec_preprensa['ancho'] = this.ancho; 
			}else{
				encabezado_ficha_tec_preprensa['ancho']  = 0;
			}
			//SEGUNDA FILA
			if(this.ancho_rollo){
				encabezado_ficha_tec_preprensa['ancho_rollo'] = this.ancho_rollo;
			}else{
				encabezado_ficha_tec_preprensa['ancho_rollo'] = 0;
			} */
	
			if(this.existe_cliche){
				encabezado_ficha_tec_preprensa['existe_cliche'] = this.existe_cliche;
				
			}else{
				encabezado_ficha_tec_preprensa['existe_cliche'] = null;
			}

			if(this.etiq_fila_cliente){
				encabezado_ficha_tec_preprensa['etiq_fila_cliente'] = this.etiq_fila_cliente;
				
			}else{
				encabezado_ficha_tec_preprensa['etiq_fila_cliente'] = null;
			}

			if(this.etiq_fila_produccion){
				encabezado_ficha_tec_preprensa['etiq_fila_produccion'] = this.etiq_fila_produccion;
			}else{
				encabezado_ficha_tec_preprensa['etiq_fila_produccion'] = null;	
			}

			if(this.tipo_tinta){
				encabezado_ficha_tec_preprensa['tipo_tinta'] = this.tipo_tinta;
			}else{
				encabezado_ficha_tec_preprensa['tipo_tinta'] = null;

			}
			encabezado_ficha_tec_preprensa['tipo_corte'] = this.tipo_corte;
			encabezado_ficha_tec_preprensa['acabado1'] = this.acabado1;
			encabezado_ficha_tec_preprensa['acabado2'] = this.acabado2;
			encabezado_ficha_tec_preprensa['acabado3'] = this.acabado3;
			encabezado_ficha_tec_preprensa['acabado4'] = this.acabado4;
			encabezado_ficha_tec_preprensa['observacion'] = this.observacion;
			
			//********SENTIDO SALIDA**********
			encabezado_ficha_tec_preprensa['embon_ext'] = this.embon_ext;
			if(this.embon_int && this.embon_int !== 'NO'){
				encabezado_ficha_tec_preprensa['embon_int'] = this.embon_int;
			}
			else{
				encabezado_ficha_tec_preprensa['embon_int'] = null;
			}
			encabezado_ficha_tec_preprensa['vendedor'] = this.vendedor;
			
			

			
			//********FIRMAS***********
			encabezado_ficha_tec_preprensa['requiere_cliche'] = this.requiere_cliche;
			encabezado_ficha_tec_preprensa['solicitado_por'] = this.solicitado_por;
			encabezado_ficha_tec_preprensa['autorizado_por'] = this.autorizado_por;
/* 			encabezado_ficha_tec_preprensa['jefe_prod'] = this.jefe_prod; */

			let status_encabezado
			let numtra
			console.log (encabezado_ficha_tec_preprensa)
			console.log ("DATO CLIENTE")
			console.log (this.dato_cliente)
			
			
			if(encabezado_ficha_tec_preprensa){
				console.log("ENTRO A GENERAR LA FICHA TECNICA")

				this.srv.generar_ficha_tecnica_preprensa(encabezado_ficha_tec_preprensa).subscribe(
					data => {
								alert("**** FICHA TÉCNICA PRE PRENSA REGISTRADA CON EXITO *****")
								status_encabezado= data['status']
								this.idficha= data['idficha']
								console.log(data)
								let datos= {}
								datos['usuario'] = this.usuario
								datos['empresa'] = this.empresa
								this.router.navigate(['/admin/lista_fichapreprensa', datos])

							}
						);
			}else{
				alert("Por favor llene todos los campos")
			}
				
   		}
	}//FIN GENERA ING PRODUCTOS
	
	
	
	actualizar_FichaTecnicaPreprensa() {
		if (this.validar_datos()){ 
			if(this.dato_cliente){

				//let encabezado_ficha_tec_preprensa= this.dato_cliente
				let encabezado_ficha_tec_preprensa= {}
				//console.log(this.dato_cliente)
				//********PRIMER CUADRO */
				encabezado_ficha_tec_preprensa['codemp'] = this.empresa;
				encabezado_ficha_tec_preprensa['idficha'] = this.idficha;
				console.log (this.fectra)
				encabezado_ficha_tec_preprensa['fecIngProd'] = formatDate(this.fectra['value'], 'yyyy-MM-dd', 'en-US', '-0500');
				encabezado_ficha_tec_preprensa['razon_social'] = this.razon_social;
				encabezado_ficha_tec_preprensa['ruc'] = this.ruc;
				//encabezado_ficha_tec_preprensa['nombre_comercial'] = this.nombre_comercial;
				//encabezado_ficha_tec_preprensa['nombre_comercial'] = this.razon_social;
				encabezado_ficha_tec_preprensa['contacto'] = this.contacto;
				encabezado_ficha_tec_preprensa['producto'] = this.producto;
				encabezado_ficha_tec_preprensa['buffer'] = this.buffer;
				encabezado_ficha_tec_preprensa['proveedor'] = this.proveedor;
				encabezado_ficha_tec_preprensa['enviado_por'] = this.enviado_por;
				encabezado_ficha_tec_preprensa['nombre_etiqueta'] = this.nombre_etiqueta;
				encabezado_ficha_tec_preprensa['orden_venta'] = this.orden_venta;
				encabezado_ficha_tec_preprensa['enviado_a'] = this.enviado_a;

				//**********SEGUNDO CUADRO */
				encabezado_ficha_tec_preprensa['mat_prima1'] = this.mat_prima1;
				encabezado_ficha_tec_preprensa['mat_prima2'] = this.mat_prima2;
				encabezado_ficha_tec_preprensa['maquina'] = this.maquina;
				encabezado_ficha_tec_preprensa['ancho'] = this.ancho;
				encabezado_ficha_tec_preprensa['no_cilindro'] = this.no_cilindro;
				encabezado_ficha_tec_preprensa['gap_ancho'] = this.gap_ancho;
				encabezado_ficha_tec_preprensa['troquel'] = this.troquel;
				encabezado_ficha_tec_preprensa['avance'] = this.avance;
				encabezado_ficha_tec_preprensa['desarrollo_cilindro'] = this.desarrollo_cilindro;
				encabezado_ficha_tec_preprensa['gap_avance'] = this.gap_avance;
				//encabezado_ficha_tec_preprensa['uv_total'] = this.uv_total
				/*encabezado_ficha_tec_preprensa['uv_total'] = this.uv_total ? 'SI' : 'NO';
				encabezado_ficha_tec_preprensa['uv_sobre_impr'] = this.uv_sobre_impr ? 'SI' : 'NO';
				encabezado_ficha_tec_preprensa['uv_select'] = this.uv_select ? 'SI' : 'NO';
				encabezado_ficha_tec_preprensa['relam_delam'] = this.relam_delam ? 'SI' : 'NO';
				encabezado_ficha_tec_preprensa['hot_stamping_acabados'] = this.hot_stamping ? 'SI' : 'NO';
				encabezado_ficha_tec_preprensa['cold_foil'] = this.cold_foil ? 'SI' : 'NO';
				encabezado_ficha_tec_preprensa['repujado'] = this.repujado_ing_prod ? 'SI' : 'NO';
				encabezado_ficha_tec_preprensa['laminado_mate'] = this.lami_mate ? 'SI' : 'NO';
				encabezado_ficha_tec_preprensa['laminado_brillan'] = this.laminado_brillan ? 'SI' : 'NO';
				
				//*****TABLA PRIMARIOS Y COLORES PLANOS**********
				encabezado_ficha_tec_preprensa['primario_C'] = this.primario_C ? 'SI' : 'NO';
				encabezado_ficha_tec_preprensa['primario_M'] = this.primario_M ? 'SI' : 'NO';
				encabezado_ficha_tec_preprensa['primario_Y'] = this.primario_Y ? 'SI' : 'NO';
				encabezado_ficha_tec_preprensa['primario_K'] = this.primario_K ? 'SI' : 'NO';
				*/

				encabezado_ficha_tec_preprensa['rep_avance'] = this.rep_avance;
				encabezado_ficha_tec_preprensa['tipo'] = this.tipo;
				encabezado_ficha_tec_preprensa['forma'] = this.forma;
				encabezado_ficha_tec_preprensa['tipo_impresion_ex'] = this.tipo_impresion_ex;
				encabezado_ficha_tec_preprensa['muestra'] = this.muestra;
				encabezado_ficha_tec_preprensa['corte_seg'] = this.corte_seg;
				encabezado_ficha_tec_preprensa['layflat'] = this.layflat;
				 if(this.ancho_rollo){
					encabezado_ficha_tec_preprensa['ancho_rollo'] = this.ancho_rollo;
				}else{
					encabezado_ficha_tec_preprensa['ancho_rollo'] = 0;
				}


				//TERCERA FILA
				if(this.existe_cliche){
					encabezado_ficha_tec_preprensa['existe_cliche'] = this.existe_cliche;
					
				}else{
					encabezado_ficha_tec_preprensa['existe_cliche'] = null;
				}

				if(this.etiq_fila_cliente){
					encabezado_ficha_tec_preprensa['etiq_fila_cliente'] = this.etiq_fila_cliente;
					
				}else{
					encabezado_ficha_tec_preprensa['etiq_fila_cliente'] = null;
				}

				if(this.etiq_fila_produccion){
					encabezado_ficha_tec_preprensa['etiq_fila_produccion'] = this.etiq_fila_produccion;
				}else{
					encabezado_ficha_tec_preprensa['etiq_fila_produccion'] = null;	
				}
				
				if(this.tipo_tinta){
					encabezado_ficha_tec_preprensa['tipo_tinta'] = this.tipo_tinta;
				}else{
					encabezado_ficha_tec_preprensa['tipo_tinta'] = null;
					
				}
				encabezado_ficha_tec_preprensa['tipo_corte'] = this.tipo_corte;
				encabezado_ficha_tec_preprensa['acabado1'] = this.acabado1;
				encabezado_ficha_tec_preprensa['acabado2'] = this.acabado2;

				encabezado_ficha_tec_preprensa['acabado3'] = this.acabado3;
				encabezado_ficha_tec_preprensa['acabado4'] = this.acabado4;
				encabezado_ficha_tec_preprensa['observacion'] = this.observacion;

				encabezado_ficha_tec_preprensa['rep_ancho'] = this.rep_ancho;
				//CUARTA FILA
/* 				if(this.tinta_sticky_vC){
					encabezado_ficha_tec_preprensa['tinta_sticky_vC'] = this.tinta_sticky_vC;
				}else{
					encabezado_ficha_tec_preprensa['tinta_sticky_vC'] = null;
				}
				
				if(this.tinta_sticky_vM){
					encabezado_ficha_tec_preprensa['tinta_sticky_vM'] = this.tinta_sticky_vM;
				}else{
					encabezado_ficha_tec_preprensa['tinta_sticky_vM'] = null;
				}
				
				if(this.tinta_sticky_vY){
					encabezado_ficha_tec_preprensa['tinta_sticky_vY'] = this.tinta_sticky_vY;
				}else{
					encabezado_ficha_tec_preprensa['tinta_sticky_vY'] = null;
				}
				
				if(this.tinta_sticky_vK){
					encabezado_ficha_tec_preprensa['tinta_sticky_vK'] = this.tinta_sticky_vK;
				}else{
					encabezado_ficha_tec_preprensa['tinta_sticky_vK'] = null;
				}
				
				encabezado_ficha_tec_preprensa['tinta_sticky_1'] = this.tinta_sticky_1;
				encabezado_ficha_tec_preprensa['tinta_sticky_2'] = this.tinta_sticky_2;
				encabezado_ficha_tec_preprensa['tinta_sticky_3'] = this.tinta_sticky_3;
				encabezado_ficha_tec_preprensa['tinta_sticky_4'] = this.tinta_sticky_4;
				encabezado_ficha_tec_preprensa['tinta_sticky_5'] = this.tinta_sticky_5;
				encabezado_ficha_tec_preprensa['tinta_sticky_6'] = this.tinta_sticky_6;
				encabezado_ficha_tec_preprensa['tinta_sticky_7'] = this.tinta_sticky_7;
				

				


				encabezado_ficha_tec_preprensa['diametro_rollo'] = this.diametro_rollo;
				encabezado_ficha_tec_preprensa['peso_rollo'] = this.peso_rollo;
				encabezado_ficha_tec_preprensa['medida_dispensado'] = this.medida_dispensado;
				if (this.taca == 'SI' ){
					encabezado_ficha_tec_preprensa['taca'] = 'SI';
				}else{
					encabezado_ficha_tec_preprensa['taca'] = 'NO';
				} */
				
				//********SENTIDO SALIDA**********
				encabezado_ficha_tec_preprensa['embon_ext'] = this.embon_ext;
				if(this.embon_int && this.embon_int !== 'NO'){
					encabezado_ficha_tec_preprensa['embon_int'] = this.embon_int;
				}
				else{
					encabezado_ficha_tec_preprensa['embon_int'] = null;
				}
				encabezado_ficha_tec_preprensa['vendedor'] = this.vendedor;
				
				//********IMAGEN************
				//encabezado_ficha_tec_preprensa['img_etiqueta'] = this.img_etiqueta;
			/* 	if (this.localCompressedURl) {
					encabezado_ficha_tec_preprensa['imagen_comprimida'] = this.localCompressedURl;
				} else if (this.localUrl) {
					encabezado_ficha_tec_preprensa['imagen_original'] = this.localUrl;
				} else {
					encabezado_ficha_tec_preprensa['imagen'] = null;  // No hay imagen disponible
				} */
				
				//********FIRMAS***********
				encabezado_ficha_tec_preprensa['requiere_cliche'] = this.requiere_cliche;
				encabezado_ficha_tec_preprensa['solicitado_por'] = this.solicitado_por;
				encabezado_ficha_tec_preprensa['autorizado_por'] = this.autorizado_por;
/* 				encabezado_ficha_tec_preprensa['jefe_prod'] = this.jefe_prod; */

				let status_encabezado
				let numtra
				console.log ("DATO CLIENTE")
				console.log (encabezado_ficha_tec_preprensa)
				if(encabezado_ficha_tec_preprensa){
					console.log("ENTRO A ACTUALIZAR LA ING. DE PRODUCTO")

					this.srv.actualizar_ficha_tecnica_preprensa(encabezado_ficha_tec_preprensa).subscribe(
					data => {
						status_encabezado= data['status']
						//this.idficha= data['idficha']
						console.log(data)
						if (status_encabezado == 'ACTUALIZADO CON EXITO')
							{
								console.log('SE ACTUALIZO LA FICHA TECNICA CON EXITO')

								let datos={}
								datos['usuario'] = this.usuario
								datos['empresa'] = this.empresa
								this.router.navigate(['/admin/lista_fichapreprensa', datos]);

							}
						}
							
					);
				}
				else{
					console.log("Datos incompletos")
				}
			}else{
				alert("Por favor llene todos los campos")
			}
			
		}//FIN GENERA ING PRODUCTO
	}


	busca_articulo() { 
		if (this.patron_articulo ){
			this.searching_articulo = true
			let datos = {};
			datos['nomart']  = this.patron_articulo;
			datos['codemp']  = this.empresa;
			datos['codcli']  = 'CONFIN';
			datos['codalm']  = '01';
				this.srv.buscar_articulos_pedido(datos).subscribe(data => {
					// console.log(data)
					// console.log (data[1]['nomart'])
					
				let longitud_data = data.length
	
				if (longitud_data > 0 ) {
					console.log(data)
					// console.log(data['nomart'])
					
					// console.log (data[1]['nomart'])
					this.articulo = data;
					this.exist_articulo = true;
					this.searching_articulo = false
					
					// this.filteredarticulo = this.myControl2.valueChanges.pipe(
					// startWith(''),
					// map(value => this._filter2(value))
					// ); 
		  
					
					
					
				}else {
					alert("Antículo no encontrado con la palabra clave ingresada <<"+this.patron_articulo+">>");
					this.searching_articulo = false
					this.exist_articulo = false;
				}
				}); 
			}else  { 
				alert("Por favor llene el artículo / datos del cliente / almacen");
			}
	}

	select_producto(codart,nomart) {
		console.log ("Seleccion de cliente")
	   
	  
	   this.exist_articulo = false;
	   this.patron_articulo = undefined;
	   this.nombre_etiqueta = codart+' ---> '+nomart
	}
	
	reset() {
	  this.clientes = false;
	  this.exist_articulo = false;
	  this.edit_cant = false;
	  this.masterSelected = false;
	  this.cantidad_nueva = '1';
	  this.cambiar_email = false;
	  this.razon_social = ''
	  this.email_cliente = ''
	  this.ciudad = ''
	  this.articulo = []
	  this.articulos_pedido = []
	  this.subtotal = this.articulos_pedido.reduce((acc,obj,) => acc + (obj.subtotal_art),0);	
	  this.iva_porcentaje = 0
	  this.iva_cant = 0
	  this.total = 0
	  this.vendedor = 'VENDEDOR GENERAL'
	  this.tiptra = '1'
	  this.observacion_pedido= null
	  this.condiciones_pago = null
	  this.info_adicional = null

  this.tipo_busqueda = true
  this.exist_articulo = false;
  this.exist_razon_social = false;
  this.check_agencia = false
  this.val_exist_ppal = true
  this.val_exist_sucursal = true
  this.edit_dir_agencia_ppal = false
  this.habilitar_crear_nueva_sucursal = false
	

	}//FIN ENVIO CORREO PEDIDO
	

	
	
	
	
	
  
  
}
