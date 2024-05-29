import { Customer } from "./customer";
import { OrderItem } from "./order-item";
import { Status } from "./status";

export interface Order {
    id: number,
    customerId: number,
    statusId: number,
    totalAmount: number,
    customer: Customer,
    orderItem: OrderItem,
    status: Status

}
