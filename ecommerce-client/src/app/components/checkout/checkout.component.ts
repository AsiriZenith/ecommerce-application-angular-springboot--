import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    checkoutForm!: FormGroup;

    totalPrice: number = 0;
    totalQuantity: number = 0;

    constructor(private formBuilder: FormBuilder) { }

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
    }

    onSubmit() {
        console.log("Handling the submit button");
        console.log(this.checkoutForm.get('customer')?.value);
        console.log("The email address is " + this.checkoutForm.get('customer')?.value.email);
    }

    copyShippingAddressToBillingAddress(e) {
        if (e.target.checked) {
            this.checkoutForm.controls.billingAddress
                .setValue(this.checkoutForm.controls.shippingAddress.value);
        } else {
            this.checkoutForm.controls.billingAddress.reset()
        }
    }
}