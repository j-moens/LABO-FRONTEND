
export class Basket
{
    id: number;
    productBasket : string;
    quantityBasket : number;
  

    

    constructor(data: any)
    {
        this.id = data.id;
        this.productBasket = data.productBasket;
        this.quantityBasket = data.quantityBasket;
      
    }
}