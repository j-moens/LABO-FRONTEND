//ce bask product component va faire appel au basketcomponent pour affichier nom, prix, quantité
// à la différence de commposant basket qui fait appel ) un tableau de produit, le basketproduct component
//va faire appel à un tableau d'items basket
import { Component, OnInit } from '@angular/core';
import {BasketComponent} from '../basket/basket.component'
import{BasketService} from '../../services/basket.service'
import { BasketProduct } from 'src/app/models/basketProduct.model';

@Component({
  selector: 'app-basket-product',
  templateUrl: './basket-product.component.html',
  styleUrls: ['./basket-product.component.scss']
})
export class BasketProductComponent implements OnInit {
  public basketProduct = new BasketProduct({}) // on lui passe le modèle

  constructor(private basketService : BasketService) 
  
     {
    //   this.basketService.getItems ().subscribe(this.basketProduct=>
    //     {
    //       if(name)
    //       {
    //         this.basketProduct = BasketProduct; 
    //       }
                      
    //     }) 

     }  

  ngOnInit(): void {
  }

}
