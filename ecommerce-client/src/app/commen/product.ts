export interface Product {

    //private ProductCategory category;
    id : number;
    sku : string;
    name : string;
    description : string;
    unitPrice : number;
    imageUrl : string;
    active : boolean;
    unitsInStock : number;
    dateCreated : Date;
    lastUpdated : Date;

}