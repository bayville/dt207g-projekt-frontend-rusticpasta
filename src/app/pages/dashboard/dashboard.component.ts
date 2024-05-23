import { Component } from '@angular/core';
import {NgFor, NgIf } from '@angular/common';
import { MenuItemComponent } from '../../components/admin/menu-item/menu-item.component';
import { CategoryComponent } from '../../components/admin/category/category.component';
import { Router, RouterOutlet } from '@angular/router';
import { OrdersComponent } from '../../components/admin/orders/orders.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, MenuItemComponent, CategoryComponent, RouterOutlet, OrdersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private router: Router) {}

  navigateTo(page: string) {
    this.router.navigate([`/dashboard/${page}`]);
  }
}
