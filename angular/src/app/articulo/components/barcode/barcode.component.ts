import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormsModule } from '@angular/forms';
import JsBarcode from 'jsbarcode';
import { SweetalertService } from '../../../services/sweetalert.service';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'app-barcode',
  standalone: true,
  imports: [CommonModule,FormsModule,LoaderComponent],
  templateUrl: './barcode.component.html',
  styleUrl: './barcode.component.css'
})
export class BarcodeComponent {

  @Input()
  codigo!: string;
  @Input()
  nombre!: string;
  cantidad:number = 1;
  isLoading:boolean = false;
  @ViewChild('barcodeImage') image: ElementRef | undefined;


  constructor(private swalertService:SweetalertService){}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['codigo'] && changes['codigo'].currentValue) {
      this.generateBarcode();
    }
  }

  ngAfterViewInit(): void {
    this.generateBarcode();
  }

  generateBarcode(): void {
    this.isLoading = true;
    if (this.codigo && this.image) {
      JsBarcode(this.image.nativeElement, this.codigo, {
        format: 'CODE128',
        displayValue: true,
        margin: 15,
      });
    }
    this.isLoading = false;
  }

  async generatePDF() {
    this.isLoading = true;
    try{
      let doc = new jsPDF();//por defecto a4 (210mmx297mm) y unidad de medida mm
      if(this.image){
        this.addImagesToPDF(doc,this.image.nativeElement).save(this.nombre.toLowerCase()+'-codigo-barra.pdf');
      }
    }catch(e){
      this.swalertService.alertError("Error al generar el PDF","Por favor, intente nuevamente.");
      console.error("Error al generar PDF: "+e);
    }
    this.isLoading = false;
  }

  addImagesToPDF(doc:jsPDF, imagen:any){
    const pdfMarginXmm = 20;
    const pdfMarginYmm = 20;
    const pdfAnchoSinMargen = (210-(pdfMarginXmm*2));
    const pdfAltoSinMargen = (297-(pdfMarginYmm*2));
    //tienen que entrar 5 por row y 11 por column
    const anchoImagen = pdfAnchoSinMargen/5;
    const altoImagen = pdfAltoSinMargen/11;

    let xDesde = pdfMarginXmm;
    let yDesde = pdfMarginYmm;
    for(let i = 0; i < this.cantidad; i++){
      //console.log("Voy a añadir una imagen en "+xDesde+" - "+yDesde)
      doc.addImage(imagen,xDesde, yDesde, anchoImagen, altoImagen)
      xDesde += anchoImagen;
      if(xDesde>=pdfAnchoSinMargen){
        xDesde = pdfMarginXmm
        yDesde += altoImagen;
        if(yDesde>=pdfAltoSinMargen){
          yDesde = pdfMarginYmm;
          doc.addPage();
        }
      }
    }
    return doc;
  }


}
