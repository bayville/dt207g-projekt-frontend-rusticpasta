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
  selector: 'app-category-add-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, NgFor],
  templateUrl: './category-add-dialog.component.html',
  styleUrl: './category-add-dialog.component.scss'
})
export class CategoryAddDialogComponent {
  addForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CategoryAddDialogComponent>,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) 
  {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      order: ['', Validators.required],
      published: [false]
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.addForm.valid) {
      const category = {
        name: this.addForm.value.name,
        description: this.addForm.value.description,
        published: this.addForm.value.published,
        order: this.addForm.value.order
      };

      console.log(category);

      console.log(this.addForm.value.published);

      this.categoryService.addCategory(category).subscribe(
        (result) => {
          this.dialogRef.close(result);
        },
        (error) => {
          console.error('Error updating menu item:', error);
          // Handle the error here, e.g., show an error message
        }
      );

      this.dialogRef.close(category);
    }
  }
}
