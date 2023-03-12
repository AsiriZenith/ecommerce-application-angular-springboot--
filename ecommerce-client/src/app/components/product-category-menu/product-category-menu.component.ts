import { Component, OnInit } from "@angular/core";
import { ProductCategory } from "../../commen/product-category";
import { ProductService } from "../../service/product.service";

@Component({
    selector: 'product-category-menu',
    templateUrl: './product-category-menu.component.html',
    styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit{

    productCategories: ProductCategory[] | undefined;

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
       this.listProductCategories();
    }

    listProductCategories() {
        this.productService.getProductCategories().subscribe(
            data => {
                this.productCategories = data;
            }
        );
    }
}
