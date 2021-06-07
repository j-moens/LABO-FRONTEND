// gérer service 
//service va être géré par la liste de produits et par  composant basket
//

import { Injectable } from '@angular/core';
import{ServerService} from './server.service'
import {Product} from '../models/product.model';
import { Observable } from 'rxjs';
import{ map, catchError } from 'rxjs/operators';
import{Router} from '@angular/router';
import { Basket } from '../models/basket.model';
import{HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasketService {


    items: Product[] = [];

    addToBasket(product: Product) {
      this.items.push(product);
    }

    getItems() {
      return this.items;
    }

  

  constructor(private http: HttpClient) { 
        
  }

    // private BASE_URL='https://localhost:8000/api/';
   
    //  public get<T>(url: string, secure: boolean = false): Observable<any> // <T> : permet de passer un type quelconque
    //  {
    //      return this.http.get(this.BASE_URL + url);
    //  }
   
    //  public post<T>(url:string, body:T, secure: boolean = false): Observable<any>
    //  {
    //      return this.http.post(this.BASE_URL + url, body);
    //  }
   
    //  public put<T>(url:string, body:T): Observable<any>
    //  {
    //    return this.http.put(this.BASE_URL + url, body); 
    //  }


    // public getOneById()
    //     {
    //     sessionStorage.setItem('basket', JSON.stringify(Basket));
    //     }
        

    // public getOneById(id: number): Observable<Basket | null>
    // {
        
    //     return this.server.get<Basket[]>('basket/' + id, false).pipe( // false : permet de dire que le boolean de la sécurité server service du get est à false,
    //                                                                 //ce qui permet de se passer de l'authentification si on veut voir les produits
    //                                                                 // (par défaut, la sécurité est à true)
    //         map(res =>
    //             {
    //                 return res.length>0? new Basket (res[0]):null;

    //             }
                
    //             ),
    //         catchError(err=>
    //         {
    //         console.error(err);
    //         return[];
    //         } )
    //     );
    // }



}