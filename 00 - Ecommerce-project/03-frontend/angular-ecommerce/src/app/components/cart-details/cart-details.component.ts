import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css',
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    // subscribe variables
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );

    // compute cart total price
    this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartitem: CartItem) {
    this.cartService.addToCart(theCartitem);
  }

  decrementQuantity(theCartitem: CartItem) {
    this.cartService.decrementQuantity(theCartitem);
  }

  removeItem(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }
}
