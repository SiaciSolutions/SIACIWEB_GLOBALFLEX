from docxtpl import DocxTemplate
from docxtpl import InlineImage
from docx.shared import Mm
import sys
import os
import comtypes.client
import win32com.client
import win32process
import shutil
import coneccion
import sqlanydb
from jinja2 import Environment, FileSystemLoader
from reportlab.graphics.barcode import code93
from reportlab.graphics.barcode import code39
from reportlab.graphics.barcode import usps
from reportlab.graphics.barcode import usps4s
from reportlab.graphics.barcode import ecc200datamatrix
from reportlab.graphics.barcode import code128
from xhtml2pdf import pisa             # import python module


def convert_decimal(d):
	print ("ESTOY EN CONVERT")
	total_pedido = str(format(d,",.2f")).replace(',',' ')
	total_pedido = str(total_pedido).replace('.',',')
	total_pedido = str(total_pedido).replace(' ','.')
	total_pedido = str(total_pedido).replace(',00','')
	return total_pedido
	
def from_template(template, output):
		"""
		Generate a pdf from a html file
		
		Parameters
		----------
		source : str
			content to write in the pdf file
		output  : str
			name of the file to create
		"""
		## Reading our template
		source_html = open(template, "r")
		content = source_html.read() ## the HTML to convert
		source_html.close() ## close template file
		
		html_to_pdf(content, output)

# Methods section ....
def html_to_pdf(content, output):
		"""
		Generate a pdf using a string content
		
		Parameters
		----------
		content : str
			content to write in the pdf file
		output  : str
			name of the file to create
		"""
		## Open file to write
		result_file = open(output, "w+b") # w+b to write in binary mode.
		
		## convert HTML to PDF
		pisa_status = pisa.CreatePDF(
				content,                   # the HTML to convert
				dest=result_file	       # file handle to recieve result
		)           

		##close output file
		result_file.close()

		result = pisa_status.err

		if not result:
			print("Successfully created PDF")
		else:
			print("Error: unable to create the PDF")    

		## return False on success and True on errors
		return result


