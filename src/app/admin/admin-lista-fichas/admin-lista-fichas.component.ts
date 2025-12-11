import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute,Params,RouterEvent } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormControl } from "@angular/forms";
import {Observable} from 'rxjs';
import {formatDate} from '@angular/common';
import {MatSelectionList} from '@angular/material'
import {DataTableDirective} from 'angular-datatables';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


declare var AdminLTE: any;
@Component({
  selector: 'app-admin-lista-fichas',
  templateUrl: './admin-lista-fichas.component.html',
  styleUrls: ['./admin-lista-fichas.component.css']
})
export class AdminListaFichasComponent implements OnInit {
  @ViewChild(DataTableDirective) 
    datatableElement: DataTableDirective;
      dtOptions:any = {};
    usuario;
    empresa;
    codIngProd;
    lista_pedidos
    lista_ficha
    lista_pedidos_tabla
    lista_ficha_tabla
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

    public razon_social : string;
    public email_cliente : string;
    public patron_cliente
    public razon_social_lista
    public exist_razon_social : boolean;
    datos: any = {};
    dato_cliente
    ruc = '';
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
    filasR: any[] = [];
    
  
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
    
    this.srv.lista_ficha(datos).subscribe(
       data => {
         console.log(data)
         console.log ("EJECUTADA DATA")
        this.lista_ficha_tabla = data
      }); 
      
