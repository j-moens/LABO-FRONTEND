import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';
import{ConfirmOrderComponent} from 'src/app/components/confirm-order/confirm-order.component'
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  items = this.basketService.getItems();

  constructor(private basketService : BasketService, private orderService : OrderService) { }

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
      }else{
        return this.basketService.getTotal() + 50;
      }  
  }

  Confirm()
  {
    localStorage.clear();
    window.location.reload()
  }
  

}
