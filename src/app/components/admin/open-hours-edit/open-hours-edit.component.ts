import { Component, ViewChild} from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { OpenHours } from '../../../models/open-hours';
import { OpenHoursService } from '../../../services/open-hours.service';
import { OpenHoursEditDialogComponent } from './open-hours-edit-dialog/open-hours-edit-dialog.component';

@Component({
  selector: 'app-open-hours-edit',
  standalone: true,
  imports: [DatePipe, NgFor, MatSort, MatSortModule, MatTableModule, MatFormFieldModule, MatPaginator, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './open-hours-edit.component.html',
  styleUrl: './open-hours-edit.component.scss'
})
export class OpenHoursEditComponent {
  openHours: OpenHours[] = [];
  displayedColumns: string[] = ['day', 'openTime', 'closeTime' , 'actions'];
  dataSource: MatTableDataSource<OpenHours> = new MatTableDataSource<OpenHours>();

  constructor(private openHoursService: OpenHoursService, public dialog: MatDialog){}

  ngOnInit(){
    this.initData();
  }

//Loads the data from service
  initData(){
    this.openHoursService.getAllDays().subscribe((days) => {
      this.openHours = days;
      this.dataSource = new MatTableDataSource(this.openHours); // Tilldela dataSource med menuItems
    });
  }

  //Opens edit dialog
  openEditDialog(day: OpenHours): void {
    const dialogRef = this.dialog.open(OpenHoursEditDialogComponent, {
      width: '400px',
      data: day
    });
    
    //Reload after edit
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
          this.initData();
      }
    });
  }
}
