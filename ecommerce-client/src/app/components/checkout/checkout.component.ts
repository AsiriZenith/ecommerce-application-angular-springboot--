import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Country } from "src/app/commen/country";
import { State } from "src/app/commen/state";
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
        private formBuilder: FormBuilder,
        private shopFormService: ShopFormService
    ) { }

    ngOnInit(): void {
        this.checkoutForm = this.formBuilder.group({
            customer: this.formBuilder.group({
                firstName: [''],
                lastName: [''],
                email: ['']
            }),
            shippingAddress: this.formBuilder.group({
                street: [''],
                city: [''],
                state: [''],
                country: [''],
                zipCode: [''],
            }),
            billingAddress: this.formBuilder.group({
                street: [''],
                city: [''],
                state: [''],
                country: [''],
                zipCode: [''],
            }),
            creditCard: this.formBuilder.group({
                cardType: [''],
                nameOnCard: [''],
                cardNumber: [''],
                securityCode: [''],
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
    }

    onSubmit() {
        console.log("Handling the submit button")
        console.log(this.checkoutForm.get('customer')?.value)
        console.log("The email address is " + this.checkoutForm.get('customer')?.value.email)

        console.log(this.checkoutForm.get('billingAddress').value.state.name)
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
}