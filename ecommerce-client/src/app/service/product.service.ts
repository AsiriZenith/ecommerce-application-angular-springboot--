import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Product } from "../commen/product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private baseUrl = 'http://localhost:8088/api/products';

    constructor(
        private httpClient: HttpClient
    ) { }

    getProductList(categoryId: number): Observable<Product[]> {

        // @TODO: need to build URL based on category id ... will come back to this! 
        return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
            map(res => res._embedded.products)
        );
    }
}

interface GetResponse {
    _embedded: {
        products: Product[];
    }
}