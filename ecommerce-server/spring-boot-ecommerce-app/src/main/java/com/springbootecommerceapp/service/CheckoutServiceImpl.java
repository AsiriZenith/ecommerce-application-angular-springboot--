package com.springbootecommerceapp.service;

import com.springbootecommerceapp.dao.CustomerRepository;
import com.springbootecommerceapp.dto.Purchase;
import com.springbootecommerceapp.dto.PurchaseResponse;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        // retrieve the order info from dto


        // generate tracking number


        // populate order with orderItem


        // populate order with billingAddress and shippingAddress


        // populate customer with order


        // save to the database


        // return a response
        return null;
    }
}