      setTimeout(()=> {	
        console.log("TIME OUT")
        this.lista_ficha = this.lista_ficha_tabla
        this.listado_original = this.lista_ficha
        
        
      this.dtOptions = {
        order: [0, 'asc'],
        dom: 'Bfrtip',
        buttons: [{
                  extend: 'print',
                  filename: 'LISTA_FICHAS_DE_PRODUCTOS_SIACI_WEB_'+this.usuario
              },
              {
                  extend: 'excel',
                  filename: 'LISTA_FICHAS_DE_PRODUCTOS_SIACI_WEB_'+this.usuario
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
    
    this.srv.lista_ficha(datos).subscribe(
       data => {
         console.log(data)
         console.log ("EJECUTADA DATA")
        this.lista_ficha_tabla = data
      }); 
      
      setTimeout(()=> {	
        console.log("TIME OUT")
        this.lista_ficha = this.lista_ficha_tabla
        this.listado_original = this.lista_ficha
          
      this.dtOptions = {
        order: [0, 'asc'],
        dom: 'Bfrtip',
        buttons: [{
                  extend: 'print',
                  filename: 'LISTA_FICHAS_DE_PRODUCTOS_SIACI_WEB_'
              },
              {
                  extend: 'excel',
                  filename: 'LISTA_FICHAS_DE_PRODUCTOS_SIACI_WEB_'
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
  
    this.srv.lista_ficha(datos).subscribe(
       data => {
         console.log(data)
         console.log ("EJECUTADA DATA")
        this.lista_ficha = data
        this.render_table(this.lista_ficha_tabla);
      });   
    }
    
      render_table(new_list): void {
  
      this.loading = true
      this.lista_ficha_tabla = undefined
      setTimeout(()=> {	
        console.log("TIME OUT")
        this.lista_ficha_tabla = new_list
      
        this.dtOptions = {
          order: [0, 'asc'],
          dom: 'Bfrtip',
          buttons: [{
            extend: 'print',
            filename: 'LISTA_FICHAS_DE_PRODUCTOS_SIACI_WEB_'+this.usuario
          },
          {
            extend: 'excel',
            filename: 'LISTA_FICHAS_DE_PRODUCTOS_SIACI_WEB_'+this.usuario
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
  
    eliminar_cotizacion(codcli): void {
      let datos = {};
      this.loading = true;
      datos['codemp'] = this.empresa;	
      datos['codcli'] = codcli;	
      
    
      if (confirm("ESTAS SEGURO DE ELIMINAR ESTA FICHA ?")){
        this.srv.eliminar_ficha(datos).subscribe(
           data => {
             console.log (data)
             if (data['STATUS'] == 'EXITOSO'){
             alert("Ficha ha sido eliminada con Exito..!!!")
               
             }else{
            alert("Error al eliminar ficha por el siguiente error: "+data['STATUS'] )
             }
             
            this.ngOnInit()
          }); 
      }else{
        this.loading = false;
      }
      
    }
    busqueda_razon_social_ficha(nomcli) { 
      const datos = {};
        datos['codemp'] = this.empresa;
        datos['patron_cliente'] = nomcli;
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
      this.exist_razon_social = false;
      this.patron_cliente = undefined;
        this.buscar_contacto();
        
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
            this.obtener_registro();
          }else{
            alert("No existe contacto vinculado a este cliente");
          }
        }
      )	
    }

    obtener_registro() {
      let datos = {
        codemp: this.empresa,
        codcli: this.lista_ficha
      };

      this.srv.obtener_registro(datos).subscribe(
        data => {
          if (data && data.length > 0) {
            this.filasR = data; // Asigna los datos directamente al arreglo de filas
            this.generarPDF();
          } else {
            alert("No existen detalles de productos.");
          }
        },
        error => {
          console.error("Error al obtener registros:", error);
          alert("Ocurrió un error al obtener los datos.");
        }
      );
    }

    generarPDF(): void {
      // Crear documento en orientación horizontal
      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

      // Título
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('FICHA DE CLIENTE', 148.5, 15, { align: 'center' }); // A4 landscape center

      // Datos del cliente
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');

      const datos = [
        ['RAZON SOCIAL:', this.razon_social],
        ['RUC:', this.ruc],
        ['NOMBRE COMERCIAL:', this.nombreC],
        ['CIUDAD:', this.ciudad],
        ['DIRECCION:', this.direccion],
        ['TELEFONOS:', this.telefono],
        ['CONTACTO PAGOS:', this.contacto_pagos],
        ['TELEFONO PAGOS:', this.telefono_pagos],
        ['CONTACTO COMPRAS:', this.contacto_compras],
        ['TELEFONO COMPRAS:', this.telefono_compras],
        ['EMAIL:', this.email_cliente],
        ['CONDICIONES PAGO:', this.condiciones],
        ['EJECUTIVO:', this.ejecutivo],
      ];

      autoTable(doc, {
        startY: 20,
        body: datos,
        theme: 'plain',
        styles: { fontSize: 9 },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 50 },
          1: { cellWidth: 200 },
        },
      });

      // Tabla de productos
      const columnas = [
        'CODIGO', 'DESCRIPCION', 'TROQUEL',
        'P1', 'P2', 'P3', 'P4', 'P5', 'P6',
        'ACABADO', 'V/MILLAR', 'OBSERVACION'
      ];

      const filas = this.filasR.map(f => [
        f.codigo, f.descripcion, f.troquel,
        f.pantone1, f.pantone2, f.pantone3, f.pantone4, f.pantone5, f.pantone6,
        f.acabado, f.v_millar, f.observacion
      ]);

      autoTable(doc, {
        head: [columnas],
        body: filas,
        startY: doc.lastAutoTable.finalY + 10,
        styles: {
          fontSize: 7,       // Letra más pequeña
          cellPadding: 1.5,
          overflow: 'linebreak',
        },
        headStyles: {
          fillColor: [0, 122, 204],
          textColor: 255,
          fontSize: 8,
        },
      });

      doc.save('FICHA_CLIENTE_'+this.razon_social+'.pdf');
    }


  generar_pdf_ficha(codcli,rucced) {
		
		// let confirm_pedido = confirm('Usted va a reenviar correo del pedido a su cliente, está seguro de reenviar?');
		// if (confirm_pedido){
		
		console.log("GENERAR Y REDIRECCIONAR PDF")
		console.log (codcli)
		this.espera_generar_pdf = true;
		
		window.scrollTo(0, 0);

		// alert("Por favor ingrese RUC del cliente");
			// if (email) {
				
				let datos = {};
				datos['codemp'] = this.empresa;
				datos['usuario'] = this.usuario;
				// datos['nomcli'] = nomcli
				datos['codcli'] = codcli;
        datos['rucced']= rucced;

				this.srv.generar_pdf_ficha_cliente(datos).subscribe(
					data => {
						
						this.espera_generar_pdf = false;
						console.log(data)
						let datos_url = this.srv.apiUrl+':'+this.srv.port;
						console.log(datos_url)
						window.open(
						  datos_url+'/ver_pdf_pedido/'+data['PDF'],
						  '_blank' // <- This is what makes it open in a new window.
						);
					},
					error => {
						this.espera_generar_pdf = false;
						
					}
				)

	}//FIN ENVIO CORREO PEDIDO
      
  }

  