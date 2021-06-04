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

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  

    constructor(private server: ServerService) { 
        
    }



    public getOneById(id: number): Observable<Basket | null>
    {
        
        return this.server.get<Basket[]>('basket/' + id, false).pipe( // false : permet de dire que le boolean de la sécurité server service du get est à false,
                                                                    //ce qui permet de se passer de l'authentification si on veut voir les produits
                                                                    // (par défaut, la sécurité est à true)
            map(res =>
                {
                    return res.length>0? new Basket (res[0]):null;

                }
                
                ),
            catchError(err=>
            {
            console.error(err);
            return[];
            } )
        );
    }



}