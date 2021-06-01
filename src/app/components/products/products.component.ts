import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import{ProductsService} from'../../services/products.service';
import {ModelService} from '../../services/model.service';
import{BrandService} from'../../services/brand.service';
import { Model } from 'src/app/models/model.model';
import{Brand} from 'src/app/models/brand.model'
import { subscribeOn } from 'rxjs/operators';

// classe productmodel : pour afficher le nom des modèles
class ProductModel
{
  public product: Product; 
  public model : Model;
  public brand: Brand;

  constructor( product : Product, model: Model, brand: Brand)
  {
    this.product= product;
    this.model = model;
    this.brand = brand;
  }
}





@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public productsList: ProductModel[]  = [];



  constructor(private productsService: ProductsService, private modelService: ModelService, private brandService : BrandService, private router: Router) { }

  ngOnInit(): void {
  
     this.productsService.getAll().subscribe(products =>
      {
         products.forEach

         (p=>
          {
         
            this.modelService.getOneById(p.fk_model).subscribe(model =>
              {
                if(model){
                  this.brandService.getOneById(model.fk_brand).subscribe
                  (brand =>
                    {
                    
                      if (model && brand){
                        this.productsList.push (new ProductModel(p, model, brand))
                       // console.log(this.productsList)
                      }
                    })          
                  }else
                  {
                    this.productsList.push(new ProductModel(p, new Model({}), new Brand({})))
                  }
                }
            )
              })

       })
      //console.log(this.productsList)      
     }
     
}
