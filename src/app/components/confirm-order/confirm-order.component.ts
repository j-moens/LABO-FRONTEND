import { Component, OnInit, TRANSLATIONS_FORMAT } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';
import{ControlContainer, NgForm, ValidatorFn, Validators, AbstractControl, FormArray} from '@angular/forms';



@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {

 
  

  items = this.basketService.getItems();

  total : number = this.basketService.getTotal()+15 // total pour get total + frais de livraison initialisé

  constructor(
    
    private basketService : BasketService) { }

  ngOnInit(): void {
     
  }

 

  getTotal(){
    
    return this.basketService.getTotal() ;
    
  }

  getTotal1(param : string){ // fonction getTotal + frais de livraison

 
    if (param==="normal"){
     
      this.total =  this.basketService.getTotal() + 15 ;
    } else {
      this.total = this.basketService.getTotal() + 50 ;
    }
     
     
  }


}
