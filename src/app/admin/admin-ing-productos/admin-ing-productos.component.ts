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
  selector: 'app-admin-ing-productos',
  templateUrl: './admin-ing-productos.component.html',
  styleUrls: ['./admin-ing-productos.component.css']
})



	

export class AdminIngProductosComponent implements OnInit {
	
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
	src = "../../assets/img_articulos/subir-imagen.png"
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
	codIngProd
	accion_actualizar = false
	almacenes_lista
	almacen
	
	// INGENIERIA PRODUCTO
	nombre_comercial: string;
	referencia: string;
	medida_alto: number;
	medida_ancho: number;
	proveedor: string;
	impresora: string;
	bobinadora: string;
	material_imprimir: string;
	ancho_material: number;
	cilindro: string;
	cortador: string;
	color_seleccionado: string;
	rep_des: string;
	filas: number;
	columnas: number;
	formato_seleccionado: string;
	cilindro_cod: string;
	troquel_plano_cod: string;
	uv_total: boolean;
	uv_select: boolean;
	relam_delam: boolean;
	hot_stamping: boolean;
	cold_folid: boolean;
	repujado_ing_prod: boolean;
	lami_mate: boolean;
	lami_brillan: boolean;
	primario_C: boolean;
	primario_M: boolean;
	primario_Y: boolean;
	primario_K: boolean;
	pantone_1: string;
	pantone_2: string;
	pantone_3: string;
	pantone_4: string;
	pantone_5: string;
	pantone_6: string;
	pantone_7: string;
	anilox_vC: number;
	anilox_vM: number;
	anilox_vY: number;
	anilox_vK: number;
	anilox_1: number;
	anilox_2: number;
	anilox_3: number;
	anilox_4: number;
	anilox_5: number;
	anilox_6: number;
	anilox_7: number;
	prov_fabricante_vC: string;
	prov_fabricante_vM: string;
	prov_fabricante_vY: string;
	prov_fabricante_vK: string;
	prov_fabricante_1: string;
	prov_fabricante_2: string;
	prov_fabricante_3: string;
	prov_fabricante_4: string;
	prov_fabricante_5: string;
	prov_fabricante_6: string;
	prov_fabricante_7: string;
	tinta_sticky_vC: string;
	tinta_sticky_vM: string;
	tinta_sticky_vY: string;
	tinta_sticky_vK: string;
	tinta_sticky_1: string;
	tinta_sticky_2: string;
	tinta_sticky_3: string;
	tinta_sticky_4: string;
	tinta_sticky_5: string;
	tinta_sticky_6: string;
	tinta_sticky_7: string;
	tipo_dispensado: string;
	diametro_rollo: number;
	peso_rollo: number;
	medida_dispensado: number;
	taca: string;
	embobinado_ext_seleccionado: string;
	embobinado_interior_seleccionado: string;
	
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
	ejecutivo_ventas: string;
	impreso_res: string;
	supervisador_res: string;
	jefe_prod: string;

    tiptra
	// getConfCambioVendedorPed()
  public doc_lista = [
			{"tiptra": "1", "nom_doc": "PEDIDO"},
		    {"tiptra": "2", "nom_doc": "PROFORMA"}
		];
  
  public color_lista = [
			{"color_ls": "1", "nom_doc": "1"},
		    {"color_ls": "2", "nom_doc": "2"},
		    {"color_ls": "3", "nom_doc": "3"},
		    {"color_ls": "4", "nom_doc": "4"},
		    {"color_ls": "5", "nom_doc": "5"},
		    {"color_ls": "6", "nom_doc": "6"},
		    {"color_ls": "7", "nom_doc": "7"}
		];
  
  public formato_etiqueta = [
			{"tipo_etiqueta": "Rectangular", "nom_doc": "RECTANGULAR"},
			{"tipo_etiqueta": "Cuadrado", "nom_doc": "CUADRADO"},
			{"tipo_etiqueta": "Circular", "nom_doc": "CIRCULAR"},
			{"tipo_etiqueta": "Especial", "nom_doc": "ESPECIAL"},
			{"tipo_etiqueta": "Otros", "nom_doc": "OTROS"}
		];
  
	public emboext_lista = [
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
			{"emboint_ls": "R101", "nom_doc": "R101"},
			{"emboint_ls": "R102", "nom_doc": "R102"},
			{"emboint_ls": "R103", "nom_doc": "R103"},
			{"emboint_ls": "R104", "nom_doc": "R104"},
			{"emboint_ls": "R105", "nom_doc": "R105"},
			{"emboint_ls": "R106", "nom_doc": "R106"},
			{"emboint_ls": "R107", "nom_doc": "R107"},
			{"emboint_ls": "R108", "nom_doc": "R108"}
		];


  tipo_doc

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
			this.codIngProd = params['codIngProd'] || this.route.snapshot.paramMap.get('codIngProd') || 0;
			
