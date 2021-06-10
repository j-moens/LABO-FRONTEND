// basketProduct : va contenir quantité, noms et prix du panier

import { Product } from "./product.model";

export class BasketProduct{

    name: string;
    price: number;
    quantity : number;

    constructor(data: any)
    {
        this.name = Product.name;
        this.price = data.price;
        this.quantity = data.quantity;
       
      
    }
}