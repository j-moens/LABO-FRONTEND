export class Model
{
    id: number;
    name: string;
    fk_brand : number;

   
   

    constructor(data: any)
    {
        this.id = data.id;
        this.name = data.name;
        this.fk_brand = data.fk_brand;
     
      
    }
}