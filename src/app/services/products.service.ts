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


   

    public getAll(): Observable<Product[]>
    {
        return this.server.get<Product[]>('products/').pipe(
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

}