// gérer service 
//service va être géré par la liste de produits et par  composant basket
//

import { Injectable } from '@angular/core';
import{ServerService} from './server.service'
import {Product} from '../models/product.model';
import { Observable } from 'rxjs';
import{ map, catchError } from 'rxjs/operators';
import{Router} from '@angular/router';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { BasketComponent } from '../components/basket/basket.component';
import { OrderProducts } from '../models/order_products.model';

export class BasketItems {
  id : number; 
  product : Product ;
  quantity : number;
  static quantity: number;

  constructor (id: number, product : Product) {
    this.product = product ; 
    this.quantity = 1;
    this.id = id ;
  }
}

@Injectable({
  providedIn: 'root'
})
export class BasketService {
    items: Product[] = [];

    addToBasket(product: Product) {
    
      /*
      1 Object Basket contient le basketID de ta DB Contient un array de BAsketItem
      1 Object BasketItem qui va contenir orderItemID produit et quantity

      let basket = JSON.parse(localStorage.getItem("basket")|| "[]");
          basket : BasketItem 
          verifier que le basket ne contient pas deja le produit;
          Si le produit se trouve dans le basket ->
            basket[id].quantity += 1
            --- basket.items[id].quantity += 1
            --- basket.id qui servira pour update la DB
            update l²item  dans la DB
          Si le produit n²est pas deja dans le basket ->
            basket.push(new BasketItem(product))
            ajouter un item dans la DB

      sauver le tout 

      Si l²utilisateur est connecter alors ajouter le nouvel element ou update 

      */


      /* ancien code, à garder pour souvenirs ;-) */

      //  let basket = JSON.parse(localStorage.getItem("basket")|| "[]");
      // basket.push(product);
      // localStorage.setItem('basket', JSON.stringify(basket));

          let basket = JSON.parse(localStorage.getItem("basket")|| "[]");
          //existing item
          let existingItem = basket.find((x:Product) => x.id == product.id); // on cherche si l'item existe
          
          if(existingItem){ // si il existe
            let idx = basket.indexOf(existingItem); // on recherche son index
           
            if(idx!=-1){ basket[idx].qty++;}  //on incrémente la quantité
          }else basket.push(product)  //si iln'existe pas : on le push
               
          localStorage.setItem('basket', JSON.stringify(basket)); // dans tous les cas, on enregistre dans le local sotrage
         
    }

    getItems() {
      return JSON.parse(localStorage.getItem("basket")|| "[]");

    }





  constructor(private http: HttpClient) { 
        
  }


}