import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { BasketItems, BasketService } from 'src/app/services/basket.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  

  items = this.basketService.getItems();


  constructor(private basketService : BasketService, private router: Router)                  
  { 
 
  }
  ngOnInit(): void {

  }

  increase(product : Product){

    this.basketService.increase(product) ; 
    this.items = this.basketService.getItems(); // utilisé pour reloader la page après avoir cliqué sur increase
  }

  decrease(product : Product) {
    this.basketService.decrease(product) ;
    this.items = this.basketService.getItems();
  }

  getTotal(){
    return this.basketService.getTotal() ;
    
  }


  confirmOrder()
  {

    this.router.navigate(['/confirm-order'])
    
    //faire la redirection vers confirm order, protégée par l'auth guard
    //si l'utilisateur ne peuty y accéderen il y arrive via l'authguard


    //pas besoin, vu qu'on va utiliser la page auth
  //  if (this.authservice.isLoggedIn)
  //  {
  //    //si connecté : 
  //    //si pas connecté : redirect vers la page login pour qu'il se connecte 
  //    //page login qui renverrai la page confirm order
  //  }


   //si login est ok : renvoi vers la page order qui contiendra les informations du panier

    
  }
}




