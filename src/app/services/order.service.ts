import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    currentOrder : Order;

    constructor() 
    {
        this.currentOrder = new Order ({});
    }
}