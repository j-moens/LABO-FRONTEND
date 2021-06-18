//  utilisé pour gérer les commandes
// première étap : authentification pour order_products (confirmation du panier) puis confirmation commande qui 
// va renvoyer page order, où l'utilisateur pourra choisir
//les options de livraison (gratuit pour commande supérieur à 250 euros, ou plusieurs options d'envoi : normal (moins cher)
//n envoi express (plus cher) par ex)

import { Injectable } from '@angular/core';
import{ServerService} from './server.service'
import {Product} from '../models/product.model';
import { Observable } from 'rxjs';
import{ map, catchError } from 'rxjs/operators';
import{Router} from '@angular/router';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { BasketComponent } from '../components/basket/basket.component';

export class OrderService
{














    
}