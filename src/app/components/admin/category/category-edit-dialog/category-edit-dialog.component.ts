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
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-category-edit-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, NgFor],
  templateUrl: './category-edit-dialog.component.html',
  styleUrl: './category-edit-dialog.component.scss'
})
export class CategoryEditDialogComponent {
  editForm: FormGroup;
  category: Category;

  constructor(
    public dialogRef: MatDialogRef<CategoryEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {category: Category}, //Inject data from parent
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) 
  {
    this.category = data.category; //Sets category to data from parent
    //Creates new form prefilled with data from parent
    this.editForm = this.formBuilder.group({
      name: [data.category.name, Validators.required],
      description: [data.category.description, Validators.required],
      order: [data.category.order, Validators.required],
      published: [data.category.published]
    });
  }

  //Handles cancel click
  onCancelClick(): void {
    this.dialogRef.close();
  }

  //On save updates the category, sends result or error parent
  onSaveClick(): void {
    if (this.editForm.valid) {

      //Create object
      const updatedCategory: Category = {
        id: this.data.category.id,
        name: this.editForm.value.name,
        description: this.editForm.value.description,
        published: this.editForm.value.published,
        order: this.editForm.value.order
      };

      this.categoryService.updateCategory(updatedCategory).subscribe(
        (result) => {
          this.dialogRef.close(result);
        },
        (error) => {
          console.error('Error updating menu item:', error);
        }
      );

      this.dialogRef.close(updatedCategory);
    }
  }
}
