import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import imageCompression from 'browser-image-compression';
import { Imagen } from '../../model/imagen';

@Component({
  selector: 'app-image-input-form',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './image-input-form.component.html',
  styleUrl: './image-input-form.component.css'
})
export class ImageInputFormComponent {
  
  @Input()
  imagesInput!: Imagen[];
  
  public webpImages: Imagen[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['imagesInput'] && changes['imagesInput'].currentValue) {
      const imagesInput = changes['imagesInput'].currentValue as Imagen[];
      this.webpImages = imagesInput;
    }
  }

  async onFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.webpImages = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const options = {
            maxSizeMB: 1,                // Set the maximum size to 1MB (adjust as necessary)
            maxWidthOrHeight: 1280,      // Set the max width or height to 1280px
            useWebWorker: true,          // Use web worker for better performance
            maxIteration: 10,            // Adjust the maximum iterations for better compression
            initialQuality: 0.75,        // Set the initial quality for the compression
            fileType: 'image/webp'       // Convert to WebP format
          };

          // Compress and convert the image
          const compressedFile = await imageCompression(file, options);

          // Convert the compressed file to base64 string for displaying in img tag
          const webpImage = await this.convertToBase64(compressedFile);
          
          this.webpImages.push(this.generateImage(webpImage.split(',')[1]));//.split(',')[1]
        } catch (error) {
          console.error('Error while converting image:', error);
        }
      }
    }
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  generateImage(webpImageString:string):Imagen{
    let imagen = new Imagen();
    imagen.data=webpImageString;
    return imagen;
  }

  delete(image:Imagen){
    this.webpImages = this.webpImages.filter(i=> i.data !== image.data);
  }

  view(image:Imagen){
    const newTab = window.open();
    if (newTab) {
      newTab.document.body.innerHTML = `<img src="${"data:image/webp;base64,"+image.data}" alt="Image"/>`;
    } else {
      alert('Pop-up bloqueado por el navegador');
    }
  }

}
