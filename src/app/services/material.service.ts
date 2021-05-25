import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

    isActive: boolean = true;

    constructor() 
    {}
}