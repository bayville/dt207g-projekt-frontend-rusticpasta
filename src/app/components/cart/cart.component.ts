import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MenuItem } from '../../models/menu-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, MatButton, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  itemsInCart: { menuItem: MenuItem, quantity: number }[] = [];
  totalAmount: number = 0;

  constructor(
    private cartService: CartService

  ) {
    this.loadCart(); //Loads cart
  }
  
  //Loads cart
  private loadCart(): void {
    this.itemsInCart = this.cartService.getCart();
    this.totalAmount = this.cartService.getTotalAmount();
  }

  //Decrease quantity of item with index
  decreaseQuantity(index: number): void {
    this.cartService.decreaseQuantity(index);
    this.loadCart();
  }

  //Increases quantity of item with indexw
  increaseQuantity(index: number): void {
    this.cartService.increaseQuantity(index);
    this.loadCart();
  }

  //Updates the quantity of items
  updateQuantity(event: any, index: number): void {
    const newQuantity = parseInt(event.target.value, 10);
      this.cartService.updateQuantity(index, newQuantity);
      this.loadCart();
  }
}
