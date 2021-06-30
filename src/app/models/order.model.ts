import { Product } from "./product.model";

export class Order
{
    reference: number;
    delivery_time : Date;
    shipping_cost: number;
    fk_users : number;
    shipping_type : boolean; 
    products : Product;
    

    constructor(data: any)
    {
        this.reference = data.id;
        this.delivery_time = data.delivery_time;
        this.shipping_cost = data.shipping_cost;
        this.fk_users = data.fk_users;
        this.shipping_type = data.shipping_type;
        this.products = data.products;
      
    }
}