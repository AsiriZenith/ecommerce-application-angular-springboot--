import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/commen/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products!: Product[]; 

  constructor(
    private productService : ProductService
  ) {}
  ngOnInit(): void {
    this.listProducts();
  }


  listProducts() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
    })
  }
}