import { CartItem } from "./cart-item"

export class OrderItem {
    imageUrl: string
    unitPrice: number
    quantity: number
    productId: string

    constructor(item: CartItem) {
        this.productId = "" + item.id
        this.unitPrice = item.unitPrice
        this.quantity = item.quantity
        this.imageUrl = item.imageUrl
    }
}