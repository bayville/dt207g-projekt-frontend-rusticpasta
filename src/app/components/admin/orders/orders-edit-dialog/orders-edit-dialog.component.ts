import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgFor, NgIf } from '@angular/common';
import { OrderService } from '../../../../services/order.service';
import { Status } from '../../../../models/status';

@Component({
  selector: 'app-orders-edit-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, NgFor, NgIf],
  templateUrl: './orders-edit-dialog.component.html',
  styleUrl: './orders-edit-dialog.component.scss'
})
export class OrdersEditDialogComponent {
  editForm: FormGroup;
  order: any = {};
  status: Status[] = [];

  constructor(
    public dialogRef: MatDialogRef<OrdersEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {order : any, status : Status[] },
    private formBuilder: FormBuilder,
    private orderService: OrderService,
  ) {
    this.order = data.order;
    this.status = data.status
    this.editForm = this.formBuilder.group({
      status: [data.order.status],
    });
  }


  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editForm.valid) {
      const updatedOrder = {
        id: this.order.id,
        status: this.editForm.value.status
      }

      this.orderService.updateOrderStatus(updatedOrder).subscribe((order) => {
      });

      this.dialogRef.close(updatedOrder);
  }
  }
}
