import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuItem } from '../../../models/menu-item';
import { NgFor } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-mini-cart',
  standalone: true,
  imports: [NgFor, RouterLink, MatButton],
  templateUrl: './mini-cart.component.html',
  styleUrl: './mini-cart.component.scss'
})
export class MiniCartComponent {
  itemsInCart: { menuItem: MenuItem, quantity: number }[] = [];
  totalAmount: number = 0;

  constructor(
    public dialogRef: MatDialogRef<MiniCartComponent>,
    private cartService: CartService

  ) {
    this.loadCart();//Loads cart
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

  //Increases quantity of item with index
  increaseQuantity(index: number): void {
    this.cartService.increaseQuantity(index);
    this.loadCart();
  }

  //Updates the quantity of items
  updateQuantity(event: any, index: number): void {
    const newQuantity = parseInt(event.target.value, 10);
    console.log(newQuantity);
      this.cartService.updateQuantity(index, newQuantity);
      this.loadCart();
  }

  //Handle cancel
  onCancelClick(): void {
    this.dialogRef.close();
  }

  //Handle checkout
  onCheckoutClick(): void {
    this.dialogRef.close();
  }

  //Clears the cart
  onClearCartClick(){
    this.cartService.clearCart();
    this.loadCart();
  }
}