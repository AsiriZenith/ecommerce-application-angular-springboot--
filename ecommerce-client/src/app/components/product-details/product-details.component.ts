import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product } from "src/app/commen/product";
import { ProductService } from "src/app/service/product.service";

@Component({
    selector: 'product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

    product: Product = { id: 0, sku: '', name: '', description: '', unitPrice: 0, imageUrl: '', active: false, unitsInStock: 0, dateCreated: new Date(), lastUpdated: new Date() };
    
    constructor(
        private productService: ProductService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(() => {
            this.handleProductDetails();
        })
    }

    handleProductDetails() {
        const productId: string | null = this.route.snapshot.paramMap.get('id');
        const theProductId: number = productId ? parseInt(productId) : 0;

        this.productService.getProduct(theProductId).subscribe(
            data => {
                this.product = data;
            }
        );
    }

}