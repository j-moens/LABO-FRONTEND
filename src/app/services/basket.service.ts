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



@Injectable({
  providedIn: 'root'
})
export class BasketService {

  

    items: Product[] = [];

    addToBasket(product: Product) {
      let basket = JSON.parse(localStorage.getItem("basket")|| "[]");
      basket.push(product);
      localStorage.setItem('basket', JSON.stringify(basket));
    }

    getItems() {
      return JSON.parse(localStorage.getItem("basket")|| "[]");

    }



  constructor(private http: HttpClient) { 
        
  }


}