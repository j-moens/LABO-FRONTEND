export class User
{
    id: number;
    lastname: string;
    firstname: string;
    email: string;
    password:string;

    number_street : string;
    street : string;
    zipcode : number;
    city : string;
    country : string;
    extra_info : string;
    gender : string;
    birth_date: Date;
    phone_number : string;
    
    admin: boolean;

    constructor(data: any)
    {
        this.id = data.id;
        this.lastname= data.lastname;
        this.firstname = data.firstname;
        this.email = data.email;
        this.password = data.password;

        this.number_street = data.number_street;
        this.street = data.street;
        this.zipcode = data.zipcode;
        this.city = data.city;
        this.country = data.country;
        this.extra_info = data.extra_info;
        this.gender = data.gender;
        this.birth_date = new Date (data.birth_date);
        this.phone_number = data.phone_number;

        this.admin = data.admin;
      
    }
}