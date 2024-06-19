import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  alertSuccess(title:string,message:string){
    Swal.fire({
      title: title,
      text: message,
      icon: "success"
    });
  }

  alertError(title:string,message:string){
    Swal.fire({
      icon: "error",
      title: title,
      text: message,
      //footer: '<a href="#">Why do I have this issue?</a>'
    });
  }

  async alertConfirm(message:string, btnConfirmMessage:string, btnCancelMessage:string):Promise<boolean>{
    const result = await Swal.fire({
      title: message,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: btnConfirmMessage,
      denyButtonText: btnCancelMessage
    });
    if (result.isConfirmed) {
      return true; // Usuario confirmó
    } else {
      return false; // Usuario canceló o cerró la alerta
    }
  }

}
