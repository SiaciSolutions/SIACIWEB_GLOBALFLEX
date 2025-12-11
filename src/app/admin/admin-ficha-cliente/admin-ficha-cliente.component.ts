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
import { NullAstVisitor } from '@angular/compiler';

declare var AdminLTE: any;
export interface Fila {
  codigo: string;
  descripcion: string;
  troquel: string;

  pantone1: string;
  pantone2: string;
  pantone3: string;
  pantone4: string;
  pantone5: string;
  pantone6: string;
  pantone7: string;

  pantone_delta1: string;
  pantone_delta2: string;
  pantone_delta3: string;
  pantone_delta4: string;
  pantone_delta5: string;
  pantone_delta6: string;
  pantone_delta7: string;

  pantone_extra1: string;
  pantone_extra2: string;
  pantone_extra3: string;
  pantone_extra4: string;
  pantone_extra5: string;
  pantone_extra6: string;
  pantone_extra7: string;

  acabado: string;
  dispensado: string;
  bobinado_ext: string;
  bobinado_int: string;
  v_millar: number | 0;
  observacion: string;
}


@Component({
  selector: 'app-admin-ficha-cliente',
  templateUrl: './admin-ficha-cliente.component.html',
  styleUrls: ['./admin-ficha-cliente.component.css']
})


export class AdminFichaClienteComponent implements OnInit {
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
  accion_actualizar_contacto = false
  almacenes_lista
  almacen
  
  ///USADOS
  calculocs: boolean = false;
  bandera: boolean = false;
  currentSection: string = 'ingreso';
  estado: string;
  filas: number;
  tipoSeleccionado: string;
  
  nomcli: string;
  datos: any = {};
  codart: string;
  nombre_producto: string; 

  direccion: string;
  telefono: string;
  nombreC: string;
  ciudad: string;
  contacto_pagos: string;
  telefono_pagos: string;
  contacto_compras: string;
  telefono_compras: string;
  condiciones: string;
  ejecutivo: string;
  modificar: boolean = false;
  lista_ficha: string;
  filasR: Fila[] = [];
  mostrarModal = false;
  filtroBusqueda = '';
  resultadosBusqueda: any[] = [];
  listavendedores: any[] = [];
  indexFilaSeleccionada: number = -1;
  observacion_general: string = '';  
  
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
    this.nomcli = params['nomcli'] || this.route.snapshot.paramMap.get('nomcli') || '';
    
