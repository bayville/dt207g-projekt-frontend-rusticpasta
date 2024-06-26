import {Component, OnInit, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { MenuItem } from '../../models/menu-item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-checkout-flow',
  standalone: true,
  imports: [MatButtonModule, MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, NgFor, DatePipe],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  templateUrl: './checkout-flow.component.html',
  styleUrl: './checkout-flow.component.scss'
})
export class CheckoutFlowComponent  {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  orderConfirmed!: FormGroup;
  customer: Customer | null = null;
  cart: MenuItem[] | null = [];
  orderReciept: any;


  constructor(
    private _formBuilder: FormBuilder,
    private customerService: CustomerService,
    private orderService: OrderService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}


  ngOnInit() {
    //Creates formgroup
    this.firstFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    //Creates formgroup
    this.secondFormGroup = this._formBuilder.group({
      email: [{ value: '', }, [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }
  
  //Checks if customer exist, if customer exist prefill form with customer data.
  checkCustomer() {
    const email = this.firstFormGroup.get('email')?.value;

    this.customerService.findCustomer(email).pipe(
      catchError((error) => {
        if (error.status === 404) {
          this.secondFormGroup.patchValue({ email });
        } else {
          console.error('Error fetching customer:', error);
        }
        return of (null); 
      })
    ).subscribe((customer) => {
      if (customer) {
        this.customer = customer;
        this.secondFormGroup.patchValue({
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone
        });
      } else {
        console.log(email);
        this.secondFormGroup.patchValue({ email });
      }
    });
  }

  //Checkout
  checkOut(stepper: MatStepper){
    if (this.secondFormGroup.valid){
      const customerData: Customer = this.secondFormGroup.value;  
      this.customer = customerData;
      const totalAmount = localStorage.getItem('totalAmount');
      const cart = this.cartService.getCart();
      if (cart.length > 0){
        const item = cart.map(item => ({
          menuItemId: item.menuItem.id,
          quantity: item.quantity
        }))
        
        //Creates the object to send for order - if order is created redirect to confirmed-order
        const body = {customerData, totalAmount, item};
        this.orderService.newOrder(body).subscribe((order => {
          console.log("Order:", order);
          this.cartService.clearCart();
          this.router.navigate(['/confirmed-order'],{ queryParams: { orderId: order.result.id} });
        }));

      } else {
        this.snackBar.open('Du måste ha något i din kundkorg för att beställa', 'Stäng', {
          duration: 2000, // 2 sekunder
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['failed-snackbar']
        });
        this.router.navigate(['/order']);
      }
    }
   
    
  }
}
