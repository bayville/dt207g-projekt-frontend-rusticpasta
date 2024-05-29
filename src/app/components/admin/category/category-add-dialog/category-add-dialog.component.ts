import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgFor } from '@angular/common';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category';

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
    //Creates the form
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      order: ['', Validators.required],
      published: [false]
    });
  }

  //Handles cancel click
  onCancelClick(): void {
    this.dialogRef.close();
  }

  //On save create new category,  sends result or error parent
  onSaveClick(): void {
    if (this.addForm.valid) {
      const category : Category = {
        name: this.addForm.value.name,
        description: this.addForm.value.description,
        published: this.addForm.value.published,
        order: this.addForm.value.order
      };

      this.categoryService.addCategory(category).subscribe(
        (result) => {
          this.dialogRef.close(result);
        },
        (error) => {
          console.error('Error updating menu item:', error);
        }
      );

      this.dialogRef.close(category);
    }
  }
}
