import { Component, ViewChild} from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { MenuItem } from '../../../models/menu-item';
import { DatePipe, NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MenuItemEditDialogComponent } from './menu-item-edit-dialog/menu-item-edit-dialog.component';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { AddMenuItemDialogComponent } from './add-menu-item-dialog/add-menu-item-dialog.component';


@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [DatePipe, NgFor, MatSort, MatSortModule, MatTableModule, MatFormFieldModule, MatPaginator, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  menuItems: MenuItem[] = [];
  categories: Category[] = [];
  displayedColumns: string[] = ['name', 'price', 'category' , 'description','published', 'actions'];
  dataSource: MatTableDataSource<MenuItem> = new MatTableDataSource<MenuItem>();


  @ViewChild(MatSort) sort: MatSort = <MatSort>{};
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  constructor(private menuService: MenuService, private categoryService: CategoryService, public dialog: MatDialog) { }

  ngOnInit() {
    this.initData();
  }

  //Loads the data from service
  initData(){
    this.menuService.getAllMenuItems().subscribe((menuItems : MenuItem[]) => {
      this.menuItems = menuItems;
      this.dataSource = new MatTableDataSource(this.menuItems); 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
        // Custom sorting 
        this.dataSource.sortingDataAccessor = (item: MenuItem, property: string) => {
          switch (property) {
            case 'category': return item.category ? item.category.name : '';
            default: return (item as any)[property];
          }
        };
    });
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
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
  openEditDialog(menuItem: MenuItem): void {
    const dialogRef = this.dialog.open(MenuItemEditDialogComponent, {
      width: '400px',
      data: {
        menuItem: menuItem,
        categories: this.categories
      }
    });

    //Reload after edit
    dialogRef.afterClosed().subscribe((result) => {
      this.initData();
    });
  }

  //Opens add new dialog
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddMenuItemDialogComponent, {
      width: '400px',
      data: this.categories
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.initData();
      }
    });

    
  }

  //Delete menu item
  delteItem(menuItem: MenuItem){
    const confirmDelete: boolean = window.confirm(`Är du säker på att du vill ta bort ${menuItem.name}?`)
    if(confirmDelete){
      this.menuService.deleteMenuItem(menuItem).subscribe(() => { 
          this.ngOnInit(); 
      });
    }
  }

}
