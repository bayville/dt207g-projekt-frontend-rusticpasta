import { Component } from '@angular/core';
import { OpenHoursComponent } from '../open-hours/open-hours.component';
import { FindUsComponent } from '../find-us/find-us.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-info-section',
  standalone: true,
  imports: [OpenHoursComponent, FindUsComponent],
  templateUrl: './info-section.component.html',
  styleUrl: './info-section.component.scss'
})
export class InfoSectionComponent {

  constructor(public dialog: MatDialog) { }

  //Opens add new dialog
  openAddDialog(): void {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '600px',
    });
  
}
}
