import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgFor, NgIf } from '@angular/common';
import { OpenHoursService } from '../../../../services/open-hours.service';
import { OpenHours } from '../../../../models/open-hours';


@Component({
  selector: 'app-open-hours-edit-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, NgFor, NgIf],
  templateUrl: './open-hours-edit-dialog.component.html',
  styleUrl: './open-hours-edit-dialog.component.scss'
})
export class OpenHoursEditDialogComponent {
  editForm: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<OpenHoursEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OpenHours,
    private formBuilder: FormBuilder,
    private openHoursService: OpenHoursService
  ) {
    console.log(data.day);
    this.editForm = this.formBuilder.group({
      closed: [false],
      openTime: [data.openTime, Validators['required']],
      closeTime: [data.closeTime, Validators['required']],
    });
  }

  checkClosed(): void {
    let closed: boolean = this.editForm.get('closed')?.value;
    if (closed === true){
      this.editForm.get('openTime')?.disable();
      this.editForm.get('closeTime')?.disable();
    } else {
      this.editForm.get('openTime')?.enable();
      this.editForm.get('closeTime')?.enable();
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editForm.valid) {
      let updatedDay;

      if(this.editForm.get('closed')?.value === true){ 
        console.log('true');
        updatedDay = {
          id: this.data.id,
          day: this.data.day,
          openTime: null,
          closeTime: null
        };
      } else{
        updatedDay = {
          id: this.data.id,
          day: this.data.day,
          openTime: this.editForm.get('openTime')?.value,
          closeTime: this.editForm.get('closeTime')?.value
        };

      }
      
      this.openHoursService.updateDay(updatedDay).subscribe(
        (result) => {
          this.dialogRef.close(result);
        },
        (error) => {
          console.error('Error updating menu item:', error);
          // Handle the error here, e.g., show an error message
        }
      );

  }
  }
}
