import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Product } from "../commen/product";
import { ProductCategory } from "../commen/product-category";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    // full project github Url
    // github Url : https://github.com/darbyluv2code/fullstack-angular-and-springboot

    private baseUrl = 'http://localhost:8088/api/products';
    private categoryUrl = 'http://localhost:8088/api/product-category';

    constructor(
        private httpClient: HttpClient
    ) { }

    getProduct(theProductId: number): Observable<Product> {
        // need to build URL based on product id
        const productUrl = `${this.baseUrl}/${theProductId}`;

        return this.httpClient.get<Product>(productUrl);
    }

    getProductList(categoryId: number): Observable<Product[]> {
        // need to build URL based on category id 
        const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

        return this.getProducts(searchUrl);
    }

    searchProducts(theKeyword: string | null): Observable<Product[]> {
        // need to build URL based on the keyword 
        const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

        return this.getProducts(searchUrl);
    }

    private getProducts(searchUrl: string): Observable<Product[]> {

        return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
            map(res => res._embedded.products)
        );

    }

    getProductCategories(): Observable<ProductCategory[]> {

        return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
            map(res => res._embedded.productCategory)
        );
        
    }

}

interface GetResponseProducts {
    _embedded: {
        products: Product[];
    }
}

interface GetResponseProductCategory {
    _embedded: {
        productCategory: ProductCategory[];
    }
}