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
    @Inject(MAT_DIALOG_DATA) public data: {category: Category},
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) 
  {
    this.category = data.category;
    console.log("data.cat", data.category);
    this.editForm = this.formBuilder.group({
      name: [data.category.name, Validators.required],
      description: [data.category.description],
      order: [data.category.order, Validators.required],
      published: [data.category.published]
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editForm.valid) {
      const updatedCategory = {
        id: this.data.category.id,
        name: this.editForm.value.name,
        description: this.editForm.value.description,
        published: this.editForm.value.published,
        order: this.editForm.value.order
      };

      console.log(this.editForm.value.published);

      this.categoryService.updateCategory(updatedCategory).subscribe(
        (result) => {
          this.dialogRef.close(result);
        },
        (error) => {
          console.error('Error updating menu item:', error);
          // Handle the error here, e.g., show an error message
        }
      );

      this.dialogRef.close(updatedCategory);
    }
  }
}
