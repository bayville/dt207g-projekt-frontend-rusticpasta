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
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { CategoryEditDialogComponent } from './category-edit-dialog/category-edit-dialog.component';
import { CategoryAddDialogComponent } from './category-add-dialog/category-add-dialog.component';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [DatePipe, NgFor, MatSort, MatSortModule, MatTableModule, MatFormFieldModule, MatPaginator, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent{
  categories: Category[] = [];
  displayedColumns: string[] = ['name', 'description','published', 'order', 'actions'];
  dataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>();

  @ViewChild(MatSort) sort: MatSort = <MatSort>{};
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  constructor(private categoryService: CategoryService, public dialog: MatDialog) { }

  ngOnInit(){
    this.initData();
  }

  //Loads the data from service
  initData(){
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      this.dataSource = new MatTableDataSource(this.categories); 
      this.dataSource.sort = this.sort; 
      this.dataSource.paginator = this.paginator;
    })
  }

  //Applies searchfilter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Opens edit dialog
  openEditDialog(category: Category): void {
    const dialogRef = this.dialog.open(CategoryEditDialogComponent, {
      width: '400px',
      data: {
        category: category,
      }
    });

    //Reload after edit
    dialogRef.afterClosed().subscribe((result) => {
      this.initData();
    });

  }
  
    //Opens add new dialog
    openAddDialog(): void {
      const dialogRef = this.dialog.open(CategoryAddDialogComponent, {
        width: '400px',
      });
  

    //Reload after edit
    dialogRef.afterClosed().subscribe((result) => {
      this.initData();
    });
  }
}