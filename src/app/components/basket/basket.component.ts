import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';



@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  

  items = this.basketService.getItems();
  
  

  constructor(private basketService : BasketService)     
               
  { 
    
  }



  ngOnInit(): void {
    

  }


}
