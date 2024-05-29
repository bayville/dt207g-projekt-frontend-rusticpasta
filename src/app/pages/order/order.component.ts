import { Component, HostListener } from '@angular/core';
import { OrderItemComponent } from '../../components/order-item/order-item.component';
import { MiniCartComponent } from '../../components/cart/mini-cart/mini-cart.component';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [OrderItemComponent, MiniCartComponent, NgIf, MatIcon, RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})

export class OrderComponent {
  showCart: boolean = false;
  

  constructor(public dialog: MatDialog){  }

  //Opens MiniCartDialog
  openAddDialog(): void {
    const dialogRef = this.dialog.open(MiniCartComponent, {
      width: '500px',
    });
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }



}
