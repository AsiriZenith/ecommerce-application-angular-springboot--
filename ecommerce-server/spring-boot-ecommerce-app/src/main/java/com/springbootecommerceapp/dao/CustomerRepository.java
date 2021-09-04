package com.springbootecommerceapp.dao;

import com.springbootecommerceapp.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
