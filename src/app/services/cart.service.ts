import { Injectable, signal, ɵunwrapWritableSignal } from '@angular/core';
import { MenuItem } from '../models/menu-item';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';
  private totalAmountKey = 'totalAmount';
  private numberOfItemsKey = 'numberOfItems';

  getCart(): { menuItem: MenuItem, quantity: number }[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  getTotalAmount(): number {
    const amount = localStorage.getItem(this.totalAmountKey);
    return amount ? JSON.parse(amount) : 0;
  }

  getNumberOfItems(): number {
    const numberOfItems = localStorage.getItem(this.numberOfItemsKey);
    return numberOfItems ? JSON.parse(numberOfItems) : 0;
  }

  updateCart(cart: { menuItem: MenuItem, quantity: number }[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.updateTotals(cart);
  }

  private updateTotals(cart: { menuItem: MenuItem, quantity: number }[]): void {
    let totalAmount = 0;
    let numberOfItems = 0;
    cart.forEach(entry => {
      totalAmount += entry.menuItem.price * entry.quantity;
      numberOfItems += entry.quantity;
    });

    localStorage.setItem(this.totalAmountKey, totalAmount.toString());
    localStorage.setItem(this.numberOfItemsKey, numberOfItems.toString());
  }

  addToCart(item: MenuItem): void {
    let cart = this.getCart();
    const existingIndex = cart.findIndex(entry => entry.menuItem.id === item.id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity++;
    } else {
      cart.push({ menuItem: item, quantity: 1 });
    }

    this.updateCart(cart);
  }

  decreaseQuantity(index: number): void {
    let cart = this.getCart();
    if (cart[index].quantity > 0) {
      cart[index].quantity--;
      if (cart[index].quantity === 0) {
        cart.splice(index, 1);
      }
      this.updateCart(cart);
    }
  }

  increaseQuantity(index: number): void {
    let cart = this.getCart();
    cart[index].quantity++;
    this.updateCart(cart);
  }

  updateQuantity(index: number, newQuantity: number): void {
    let cart = this.getCart();
    if (newQuantity > 0) {
      cart[index].quantity = newQuantity;
      this.updateCart(cart);
    } else if (newQuantity === 0) {
      cart.splice(index, 1);
      this.updateCart(cart);
    }
  }

  clearCart(): void {
    const cart: [] = [];
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.updateTotals(cart);
  }
}
