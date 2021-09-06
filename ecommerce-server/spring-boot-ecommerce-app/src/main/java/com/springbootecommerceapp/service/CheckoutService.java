package com.springbootecommerceapp.service;

import com.springbootecommerceapp.dto.Purchase;
import com.springbootecommerceapp.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
