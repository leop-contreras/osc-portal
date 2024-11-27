import { Injectable } from '@angular/core';

declare const $:any

@Injectable({
  providedIn: 'root'
})
export class SqlService {

  constructor() { }

  query(data:string, operator:string){
    let r:any = []
    $.ajax({
      url:'http://localhost/web3/osc-portal/osc-app-back/server.php',
      method:'post',
      async:false,
      data:{
        'operation':operator,
        'query':data
      },
      success:(response:any) => {
        console.log(response);
        console.log();
        r = JSON.parse(response);
      },
      error:(xhr:any,http:any,error:any) => {
        console.error(error);
      },
    });
    return r;
  }
}
