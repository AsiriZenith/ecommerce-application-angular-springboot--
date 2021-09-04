package com.springbootecommerceapp.dto;

import com.springbootecommerceapp.entity.Order;
import com.springbootecommerceapp.entity.Address;
import com.springbootecommerceapp.entity.Customer;
import com.springbootecommerceapp.entity.OrderItem;

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
