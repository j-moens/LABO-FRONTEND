export class Product
{
    
    id: number;
    reference:number;
    name: string;
    description: string;
    price: number;
    fk_model : number;
    fk_brand: number;
   
    
   
   

    constructor(data: any)
    {
        this.id = data.id;
        this.reference= data.reference;
        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
        this.fk_model = data.fk_model;
        this.fk_brand = data.fk_brand;
       
      
    }
}