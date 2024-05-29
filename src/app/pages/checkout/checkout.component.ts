import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { MenuItem } from '../../models/menu-item';
import { RouterLink } from '@angular/router';
import { CartComponent } from '../../components/cart/cart.component';
import { CheckoutFlowComponent } from '../../components/checkout-flow/checkout-flow.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CartComponent, CheckoutFlowComponent, RouterLink, NgIf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  showCheckout: boolean = false;

  constructor(private cartService: CartService) {}

  //Sets showCheckout to true if cart has items
  ngOnInit() {
    const cartData = this.cartService.getCart();
    this.showCheckout = cartData.length > 0;
  }
}