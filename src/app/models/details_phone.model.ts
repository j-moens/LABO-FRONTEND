export class DetailsPhone
{
    id: number;
    screen_size: number;
    processor : number;
    capacity : number;
    ram : number;
    os_version : string;
    fk_products : number; 


   
   

    constructor(data: any)
    {
        this.id = data.id;
        this.screen_size = data.screen_size;
        this.processor = data.processor;
        this.capacity = data.capacity;
        this.ram = data.ram;
        this.os_version = data.os_version;
        this.fk_products = data.fk_products;
     
      
    }
}