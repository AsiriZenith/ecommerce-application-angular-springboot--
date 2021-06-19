package com.springbootecommerceapp.dao;

import com.springbootecommerceapp.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {


}
