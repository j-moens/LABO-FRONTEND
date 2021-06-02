import { Injectable } from '@angular/core';
import{ServerService} from './server.service'
import {DetailsPhone} from '../models/details_phone.model';
import { Observable } from 'rxjs';
import{ map, catchError } from 'rxjs/operators';
import{Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
    
    constructor(private server: ServerService) { }
    public getOneById(id: number): Observable<DetailsPhone | null>
    {
        
        return this.server.get<DetailsPhone[]>('details_phone/' + id, false).pipe( // false : permet de dire que le boolean de la sécurité server service du get est à false,
                                                                    //ce qui permet de se passer de l'authentification si on veut voir les produits
                                                                    // (par défaut, la sécurité est à true)
            map(res =>
                {
                    return res.length>0? new DetailsPhone (res[0]):null;

                }
                
                ),
            catchError(err=>
            {
            console.error(err);
            return[];
            } )
        );
    }


    public getAll(): Observable<DetailsPhone[]>
    {
        
        return this.server.get<DetailsPhone[]>('products/', false).pipe( // false : permet de dire que le boolean de la sécurité server service du get est à false,
                                                                    //ce qui permet de se passer de l'authentification si on veut voir les produits
                                                                    // (par défaut, la sécurité est à true)
            map(res =>
                {
                    return ( res.map((m: any) =>new DetailsPhone(m)))
                }
                
                ),
            catchError(err=>
            {
            console.error(err);
            return[];
            } )
        );
    }


    public getOneByProductId(id: number): Observable<DetailsPhone | null>
    {
        
        return this.server.get<DetailsPhone[]>('details_phone/fk_products/' + id, false).pipe( // false : permet de dire que le boolean de la sécurité server service du get est à false,
                                                                    //ce qui permet de se passer de l'authentification si on veut voir les produits
                                                                    // (par défaut, la sécurité est à true)
            map(res =>
                {
                    return res.length>0? new DetailsPhone (res[0]):null;

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