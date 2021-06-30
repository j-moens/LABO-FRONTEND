import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {


  items = this.basketService.getItems();
  


  constructor(private basketService : BasketService, private orderService : OrderService, private authservice : AuthService) { }

  ngOnInit(): void {
    
  }

  
  getTotal(){
    
    return this.basketService.getTotal() ;
    
  }

  choice()
  
  {
    return this.orderService.currentOrder.shipping_type?'normal':'express'; 
  }

  totalOrder()
  {
      if(this.orderService.currentOrder.shipping_type ? 'normal':'') 
      {
        return this.basketService.getTotal() + 15;
      }
      else
      {
        return this.basketService.getTotal() + 50;
      }  
  }

  Confirm()
  {
    
    //envoyer la commande au backend, puis ensuite dire au backend de décrémenter la quantité en stock par rapport à la quantité commandée
    //let order = new Order({});
    this.orderService.currentOrder.products=this.items;

    //order.products=this.items;
    this.orderService.currentOrder.fk_users = this.authservice.getCurrentUser().id;
    this.orderService.confirmOrder(this.orderService.currentOrder).subscribe(m => {});
    localStorage.clear();
    window.location.reload();
  }
  

}