    console.log("LUEGO DE ENTRADA")
  if (this.nomcli == ''){
    this.nomcli = undefined
    this.accion_actualizar = false
    this.bandera = false
    window.scrollTo(0,0);
    //this.ingProducto_nuevo()
  }else {
    window.scrollTo(0,0);
    this.accion_actualizar = true
    this.bandera = false
    this.patron_cliente = this.nomcli
    this.busqueda_razon_social_ficha();
  }
    
    });
  console.log(this.usuario)
  console.log(this.empresa)
  console.log(this.nomcli)
   }); //FIN ROUTING
  
  } //FIN COSNTRUCTOR
  
    busca_articulo() { 
      if (this.patron_articulo ){
        this.searching_articulo = true
        let datos = {};
        datos['nomart']  = this.patron_articulo;
        datos['codemp']  = this.empresa;
        datos['lista_ficha']  = 'CONFIN';
        datos['codalm']  = '01';
          this.srv.buscar_articulos_pedido(datos).subscribe(data => {
            
          let longitud_data = data.length

          if (longitud_data > 0 ) {
            console.log(data)
            this.articulo = data;
            this.exist_articulo = true;
            this.searching_articulo = false
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
      this.exist_articulo = false;
      this.patron_articulo = undefined;
      this.codart = codart
      this.nombre_producto = nomart
    }

    modificar_cliente(){
      this.modificar = true;
    }

    obtener_ejecutivos(){
      const params = {
        usuario: this.usuario,
        codemp: this.empresa
      };

      this.srv.impreso(params).subscribe((res: any[]) => {
        this.listavendedores = res;
      });
    }

    busqueda_razon_social_ficha() { 
    if (this.patron_cliente){
      const datos = {};
      datos['codemp'] = this.empresa;
      datos['patron_cliente'] = this.patron_cliente;
        this.srv.busqueda_razon_social(datos).subscribe(data => {		
          let longitud_data = data.length

        if (longitud_data > 0 ) {
          console.log(data)

          this.razon_social_lista = data;
          this.exist_razon_social = true;		
          this.select_razon_social_ficha();
        }else {
          alert("Razon Social no encontrado con la palabra clave ingresada <<"+this.patron_cliente+">>");
          this.exist_razon_social = false;
        }
          

        }); 
    }else  { 
      alert("Por favor llenar el campo Razon Social");
    }
  } 

  busqueda_razon_social() { 
    this.reset();
    if (this.patron_cliente){
      const datos = {};
      datos['codemp'] = this.empresa;
      datos['patron_cliente'] = this.patron_cliente;
        this.srv.busqueda_razon_social(datos).subscribe(data => {		
          let longitud_data = data.length

        if (longitud_data > 0 ) {
          console.log(data)

          this.razon_social_lista = data;
          this.exist_razon_social = true;		
          
        }else {
          alert("Razon Social no encontrado con la palabra clave ingresada <<"+this.patron_cliente+">>");
          this.exist_razon_social = false;
        }
          

        }); 
    }else  { 
      alert("Por favor llenar el campo Razon Social");
    }
  }

  buscarPorCodigo(codigo: string, i:number){
    let datos = {
        codemp: this.empresa,
        codart: codigo
      };
      this.srv.buscar_articulo(datos).subscribe(
      data=>{
        this.datos = data
        if(this.datos.length > 0){
          this.filasR[i].codigo = this.datos[0].codart;
          this.filasR[i].descripcion = this.datos[0].nomart;
        }else{
          alert("No existe producto");
        }
      }
    )	
  }

  abrirModalBusqueda(index: number) {
    this.indexFilaSeleccionada = index;
    this.filtroBusqueda = '';
    this.resultadosBusqueda = [];
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  buscarArticulo() {
    if (this.filtroBusqueda.length < 2) return;

    const params = {
      filtro: this.filtroBusqueda,
      codemp: this.empresa
    };

    this.srv.buscar_articulo(params).subscribe((res: any[]) => {
      this.resultadosBusqueda = res;
    });
  }

  seleccionarArticulo(articulo: any) {
    if (this.indexFilaSeleccionada >= 0) {
      const fila = this.filasR[this.indexFilaSeleccionada];
      fila.codigo = articulo.codart;
      fila.descripcion = articulo.nomart;
    }
    this.cerrarModal();
  }


  agregarFila() {
    this.filasR.push({
      codigo: '',
      descripcion: '',
      troquel: '',
      pantone1: '', pantone2: '', pantone3: '',
      pantone4: '', pantone5: '', pantone6: '',pantone7: '',
      pantone_delta1: '', pantone_delta2: '', pantone_delta3: '',
      pantone_delta4: '', pantone_delta5: '', pantone_delta6: '', pantone_delta7: '',
      pantone_extra1: '', pantone_extra2: '', pantone_extra3: '',
      pantone_extra4: '', pantone_extra5: '', pantone_extra6: '', pantone_extra7: '',
      acabado: '',
      dispensado: '',
      bobinado_ext:'', bobinado_int:'',
      v_millar: 0,
      observacion: ''
    });
  }


  eliminarFila(index: number) {
    const item = this.filasR[index];
    const datos = {
      codemp: this.empresa,
      codcli: this.lista_ficha,
      codigo: item.codigo
    };

    this.srv.eliminar_registro(datos).subscribe(
      response => {
        if (response && response.STATUS === 'EXITOSO') {
          this.filasR.splice(index, 1);
        } else {
          alert("No se pudo eliminar el registro de la base de datos.");
        }
      },
      error => {
        console.error("Error al eliminar:", error);
        alert("Ocurrió un error al intentar eliminar.");
      }
    );
  }

  actualizarFila(item: any) {
    const datos = {
      codemp: this.empresa,
      codcli: this.lista_ficha,
      codigo: item.codigo,
      descripcion: item.descripcion,
      troquel: item.troquel,
      pantone1: item.pantone1,
      pantone2: item.pantone2,
      pantone3: item.pantone3,
      pantone4: item.pantone4,
      pantone5: item.pantone5,
      pantone6: item.pantone6,
      pantone7: item.pantone7,
      pantone_delta1: item.pantone_delta1,
      pantone_delta2: item.pantone_delta2,
      pantone_delta3: item.pantone_delta3,
      pantone_delta4: item.pantone_delta4,
      pantone_delta5: item.pantone_delta5,
      pantone_delta6: item.pantone_delta6,      
      pantone_delta7: item.pantone_delta7,
      pantone_extra1: item.pantone_extra1,
      pantone_extra2: item.pantone_extra2,
      pantone_extra3: item.pantone_extra3,
      pantone_extra4: item.pantone_extra4,
      pantone_extra5: item.pantone_extra5,
      pantone_extra6: item.pantone_extra6,
      pantone_extra7: item.pantone_extra7,
      acabado: item.acabado,
      dispensado: item.dispensado,
      bobinado_ext: item.bobinado_ext,
      bobinado_int: item.bobinado_int,
      v_millar: item.v_millar,
      observacion: item.observacion
    };

    this.srv.actualizar_registro(datos).subscribe(
      response => {
        if (response && response.STATUS === 'EXITOSO') {
          alert("Actualizado correctamente.");
        } else {
          alert("No se pudo actualizar.");
        }
      },
      error => {
        console.error("Error al actualizar:", error);
        alert("Ocurrió un error al intentar actualizar.");
      }
    );
  }

  select_razon_social_ficha() {
    console.log ("Seleccion de cliente")
     
     this.dato_cliente= {"nomcli":this.razon_social_lista[0].nomcli,
      "rucced":this.razon_social_lista[0].rucced,
      "email":this.razon_social_lista[0].email,
      "lista_ficha":this.razon_social_lista[0].codcli,
      "dircli":this.razon_social_lista[0].dircli, 
      "telefono": this.razon_social_lista[0].telefono, 
      "nombreC": this.razon_social_lista[0].nombreC, 
      "ciucli": this.razon_social_lista[0].ciucli}
     this.ruc = this.razon_social_lista[0].rucced
     this.razon_social = this.razon_social_lista[0].nomcli
     this.email_cliente = this.razon_social_lista[0].email
     this.lista_ficha = this.razon_social_lista[0].codcli
     this.telefono = this.razon_social_lista[0].telefono
     this.nombreC = this.razon_social_lista[0].nombreC
     this.ciudad = this.razon_social_lista[0].ciucli
     this.direccion = this.razon_social_lista[0].dircli
     this.clientes = true;
     this.exist_razon_social = false;
     this.patron_cliente = undefined;
      this.buscar_contacto();
      this.obtener_registro();
  }
  select_razon_social(ident,ruc,rz,correo,lista_ficha,dircli, telf, nomC, ciucli) {
    console.log ("Seleccion de cliente")
     
     this.dato_cliente= {"nomcli":rz,"rucced":ruc,"email":correo,"lista_ficha":lista_ficha,"dircli":dircli, "telefono": telf, "nombreC": nomC, "ciucli": ciucli}
     this.ruc = ruc
     this.razon_social = rz
     this.email_cliente = correo
     this.lista_ficha = lista_ficha
     this.telefono = telf
     this.nombreC = nomC
     this.ciudad = ciucli
     this.direccion = dircli
     this.clientes = true;
     this.exist_razon_social = false;
     this.patron_cliente = undefined;
      this.buscar_contacto();
      this.obtener_registro();
  }

  buscar_contacto(){
      let datos = {
        codemp: this.empresa,
        codcli: this.lista_ficha,
      };
      this.srv.buscar_contacto(datos).subscribe(
      data=>{
        this.datos = data
        if(this.datos.length > 0){
          this.contacto_pagos = this.datos[0].cpago
          this.telefono_pagos = this.datos[0].telpago
          this.contacto_compras = this.datos[0].ccompra
          this.telefono_compras = this.datos[0].telcompra
          this.condiciones= this.datos[0].condicion
          this.ejecutivo = this.datos[0].ejecutivo
          this.observacion_general = this.datos[0].observacion_general
          this.accion_actualizar_contacto = true;
        }else{
          alert("No existe contacto vinculado a este cliente");
          this.accion_actualizar_contacto = false;
        }
      }
    )	
  }
  
  insertar_registro() {
    if (this.validar_datos()) {
      if (this.validar_datos_tabla()) {
        let datos = {
          codemp: this.empresa,
          codcli: this.lista_ficha,
          arreglo: this.filasR
        };

        this.srv.insertar_registro(datos).subscribe(
          data => {
            this.datos = data;
            if (this.datos.STATUS === "EXITOSO" && this.datos.INSERTADOS > 0) {
              alert("Insertado correctamente");
            } else {
              alert("No se insertó correctamente");
            }
          },
          error => {
            console.error("Error al insertar:", error);
            alert("Ocurrió un error al insertar.");
          }
        );
      } else {
        alert("Por favor, ingresar un producto o revisar V_Millar numérico");
      }
    } else {
      alert("Por favor, llenar datos de contacto");
    }
  }

  obtener_registro() {
    const datos = {
      codemp: this.empresa,
      codcli: this.lista_ficha
    };

    this.srv.obtener_registro(datos).subscribe(
      data => {
        if (data && data.length > 0) {
          this.filasR = data;
        } else {
          this.filasR = [];
          alert("No existen detalles de productos.");
        }
      },
      error => {
        console.error("Error al obtener registros:", error);
        alert("Ocurrió un error al obtener los datos.");
      }
    );
  }


  agregar_contacto(){
    if(this.validar_datos()){
      let datos = {
        codemp: this.empresa,
        codcli: this.lista_ficha,
        cpago: this.contacto_pagos,
        telpago: this.telefono_pagos,
        ccompra: this.contacto_compras,
        telcompra: this.telefono_compras,
        condicion: this.condiciones,
        ejecutivo: this.ejecutivo,
        observacion_general: this.observacion_general
      };
      this.srv.agregar_contacto(datos).subscribe(
        data=>{
          this.datos = data
          if (this.datos.STATUS === "EXITOSO") {
            this.accion_actualizar = true;
            alert("Contacto agregado correctamente.");
          } else {
            alert("No se pudo agregar contacto.");
          }        
        }
      );
    }else{
      alert("Llenar todos los campos")
    }
  }
  actualizar_contacto() {
    if(this.validar_datos()){
      let datos = {
        codemp: this.empresa,
        codcli: this.lista_ficha,
        cpago: this.contacto_pagos,
        telpago: this.telefono_pagos,
        ccompra: this.contacto_compras,
        telcompra: this.telefono_compras,
        condicion: this.condiciones,
        ejecutivo: this.ejecutivo,
        observacion_general: this.observacion_general
      };

      this.srv.actualizar_contacto(datos).subscribe(
        data => {
          this.datos = data;
          if (this.datos.STATUS === "EXITOSO") {
            alert("Contacto actualizado correctamente.");
          } else {
            alert("No se pudo actualizar.");
          }
        },
        error => {
          console.error("Error al actualizar:", error);
        }
      );
    }else{
      alert("Llenar todos los campos")
    }
  }

  
  showIngresoDatos() {
    this.currentSection = 'ingreso';
  }
  showDatos() {
    this.currentSection = 'datos';
  }

    ngOnInit() {
    AdminLTE.init();
    this.obtener_ejecutivos();
  }
  
  formato_fecha (fecha){
    return formatDate(fecha, 'dd-MM-yyyy', 'en-US', '-0500')
  }
  
  //VALIDADOR DATOS AL CREAR
  validar_datos(): boolean { 
    console.log("### VALIDAR DATOS ###");
  
    if (this.contacto_compras == null || this.contacto_compras == '') {
      return false;
    } 
    if (this.telefono_compras == null || this.telefono_compras == '') {
      return false;
    } 
    if (this.contacto_pagos == null || this.contacto_pagos == '') {
      return false;
    } 
    if (this.telefono_pagos == null || this.telefono_pagos == '') {
      return false;
    } 
    if (this.condiciones == null || this.condiciones == '') {
      return false;
    }
    if (this.ejecutivo == null || this.ejecutivo == ''){
      return false;
    } 
    return true;
  }

  validar_datos_tabla(): boolean { 
    console.log("### VALIDAR DATOS ###");
    console.log (this.filasR)
    for (const item of this.filasR){
      if ((item.codigo == null|| item.codigo == '') || (item.descripcion ==  null || item.descripcion == '')){
        return false;
      }
    //  if (typeof item.v_millar !== 'number' || isNaN(item.v_millar)){
   //     return false;
    //  }
    } 
    return true;
  }
  
  
 
 
  reset() {
    this.ruc = null
    this.razon_social = null
    this.email_cliente = null
    this.lista_ficha = null
    this.telefono = null
    this.nombreC = null
    this.ciudad = null
    this.direccion = null
    this.lista_ficha = null
    this.contacto_pagos = null
    this.telefono_pagos = null
    this.contacto_compras = null
    this.telefono_compras = null
    this.condiciones = null
    this.ejecutivo = null
    this.observacion_general = null
    this.filasR = []
  }


  
}
