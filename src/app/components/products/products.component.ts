import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import{ProductsService} from'../../services/products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public productsList!: Product[];

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
  
     this.productsService.getAll().subscribe(products =>
      {
         this.productsList = products;
       
       })
     }
}
