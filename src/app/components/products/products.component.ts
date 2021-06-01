import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import{ProductsService} from'../../services/products.service'
import {ModelService} from '../../services/model.service'
import { Model } from 'src/app/models/model.model';


class ProductModel
{
  public product: Product; 
  public model : Model;

  constructor( product : Product, model: Model)
  {
    this.product= product;
    this.model = model;
  }
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public productsList: ProductModel[]=[];

  constructor(private productsService: ProductsService, private modelService: ModelService, private router: Router) { }

  ngOnInit(): void {
  
     this.productsService.getAll().subscribe(products =>
      {
         products.forEach(p=>
          {
            this.modelService.getOneById(p.fk_model).subscribe(model =>
              {
                if (model){
                  this.productsList.push(new ProductModel(p, model))
                }else{
                  this.productsList.push(new ProductModel(p, new Model({})))
                }
                
              })
            
          }
          )
       
       })
       console.log(this.productsList);
    
       
     }
}
