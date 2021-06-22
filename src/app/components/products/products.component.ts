import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import{ProductsService} from'../../services/products.service';
import {ModelService} from '../../services/model.service';
import{BrandService} from'../../services/brand.service';
import {BasketService} from '../../services/basket.service';
import { Model } from 'src/app/models/model.model';
import{Brand} from 'src/app/models/brand.model'
import { DetailsPhoneComponent } from '../details-phone/details-phone.component';
import { MatDialog} from '@angular/material/dialog';




// classe productmodel : pour afficher le nom des modèles + marques
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
  showModal: boolean = false; // utilisé pour Modal : booléen qui dit que le modal (agrandissement d'image au click) est à false par défaut
  imgModal : string = ''; // utilisé pour préciser que variable imlgModal est un string pour les images
  


  constructor(private productsService: ProductsService, private modelService: ModelService, private brandService : BrandService, 
              private router: Router, public dialog: MatDialog, private BasketService : BasketService)
              { }

  

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
                        //console.log(this.productsList)
                      }
                    })          
                  }else
                  {
                    this.productsList.push(new ProductModel(p, new Model({}), new Brand({})))
                  }
                }
            )
              }
          )

       })
  
     }
      
     // Fonction seeDetails : utilisée pour voir les détails des produits
     seeDetails(product : Product)
     {

      const dlg=this.dialog.open(DetailsPhoneComponent, { data : product}); // la fonction seeDetails renvoie vers le composant DetailsPhone (voir suite plus bas)
                                                // en utlisant mat Dialog, qui peermet d'ouvrir le composant (voir suite plus bas)
                                                // dans une petite fenêtre
     }

     //Panier d'achat (basket)
     addToBasket(product : Product)
     {

      this.BasketService.addToBasket(product) ; 
  
      window.alert('Your product has been added to the cart!');
     
     }


     show(img : string)
     {
       this.showModal = true; // Show-Hide Modal Check
       this.imgModal =img;
       
     }
     //Bootstrap Modal Close event
     hide()
     {
       this.showModal = false;
     }
    
    

     
}
