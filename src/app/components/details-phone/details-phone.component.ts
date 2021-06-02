import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DetailsPhone } from 'src/app/models/details_phone.model';
import { Product } from 'src/app/models/product.model';
import { DetailsService } from 'src/app/services/details_phone.service';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-details-phone',
  templateUrl: './details-phone.component.html',
  styleUrls: ['./details-phone.component.scss']
})
export class DetailsPhoneComponent implements OnInit {
  public detail: DetailsPhone = new DetailsPhone({}) ; // on lui passe le modèle



  constructor(private detailsService : DetailsService, private router: Router,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: Product)
               
  { 
    this.detailsService.getOneByProductId (this.data.id).subscribe(detail=>
    {
      if(detail)
      {
        this.detail = detail; 
      }
                  
    }) 
  }

  ngOnInit(): void {

   

  }  

}
