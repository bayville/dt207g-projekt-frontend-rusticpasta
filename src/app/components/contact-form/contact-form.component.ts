import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgFor } from '@angular/common';
import { MailService } from '../../services/mail.service';
import { publishFacade } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, NgFor],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  messageForm: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<ContactFormComponent>,
    private formbuilder: FormBuilder,
    private mailService : MailService,
    private snackBar: MatSnackBar
  ) {
    //Create form
    this.messageForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  //Handle cancel click
  onCancelClick(): void {
    this.dialogRef.close();
  }

  //On send construct object and send emailw
  onSaveClick(): void {
    console.log(this.messageForm);
    if (this.messageForm.valid) {
      const form = {
        name: this.messageForm.value.name,
        email: this.messageForm.value.email,
        message: this.messageForm.value.message,
      }

        this.mailService.sendContactForm(form).subscribe((form) => {
          console.log("Form:", form);
          if(form.status === true){
            this.messageForm.reset();
            this.snackBar.open('Meddelandet har skickats', 'Stäng', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar']
            });
          }  else{
            this.snackBar.open('Något gick fel försök igen', 'Stäng', {
              duration: 3000, 
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar']
            });
          }
        });
      
      
    }
  }

  
}
