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
  { path: 'order', component: OrderComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'confirmed-order', component: ConfirmComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'menuItem', component: MenuItemComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'openHours', component: OpenHoursEditComponent },
      { path: 'orders', component: OrdersComponent },
    ]
  },
];