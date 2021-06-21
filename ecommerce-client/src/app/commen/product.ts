export interface Product {

    //private ProductCategory category;
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