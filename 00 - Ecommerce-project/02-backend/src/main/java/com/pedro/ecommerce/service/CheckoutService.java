package com.pedro.ecommerce.service;

import com.pedro.ecommerce.dto.Purchase;
import com.pedro.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

}
