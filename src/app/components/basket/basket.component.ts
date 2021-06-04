import { Component, OnInit, Input } from '@angular/core';
import {Basket} from 'src/app/models/basket.model'
import { BasketService } from 'src/app/services/basket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  public basket: Basket = new Basket({}) ; // on lui passe le modèle



  constructor(private basketService : BasketService, private router: Router)
             
              
               
  { 
    this.basketService.getOneById (this.basket.id).subscribe(basket=>
    {
      if(basket)
      {
        this.basket= basket; 
      }
                  
    }) 
  }

  ngOnInit(): void {

   

  }  

}


