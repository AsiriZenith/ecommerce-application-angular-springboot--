import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { CartItem } from "../commen/cart-item";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    cartItems: CartItem[] = [];

    totalPrice: Subject<number> = new BehaviorSubject<number>(0);
    totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

    constructor() { }

    addToCart(theCartItem: CartItem) {
        // check if we already have the item in our cart
        let alreadyExistsInCart: boolean = false;
        let existingCartItem: CartItem | undefined;

        if (this.cartItems.length > 0) {
            // find the item in the cart based on item id

            existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

            // check if we found item
            alreadyExistsInCart = (existingCartItem != undefined);
        }

        if (alreadyExistsInCart && existingCartItem) {
            // increment the quantity
            existingCartItem.quantity++;
        } else {
            // just add the item to the array
            this.cartItems.push(theCartItem);
        }

        // compute cart total price and total quantity
        this.computeCartTotals();
    }

    decrementQuantity(theCartItem: CartItem) {
        theCartItem.quantity--;

        if (theCartItem.quantity == 0) {
            this.remove(theCartItem);
        } else {
            this.computeCartTotals();
        }
    }

    computeCartTotals() {
        let totalPriceValue: number = 0;
        let totalQuantityValue: number = 0;

        for (const currentCartItem of this.cartItems) {
            totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
            totalQuantityValue += currentCartItem.quantity;
        }

        // publish the new values ... all subscribers will receive the new data
        this.totalPrice.next(totalPriceValue);
        this.totalQuantity.next(totalQuantityValue);
    }

    remove(theCartItem: CartItem) {
        // get index of item in the array
        const indexOfRemoveItem = this.cartItems.findIndex(item => theCartItem.id === item.id);

        // if found, remove the item from the array at the given index
        if (indexOfRemoveItem > -1) {
            this.cartItems.splice(indexOfRemoveItem, 1);

            this.computeCartTotals();
        }
    }
}