class GEN_PDF():
	def gen_pdf(self, codemp, numtra, codusl,tiptra):
		APP_PATH = os.getcwd()
		print (APP_PATH)
		
		codemp=codemp
		numtra=numtra
		codusl=codusl
		
		conn = sqlanydb.connect(uid=coneccion.uid, pwd=coneccion.pwd, eng=coneccion.eng,host=coneccion.host)
		curs = conn.cursor()
        
		sql = """SELECT 
        nomemp,dir01,ruc,lugemp,(select logoemp from dato_empresa d where d.codemp=e.codemp)
        FROM empresa e
        where codemp='{}'
		""".format(codemp)
		curs.execute(sql)
		r = curs.fetchone()
		print (r)
        
		ruc_empresa=r[2]
		razon_social_empresa = r[0]
		dir_empresa=r[1]
		ciudad_empresa=r[3]
		logoemp = r[4]
        
			
		sql = """
		SELECT p.numtra,DATEFORMAT(p.fectra, 'DD-MM-YYYY') as fectra ,c.rucced,c.nombres,c.dircli,c.telcli,c.email,p.soli_gra,
        p.totnet,p.iva_cantidad,p.codusu,p.ciucli,
		(SELECT nomven FROM vendedorescob v where v.codus1='{}' and v.codemp='{}'), 
        round((p.totnet+iva_cantidad),2) as total_pedido,p.iva_pctje,p.condiciones_pago,p.info_adicional,p.tiempo_entrega
		FROM encabezadopedpro p, clientes c
		where p.numtra = '{}' and p.tiptra = {} and p.codemp='{}'
		and p.codcli=c.codcli
        and p.codemp = c.codemp
		""".format(codusl,codemp,numtra,tiptra,codemp)
		curs.execute(sql)
		r = curs.fetchone()
		print (r)

		if (tiptra=='1'):
			tipodoc='PEDIDO'
		if (tiptra=='2'):
			tipodoc='PROFORMA'
		num_pedido = r[0]
		fectra = r[1]
		identificacion=r[2]
		cliente=r[3]
		direccion=r[4]
		telefono=r[5]
		email=r[6]
        
        
		observ=r[7]
		if observ == None:
			observ = ''
		condiciones_pago = r[15]
		if condiciones_pago == None:
			condiciones_pago = ''
		info_adicional = r[16]
		if info_adicional == None:
			info_adicional = ''
		tiempo_entrega = r[17]
		if tiempo_entrega == None:
			tiempo_entrega = ''

		# totnet=format(r[8], ',')
		# iva_cantidad=format(r[9], ',')
		# total_pedido=format(r[13], ',')

		totnet=r[8]
		iva_cantidad=r[9]
		total_pedido=r[13]

		codusu=r[10]
		ciucli=r[11]
		nomven=r[12]


		iva_pctje=format(r[14])

        


		print (num_pedido,fectra,identificacion,cliente,direccion,telefono,email,observ,totnet,iva_cantidad,codusu,ciucli,nomven,total_pedido,condiciones_pago,info_adicional,tiempo_entrega)
		# print (total_neto)

		sql = """
		SELECT codart,nomart, coduni,
		cantid,
		preuni,
		(select i.poriva from iva i where i.codiva=r.codiva) as poriva,
		round (((totren*poriva)/100),2) as cant_iva,
		totren,desren,num_docs,
		round((((desren*preuni)/100) * cantid),2) as des_cant 
		FROM renglonespedpro r
		where numtra='{}' and codemp='{}' and tiptra={} order by numren asc
		""".format(numtra,codemp,tiptra)
		print (sql)
		curs.execute(sql)
		r = curs.fetchall()
		campos = ['codart','nomart','coduni','cantid','preuni','poriva','cant_iva','totren','desren','num_docs','des_cant']
		renglones_pedido = []
		for reg in r:
		   # print (reg)
		   # reg_encabezado = dict(zip(campos, reg))
		   # renglones_pedido.append(reg_encabezado)
           # datos['ruta'] = 'null'  if datos['ruta'] == None else "'"+datos['ruta']+"'"
			# print (reg)
			observacion = '' if reg[9] == None else reg[9]
			coduni = 'N/A' if reg[2] == None else reg[2]			 			
			# row_db = [reg[0],reg[1],reg[2],convert_decimal(reg[3]),convert_decimal(reg[4]),reg[5],convert_decimal(reg[6]),convert_decimal(reg[7]),convert_decimal(reg[8]),observacion,convert_decimal(reg[10])]
			# reg = (reg[0],reg[1],reg[2],convert_decimal(reg[3]),convert_decimal(reg[4]),reg[5],convert_decimal(reg[6]),convert_decimal(reg[7]),convert_decimal(reg[8]),observacion,convert_decimal(reg[10]))
            ####### EMPRESA DE ETIQUETAS  ####### "{:.6f}".format(reg[4])
            # {{ "$%.2f"|format(price) }}
			reg = (reg[0],reg[1],coduni,reg[3],reg[4],reg[5],format(reg[6], ','),reg[7],reg[8],observacion,reg[10])

			print (reg)
			# row = (row_db[0],row_db[1],row_db[2],row_db[3],row_db[4],row_db[5],row_db[6],row_db[7],row_db[8],row_db[9],row_db[10],row_db[11],row_db[12])
			reg_encabezado = dict(zip(campos, reg))
			renglones_pedido.append(reg_encabezado)
		print (renglones_pedido) 
		# conn.close()

		sql = """SELECT VALOR FROM "DBA"."parametros_siaciweb" where parametro='FORMATO_PEDIDO' AND CODEMP='{}'""".format(codemp)
		curs.execute(sql)
		r = curs.fetchone()
		print (r)
        
		ruta_plantilla_pedidos=r[0]
        
		conn.close()


        
		# tpl=DocxTemplate(APP_PATH+'\\PLANTILLA_PEDIDOS\\PEDIDO_PLANTILLA_PYTHON3.docx')# The image must be already saved on the disk
		tpl=DocxTemplate(APP_PATH+ruta_plantilla_pedidos)# The image must be already saved on the disk
        # reading images from url is not supported
		# logo = InlineImage(tpl, 'C:\\SISTEMA\\LOGO_PEDIDO.png', width=Mm(100) ,height=Mm(20))
		# logo = InlineImage(tpl,logoemp, width=Mm(90) ,height=Mm(18))
		logo = InlineImage(tpl,logoemp)
        
		context = { 'fectra' : fectra,
					'num_pedido' : num_pedido,
					'cliente' : cliente,
					'identificacion' : identificacion,
					'direccion' : direccion,
					'telefono' : telefono,
					'email' : email,
					'totnet' : totnet,
					'iva_cantidad' : iva_cantidad,
					'observ' : observ,
					'nomven' : nomven,
					'total_pedido' : total_pedido,
                    'iva_pctje' : iva_pctje,
					'renglones_pedido': renglones_pedido,  #####ARREGLO DE RENGLONES
                    'logo' : logo,
                    'rz_empresa' : razon_social_empresa,
                    'ruc_empresa':ruc_empresa,
                    'direccion_empresa': dir_empresa,
                    'lugemp': ciudad_empresa,
                    'tipodoc': tipodoc,
                    'condiciones_pago':condiciones_pago,
                    'validez':info_adicional,
                    'tiempo_entrega':tiempo_entrega
                    
                    
		}

		tpl.render(context)
		if (tiptra=='1'):
			word_out = APP_PATH+'\\PLANTILLA_PEDIDOS\\PEDIDO_'+codemp+'_'+num_pedido+'_WEB.docx'
		if (tiptra=='2'):
			word_out = APP_PATH+'\\PLANTILLA_PEDIDOS\\PROFORMA_'+codemp+'_'+num_pedido+'_WEB.docx'
		tpl.save(word_out)

		###CONVERTIR A PDF EL PEDIDO PEDIDO_10000221_WEB.pdf
		print ("########### CONVIRTIENDO A PDF aa ###########")
		comtypes.CoInitialize()
		c = win32com.client.DispatchEx("Word.Application")
		# t, p = win32process.GetWindowThreadProcessId(c.Hwnd)
		# print (p)
		
		f = word_out
		if (tiptra=='1'):
			dest = APP_PATH+'\\PLANTILLA_PEDIDOS\\PEDIDO_'+codemp+'_'+num_pedido+'_WEB.pdf'
		if (tiptra=='2'):
			dest = APP_PATH+'\\PLANTILLA_PEDIDOS\\PROFORMA_'+codemp+'_'+num_pedido+'_WEB.pdf'
		doc = c.Documents.Open(f)
		doc.SaveAs(dest, FileFormat=17)
		doc.Close()
		c.Quit()
		del c
		os.remove(word_out)
		
		

		
		# c.convert(f, dest, "-c PDF") PEDIDO_10000221_WEB.pdf
		# sleep(0.2) # Time in seconds
		comtypes.CoUninitialize()
		return 'PDF GENERADO CON EXITO'
		
	def gen_pdf_orden(self, codemp, numtra, codusl):
		APP_PATH = os.getcwd()
		print (APP_PATH)
		
		codemp=codemp
		numtra=numtra
		codusl=codusl
		
		conn = sqlanydb.connect(uid=coneccion.uid, pwd=coneccion.pwd, eng=coneccion.eng,host=coneccion.host)
		curs = conn.cursor()
			
		sql = """
		SELECT p.numtra,DATEFORMAT(p.fectra, 'DD-MM-YYYY') as fectra ,c.rucced,c.nombres,c.dircli,c.telcli,c.email,p.observ,p.totnet,p.iva_cantidad,p.codusu,p.ciucli,
		(SELECT nomven FROM vendedorescob v, usuario u where v.codus1 = u.codus1 and v.codusu = u.codusu and u.codus1='{}' and u.codemp='{}'), 
		round((p.totnet+iva_cantidad),2) as total_pedido
		FROM encabezadopedpro p, clientes c
		where p.numtra = '{}' and p.tiptra = 7 and p.codemp='{}'
		and p.codcli=c.codcli
		""".format(codusl,codemp,numtra,codemp)
		curs.execute(sql)
		r = curs.fetchone()
		print (r)


		num_pedido = r[0]
		fectra = r[1]
		identificacion=r[2]
		cliente=r[3]
		direccion=r[4]
		telefono=r[5]
		email=r[6]
		observ=r[7]
		totnet=r[8]
		iva_cantidad=r[9]
		codusu=r[10]
		ciucli=r[11]
		nomven=r[12]
		total_pedido=r[13]


		print (num_pedido,fectra,identificacion,cliente,direccion,telefono,email,observ,totnet,iva_cantidad,codusu,ciucli,nomven,total_pedido)
		
		sql = """
        select marca,modelo,chasis,motor,color,CAST(ano as integer),ram,paisorigen,combustible,klm,cilindarje,pasajeros,
        clase,subclase,torque,caja
        from adicionales where codemp='{}' and codart='{}' and ot='7'
		""".format(codemp,numtra)
		curs.execute(sql)
		r = curs.fetchone()
		print (r)
		if r:
			marca_vehiculo = r[0]
			modelo_vehiculo = r[1]
			anio=r[5]
			placa=r[14]
		else:
			marca_vehiculo = 'No registrado'
			modelo_vehiculo = 'No registrado'
			anio = 'No registrado'
			placa = 'No registrado'

		print (marca_vehiculo,modelo_vehiculo,anio,placa)


		sql = """
		SELECT codart,nomart, coduni,
		round (cantid,2) as cantid,
		preuni,
		(select i.poriva from iva i where i.codiva=r.codiva) as poriva,
		round (((totren*poriva)/100),2) as cant_iva,
		totren,desren,num_docs,
		round((((desren*preuni)/100) * cantid),2) as des_cant 
		FROM renglonespedpro r
		where numtra='{}' and codemp='{}' and tiptra=7 order by numren asc
		""".format(numtra,codemp)
		curs.execute(sql)
		r = curs.fetchall()
		campos = ['codart','nomart','coduni','cantid','preuni','poriva','cant_iva','totren','desren','num_docs','des_cant']
		renglones_pedido = []
		for reg in r:
		   # print (reg)
		   # reg_encabezado = dict(zip(campos, reg))
		   # renglones_pedido.append(reg_encabezado)
			print (reg)
			observacion = '' if reg[9] == None else reg[9]
			coduni = 'N/A' if reg[2] == None else reg[2]
			# row_db = [reg[0],reg[1],reg[2],convert_decimal(reg[3]),convert_decimal(reg[4]),reg[5],convert_decimal(reg[6]),convert_decimal(reg[7]),convert_decimal(reg[8]),reg[9],convert_decimal(reg[10])]
			# reg = (reg[0],reg[1],reg[2],convert_decimal(reg[3]),convert_decimal(reg[4]),reg[5],convert_decimal(reg[6]),convert_decimal(reg[7]),convert_decimal(reg[8]),reg[9],convert_decimal(reg[10]))
			reg = (reg[0],reg[1],coduni,reg[3],reg[4],reg[5],reg[6],reg[7],reg[8],observacion,reg[10])
			# print (row_db)
			print (reg)
			# row = (row_db[0],row_db[1],row_db[2],row_db[3],row_db[4],row_db[5],row_db[6],row_db[7],row_db[8],row_db[9],row_db[10],row_db[11],row_db[12])
			reg_encabezado = dict(zip(campos, reg))
			renglones_pedido.append(reg_encabezado)
		print (renglones_pedido) 
		conn.close()




		tpl=DocxTemplate(APP_PATH+'\\PLANTILLA_PEDIDOS\\ORDEN_TRABAJO_PLANTILLA_PYTHON.docx')
		context = { 'fectra' : fectra,
					'num_pedido' : num_pedido,
					'cliente' : cliente,
					'identificacion' : identificacion,
					'direccion' : direccion,
					'telefono' : telefono,
					'email' : email,
					'totnet' : totnet,
					'iva_cantidad' : iva_cantidad,
					'observ' : observ,
					'nomven' : nomven,
					'total_pedido' : total_pedido,
					'marca_vehiculo' : marca_vehiculo,
					'modelo_vehiculo' : modelo_vehiculo,
					'anio' : anio,
					'placa' : placa,
					'renglones_pedido': renglones_pedido  #####ARREGLO DE RENGLONES
		}

		tpl.render(context)
        
        # APP_PATH+'\\PLANTILLA_PEDIDOS\\PEDIDO_'+codemp+'_'+num_pedido+'_WEB.pdf'
		word_out = APP_PATH+'\\PLANTILLA_PEDIDOS\\ORDEN_'+codemp+'_'+num_pedido+'_WEB.docx'
		tpl.save(word_out)

		###CONVERTIR A PDF EL PEDIDO PEDIDO_10000221_WEB.pdf
		print ("########### CONVIRTIENDO A PDF ###########")
		comtypes.CoInitialize()
		c = win32com.client.DispatchEx("Word.Application")
		# t, p = win32process.GetWindowThreadProcessId(c.Hwnd)
		# print (p)
		
		f = word_out
		dest = APP_PATH+'\\PLANTILLA_PEDIDOS\\ORDEN_'+codemp+'_'+num_pedido+'_WEB.pdf'
		doc = c.Documents.Open(f)
		doc.SaveAs(dest, FileFormat=17)
		doc.Close()
		c.Quit()
		del c
		os.remove(word_out)

		
		# c.convert(f, dest, "-c PDF") PEDIDO_10000221_WEB.pdf
		# sleep(0.2) # Time in seconds
		comtypes.CoUninitialize()
		return 'PDF GENERADO CON EXITO'
	
	def gen_ticket_pdf(self, codemp, numfac):
		APP_PATH = os.getcwd()
		print (APP_PATH)

		numfac_arr = numfac.split('.')
		numfac = numfac_arr[0]
		
		conn = sqlanydb.connect(uid=coneccion.uid, pwd=coneccion.pwd, eng=coneccion.eng,host=coneccion.host)
		curs = conn.cursor()
		
		sql = """
		SELECT --*
		ep.numfac,ep.serie,ep.faccli,
		(select ruc from empresa e where e.codemp=ep.codemp) as ruc_empresa,
		(select nomemp from empresa e where e.codemp=ep.codemp) as nomemp,
		(select rucced from clientes c where c.codcli=ep.codcli) as rucced,
		(select dircli from clientes c where c.codcli=ep.codcli) as dircli,
		ep.nomcli,
		DATEFORMAT(ep.fecfac,'DD-MM-YYYY') as fecha,
		ep.hora,autorizacion,
		ep.poriva,ep.totnet,ep.totbas,(ep.totnet-ep.totbas) as totbas0,ep.totdes,ep.totiva,ep.totfac,ep.tipefe,ep.tiptar,ep.tipcre,ep.tiptrans,ep.tipche
		FROM "DBA"."encabezadopuntosventa" ep
		where numfac='{}' 
		and codemp='{}'
		""".format(numfac,codemp)
		print (sql)
		curs.execute(sql)
		r = curs.fetchone()
		print (r)


		numfac = r[0]
		faccli = r[1]+'-'+r[2]
		ruc_empresa=r[3]
		nomemp=r[4]
		rucced=r[5]
		dircli=r[6]
		nomcli=r[7]
		fecha=r[8]
		hora=r[9][0:8]
		autorizacion=r[10]
		
		if not (autorizacion):
			autorizacion = '*** PENDIENTE AUTO ***' 
		poriva=r[11]
		totnet=r[12]
		totbas=r[13]
		totbase0=r[14]
		totdes=r[15]
		totiva=r[16]
		totfac=r[17]
	############ FORMAS DE PAGO #############
		tipefe=r[18]
		tiptar=r[19]
		tipcre=r[20]
		tiptrans=r[21]
		tipche=r[22]
		
		
		print (tipefe)
		print (tiptar)
		print (tipcre)
		print (tiptrans)
		print (tipche)
		print ("HOLAMUNDO")
		
		formas_pago = []
		
		if (tipefe == 'E'):
			formas_pago.append({'forma':'EFECTIVO'})
		if (tiptar == 'T'):
			formas_pago.append({'forma':'TARJETA'})
		if (tipcre == 'R'):
			formas_pago.append({'forma':'CREDITO'})
		if (tiptrans == 'B'):
			formas_pago.append({'forma':'TRANSFERENCIA'})
		if (tipche == 'C'):
			formas_pago.append({'forma':'CHEQUE'})

		
		# formas_pago=[{'forma':'EFECTIVO'},{'forma':'TARJETA'},{'forma':'CHEQUE'},{'forma':'TRANSFERENCIA'},{'forma':'CREDITO'}]

		
		
		sql = """
		SELECT
		numren
		,codart,nomart,coduni,cantid,preuni,totren,
		peso as punreo,codiva,
		(select i.poriva from iva i where i.codiva=r.codiva) as poriva,
		round (((totren*poriva)/100),2) as precio_iva,
		round((((punreo*preuni)/100) * cantid),2) as v_des_art,
		round(totren-v_des_art,2) as subtotal_art
		FROM "DBA"."renglonespuntosventa" r  where numfac='{}' and codemp='{}'
		""".format(numfac,codemp)
		
		curs.execute(sql)
		print (sql)
		r = curs.fetchall()

		campos = ['index','codart','nomart','coduni','cant','prec01','totren','punreo','codiva','poriva','precio_iva','v_desc_art','subtotal_art']
		renglones_pdv = []
		for reg in r:
			# print (reg)
			reg_encabezado = dict(zip(campos, reg))
			renglones_pdv.append(reg_encabezado)
			# print (renglones_pdv)

		root = os.path.dirname(os.path.abspath(__file__))
		templates_dir = os.path.join(root, 'templates_ticket')
		env = Environment( loader = FileSystemLoader(templates_dir) )
		template = env.get_template('invoice_template.html')
		
		##Filename for our PDF file.
		OUTPUT_FILENAME = "C:\\SISTEMA\\temporales\\ticket_"+codemp+"_"+numfac+".pdf"
		
		# renglones_factura=[
		# {"cant":"1","producto":"CEBOLLA EN RAMA A GRANEL CON FLETE DE QUITO GUAYAQUIL","prec":"200.3","subtotal":"10"},
		# {"cant":"1","producto":"TRANSPORTE DE QUITO CON FLETE DE QUITO GUAYAQUIL Y A SUPERMAXI Y CORPORACION EL ROSADO","prec":"15000.33","subtotal":"10"},
		# {"cant":"1","producto":"AAAAAAAAA rAAAAAAAAAA BBBBBBBBBBBBA AAAAAAASSSS SSSSSSKKKKNJJV RJJMFMEFE EJEJNJENJENJEN EEEEJNEJEEJENEEE NENEUUUEESS","prec":"15000.33","subtotal":"10"}
		# ]
		
		
		renglones_factura=renglones_pdv
		
		# ruc='0602290694001'
		# rz='ROMERO URREA IVAN MARCELO'
		# nombre_cliente = 'CARLOS LEDEZMA'
		# direccion = 'ATAHUALPA'
		
		# 1 renglon = 90 mm  MUY MINIMO 87mm
		alto_minimo= 500
		longitud_renglones = 10

		for renglon in renglones_factura:
			cant_renglon = 1
			if(len(renglon['nomart']) > 9):
				cant_renglon = round(len(renglon['nomart'])/18)
			print (cant_renglon)
			longitud_renglones = longitud_renglones+cant_renglon

		# formula =alto minimo + (suma de la cantidad de lineas por renglon*4 minimetros cada renglon ) + 10 mm de holgura de seguridad
		alto_minimo = alto_minimo + (longitud_renglones*4) + 10
		
		filename = os.path.join(root, 'templates_ticket', 'invoice_salida.html')
		with open(filename, 'w') as fh:
			fh.write(template.render(
				alto_frame = alto_minimo,
				alto_pagina = alto_minimo,
				renglones_factura = renglones_factura,
				ruc = ruc_empresa,
				rz = nomemp,
				nombre_cliente = nomcli,
				direccion = dircli,
				faccli = faccli,
				rucced = rucced,
				fecha = fecha,
				hora = hora,
				autorizacion = autorizacion,
				totfac = totfac,
				totdes = totdes,
				totiva = totiva,
				totnet = totnet,
				totbas = totbas,
				totbase0 = totbase0,
				poriva = poriva,
				formas_pago = formas_pago
		))
			
		from_template(filename, OUTPUT_FILENAME)
		return 'PDF GENERADO CON EXITO'

	def gen_ticket_html(self, codemp, numfac):
		APP_PATH = os.getcwd()
		print (APP_PATH)

		numfac_arr = numfac.split('.')
		numfac = numfac_arr[0]
		
		conn = sqlanydb.connect(uid=coneccion.uid, pwd=coneccion.pwd, eng=coneccion.eng,host=coneccion.host)
		curs = conn.cursor()
		
		sql = """
		SELECT --*
		ep.numfac,ep.serie,ep.faccli,
		(select ruc from empresa e where e.codemp=ep.codemp) as ruc_empresa,
		(select nomemp from empresa e where e.codemp=ep.codemp) as nomemp,
		(select rucced from clientes c where c.codcli=ep.codcli) as rucced,
		(select dircli from clientes c where c.codcli=ep.codcli) as dircli,
		ep.nomcli,
		DATEFORMAT(ep.fecfac,'DD-MM-YYYY') as fecha,
		ep.hora,autorizacion,
		ep.poriva,ep.totnet,ep.totbas,(ep.totnet-ep.totbas) as totbas0,ep.totdes,ep.totiva,ep.totfac,ep.tipefe,ep.tiptar,ep.tipcre,ep.tiptrans,ep.tipche
		FROM "DBA"."encabezadopuntosventa" ep
		where numfac='{}' 
		and codemp='{}'
		""".format(numfac,codemp)
		print (sql)
		curs.execute(sql)
		r = curs.fetchone()
		print (r)


		numfac = r[0]
		faccli = r[1]+'-'+r[2]
		ruc_empresa=r[3]
		nomemp=r[4]
		rucced=r[5]
		dircli=r[6]
		nomcli=r[7]
		fecha=r[8]
		hora=r[9][0:8]
		autorizacion=r[10]
		
		if not (autorizacion):
			autorizacion = '*** PENDIENTE AUTO ***' 
		poriva=r[11]
		totnet=r[12]
		totbas=round(r[13],2)
		totbase0=round(r[14],2)
		totdes=r[15]
		totiva=r[16]
		totfac=r[17]
	############ FORMAS DE PAGO #############
		tipefe=r[18]
		tiptar=r[19]
		tipcre=r[20]
		tiptrans=r[21]
		tipche=r[22]
		
		
		print (tipefe)
		print (tiptar)
		print (tipcre)
		print (tiptrans)
		print (tipche)
		print ("HOLAMUNDO")
		
		formas_pago = []
		
		if (tipefe == 'E'):
			formas_pago.append({'forma':'EFECTIVO'})
		if (tiptar == 'T'):
			formas_pago.append({'forma':'TARJETA'})
		if (tipcre == 'R'):
			formas_pago.append({'forma':'CREDITO'})
		if (tiptrans == 'B'):
			formas_pago.append({'forma':'TRANSFERENCIA'})
		if (tipche == 'C'):
			formas_pago.append({'forma':'CHEQUE'})

		
		# formas_pago=[{'forma':'EFECTIVO'},{'forma':'TARJETA'},{'forma':'CHEQUE'},{'forma':'TRANSFERENCIA'},{'forma':'CREDITO'}]

		
		
		sql = """
		SELECT
		numren
		,codart,nomart,coduni,cantid,preuni,totren,
		peso as punreo,codiva,
		(select i.poriva from iva i where i.codiva=r.codiva) as poriva,
		round (((totren*poriva)/100),2) as precio_iva,
		round((((punreo*preuni)/100) * cantid),2) as v_des_art,
		round(totren-v_des_art,2) as subtotal_art
		FROM "DBA"."renglonespuntosventa" r  where numfac='{}' and codemp='{}'
		""".format(numfac,codemp)
		
		curs.execute(sql)
		print (sql)
		r = curs.fetchall()

		campos = ['index','codart','nomart','coduni','cant','prec01','totren','punreo','codiva','poriva','precio_iva','v_desc_art','subtotal_art']
		renglones_pdv = []
		for reg in r:
			print (reg)
			reg_encabezado = dict(zip(campos, reg))
			renglones_pdv.append(reg_encabezado)
			print (renglones_pdv)

		root = os.path.dirname(os.path.abspath(__file__))
		templates_dir = os.path.join(root, 'templates_ticket')
		print (templates_dir)
		# templates_dir = APP_PATH+'\\templates_ticket\\invoice_template.html'
		templates_dir = APP_PATH+'\\templates_ticket'
		print (templates_dir)
		env = Environment( loader = FileSystemLoader(templates_dir) )
		template = env.get_template('invoice_template.html')
		# template = (APP_PATH+'\\templates_ticket\\invoice_template.html')
		
		OUTPUT_HTML = "C:\\SISTEMA\\temporales\\ticket_"+codemp+"_"+numfac+".html"
		OUTPUT_PDF = "C:\\SISTEMA\\temporales\\ticket_"+codemp+"_"+numfac+".pdf"
		# Evaluar esta impresora
		# SAT38TUSE
		
		# renglones_factura=[
		# {"cant":"1","producto":"CEBOLLA EN RAMA A GRANEL CON FLETE DE QUITO GUAYAQUIL","prec":"200.3","subtotal":"10"},
		# {"cant":"1","producto":"TRANSPORTE DE QUITO CON FLETE DE QUITO GUAYAQUIL Y A SUPERMAXI Y CORPORACION EL ROSADO","prec":"15000.33","subtotal":"10"},
		# {"cant":"1","producto":"AAAAAAAAA rAAAAAAAAAA BBBBBBBBBBBBA AAAAAAASSSS SSSSSSKKKKNJJV RJJMFMEFE EJEJNJENJENJEN EEEEJNEJEEJENEEE NENEUUUEESS","prec":"15000.33","subtotal":"10"}
		# ]
		
		
		renglones_factura=renglones_pdv
		
		# ruc='0602290694001'
		# rz='ROMERO URREA IVAN MARCELO'
		# nombre_cliente = 'CARLOS LEDEZMA'
		# direccion = 'ATAHUALPA'
		
		# 1 renglon = 90 mm  MUY MINIMO 87mm
		alto_minimo=90
		longitud_renglones = 0

		# for renglon in renglones_factura:
			# cant_renglon = 1
			# if(len(renglon['nomart']) > 9):
				# cant_renglon = round(len(renglon['nomart'])/18)
                
			# print (cant_renglon)
			# longitud_renglones = longitud_renglones+cant_renglon

		# formula =alto minimo + (suma de la cantidad de lineas por renglon*4 minimetros cada renglon ) + 10 mm de holgura de seguridad
		# alto_minimo = alto_minimo + (longitud_renglones*5) + 10
		alto_minimo = alto_minimo + len(renglones_factura)*7 + 10
		
		filename = os.path.join(root, 'templates_ticket',OUTPUT_HTML)
		with open(filename, 'w') as fh:
			fh.write(template.render(
				alto_frame = alto_minimo,
				alto_pagina = alto_minimo,
				renglones_factura = renglones_factura,
				ruc = ruc_empresa,
				rz = nomemp,
				nombre_cliente = nomcli,
				direccion = dircli,
				faccli = faccli,
				rucced = rucced,
				fecha = fecha,
				hora = hora,
				autorizacion = autorizacion,
				totfac = totfac,
				totdes = totdes,
				totiva = totiva,
				totnet = totnet,
				totbas = totbas,
				totbase0 = totbase0,
				poriva = poriva,
				formas_pago = formas_pago
		))
			
		from_template(filename, OUTPUT_PDF)
		return 'HTML GENERADO CON EXITO'

	def gen_ing_producto_pdf(self, codemp, codIngProd):
		APP_PATH = os.getcwd()
		print(APP_PATH)
    
		codemp = codemp
		codIngProd = codIngProd
		conn = sqlanydb.connect(uid=coneccion.uid, pwd=coneccion.pwd, eng=coneccion.eng,host=coneccion.host)
		curs = conn.cursor()
		sql = """SELECT
          razon_social_ing_prod, ruc_ing_prod, nombre_comercial_ing_prod, referencia, alto, ancho, proveedor, impresora, bobinadora, material_imprimir, ancho_material, 
          cilindro, cortador, colores, rep_des, filas, columnas, forma_etq, cod_cilindro, cod_plano, uv_total, uv_select, relam_delam, hot_stamping, cold_folid, repujado, lami_mate, lami_brillan, 
          primario_c, primario_m, primario_k,primario_y, 
          pantone_1, pantone_2, pantone_3, pantone_4, pantone_5, pantone_6, pantone_7, 
          anilox_vC, anilox_vM, anilox_vY, anilox_vK, 
          anilox_1, anilox_2, anilox_3, anilox_4, anilox_5, anilox_6, anilox_7, 
          prov_fabricante_vC, prov_fabricante_vM, prov_fabricante_vY, prov_fabricante_vK,
          prov_fabricante_1, prov_fabricante_2, prov_fabricante_3, prov_fabricante_4, prov_fabricante_5, prov_fabricante_6, prov_fabricante_7, 
          tinta_sticky_vC, tinta_sticky_vM, tinta_sticky_vY, tinta_sticky_vK, 
          tinta_sticky_1, tinta_sticky_2, tinta_sticky_3, tinta_sticky_4, tinta_sticky_5, tinta_sticky_6, tinta_sticky_7, 
          tipo_dispensado, diametro_rollo, peso_rollo, medida, dispensado_taca,
          embobinado_exterior, embobinado_interior, 
          ruta_img,
          ejecutivo_ventas, impreso_responsable, supervisado_responsable, jefe_produccion 
        FROM ing_de_producto WHERE codIngProd = '{}' and codEmpresa = '{}'
	      """.format(codIngProd,codemp)
		curs.execute(sql)
		r = curs.fetchone()
		print (r)

		#PRIMER RENGLON
		razon_social_ing_prod  = r[0]
		print(razon_social_ing_prod)
		ruc_ing_prod  = r[1]
		nombre_comercial_ing_prod  = r[2]
		referencia  = r[3]
		alto  = r[4]
		ancho  = r[5]
		proveedor = r[6]
		impresora  = r[7]
		bobinadora  = r[8]
		material_imprimir  = r[9]
		ancho_material  = r[10]
		#SEGUNDO RENGLON, EMPIEZA TABLA DE TROQUE, ACABADOS, ACABADOS2, LAMINADO
		cilindro  = r[11]
		cortador  = r[12]
		colores  = r[13]
		rep_des  = r[14]
		filas  = r[15]
		columnas  = r[16]
		forma_etq  = r[17]
		cod_cilindro  = r[18]
		cod_plano  = r[19]
		uv_total  = 'X' if r[20] == 'SI' else ''
		uv_select  = 'X' if r[21] == 'SI' else ''
		relam_delam  = 'X' if r[22] == 'SI' else ''
		hot_stamping  = 'X' if r[23] == 'SI' else ''
		cold_folid  = 'X' if r[24] == 'SI' else ''
		repujado  = 'X' if r[25] == 'SI' else ''
		lami_mate  = 'X' if r[26] == 'SI' else ''
		lami_brillan  = 'X' if r[27] == 'SI' else ''
		#TERCER RENGLON, EMPIEZA TABLA DE COLORES PRIMARIOS Y COLORES PLANOS O PANTONE, ANILOX, PROVEEDOR/FABRICANTE, TINTA Y STICKY
		#FILA COLORES PRIMARIOS Y COLORES PLANOS O PANTONE
		primario_c  = 'X' if r[28] == 'SI' else '	'
		primario_m  = 'X' if r[29] == 'SI' else '	'
		primario_k  = 'X' if r[30] == 'SI' else '	'
		primario_y  = 'X' if r[31] == 'SI' else '	'
		pantone_1  = r[32]
		pantone_2  = r[33]
		pantone_3  = r[34]
		pantone_4  = r[35]
		pantone_5  = r[36]
		pantone_6  = r[37]
		pantone_7  = r[38]
		#FILA ANILOX
		anilox_vC  = '	' if r[39] == 0 else r[39]
		anilox_vM  = '	' if r[40] == 0 else r[40]
		anilox_vK  = '	' if r[42] == 0 else r[42]
		anilox_vY  = '	' if r[41] == 0 else r[41]
		anilox_1  = '	' if r[43] == 0 else r[43]
		anilox_2  = '	' if r[44] == 0 else r[44]
		anilox_3  = '	' if r[45] == 0 else r[45]
		anilox_4  = '	' if r[46] == 0 else r[46]
		anilox_5  = '	' if r[47] == 0 else r[47]
		anilox_6  = '	' if r[48] == 0 else r[48]
		anilox_7  = '	' if r[49] == 0 else r[49]
		#FILA PROVEEDOR/FABRICANTE
		prov_fabricante_vC  = r[50]
		prov_fabricante_vM  = r[51]
		prov_fabricante_vK  = r[53]
		prov_fabricante_vY  = r[52]
		prov_fabricante_1  = r[54]
		prov_fabricante_2  = r[55]
		prov_fabricante_3  = r[56]
		prov_fabricante_4  = r[57]
		prov_fabricante_5  = r[58]
		prov_fabricante_6  = r[59]
		prov_fabricante_7  = r[60]
		#FILA TINTA Y STICKY
		tinta_sticky_vC  = r[61]
		tinta_sticky_vM  = r[62]
		tinta_sticky_vK  = r[64]
		tinta_sticky_vY  = r[63]
		tinta_sticky_1  = r[65]
		tinta_sticky_2  = r[66]
		tinta_sticky_3  = r[67]
		tinta_sticky_4  = r[68]
		tinta_sticky_5  = r[69]
		tinta_sticky_6  = r[70]
		tinta_sticky_7  = r[71]
		#CUARTO RENGLON, EMPIEZA TABLA DE TIPO DE DISPENSADO
		tipo_dispensado  = r[72]
		diametro_rollo  = r[73]
		peso_rollo  = r[74]
		medida  = r[76]
		dispensado_taca  = r[75]
		#QUINTO RENGLON, EMPIEZA SENTIDO SALIDA
		embobinado_exterior  = r[77]
		embobinado_interior  = r[78]
		#SEXTO RENGLON, IMAGEN
		ruta_img  = r[79]
		#SEPTIMO RENGLON, FIRMAS RESPONSABLES
		ejecutivo_ventas  = r[80]
		impreso_responsable  = r[81]
		supervisado_responsable  = r[82]
		jefe_produccion  = r[83]
        
		ruta_plantilla_pedidos="\\PLANTILLA_PEDIDOS\\INGENIERIA_DE_PRODUCTO.docx"
		conn.close()

		tpl=DocxTemplate(APP_PATH+ruta_plantilla_pedidos)
		logo = InlineImage(tpl,ruta_img)
  

		context = { 'razon_social' : razon_social_ing_prod,
					'ruc' : ruc_ing_prod,
					'nombre_comercial' : nombre_comercial_ing_prod,
					'referencia' : referencia,
					'alto' : alto,
					'ancho' : ancho,
					'proveedor' : proveedor,
					'impresora' : impresora,
					'bobinadora' : bobinadora,
					'material' : material_imprimir,
					'ancho_material' : ancho_material,
					#SEGUNDO RENGLON
					'cilindro' : cilindro,
					'cortador' : cortador,
					'col' : colores,
					'r_d' : rep_des,
					'filas' : filas,
					'cols' : columnas,
					'forma_etq' : forma_etq,
					'cilin_cod' : cod_cilindro,
					'plano_cod' : cod_plano,
					'uv_tot' : uv_total,
					'uv_sel' : uv_select,
					'rel_del' : relam_delam,
					'h_stam' : hot_stamping,
					'C_f' : cold_folid,
					'repuj' : repujado,
					'mate' : lami_mate,
					'brilla' : lami_brillan,
					#TERCER RENGLON
					#FILA COLORES PRIMARIOS Y COLORES PLANOS O PANTONE
					'C' : primario_c,
					'M' : primario_m,
					'K' : primario_k,
					'Y' : primario_y,
					'PANTONE_1' : pantone_1,
					'PANTONE_2' : pantone_2,
					'PANTONE_3' : pantone_3,
					'PANTONE_4' : pantone_4,
					'PANTONE_5' : pantone_5,
					'PANTONE_6' : pantone_6,
					'PANTONE_7' : pantone_7,
					#FILA ANILOX
					'v_c' : anilox_vC,
					'v_m' : anilox_vM,
					'v_k' : anilox_vK,
					'v_y' : anilox_vY,
					'anilox_1' : anilox_1,
					'anilox_2' : anilox_2,
					'anilox_3' : anilox_3,
					'anilox_4' : anilox_4,
					'anilox_5' : anilox_5,
					'anilox_6' : anilox_6,
					'anilox_7' : anilox_7,
					#FILA PROVEEDOR/FABRICANTE
					'hw_1' : prov_fabricante_vC,
					'hw_2' : prov_fabricante_vM,
					'hw_3' : prov_fabricante_vK,
					'hw_4' : prov_fabricante_vY,
					'hw_5' : prov_fabricante_1,
					'hw_6' : prov_fabricante_2,
					'hw_7' : prov_fabricante_3,
					'hw_8' : prov_fabricante_4,
					'hw_9' : prov_fabricante_5,
					'hw_10' : prov_fabricante_6,
					'hw_11' : prov_fabricante_7,
					#FILA TINTA Y STICKY
					'ts_1' : tinta_sticky_vC,
					'ts_2' : tinta_sticky_vM,
					'ts_3' : tinta_sticky_vK,
					'ts_4' : tinta_sticky_vY,
					'ts_5' : tinta_sticky_1,
					'ts_6' : tinta_sticky_2,
					'ts_7' : tinta_sticky_3,
					'ts_8' : tinta_sticky_4,
					'ts_9' : tinta_sticky_5,
					'ts_10' : tinta_sticky_6,
					'ts_11' : tinta_sticky_7,
					#CUARTO RENGLON
					't_dispensado' : tipo_dispensado,
					'diametro' : diametro_rollo,
					'peso' : peso_rollo,
					'taca' : medida,
					'med' : dispensado_taca,
					#QUINTO RENGLON
					'emb_ext' : embobinado_exterior,
					'emb_int' : embobinado_interior,
					#SEXTO RENGLON
					'etiqueta' : logo,
					#SEPTIMO RENGLON
					'ejecutivo_ventas' : ejecutivo_ventas,
					'impreso' : impreso_responsable,
					#'supervisado_responsable' : supervisado_responsable,
					#'jefe_produccion' : jefe_produccion
		}
		
		tpl.render(context)
		codIngProd_str = str(codIngProd)
		word_out = APP_PATH+'\\PLANTILLA_PEDIDOS\\INGENIERIA_DE_PRODUCTO_'+codemp+'_'+codIngProd_str+'.docx'
		tpl.save(word_out)

		###CONVERTIR A PDF EL PEDIDO PEDIDO_10000221_WEB.pdf
		print ("########### CONVIRTIENDO A PDF aa ###########")
		comtypes.CoInitialize()
		c = win32com.client.DispatchEx("Word.Application")
		
		f = word_out
		dest = APP_PATH+'\\PLANTILLA_PEDIDOS\\INGENIERIA_DE_PRODUCTO_'+codemp+'_'+codIngProd_str+'.pdf'
		doc = c.Documents.Open(f)
		doc.SaveAs(dest, FileFormat=17)
		doc.Close()
		c.Quit()
		del c
		os.remove(word_out)
		
		comtypes.CoUninitialize()
		return 'PDF GENERADO CON EXITO'
  

     


# ModuleNotFoundError: No module named 'reportlab.graphics.barcode.code128'