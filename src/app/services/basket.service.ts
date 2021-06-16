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


export class BasketItems {
  id : number; 
  product : Product ;
  quantity : number;
  
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

    increase(product : Product) {
      let basket = JSON.parse(localStorage.getItem("basket")|| "[]");
      let existingItem = basket.find((x:Product) => x.id == product.id);
      let idx = basket.indexOf(existingItem);
      
      basket[idx].qty++;
     
      localStorage.setItem('basket', JSON.stringify(basket));
    }

    decrease(product : Product) {
      let basket = JSON.parse(localStorage.getItem("basket")|| "[]");
      let existingItem = basket.find((x:Product) => x.id == product.id);
      let idx = basket.indexOf(existingItem);
      
      basket[idx].qty--;

      if (basket[idx].qty<1)
        {
         basket.splice(idx, 1); // on passe l'index du produit (idx) à la fonction slice
        }
      localStorage.setItem('basket', JSON.stringify(basket));

    }

    getTotal()
    {
      let basket = JSON.parse(localStorage.getItem("basket")|| "[]");
      let total =0;
      basket.forEach ((item : Product) =>
        {
          console.log(item);
          total += item.qty * item.price;
        }
        )
        return total ;
    }


  constructor(private http: HttpClient) { 
        
  }


}