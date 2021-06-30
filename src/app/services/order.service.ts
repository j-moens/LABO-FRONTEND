import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Order } from '../models/order.model';
import{ServerService} from './server.service'
import {OrderProducts} from '../models/order_products.model'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    currentOrder : Order;


    constructor(private server: ServerService, private router : Router) 
    {
        this.currentOrder = new Order ({});
    }

      confirmOrder(order : Order ):Observable <OrderProducts[]>  //envoyer la commande au backend, puis ensuite dire au backend de décrémenter la quantité en stock par rapport à la quantité commandée
    {
     
      return this.server.post<Order>('orders/create/',order).pipe(
        map(res=>{
       
          return res.success;
        } ),
        
        catchError(err=>
         {
           console.error(err);
          
           return[];
         } )
         
      );
      
    }
    
}


