package com.pedro.ecommerce.dto;

import com.pedro.ecommerce.entity.Address;
import com.pedro.ecommerce.entity.Customer;
import com.pedro.ecommerce.entity.Order;
import com.pedro.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;


}
