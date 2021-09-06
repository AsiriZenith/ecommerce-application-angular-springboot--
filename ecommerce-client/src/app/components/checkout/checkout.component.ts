import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { WhiteSpaceValidator } from "../../validators/White.space.validator";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { State } from "../../commen/state";
import { Order } from "../../commen/order";
import { Country } from "../../commen/country";
import { Purchase } from "../../commen/purchase";
import { OrderItem } from "../../commen/order-item";

import { CartService } from "../../service/cart.service";
import { CheckoutService } from "../../service/checkout.service";
import { ShopFormService } from "../../service/shop.form.service";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    checkoutForm!: FormGroup

    totalPrice: number = 0
    totalQuantity: number = 0

    creditCardYears: number[] = []
    creditCardMonths: number[] = []

    countries: Country[] = []

    shippingAddressState: State[] = []
    billingAddressState: State[] = []

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private cartService: CartService,
        private shopFormService: ShopFormService,
        private checkoutService: CheckoutService
    ) { }

    ngOnInit(): void {
        this.checkoutForm = this.formBuilder.group({
            customer: this.formBuilder.group({
                firstName: new FormControl('',
                    [Validators.required, Validators.minLength(2), WhiteSpaceValidator.notOnlyWhiteSpace]),
                lastName: new FormControl('',
                    [Validators.required, Validators.minLength(2), WhiteSpaceValidator.notOnlyWhiteSpace]),
                email: new FormControl('',
                    [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]
                )
            }),
            shippingAddress: this.formBuilder.group({
                street: new FormControl('',
                    [Validators.required, Validators.minLength(2), WhiteSpaceValidator.notOnlyWhiteSpace]),
                city: new FormControl('',
                    [Validators.required, Validators.minLength(2), WhiteSpaceValidator.notOnlyWhiteSpace]),
                state: new FormControl('', [Validators.required]),
                country: new FormControl('', [Validators.required]),
                zipCode: new FormControl('',
                    [Validators.required, Validators.minLength(2), WhiteSpaceValidator.notOnlyWhiteSpace]),
            }),
            billingAddress: this.formBuilder.group({
                street: new FormControl('',
                    [Validators.required, Validators.minLength(2), WhiteSpaceValidator.notOnlyWhiteSpace]),
                city: new FormControl('',
                    [Validators.required, Validators.minLength(2), WhiteSpaceValidator.notOnlyWhiteSpace]),
                state: new FormControl('', [Validators.required]),
                country: new FormControl('', [Validators.required]),
                zipCode: new FormControl('',
                    [Validators.required, Validators.minLength(2), WhiteSpaceValidator.notOnlyWhiteSpace]),
            }),
            creditCard: this.formBuilder.group({
                cardType: new FormControl('', [Validators.required]),
                nameOnCard: new FormControl('',
                    [Validators.required, Validators.minLength(2), WhiteSpaceValidator.notOnlyWhiteSpace]),
                cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
                securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
                exipirationMonth: [''],
                exipirationYear: ['']
            })
        });

        // populate credit card months
        const startMonth: number = new Date().getMonth() + 1
        console.log("startMonth :" + startMonth)

        this.shopFormService.getCreditCardMonths(startMonth).subscribe(
            data => {
                console.log("Retrieved credit card months: " + JSON.stringify(data))
                this.creditCardMonths = data
            }
        )

        // populate credit card years
        this.shopFormService.getCreditCardYears().subscribe(
            data => {
                console.log("Retrieved credit card years: " + JSON.stringify(data))
                this.creditCardYears = data
            }
        )

        // populate contries
        this.shopFormService.getCountries().subscribe(
            data => {
                console.log("Recieved countries : " + JSON.stringify(data))
                this.countries = data
            }
        )

        // call review cart details method
        this.reviewCartDetails()
    }

    get firstName(): AbstractControl { return this.checkoutForm.get('customer.firstName') }
    get lastName(): AbstractControl { return this.checkoutForm.get('customer.lastName') }
    get email(): AbstractControl { return this.checkoutForm.get('customer.email') }

    get shippingAddressCity(): AbstractControl { return this.checkoutForm.get('shippingAddress.city') }
    get shippingAddressstate(): AbstractControl { return this.checkoutForm.get('shippingAddress.state') }
    get shippingAddressStreet(): AbstractControl { return this.checkoutForm.get('shippingAddress.street') }
    get shippingAddressCountry(): AbstractControl { return this.checkoutForm.get('shippingAddress.country') }
    get shippingAddressZipCode(): AbstractControl { return this.checkoutForm.get('shippingAddress.zipCode') }

    get billingAddressCity(): AbstractControl { return this.checkoutForm.get('billingAddress.city') }
    get billingAddressstate(): AbstractControl { return this.checkoutForm.get('billingAddress.state') }
    get billingAddressStreet(): AbstractControl { return this.checkoutForm.get('billingAddress.street') }
    get billingAddressCountry(): AbstractControl { return this.checkoutForm.get('billingAddress.country') }
    get billingAddressZipCode(): AbstractControl { return this.checkoutForm.get('billingAddress.zipCode') }

    get creditCardcardType(): AbstractControl { return this.checkoutForm.get('creditCard.cardType') }
    get creditCardnameOnCard(): AbstractControl { return this.checkoutForm.get('creditCard.nameOnCard') }
    get creditCardcardNumber(): AbstractControl { return this.checkoutForm.get('creditCard.cardNumber') }
    get creditCardsecurityCode(): AbstractControl { return this.checkoutForm.get('creditCard.securityCode') }

    onSubmit() {
        if (this.checkoutForm.invalid) {
            this.checkoutForm.markAllAsTouched()
            return
        }
        // console.log("Handling the submit button")
        // console.log(this.checkoutForm.get('customer')?.value)
        // console.log(this.checkoutForm.get('shippingAddress')?.value)
        // console.log(this.checkoutForm.get('billingAddress')?.value)
        // console.log(this.checkoutForm.get('creditCard')?.value)

        // set up order
        let order = new Order()
        order.totalPrice = this.totalPrice
        order.totalQuantity = this.totalQuantity

        // get cart items
        const cartItems = this.cartService.cartItems

        // create orderItems from cartItems
        /*
        // - long way
        let orderItems: OrderItem[] = []
        for (let i = 0; i < cartItems.length; i++) {
            orderItems[i] = new OrderItem(cartItems[i])
        }
        */
        // - short way
        let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem))

        // set up perchase
        let purchase = new Purchase()

        // populate purchase - customer
        purchase.customer = this.checkoutForm.controls['customer'].value

        // populate purchase - shipping address
        purchase.shippingAddress = this.checkoutForm.controls['shippingAddress'].value
        const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state))
        const shippingCountry: State = JSON.parse(JSON.stringify(purchase.shippingAddress.country))
        purchase.shippingAddress.state = shippingState.name
        purchase.shippingAddress.country = shippingCountry.name

        // populate purchase - billing address
        purchase.billingAddress = this.checkoutForm.controls['billingAddress'].value
        const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state))
        const billingCountry: State = JSON.parse(JSON.stringify(purchase.billingAddress.country))
        purchase.billingAddress.state = billingState.name
        purchase.billingAddress.country = billingCountry.name

        // populate purchase - order and orderItems
        purchase.order = order
        purchase.orderItems = orderItems

        console.log(purchase)

        // call REST API via the CheckoutService
        this.checkoutService.placeOrder(purchase).subscribe({
            next: res => {
                alert(`Your order has been received.\nOrder tracking number: ${res.o}`)

                // reset cart
                this.resetCart()
            },
            error: err => {
                alert(`There was an error: ${err.message}`)
            }
        })
    }

    resetCart() {
        // reset cart data
        this.cartService.cartItems=[]
        this.cartService.totalPrice.next(0)
        this.cartService.totalQuantity.next(0)

        // reset form data
        this.checkoutForm.reset()

        // navigate back to the products page
        this.router.navigateByUrl("/products")
    }

    copyShippingAddressToBillingAddress(e) {
        if (e.target.checked) {
            this.checkoutForm.controls.billingAddress
                .setValue(this.checkoutForm.controls.shippingAddress.value)

            // bug fix for states
            this.billingAddressState = this.shippingAddressState
        } else {
            this.checkoutForm.controls.billingAddress.reset()

            // bug fix for states
            this.billingAddressState = []
        }
    }

    handleMonthAndYears() {
        const creditCardFormGroup = this.checkoutForm.get('creditCard')

        const currentYear: number = new Date().getFullYear()
        const selectedYear: number = Number(creditCardFormGroup.value.exipirationYear)

        // if the current year equals the selected year, then start with the current month

        let startMonth: number;

        if (currentYear == selectedYear) {
            startMonth = new Date().getMonth() + 1
        } else {
            startMonth = 1
        }

        this.shopFormService.getCreditCardMonths(startMonth).subscribe(
            data => {
                console.log("Retrieved credit card months: " + JSON.stringify(data))
                this.creditCardMonths = data
            }
        )
    }

    getStates(formGroupName: string) {
        const formGroup = this.checkoutForm.get(formGroupName)
        const countrycode = formGroup.value.country.code

        this.shopFormService.getStates(countrycode).subscribe(
            data => {
                if (formGroupName == 'billingAddress') {
                    this.billingAddressState = data
                } else {
                    this.shippingAddressState = data
                }

                // select first item by default
                formGroup.get('state').setValue(data[0])
            }
        )
    }

    reviewCartDetails() {

        // subscribe to cartService.totalQuantity 
        this.cartService.totalQuantity.subscribe(data => {
            this.totalQuantity = data
        })

        // subscribe to cartService.totalPrice
        this.cartService.totalPrice.subscribe(data => {
            this.totalPrice = data
        })
    }
}