import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { MenuItemComponent } from './components/admin/menu-item/menu-item.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { OpenHoursEditComponent } from './components/admin/open-hours-edit/open-hours-edit.component';
import { OrdersComponent } from './components/admin/orders/orders.component';


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
      { path: 'menuItem', component: MenuItemComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'openHours', component: OpenHoursEditComponent },
      { path: 'orders', component: OrdersComponent },
    ]
  },
  {path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent) }
];