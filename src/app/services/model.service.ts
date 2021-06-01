import { Injectable } from '@angular/core';
import{ServerService} from './server.service'
import {Model} from '../models/model.model';
import { Observable } from 'rxjs';
import{ map, catchError } from 'rxjs/operators';
import{Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  

    constructor(private server: ServerService) { 
        
    }


   
 
    public getOneById(id: number): Observable<Model | null>
    {
        
        return this.server.get<Model[]>('models/' + id, false).pipe( // false : permet de dire que le boolean de la sécurité server service du get est à false,
                                                                    //ce qui permet de se passer de l'authentification si on veut voir les produits
                                                                    // (par défaut, la sécurité est à true)
            map(res =>
                {
                    return res.length>0? new Model (res[0]):null;

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