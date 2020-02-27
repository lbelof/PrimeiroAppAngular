import { Component, OnInit } from "@angular/core";
import { OrderService } from "./order.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { RadioOption } from "app/shared/radio/radio-option.model";
import { Order, OrderItem } from "./order.model";


@Component({
  selector: "mt-order",
  templateUrl: "./order.component.html"
})
export class OrderComponent implements OnInit {

  delivery: number = 8

  paymentOptions: any[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão refeição', value: 'REF' },
    { label: 'Cartão de débito', value: 'DEB' }
  ]



  constructor(private orderService: OrderService) { }

  ngOnInit() { }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems() {
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)

  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)

  }

  remove(item: CartItem) {
    this.orderService.remove(item)

  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))

    this.orderService.checkOrder(order)
      .subscribe((orderId: string) => {
        console.log(`Compra conclída: ${orderId}`)
        this.orderService.clear()
      })


  }
}
