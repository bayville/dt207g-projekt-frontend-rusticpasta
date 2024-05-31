import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { CategoryService } from '../../services/category.service';
import { MenuItem } from '../../models/menu-item';
import { Category } from '../../models/category';
import { GroupedMenuItems } from '../../models/grouped-menu-item';
import { NgFor } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [NgFor],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss'
})
export class OrderItemComponent {

  categoriesWithMenuItems: GroupedMenuItems[] = []

  constructor(
    private menuService: MenuService, 
    private categoryService: CategoryService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) 
    { 

    }

  ngOnInit(): void {
    this.categoryService.getAllPublishedCategories().subscribe((categories) => {
      this.menuService.getAllPublishedMenuItems().subscribe((menuItems) => {
       this.categoriesWithMenuItems = this.groupMenuItemsByCategory(menuItems, categories);
      })
    })
  }


  private groupMenuItemsByCategory(menuItems: MenuItem[], categories: Category[]): GroupedMenuItems[] {
    const groupedMenuItems: GroupedMenuItems[] = [];
    
    // Loop through each category
    categories.forEach(category => {
        //Create array for categories
        const categoryMenuItems: MenuItem[] = [];
        
        //Loop each menuitem and add it to its corresponding category
        menuItems.forEach(menuItem => {
            if (menuItem.categoryId === category.id) {
                categoryMenuItems.push(menuItem);
            }
        });
        
        //Add the category and menuitems to array
        if (categoryMenuItems.length > 0) {
            groupedMenuItems.push({
                category: category,
                menuItems: categoryMenuItems
            });
        }
    });
    
    return groupedMenuItems;
}


addToCart(item: MenuItem): void {
  this.cartService.addToCart(item);
  this.snackBar.open('Varan har lagts till i kundkorgen!', 'Stäng', {
    duration: 2000, // 2 sekunder
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
    panelClass: ['success-snackbar']
  });
}

}
