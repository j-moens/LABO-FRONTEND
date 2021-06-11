export class OrderProducts
{
    id: number;
    fk_order: number;
    fk_products : number;
    quantity : number;

    constructor(data: any)
    {
        this.id = data.id;
        
        this.fk_order = data.fk_order;
        this.fk_products = data.fk_products;
        this.quantity= data.quantity;
    }
}