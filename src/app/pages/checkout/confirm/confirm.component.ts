import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';


@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {
  order: any;

 
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const orderId = params['orderId'];
      console.log(orderId);
      this.orderService.getOneOrder(orderId).subscribe(order => {
        console.log(order);
        this.order = order;
        console.log(this.order);
      });
    });

  }
}




// fredrik@bayville.se