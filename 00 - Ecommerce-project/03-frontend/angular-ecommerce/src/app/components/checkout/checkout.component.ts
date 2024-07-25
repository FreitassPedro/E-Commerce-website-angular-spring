import { CartService } from './../../services/cart.service';
import { OwnFormServiceService } from './../../services/own-form-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { OwnValidators } from '../../validators/own-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ownFormService: OwnFormServiceService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.reviewCartDetails();

    const defaultValidators = [Validators.required, Validators.minLength(2), OwnValidators.notOnlyWhitespace];
    const emailValidator = [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')];
    const cardNumberValidator = [Validators.required, Validators.pattern('[0-9]{16}')];
    const securityCodeValidator = [Validators.required, Validators.pattern('[0-9]{3}')];

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', defaultValidators),
        lastName: new FormControl('', defaultValidators),
        email: new FormControl('', emailValidator)
      }),
      shippingAddress: this.addressFormGroup(defaultValidators),
      billingAddress: this.addressFormGroup(defaultValidators),
      creditCard: this.formBuilder.group({
        cardType: ['', defaultValidators],
        nameOnCard: ['', defaultValidators],
        cardNumber: ['', cardNumberValidator],
        securityCode: ['', securityCodeValidator],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    // populate credit card months

    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);

    this.ownFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    // populate credit card years

    this.ownFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    // populate countries

    this.ownFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data))
        this.countries = data;
      }
    )
  }

  onSubmit() {

    console.log('Hadling the submit button');

    if (this.checkoutFormGroup.invalid) this.checkoutFormGroup.markAllAsTouched();

    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(
      'Email adress is ' + this.checkoutFormGroup.get('customer')?.value.email
    );
  }

  get firstName() {return this.checkoutFormGroup.get('customer.firstName');  }
  get lastName() {return this.checkoutFormGroup.get('customer.lastName');  }
  get email() {return this.checkoutFormGroup.get('customer.email');  }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street')}
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city')}
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state')}
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode')}
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country')}

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street')}
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city')}
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state')}
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode')}
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country')}

  get creditCardCardType() { return this.checkoutFormGroup.get('creditCard.cardType')}
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode')}
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard')}
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber')}


  reviewCartDetails() {
    //subscribe to cartService.totalQuantity and .totalPrice

    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }
  addressFormGroup(defaultValidators: ValidatorFn[]) {
    return this.formBuilder.group({
      street: new FormControl('', defaultValidators),
      city: new FormControl('', defaultValidators),
      state: new FormControl('', defaultValidators),
      country: new FormControl('', defaultValidators),
      zipCode: new FormControl('', defaultValidators)
    });
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );

      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      this.billingAddressStates = [];
    }
  }

  handleMonthAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    // if the current year equals the selected year, then start with the current month
    let startMonth: number;
    startMonth = 1;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }

    this.ownFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrived credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
  }

  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.ownFormService.getStates(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup?.get('state')?.setValue(data[0]);
      }
    );
  }
}
