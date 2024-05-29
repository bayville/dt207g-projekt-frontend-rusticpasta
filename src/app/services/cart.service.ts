import { Injectable, signal, ɵunwrapWritableSignal } from '@angular/core';
import { MenuItem } from '../models/menu-item';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';
  private totalAmountKey = 'totalAmount';
  private numberOfItemsKey = 'numberOfItems';

  //Gets the cart and returns it
  getCart(): { menuItem: MenuItem, quantity: number }[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  //Gets the total amount
  getTotalAmount(): number {
    const amount = localStorage.getItem(this.totalAmountKey);
    return amount ? JSON.parse(amount) : 0;
  }

  //Gets number of items in cart
  getNumberOfItems(): number {
    const numberOfItems = localStorage.getItem(this.numberOfItemsKey);
    return numberOfItems ? JSON.parse(numberOfItems) : 0;
  }

  // Updates the cart
  updateCart(cart: { menuItem: MenuItem, quantity: number }[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.updateTotals(cart);
  }

  //Updates the cart total amount and number of items
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

  //Adds item to cart
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

  //Decreases the quantity, if 0 deletes the item from the array
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

  //Increases quantity
  increaseQuantity(index: number): void {
    let cart = this.getCart();
    cart[index].quantity++;
    this.updateCart(cart);
  }

  //Updates the quantity, if quantity is 0 remove item
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

  //Clears the cart
  clearCart(): void {
    const cart: [] = [];
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.updateTotals(cart);
  }
}
