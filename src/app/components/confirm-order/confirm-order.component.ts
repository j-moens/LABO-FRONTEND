import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';



@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {
 
 
  

  items = this.basketService.getItems();

  total : number = this.basketService.getTotal()+15 // total pour get total + frais de livraison initialisé à 15 euros (pour mode de livraison normal)
  order : Order;
  constructor(private basketService : BasketService, private router : Router, private authservice : AuthService, private orderService : OrderService) 
  { 
    this.order = new Order ({}) ;
    this.order.fk_users = this.authservice.getCurrentUser().id;

  }

  ngOnInit(): void {
     this.getTotal1('normal'); // initialisation en normal
  }

 

  getTotal(){
    
    return this.basketService.getTotal() ;
    
  }

  getTotal1(param : string){ // fonction getTotal + frais de livraison
   
 
    if (param==="normal"){
     
      //this.total =  this.basketService.getTotal() + 15 ;
      this.order.shipping_cost=15;
      this.order.shipping_type = true;
    } else  {
      //this.total = this.basketService.getTotal() + 50 ; 
      this.order.shipping_cost=50; 
      this.order.shipping_type = false;                                           
    }
      this.total = this.basketService.getTotal()+ this.order.shipping_cost;
      //console.log(param);
   
  }

  confirmorder() 
    {
      this.orderService.currentOrder=this.order;
      
      this.router.navigate(['/order']);
      
    }


}