			console.log("LUEGO DE ENTRADA")
		if (this.codIngProd == 0){
			this.codIngProd = undefined
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
		console.log(this.codIngProd)
		
		
		
		

	   }
	); //FIN ROUTING
  } //FIN COSNTRUCTOR
  

   ngOnInit() {
	   

	AdminLTE.init();
	
	}
	
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
			
		this.srv.supervisor(datos).subscribe(
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
				});
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


		this.srv.supervisor(datos).subscribe(
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
				});

		this.buscar_encabezado_ingProducto();
	}

	
	buscar_encabezado_ingProducto() {
	const datos = {};
	datos['codemp'] = this.empresa;	
	datos['usuario'] = this.usuario;
	datos['codIngProd'] = this.codIngProd;
	
	
	this.srv.get_ing_producto(datos).subscribe(data => {
		console.log(data)
		console.log ("EJECUTADA DATA CONSULTA ING_PROD")
		
		// usuario = data['num_pedido']
		this.clientes = true;

		// this.fectra = data['fectra']
		let fecha = new Date(data['fecIngProd'])
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
		this.nombre_comercial= data['nombre_comercial']
		this.referencia = data['referencia']
		this.medida_alto= data['medida_alto']
		this.medida_ancho = data['medida_ancho']
		this.proveedor = data['proveedor']
		this.impresora = data['impresora']
		this.bobinadora = data['bobinadora']
		this.material_imprimir = data['material_imprimir']
		this.ancho_material = data['ancho_material']

		this.cilindro = data['cilindro']
		this.cortador = data['cortador']
		this.color_seleccionado = data['color_seleccionado']
		this.rep_des = data['rep_des']
		this.filas = data['filas']
		this.columnas = data['columnas']
		this.formato_seleccionado = data['formato_seleccionado']
		this.cilindro_cod = data['cilindro_cod']
		this.troquel_plano_cod = data['troquel_plano_cod']
		this.uv_total = data['uv_total'] === 'SI';
		this.uv_select = data['uv_select'] === 'SI';
		this.relam_delam = data['relam_delam'] === 'SI';
		this.hot_stamping = data['hot_stamping_acabados'] === 'SI';
		this.cold_folid = data['cold_foild'] === 'SI';
		this.repujado_ing_prod = data['repujado'] === 'SI';
		this.lami_mate = data['laminado_mate'] === 'SI';
		this.lami_brillan = data['laminado_brillan'] === 'SI';

		this.primario_C = data['primario_C'] === 'SI';
		this.primario_M = data['primario_M'] === 'SI';
		this.primario_K = data['primario_K'] === 'SI';
		this.primario_Y = data['primario_Y'] === 'SI';
		this.pantone_1 = data['pantone_1']
		this.pantone_2 = data['pantone_2']
		this.pantone_3 = data['pantone_3']
		this.pantone_4 = data['pantone_4']
		this.pantone_5 = data['pantone_5']
		this.pantone_6 = data['pantone_6']
		this.pantone_7 = data['pantone_7']

		this.anilox_vC = data['anilox_vC'] === 0 ? '' : data['anilox_vC'];
		this.anilox_vM = data['anilox_vM'] === 0 ? '' : data['anilox_vM'];
		this.anilox_vY = data['anilox_vY'] === 0 ? '' : data['anilox_vY'];
		this.anilox_vK = data['anilox_vK'] === 0 ? '' : data['anilox_vK'];
		this.anilox_1 = data['anilox_1']
		this.anilox_2 = data['anilox_2']
		this.anilox_3 = data['anilox_3']
		this.anilox_4 = data['anilox_4']
		this.anilox_5 = data['anilox_5']
		this.anilox_6 = data['anilox_6']
		this.anilox_7 = data['anilox_7']
			
		this.prov_fabricante_vC = data['prov_fabricante_vC']
		this.prov_fabricante_vM = data['prov_fabricante_vM']
		this.prov_fabricante_vY = data['prov_fabricante_vY']
		this.prov_fabricante_vK = data['prov_fabricante_vK']
		this.prov_fabricante_1 = data['prov_fabricante_1']
		this.prov_fabricante_2 = data['prov_fabricante_2']
		this.prov_fabricante_3 = data['prov_fabricante_3']
		this.prov_fabricante_4 = data['prov_fabricante_4']
		this.prov_fabricante_5 = data['prov_fabricante_5']
		this.prov_fabricante_6 = data['prov_fabricante_6']
		this.prov_fabricante_7 = data['prov_fabricante_7']

		this.tinta_sticky_vC = data['tinta_sticky_vC']
		this.tinta_sticky_vM = data['tinta_sticky_vM']
		this.tinta_sticky_vY = data['tinta_sticky_vY']
		this.tinta_sticky_vK = data['tinta_sticky_vK']
		this.tinta_sticky_1 = data['tinta_sticky_1']
		this.tinta_sticky_2 = data['tinta_sticky_2']
		this.tinta_sticky_3 = data['tinta_sticky_3']
		this.tinta_sticky_4 = data['tinta_sticky_4']
		this.tinta_sticky_5 = data['tinta_sticky_5']
		this.tinta_sticky_6 = data['tinta_sticky_6']
		this.tinta_sticky_7 = data['tinta_sticky_7']
			
		this.tipo_dispensado = data['tipo_dispensado']
		this.diametro_rollo = data['diametro_rollo']
		this.peso_rollo = data['peso_rollo']
		this.medida_dispensado = data['medida_dispensado']
		this.taca = data['taca']
			
		this.embobinado_ext_seleccionado = data['embobinado_ext_seleccionado']
		this.embobinado_interior_seleccionado = data['embobinado_interior_seleccionado']
		
		this.src = data['ruta_img']

		this.ejecutivo_ventas = data['ejecutivo_ventas']
		this.impreso_res = data['impreso_res']
		this.supervisador_res = data['supervisador_res']
		this.jefe_prod = data['jefe_prod']

		this.dato_cliente= {"nomcli":this.razon_social,"CodIngProd":this.codIngProd}
		console.log ("****** DATO CLIENTE *******")
		console.log (this.dato_cliente)

		});

	}//  FIN BUSCAR ING. DE PRODUCTO
	
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
		this.formData.append("codIngProd",this.codIngProd);
		
		console.log ("##### COD ING PRODUCTO #######")
		console.log(this.codIngProd);
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
		//	alert("Por favor, ingesar el nombre comercial.")
		//	return false;
		//}
		else if(!this.referencia){
			alert("Por favor, ingesar la referencia.")
			return false;
		}
		else if(!this.medida_alto || this.medida_alto == 0){
			alert("Por favor, ingesar la medida de alto.")
			return false;
		}
		else if(!this.medida_ancho || this.medida_ancho == 0){
			alert("Por favor, ingesar la medida de ancho.")
			return false;
		}
		else if(!this.proveedor){
			alert("Por favor, ingesar el proveedor.")
			return false;
		}
		else if(!this.impresora){
			alert("Por favor, ingesar la impresora.")
			return false;
		}
		else if(!this.bobinadora){
			alert("Por favor, ingesar la bobinadora.")
			return false;
		}
		else if(!this.material_imprimir){
			alert("Por favor, ingesar el material a imprmir.")
			return false;
		}
		else if(!this.ancho_material || this.ancho_material == 0){
			alert("Por favor, ingesar el ancho del material.")
			return false;
		}
		else if(!this.cilindro){
			alert("Por favor, ingesar el cilindro.")
			return false;
		}
		else if(!this.cortador){
			alert("Por favor, ingesar el cortador.")
			return false;
		}
		else if(!this.color_seleccionado){
			alert("Por favor, ingesar el color seleccionado.")
			return false;
		}
		else if(!this.rep_des){
			alert("Por favor, ingesar el REP. DES.")
			return false;
		}
		else if(!this.filas || this.filas == 0){
			alert("Por favor, ingesar las filas.")
			return false;
		}
		else if(!this.columnas || this.columnas == 0){
			alert("Por favor, ingesar las columnas.")
			return false;
		}
		else if(!this.formato_seleccionado){
			alert("Por favor, ingesar el formato seleccionado.")
			return false;
		}
		else if(!this.cilindro_cod){
			alert("Por favor, ingesar el codigo del cilindro.")
			return false;
		}
		else if(!this.troquel_plano_cod){
			alert("Por favor, ingesar el codigo del troquel.")
			return false;
		}
		
		
		else if(!this.pantone_1){
			alert("Por favor, ingesar el Pantone 1.")
			return false;
		}
		else if(!this.pantone_2){
			alert("Por favor, ingesar el Pantone 2.")
			return false;
		}
		else if(!this.pantone_3){
			alert("Por favor, ingesar el Pantone 3.")
			return false;
		}
		else if(!this.pantone_4){
			alert("Por favor, ingesar el Pantone 4.")
			return false;
		}
		else if(!this.pantone_5){
			alert("Por favor, ingesar el Pantone 5.")
			return false;
		}
		else if(!this.pantone_6){
			alert("Por favor, ingesar el Pantone 6.")
			return false;
		}
		else if(!this.pantone_7){
			alert("Por favor, ingesar el Pantone 7.")
			return false;
		}
		
		else if(!this.anilox_1 || this.anilox_1 == 0){
			alert("Por favor, ingesar el anilox 1.")
			return false;
		}
		else if(!this.anilox_2 || this.anilox_2 == 0){
			alert("Por favor, ingesar el anilox 2.")
			return false;
		}
		else if(!this.anilox_3 || this.anilox_3 == 0){
			alert("Por favor, ingesar el anilox 3.")
			return false;
		}
		else if(!this.anilox_4 || this.anilox_4 == 0){
			alert("Por favor, ingesar el anilox 4.")
			return false;
		}
		else if(!this.anilox_5 || this.anilox_5 == 0){
			alert("Por favor, ingesar el anilox 5.")
			return false;
		}
		else if(!this.anilox_6 || this.anilox_6 == 0){
			alert("Por favor, ingesar el anilox 6.")
			return false;
		}
		else if(!this.anilox_7 || this.anilox_7 == 0){
			alert("Por favor, ingesar el anilox 7.")
			return false;
		}
		
		else if(!this.prov_fabricante_1){
			alert("Por favor, ingesar el fabricante 1.")
			return false;
		}
		else if(!this.prov_fabricante_2){
			alert("Por favor, ingesar el fabricante 2.")
			return false;
		}
		else if(!this.prov_fabricante_3){
			alert("Por favor, ingesar el fabricante 3.")
			return false;
		}
		else if(!this.prov_fabricante_4){
			alert("Por favor, ingesar el fabricante 4.")
			return false;
		}
		else if(!this.prov_fabricante_5){
			alert("Por favor, ingesar el fabricante 5.")
			return false;
		}
		else if(!this.prov_fabricante_6){
			alert("Por favor, ingesar el fabricante 6.")
			return false;
		}
		else if(!this.prov_fabricante_7){
			alert("Por favor, ingesar el fabricante 7.")
			return false;
		}
		
		else if(!this.tinta_sticky_1){
			alert("Por favor, ingesar el tinta/sticky 1.")
			return false;
		}
		else if(!this.tinta_sticky_2){
			alert("Por favor, ingesar el tinta/sticky 2.")
			return false;
		}
		else if(!this.tinta_sticky_3){
			alert("Por favor, ingesar el tinta/sticky 3.")
			return false;
		}
		else if(!this.tinta_sticky_4){
			alert("Por favor, ingesar el tinta/sticky 4.")
			return false;
		}
		else if(!this.tinta_sticky_5){
			alert("Por favor, ingesar el tinta/sticky 5.")
			return false;
		}
		else if(!this.tinta_sticky_6){
			alert("Por favor, ingesar el tinta/sticky 6.")
			return false;
		}
		else if(!this.tinta_sticky_7){
			alert("Por favor, ingesar el tinta/sticky 7.")
			return false;
		}
		else if(!this.tipo_dispensado){
			alert("Por favor, seleccionar el tipo de dispensado.")
			return false;
		}
		else if(!this.diametro_rollo || this.diametro_rollo == 0){
			alert("Por favor, ingesar el  diametro del rollo.")
			return false;
		}
		else if(!this.peso_rollo || this.peso_rollo == 0){
			alert("Por favor, ingesar el peso del rollo.")
			return false;
		}
		else if(!this.medida_dispensado || this.medida_dispensado == 0){
			alert("Por favor, ingesar la medida del dispensado.")
			return false;
		}
		else if(!this.taca){
			alert("Por favor, seleccionar Taca.")
			return false;
		}
		else if(!this.embobinado_ext_seleccionado){
			alert("Por favor, ingesar el embobinado Exterior.")
			return false;
		}
		//COMPROBACION DE LA IMAGEN
		else if (!this.localCompressedURl && !this.localUrl) {
			alert("Por favor, seleccione una imagen.");
			return false;
		}
		///
		else if(!this.ejecutivo_ventas){
			alert("Por favor, ingrese un ejecutivo de ventas.");
			return false;
		}
		else if(!this.impreso_res){
			alert("Por favor, seleccione un responsable de impresion.");
			return false;
		}
		else if(!this.supervisador_res){
			alert("Por favor, seleccione supervisor responsable.");
			return false;
		}
		else if(!this.jefe_prod){
			alert("Por favor, seleccione un jefe de producción.");
			return false;
		}

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
		//	alert("Por favor, ingesar el nombre comercial.")
		//	return false;
		//}
		else if(!this.referencia){
			alert("Por favor, ingesar la referencia.")
			return false;
		}
		else if(!this.medida_alto || this.medida_alto == 0){
			alert("Por favor, ingesar la medida de alto.")
			return false;
		}
		else if(!this.medida_ancho || this.medida_ancho == 0){
			alert("Por favor, ingesar la medida de ancho.")
			return false;
		}
		else if(!this.proveedor){
			alert("Por favor, ingesar el proveedor.")
			return false;
		}
		else if(!this.impresora){
			alert("Por favor, ingesar la impresora.")
			return false;
		}
		else if(!this.bobinadora){
			alert("Por favor, ingesar la bobinadora.")
			return false;
		}
		else if(!this.material_imprimir){
			alert("Por favor, ingesar el material a imprmir.")
			return false;
		}
		else if(!this.ancho_material || this.ancho_material == 0){
			alert("Por favor, ingesar el ancho del material.")
			return false;
		}
		else if(!this.cilindro){
			alert("Por favor, ingesar el cilindro.")
			return false;
		}
		else if(!this.cortador){
			alert("Por favor, ingesar el cortador.")
			return false;
		}
		else if(!this.color_seleccionado){
			alert("Por favor, ingesar el color seleccionado.")
			return false;
		}
		else if(!this.rep_des){
			alert("Por favor, ingesar el REP. DES.")
			return false;
		}
		else if(!this.filas || this.filas == 0){
			alert("Por favor, ingesar las filas.")
			return false;
		}
		else if(!this.columnas || this.columnas == 0){
			alert("Por favor, ingesar las columnas.")
			return false;
		}
		else if(!this.formato_seleccionado){
			alert("Por favor, ingesar el formato seleccionado.")
			return false;
		}
		else if(!this.cilindro_cod){
			alert("Por favor, ingesar el codigo del cilindro.")
			return false;
		}
		else if(!this.troquel_plano_cod){
			alert("Por favor, ingesar el codigo del troquel.")
			return false;
		}
		
		
		else if(!this.pantone_1){
			alert("Por favor, ingesar el Pantone 1.")
			return false;
		}
		else if(!this.pantone_2){
			alert("Por favor, ingesar el Pantone 2.")
			return false;
		}
		else if(!this.pantone_3){
			alert("Por favor, ingesar el Pantone 3.")
			return false;
		}
		else if(!this.pantone_4){
			alert("Por favor, ingesar el Pantone 4.")
			return false;
		}
		else if(!this.pantone_5){
			alert("Por favor, ingesar el Pantone 5.")
			return false;
		}
		else if(!this.pantone_6){
			alert("Por favor, ingesar el Pantone 6.")
			return false;
		}
		else if(!this.pantone_7){
			alert("Por favor, ingesar el Pantone 7.")
			return false;
		}
		
		else if(!this.anilox_1 || this.anilox_1 == 0){
			alert("Por favor, ingesar el anilox 1.")
			return false;
		}
		else if(!this.anilox_2 || this.anilox_2 == 0){
			alert("Por favor, ingesar el anilox 2.")
			return false;
		}
		else if(!this.anilox_3 || this.anilox_3 == 0){
			alert("Por favor, ingesar el anilox 3.")
			return false;
		}
		else if(!this.anilox_4 || this.anilox_4 == 0){
			alert("Por favor, ingesar el anilox 4.")
			return false;
		}
		else if(!this.anilox_5 || this.anilox_5 == 0){
			alert("Por favor, ingesar el anilox 5.")
			return false;
		}
		else if(!this.anilox_6 || this.anilox_6 == 0){
			alert("Por favor, ingesar el anilox 6.")
			return false;
		}
		else if(!this.anilox_7 || this.anilox_7 == 0){
			alert("Por favor, ingesar el anilox 7.")
			return false;
		}
		
		else if(!this.prov_fabricante_1){
			alert("Por favor, ingesar el fabricante 1.")
			return false;
		}
		else if(!this.prov_fabricante_2){
			alert("Por favor, ingesar el fabricante 2.")
			return false;
		}
		else if(!this.prov_fabricante_3){
			alert("Por favor, ingesar el fabricante 3.")
			return false;
		}
		else if(!this.prov_fabricante_4){
			alert("Por favor, ingesar el fabricante 4.")
			return false;
		}
		else if(!this.prov_fabricante_5){
			alert("Por favor, ingesar el fabricante 5.")
			return false;
		}
		else if(!this.prov_fabricante_6){
			alert("Por favor, ingesar el fabricante 6.")
			return false;
		}
		else if(!this.prov_fabricante_7){
			alert("Por favor, ingesar el fabricante 7.")
			return false;
		}
		
		else if(!this.tinta_sticky_1){
			alert("Por favor, ingesar el tinta/sticky 1.")
			return false;
		}
		else if(!this.tinta_sticky_2){
			alert("Por favor, ingesar el tinta/sticky 2.")
			return false;
		}
		else if(!this.tinta_sticky_3){
			alert("Por favor, ingesar el tinta/sticky 3.")
			return false;
		}
		else if(!this.tinta_sticky_4){
			alert("Por favor, ingesar el tinta/sticky 4.")
			return false;
		}
		else if(!this.tinta_sticky_5){
			alert("Por favor, ingesar el tinta/sticky 5.")
			return false;
		}
		else if(!this.tinta_sticky_6){
			alert("Por favor, ingesar el tinta/sticky 6.")
			return false;
		}
		else if(!this.tinta_sticky_7){
			alert("Por favor, ingesar el tinta/sticky 7.")
			return false;
		}
		else if(!this.tipo_dispensado){
			alert("Por favor, seleccionar el tipo de dispensado.")
			return false;
		}
		else if(!this.diametro_rollo || this.diametro_rollo == 0){
			alert("Por favor, ingesar el  diametro del rollo.")
			return false;
		}
		else if(!this.peso_rollo || this.peso_rollo == 0){
			alert("Por favor, ingesar el peso del rollo.")
			return false;
		}
		else if(!this.medida_dispensado || this.medida_dispensado == 0){
			alert("Por favor, ingesar la medida del dispensado.")
			return false;
		}
		else if(!this.taca){
			alert("Por favor, seleccionar Taca.")
			return false;
		}
		else if(!this.embobinado_ext_seleccionado){
			alert("Por favor, ingesar el embobinado Exterior.")
			return false;
		}
		//COMPROBACION DE LA IMAGEN
		///else if (!this.localCompressedURl && !this.localUrl) {
			//alert("Por favor, seleccione una imagen.");
			//return false;
		//}
		///
		else if(!this.ejecutivo_ventas){
			alert("Por favor, ingrese un ejecutivo de ventas.");
			return false;
		}
		else if(!this.impreso_res){
			alert("Por favor, seleccione un responsable de impresion.");
			return false;
		}
		else if(!this.supervisador_res){
			alert("Por favor, seleccione supervisor responsable.");
			return false;
		}
		else if(!this.jefe_prod){
			alert("Por favor, seleccione un jefe de producción.");
			return false;
		}

		return true
	}

   	generar_ing_producto() {
	   if (this.validar_datos()){   
		
			let encabezado_ing_prod= this.dato_cliente
			//********PRIMER CUADRO */
			encabezado_ing_prod['codemp'] = this.empresa;
			encabezado_ing_prod['fecIngProd'] = formatDate(this.fectra['value'], 'yyyy-MM-dd', 'en-US', '-0500');
			encabezado_ing_prod['razon_social'] = this.razon_social;
			encabezado_ing_prod['ruc'] = this.ruc;
			//encabezado_ing_prod['nombre_comercial'] = this.nombre_comercial;
			encabezado_ing_prod['nombre_comercial'] = this.razon_social;
			encabezado_ing_prod['referencia'] = this.referencia;
			encabezado_ing_prod['medida_alto'] = this.medida_alto;
			encabezado_ing_prod['medida_ancho'] = this.medida_ancho;
			encabezado_ing_prod['proveedor'] = this.proveedor;
			encabezado_ing_prod['impresora'] = this.impresora;
			encabezado_ing_prod['bobinadora'] = this.bobinadora;
			encabezado_ing_prod['material_imprimir'] = this.material_imprimir;
			encabezado_ing_prod['ancho_material'] = this.ancho_material;

			//**********SEGUNDO CUADRO */
			encabezado_ing_prod['cilindro'] = this.cilindro;
			encabezado_ing_prod['cortador'] = this.cortador;
			encabezado_ing_prod['color_seleccionado'] = this.color_seleccionado;
			encabezado_ing_prod['rep_des'] = this.rep_des;
			encabezado_ing_prod['filas'] = this.filas;
			encabezado_ing_prod['columnas'] = this.columnas;
			encabezado_ing_prod['formato_seleccionado'] = this.formato_seleccionado;
			encabezado_ing_prod['cilindro_cod'] = this.cilindro_cod;
			encabezado_ing_prod['troquel_plano_cod'] = this.troquel_plano_cod;
			//encabezado_ing_prod['uv_total'] = this.uv_total
			encabezado_ing_prod['uv_total'] = this.uv_total ? 'SI' : 'NO';
			encabezado_ing_prod['uv_select'] = this.uv_select ? 'SI' : 'NO';
			encabezado_ing_prod['relam_delam'] = this.relam_delam ? 'SI' : 'NO';
			encabezado_ing_prod['hot_stamping_acabados'] = this.hot_stamping ? 'SI' : 'NO';
			encabezado_ing_prod['cold_foild'] = this.hot_stamping ? 'SI' : 'NO';
			encabezado_ing_prod['repujado'] = this.repujado_ing_prod ? 'SI' : 'NO';
			encabezado_ing_prod['laminado_mate'] = this.lami_mate ? 'SI' : 'NO';
			encabezado_ing_prod['laminado_brillan'] = this.lami_brillan ? 'SI' : 'NO';
			
			//*****TABLA PRIMARIOS Y COLORES PLANOS**********
			encabezado_ing_prod['primario_C'] = this.primario_C ? 'SI' : 'NO';
			encabezado_ing_prod['primario_M'] = this.primario_M ? 'SI' : 'NO';
			encabezado_ing_prod['primario_Y'] = this.primario_Y ? 'SI' : 'NO';
			encabezado_ing_prod['primario_K'] = this.primario_K ? 'SI' : 'NO';
			encabezado_ing_prod['pantone_1'] = this.pantone_1;
			encabezado_ing_prod['pantone_2'] = this.pantone_2;
			encabezado_ing_prod['pantone_3'] = this.pantone_3;
			encabezado_ing_prod['pantone_4'] = this.pantone_4;
			encabezado_ing_prod['pantone_5'] = this.pantone_5;
			encabezado_ing_prod['pantone_6'] = this.pantone_6;
			encabezado_ing_prod['pantone_7'] = this.pantone_7;
			//SEGUNDA FILA
			if(this.anilox_vC){
				encabezado_ing_prod['anilox_vC'] = this.anilox_vC;
			}else{
				encabezado_ing_prod['anilox_vC'] = 0;
			}
			if(this.anilox_vM){
				encabezado_ing_prod['anilox_vM'] = this.anilox_vM;
			}else{
				encabezado_ing_prod['anilox_vM'] = 0;
			}
			if(this.anilox_vY){
				encabezado_ing_prod['anilox_vY'] = this.anilox_vY;
			}else{
				encabezado_ing_prod['anilox_vY'] = 0;
			}
			if(this.anilox_vK){
				encabezado_ing_prod['anilox_vK'] = this.anilox_vK;
			}else{
				encabezado_ing_prod['anilox_vK'] = 0;
			}
			encabezado_ing_prod['anilox_1'] = this.anilox_1;
			encabezado_ing_prod['anilox_2'] = this.anilox_2;
			encabezado_ing_prod['anilox_3'] = this.anilox_3;
			encabezado_ing_prod['anilox_4'] = this.anilox_4;
			encabezado_ing_prod['anilox_5'] = this.anilox_5;
			encabezado_ing_prod['anilox_6'] = this.anilox_6;
			encabezado_ing_prod['anilox_7'] = this.anilox_7;
			//TERCERA FILA
			if(this.prov_fabricante_vC){
				encabezado_ing_prod['prov_fabricante_vC'] = this.prov_fabricante_vC;
				
			}else{
				encabezado_ing_prod['prov_fabricante_vC'] = null;
			}

			if(this.prov_fabricante_vM){
				encabezado_ing_prod['prov_fabricante_vM'] = this.prov_fabricante_vM;
				
			}else{
				encabezado_ing_prod['prov_fabricante_vM'] = null;
			}

			if(this.prov_fabricante_vY){
				encabezado_ing_prod['prov_fabricante_vY'] = this.prov_fabricante_vY;
			}else{
				encabezado_ing_prod['prov_fabricante_vY'] = null;	
			}

			if(this.prov_fabricante_vK){
				encabezado_ing_prod['prov_fabricante_vK'] = this.prov_fabricante_vK;
			}else{
				encabezado_ing_prod['prov_fabricante_vK'] = null;

			}
			encabezado_ing_prod['prov_fabricante_1'] = this.prov_fabricante_1;
			encabezado_ing_prod['prov_fabricante_2'] = this.prov_fabricante_2;
			encabezado_ing_prod['prov_fabricante_3'] = this.prov_fabricante_3;
			encabezado_ing_prod['prov_fabricante_4'] = this.prov_fabricante_4;
			encabezado_ing_prod['prov_fabricante_5'] = this.prov_fabricante_5;
			encabezado_ing_prod['prov_fabricante_6'] = this.prov_fabricante_6;
			encabezado_ing_prod['prov_fabricante_7'] = this.prov_fabricante_7;
			//CUARTA FILA
			if(this.tinta_sticky_vC){
				encabezado_ing_prod['tinta_sticky_vC'] = this.tinta_sticky_vC;
			}else{
				encabezado_ing_prod['tinta_sticky_vC'] = null;
			}
			
			if(this.tinta_sticky_vM){
				encabezado_ing_prod['tinta_sticky_vM'] = this.tinta_sticky_vM;
			}else{
				encabezado_ing_prod['tinta_sticky_vM'] = null;
			}
			
			if(this.tinta_sticky_vY){
				encabezado_ing_prod['tinta_sticky_vY'] = this.tinta_sticky_vY;
			}else{
				encabezado_ing_prod['tinta_sticky_vY'] = null;
			}
			
			if(this.tinta_sticky_vK){
				encabezado_ing_prod['tinta_sticky_vK'] = this.tinta_sticky_vK;
			}else{
				encabezado_ing_prod['tinta_sticky_vK'] = null;
			}
			
			encabezado_ing_prod['tinta_sticky_1'] = this.tinta_sticky_1;
			encabezado_ing_prod['tinta_sticky_2'] = this.tinta_sticky_2;
			encabezado_ing_prod['tinta_sticky_3'] = this.tinta_sticky_3;
			encabezado_ing_prod['tinta_sticky_4'] = this.tinta_sticky_4;
			encabezado_ing_prod['tinta_sticky_5'] = this.tinta_sticky_5;
			encabezado_ing_prod['tinta_sticky_6'] = this.tinta_sticky_6;
			encabezado_ing_prod['tinta_sticky_7'] = this.tinta_sticky_7;
			
			//********DISPENSADO***********
			if (this.tipo_dispensado == 'Manual' ){
				encabezado_ing_prod['tipo_dispensado'] = 'Manual';
			}else {
				encabezado_ing_prod['tipo_dispensado'] = 'Automatico';
			}
			encabezado_ing_prod['diametro_rollo'] = this.diametro_rollo;
			encabezado_ing_prod['peso_rollo'] = this.peso_rollo;
			encabezado_ing_prod['medida_dispensado'] = this.medida_dispensado;
			if (this.taca == 'SI' ){
				encabezado_ing_prod['taca'] = 'SI';
			}else{
				encabezado_ing_prod['taca'] = 'NO';
			}
			
			//********SENTIDO SALIDA**********
			encabezado_ing_prod['embobinado_ext_seleccionado'] = this.embobinado_ext_seleccionado;
			if(this.embobinado_interior_seleccionado){
				encabezado_ing_prod['embobinado_interior_seleccionado'] = this.embobinado_interior_seleccionado;
			}
			else{
				encabezado_ing_prod['embobinado_interior_seleccionado'] = null;
			}
			
			//********IMAGEN************
			//encabezado_ing_prod['img_etiqueta'] = this.img_etiqueta;
			if (this.localCompressedURl) {
				encabezado_ing_prod['imagen_comprimida'] = this.localCompressedURl;
			} else if (this.localUrl) {
				encabezado_ing_prod['imagen_original'] = this.localUrl;
			} else {
				encabezado_ing_prod['imagen'] = null;  // No hay imagen disponible
			}
			
			//********FIRMAS***********
			encabezado_ing_prod['ejecutivo_ventas'] = this.ejecutivo_ventas;
			encabezado_ing_prod['impreso_res'] = this.impreso_res;
			encabezado_ing_prod['supervisador_res'] = this.supervisador_res;
			encabezado_ing_prod['jefe_prod'] = this.jefe_prod;

			let status_encabezado
			let numtra
			console.log (encabezado_ing_prod)
			console.log ("DATO CLIENTE")
			console.log (this.dato_cliente)
			
			
			if(encabezado_ing_prod){
				console.log("ENTRO A GENERAR LA ING. DE PRODUCTO")

				this.srv.generar_ing_producto(encabezado_ing_prod).subscribe(
					data => {
							status_encabezado= data['status']
							this.codIngProd= data['CodIngProd']
							console.log(data)
							if (status_encabezado == 'INSERTADO CON EXITO')
								{
									let datos={}
									datos['usuario'] = this.usuario
									datos['empresa'] = this.empresa
									console.log('ING. DE PRODUCTO CREADA CON EXITO')
									if (this.uploadedFiles){
										if (this.upload()){
											alert ("Ing. de Producto creado con exito..!!")
											this.router.navigate(['/admin/lista_ing_productos', datos]);
										}else{
											alert ("Ing. de Producto creado con exito..!!")
											this.router.navigate(['/admin/lista_ing_productos', datos]);
										}
									}
								}
							}
						);
			}else{
				alert("Por favor llene todos los campos")
			}
				
   		}
	}//FIN GENERA ING PRODUCTOS
	
	
	
	actualizar_IngProducto() {
		if (this.validar_datos_actualizar()){ 
			if(this.dato_cliente){

				let encabezado_ing_prod= this.dato_cliente
				//console.log(this.dato_cliente)
				//********PRIMER CUADRO */
				encabezado_ing_prod['codemp'] = this.empresa;
				encabezado_ing_prod['CodIngProd'] = this.codIngProd;
				console.log (this.fectra)
				encabezado_ing_prod['fecIngProd'] = formatDate(this.fectra['value'], 'yyyy-MM-dd', 'en-US', '-0500');
				encabezado_ing_prod['razon_social'] = this.razon_social;
				encabezado_ing_prod['ruc'] = this.ruc;
				//encabezado_ing_prod['nombre_comercial'] = this.nombre_comercial;
				encabezado_ing_prod['nombre_comercial'] = this.razon_social;
				encabezado_ing_prod['referencia'] = this.referencia;
				encabezado_ing_prod['medida_alto'] = this.medida_alto;
				encabezado_ing_prod['medida_ancho'] = this.medida_ancho;
				encabezado_ing_prod['proveedor'] = this.proveedor;
				encabezado_ing_prod['impresora'] = this.impresora;
				encabezado_ing_prod['bobinadora'] = this.bobinadora;
				encabezado_ing_prod['material_imprimir'] = this.material_imprimir;
				encabezado_ing_prod['ancho_material'] = this.ancho_material;

				//**********SEGUNDO CUADRO */
				encabezado_ing_prod['cilindro'] = this.cilindro;
				encabezado_ing_prod['cortador'] = this.cortador;
				encabezado_ing_prod['color_seleccionado'] = this.color_seleccionado;
				encabezado_ing_prod['rep_des'] = this.rep_des;
				encabezado_ing_prod['filas'] = this.filas;
				encabezado_ing_prod['columnas'] = this.columnas;
				encabezado_ing_prod['formato_seleccionado'] = this.formato_seleccionado;
				encabezado_ing_prod['cilindro_cod'] = this.cilindro_cod;
				encabezado_ing_prod['troquel_plano_cod'] = this.troquel_plano_cod;
				//encabezado_ing_prod['uv_total'] = this.uv_total
				encabezado_ing_prod['uv_total'] = this.uv_total ? 'SI' : 'NO';
				encabezado_ing_prod['uv_select'] = this.uv_select ? 'SI' : 'NO';
				encabezado_ing_prod['relam_delam'] = this.relam_delam ? 'SI' : 'NO';
				encabezado_ing_prod['hot_stamping_acabados'] = this.hot_stamping ? 'SI' : 'NO';
				encabezado_ing_prod['cold_foild'] = this.hot_stamping ? 'SI' : 'NO';
				encabezado_ing_prod['repujado'] = this.repujado_ing_prod ? 'SI' : 'NO';
				encabezado_ing_prod['laminado_mate'] = this.lami_mate ? 'SI' : 'NO';
				encabezado_ing_prod['laminado_brillan'] = this.lami_brillan ? 'SI' : 'NO';
				
				//*****TABLA PRIMARIOS Y COLORES PLANOS**********
				encabezado_ing_prod['primario_C'] = this.primario_C ? 'SI' : 'NO';
				encabezado_ing_prod['primario_M'] = this.primario_M ? 'SI' : 'NO';
				encabezado_ing_prod['primario_Y'] = this.primario_Y ? 'SI' : 'NO';
				encabezado_ing_prod['primario_K'] = this.primario_K ? 'SI' : 'NO';
				encabezado_ing_prod['pantone_1'] = this.pantone_1;
				encabezado_ing_prod['pantone_2'] = this.pantone_2;
				encabezado_ing_prod['pantone_3'] = this.pantone_3;
				encabezado_ing_prod['pantone_4'] = this.pantone_4;
				encabezado_ing_prod['pantone_5'] = this.pantone_5;
				encabezado_ing_prod['pantone_6'] = this.pantone_6;
				encabezado_ing_prod['pantone_7'] = this.pantone_7;
				//SEGUNDA FILA
				if(this.anilox_vC){
					encabezado_ing_prod['anilox_vC'] = this.anilox_vC;
				}else{
					encabezado_ing_prod['anilox_vC'] = 0;
				}
				if(this.anilox_vM){
					encabezado_ing_prod['anilox_vM'] = this.anilox_vM;
				}else{
					encabezado_ing_prod['anilox_vM'] = 0;
				}
				if(this.anilox_vY){
					encabezado_ing_prod['anilox_vY'] = this.anilox_vY;
				}else{
					encabezado_ing_prod['anilox_vY'] = 0;
				}
				if(this.anilox_vK){
					encabezado_ing_prod['anilox_vK'] = this.anilox_vK;
				}else{
					encabezado_ing_prod['anilox_vK'] = 0;
				}
				encabezado_ing_prod['anilox_1'] = this.anilox_1;
				encabezado_ing_prod['anilox_2'] = this.anilox_2;
				encabezado_ing_prod['anilox_3'] = this.anilox_3;
				encabezado_ing_prod['anilox_4'] = this.anilox_4;
				encabezado_ing_prod['anilox_5'] = this.anilox_5;
				encabezado_ing_prod['anilox_6'] = this.anilox_6;
				encabezado_ing_prod['anilox_7'] = this.anilox_7;
				//TERCERA FILA
				if(this.prov_fabricante_vC){
					encabezado_ing_prod['prov_fabricante_vC'] = this.prov_fabricante_vC;
					
				}else{
					encabezado_ing_prod['prov_fabricante_vC'] = null;
				}

				if(this.prov_fabricante_vM){
					encabezado_ing_prod['prov_fabricante_vM'] = this.prov_fabricante_vM;
					
				}else{
					encabezado_ing_prod['prov_fabricante_vM'] = null;
				}

				if(this.prov_fabricante_vY){
					encabezado_ing_prod['prov_fabricante_vY'] = this.prov_fabricante_vY;
				}else{
					encabezado_ing_prod['prov_fabricante_vY'] = null;	
				}
				
				if(this.prov_fabricante_vK){
					encabezado_ing_prod['prov_fabricante_vK'] = this.prov_fabricante_vK;
				}else{
					encabezado_ing_prod['prov_fabricante_vK'] = null;
					
				}
				encabezado_ing_prod['prov_fabricante_1'] = this.prov_fabricante_1;
				encabezado_ing_prod['prov_fabricante_2'] = this.prov_fabricante_2;
				encabezado_ing_prod['prov_fabricante_3'] = this.prov_fabricante_3;
				encabezado_ing_prod['prov_fabricante_4'] = this.prov_fabricante_4;
				encabezado_ing_prod['prov_fabricante_5'] = this.prov_fabricante_5;
				encabezado_ing_prod['prov_fabricante_6'] = this.prov_fabricante_6;
				encabezado_ing_prod['prov_fabricante_7'] = this.prov_fabricante_7;
				//CUARTA FILA
				if(this.tinta_sticky_vC){
					encabezado_ing_prod['tinta_sticky_vC'] = this.tinta_sticky_vC;
				}else{
					encabezado_ing_prod['tinta_sticky_vC'] = null;
				}
				
				if(this.tinta_sticky_vM){
					encabezado_ing_prod['tinta_sticky_vM'] = this.tinta_sticky_vM;
				}else{
					encabezado_ing_prod['tinta_sticky_vM'] = null;
				}
				
				if(this.tinta_sticky_vY){
					encabezado_ing_prod['tinta_sticky_vY'] = this.tinta_sticky_vY;
				}else{
					encabezado_ing_prod['tinta_sticky_vY'] = null;
				}
				
				if(this.tinta_sticky_vK){
					encabezado_ing_prod['tinta_sticky_vK'] = this.tinta_sticky_vK;
				}else{
					encabezado_ing_prod['tinta_sticky_vK'] = null;
				}
				
				encabezado_ing_prod['tinta_sticky_1'] = this.tinta_sticky_1;
				encabezado_ing_prod['tinta_sticky_2'] = this.tinta_sticky_2;
				encabezado_ing_prod['tinta_sticky_3'] = this.tinta_sticky_3;
				encabezado_ing_prod['tinta_sticky_4'] = this.tinta_sticky_4;
				encabezado_ing_prod['tinta_sticky_5'] = this.tinta_sticky_5;
				encabezado_ing_prod['tinta_sticky_6'] = this.tinta_sticky_6;
				encabezado_ing_prod['tinta_sticky_7'] = this.tinta_sticky_7;
				
				//********DISPENSADO***********
				if (this.tipo_dispensado == 'Manual' ){
					encabezado_ing_prod['tipo_dispensado'] = 'Manual';
				}else {
					encabezado_ing_prod['tipo_dispensado'] = 'Automatico';
				}
				encabezado_ing_prod['diametro_rollo'] = this.diametro_rollo;
				encabezado_ing_prod['peso_rollo'] = this.peso_rollo;
				encabezado_ing_prod['medida_dispensado'] = this.medida_dispensado;
				if (this.taca == 'SI' ){
					encabezado_ing_prod['taca'] = 'SI';
				}else{
					encabezado_ing_prod['taca'] = 'NO';
				}
				
				//********SENTIDO SALIDA**********
				encabezado_ing_prod['embobinado_ext_seleccionado'] = this.embobinado_ext_seleccionado;
				if(this.embobinado_interior_seleccionado){
					encabezado_ing_prod['embobinado_interior_seleccionado'] = this.embobinado_interior_seleccionado;
				}
				else{
					encabezado_ing_prod['embobinado_interior_seleccionado'] = null;
				}
				
				//********IMAGEN************
				//encabezado_ing_prod['img_etiqueta'] = this.img_etiqueta;
				if (this.localCompressedURl) {
					encabezado_ing_prod['imagen_comprimida'] = this.localCompressedURl;
				} else if (this.localUrl) {
					encabezado_ing_prod['imagen_original'] = this.localUrl;
				} else {
					encabezado_ing_prod['imagen'] = null;  // No hay imagen disponible
				}
				
				//********FIRMAS***********
				encabezado_ing_prod['ejecutivo_ventas'] = this.ejecutivo_ventas;
				encabezado_ing_prod['impreso_res'] = this.impreso_res;
				encabezado_ing_prod['supervisador_res'] = this.supervisador_res;
				encabezado_ing_prod['jefe_prod'] = this.jefe_prod;

				let status_encabezado
				let numtra
				console.log ("DATO CLIENTE")
				console.log (encabezado_ing_prod)
				if(encabezado_ing_prod){
					console.log("ENTRO A ACTUALIZAR LA ING. DE PRODUCTO")

					this.srv.actualizar_ing_producto(encabezado_ing_prod).subscribe(
					data => {
						status_encabezado= data['status']
						//this.codIngProd= data['codIngProd']
						console.log(data)
						if (status_encabezado == 'ACTUALIZADO CON EXITO')
							{
								console.log('SE ACTUALIZO LA ING. DE PRODUCTO')

								let datos={}
								datos['usuario'] = this.usuario
								datos['empresa'] = this.empresa
								if (this.uploadedFiles){
									if (this.upload()){
										alert ("Ing. de Producto actualizada con exito..!!")
										this.router.navigate(['/admin/lista_ing_productos', datos]);
									}else{
										alert ("Ing. de Producto actualizada con exito..!!")
										this.router.navigate(['/admin/lista_ing_productos', datos]);
									}
								}else{
									alert ("Ing. de Producto actualizada con exito..!!")
									this.router.navigate(['/admin/lista_ing_productos', datos]);
								}
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
	  this.vendedor = '01'
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
