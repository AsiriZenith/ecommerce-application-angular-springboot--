import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CartItem } from "src/app/commen/cart-item";
import { Product } from "src/app/commen/product";
import { ProductCategory } from "src/app/commen/product-category";
import { CartService } from "src/app/service/cart.service";
import { ConstantsService } from "src/app/service/const.service";
import { ProductService } from "src/app/service/product.service";

@Component({
    selector: 'product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

    currentSelectedCategory: ProductCategory = { id: 0, categoryName: ''};

    product: Product = { id: 0, sku: '', name: '', description: '', unitPrice: 0, imageUrl: '', active: false, unitsInStock: 0, dateCreated: new Date(), lastUpdated: new Date() };

    constructor(
        private route: ActivatedRoute,
        private cartservice: CartService,
        private productService: ProductService,
        private constantsService: ConstantsService
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
                this.getSelectedCategory(this.product.sku);
            }
        );
    }

    addToCart() {
        const cartItem: CartItem = { id: this.product.id, name: this.product.name, unitPrice: this.product.unitPrice, imageUrl: this.product.imageUrl, quantity: 0 };
        this.cartservice.addToCart(cartItem);
    }

    /* get selected category type */
    getSelectedCategory(sku: string) {
      this.constantsService.CATEGORY_ITEMS.find((item) => {
        if (sku.includes(item.categoryName)) {
          this.currentSelectedCategory = item;
        }
      });
    }
}

