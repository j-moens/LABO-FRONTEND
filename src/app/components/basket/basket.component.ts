import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { BasketItems, BasketService } from 'src/app/services/basket.service';




@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  

  items = this.basketService.getItems();


  constructor(private basketService : BasketService,)                  
  { 
 
  }
  ngOnInit(): void {

  }

  increase(product : Product){

    this.basketService.increase(product) ; 
    this.items = this.basketService.getItems(); // utilisé pour reloader la page après avoir cliqué sur increase
  }

  decrease(product : Product) {
    this.basketService.decrease(product) ;
    this.items = this.basketService.getItems();
  }

  getTotal(basket : BasketComponent)
  {
   this.items = this.items.price * this.items.qty;
  
    
    }

  confirmOrder()
  {}
}




