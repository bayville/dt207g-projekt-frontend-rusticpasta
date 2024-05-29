import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuItem } from '../../../../models/menu-item';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgFor } from '@angular/common';
import { Category } from '../../../../models/category';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'app-menu-item-edit-dialog',
  templateUrl: './menu-item-edit-dialog.component.html',
  styleUrls: ['./menu-item-edit-dialog.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, NgFor]
})
export class MenuItemEditDialogComponent {
  editForm: FormGroup;
  categories: Category[];
  
  constructor(
    public dialogRef: MatDialogRef<MenuItemEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { menuItem: MenuItem, categories: Category[] }, //Injects data from parent
    private formBuilder: FormBuilder,
    private menuService: MenuService
  ) {

    this.categories = data.categories; //Sets categoires to data from parent
    
    //Creates form prefilled with data from parent
    this.editForm = this.formBuilder.group({
      name: [data.menuItem.name, Validators.required],
      description: [data.menuItem.description],
      price: [data.menuItem.price, Validators.required],
      category: [data.menuItem.categoryId, Validators.required],
      published: [data.menuItem.published]
    });
  }

  //Handles cancel clickl
  onCancelClick(): void {
    this.dialogRef.close();
  }

  //On save updates menuItem sends result or error to parent
  onSaveClick(): void {
    if (this.editForm.valid) {

      //Creates object
      const updatedMenuItem: MenuItem = {
        id: this.data.menuItem.id,
        name: this.editForm.value.name,
        description: this.editForm.value.description,
        price: this.editForm.value.price,
        categoryId: this.editForm.value.category,
        published: this.editForm.value.published
      };

      this.menuService.updateMenuItem(updatedMenuItem).subscribe(
        (result) => {
          this.dialogRef.close(result);
        },
        (error) => {
          console.error('Error updating menu item:', error);
          // Handle the error here, e.g., show an error message
        }
      );

      this.dialogRef.close(updatedMenuItem);
    }
  }
}
