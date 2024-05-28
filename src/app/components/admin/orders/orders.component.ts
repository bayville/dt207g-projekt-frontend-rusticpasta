import { Component, ViewChild } from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../../services/order.service';
import { MatSelectModule } from '@angular/material/select';
import { Status } from '../../../models/status';
import { OrdersEditDialogComponent } from './orders-edit-dialog/orders-edit-dialog.component';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, NgFor, MatSort, MatSortModule, MatTableModule, MatFormFieldModule, MatPaginator, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  orders: any[] = [];
  statuses: Status[] = [];
  displayedColumns: string[] = ['id', 'customer',  'status','orderTime', 'totalAmount', 'actions' ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  selectedStatus: string = '';

  @ViewChild(MatSort) sort: MatSort = <MatSort>{};
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  constructor(private orderService: OrderService, public dialog: MatDialog) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe({
      next: (orders: any[]) => {
        console.log(orders);
        this.orders = orders;
        this.dataSource = new MatTableDataSource(this.orders); 
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource);

        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'customer':
              return item.customer.firstName + ' ' + item.customer.lastName;
            case 'status':
              return item.status.name;
            case 'orderTime':
              return new Date(item.createdAt);
            default:
              return item[property];
          }
        };

        this.sort.active = 'id';
        this.sort.direction = 'desc'; 
        this.sort.sortChange.emit();

        // Custom filter predicate
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          if (this.selectedStatus) {
            return data.status.name.toLowerCase() === this.selectedStatus.toLowerCase();
          }
          return true;
        };

      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
    this.orderService.getAllStatuses().subscribe({
      next: (statuses: Status[]) => {
        this.statuses = statuses;
      },
      error: (error) => {
        console.error('Error fetching statuses:', error);
      }
    });
  }

  applyFilter(event: Event) {
    console.log(event);
    console.log(this.dataSource);
  
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.customer.firstName.toLowerCase().includes(filter) ||
             data.customer.lastName.toLowerCase().includes(filter);
    };
  
    this.dataSource.filter = filterValue;
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyStatusFilter(event: any) {
    this.selectedStatus = event.value;
    this.dataSource.filter = this.selectedStatus.toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

    //Opens edit dialog
    openEditDialog(order: any): void {
      const dialogRef = this.dialog.open(OrdersEditDialogComponent, {
        width: '400px',
        data: {
          order: order,
          status: this.statuses
        }
      });
  
      //Reload after edit
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        this.ngOnInit();
      });
    }
}
