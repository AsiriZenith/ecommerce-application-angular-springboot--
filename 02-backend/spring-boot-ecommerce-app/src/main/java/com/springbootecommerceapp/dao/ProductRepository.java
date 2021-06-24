package com.springbootecommerceapp.dao;

import com.springbootecommerceapp.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4401/")
public interface ProductRepository extends JpaRepository<Product,Long> {
}
