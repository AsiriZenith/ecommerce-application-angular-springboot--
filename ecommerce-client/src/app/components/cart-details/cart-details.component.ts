import { Component, OnInit } from "@angular/core";
import { CartItem } from "src/app/commen/cart-item";
import { CartService } from "../../service/cart.service";

@Component({
    selector: 'app-cart-details',
    templateUrl: './cart-details.component.html',
    styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

    cartItems: CartItem[] = [];
    totalPrice: number = 0;
    totalQuantity: number = 0;

    constructor(private cartservice: CartService) { }

    ngOnInit(): void {
        this.listCartDetails();
    }

    listCartDetails() {
        // get a handle to the cart items
        this.cartItems = this.cartservice.cartItems;

        // subscribe to the cart totalPrice
        this.cartservice.totalPrice.subscribe(
            data => this.totalPrice = data
        );

        // subscribe to the cart totalQuantity
        this.cartservice.totalQuantity.subscribe(
            data => this.totalQuantity = data
        );

        //compute cart total price and quantity
        this.cartservice.computeCartTotals();
    }

    incrementQuantity(theCartItem: CartItem) {
        this.cartservice.addToCart(theCartItem);
    }

    decrementQuantity(theCartItem: CartItem) {
        this.cartservice.decrementQuantity(theCartItem);
    }

    remove(cartItem: CartItem) {
        this.cartservice.remove(cartItem);
    }
}