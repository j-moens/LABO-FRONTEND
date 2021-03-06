import { Injectable } from '@angular/core';
import{ServerService} from './server.service'
import {Product} from '../models/product.model';
import { Observable } from 'rxjs';
import{ map, catchError } from 'rxjs/operators';
import{Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  

    constructor(private server: ServerService) { 
        
    }


   
    // Pour la table products
    public getAll(): Observable<Product[]>
    {
        
        return this.server.get<Product[]>('products/', false).pipe( // false : permet de dire que le boolean de la sécurité server service du get est à false,
                                                                    //ce qui permet de se passer de l'authentification si on veut voir les produits
                                                                    // (par défaut, la sécurité est à true)
            map(res =>
                {
                    return ( res.map((m: any) =>new Product(m)))
                }
                
                ),
            catchError(err=>
            {
            console.error(err);
            return[];
            } )
        );
    }

    public getOneById(id: number): Observable<Product | null>
    {
        
        return this.server.get<Product[]>('products/' + id, false).pipe( // false : permet de dire que le boolean de la sécurité server service du get est à false,
                                                                    //ce qui permet de se passer de l'authentification si on veut voir les produits
                                                                    // (par défaut, la sécurité est à true)
            map(res =>
                {
                    return res.length>0? new Product (res[0]):null;

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