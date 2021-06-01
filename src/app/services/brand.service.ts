import { Injectable } from '@angular/core';
import{ServerService} from './server.service'
import {Brand} from '../models/brand.model';
import { Observable } from 'rxjs';
import{ map, catchError } from 'rxjs/operators';
import{Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  

    constructor(private server: ServerService) { 
        
    }


   
 
    public getOneById(id: number): Observable<Brand | null>
    {
        
        return this.server.get<Brand[]>('brands/' + id, false).pipe( // false : permet de dire que le boolean de la sécurité server service du get est à false,
                                                                    //ce qui permet de se passer de l'authentification si on veut voir les produits
                                                                    // (par défaut, la sécurité est à true)
            map(res =>
                {
                    return res.length>0? new Brand (res[0]):null;

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