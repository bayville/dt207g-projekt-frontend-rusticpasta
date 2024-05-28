import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgFor } from '@angular/common';
import { Category } from '../../../../models/category';
import { MenuService } from '../../../../services/menu.service';
import { MenuItem } from '../../../../models/menu-item';

@Component({
  selector: 'app-add-menu-item-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, NgFor],
  templateUrl: './add-menu-item-dialog.component.html',
  styleUrl: './add-menu-item-dialog.component.scss'
})

export class AddMenuItemDialogComponent {
  addForm: FormGroup;
  categories: Category[];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Category[],
    public dialogRef: MatDialogRef<AddMenuItemDialogComponent>,
    private menuService: MenuService,
    private formbuilder: FormBuilder

  ) {
    this.categories = this.data;
    this.addForm = this.formbuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      published: [false]
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    console.log(this.addForm);
    if (this.addForm.valid) {
      const newMenuItem : MenuItem = {
        name: this.addForm.value.name,
        description: this.addForm.value.description,
        price: this.addForm.value.price,
        categoryId: this.addForm.value.category,
        published: this.addForm.value.published,
      };

      console.log(newMenuItem);

      this.menuService.addMenuItem(newMenuItem).subscribe(
        (result) => {
          this.dialogRef.close(result);
        },
        (error) => {
          console.error('Error updating menu item:', error);
          // Handle the error here, e.g., show an error message
        }
      );

      this.dialogRef.close(newMenuItem);
    }
  }
}
