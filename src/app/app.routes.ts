import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { MenuItemComponent } from './components/admin/menu-item/menu-item.component';
import { OrderComponent } from './pages/order/order.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { OpenHoursEditComponent } from './components/admin/open-hours-edit/open-hours-edit.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { ConfirmComponent } from './pages/checkout/confirm/confirm.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'order', loadComponent: () => import('./pages/order/order.component').then(c => c.OrderComponent)},
  { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout.component').then(c => c.CheckoutComponent)},
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent)},
  { path: 'confirmed-order', loadComponent: () => import('./pages/checkout/confirm/confirm.component').then(c => c.ConfirmComponent)},
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent),
    canActivate: [authGuard],
    children: [
      { path: 'menuItem', loadComponent: () => import('./components/admin/menu-item/menu-item.component').then(c => c.MenuItemComponent) },
      { path: 'category', loadComponent: () => import('./components/admin/category/category.component').then(c => c.CategoryComponent) },
      { path: 'openHours', loadComponent: () => import('./components/admin/open-hours-edit/open-hours-edit.component').then(c => c.OpenHoursEditComponent) },
      { path: 'orders', loadComponent: () => import('./components/admin/orders/orders.component').then(c => c.OrdersComponent)},
    ]
  },
];