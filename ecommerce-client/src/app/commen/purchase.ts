import { Order } from "./order";
import { Address } from "./address";
import { Customer } from "./customer";
import { OrderItem } from "./order-item";

export class Purchase {
    order: Order
    customer: Customer
    billingAddress: Address
    shippingAddress: Address
    orderItems: OrderItem[]
}