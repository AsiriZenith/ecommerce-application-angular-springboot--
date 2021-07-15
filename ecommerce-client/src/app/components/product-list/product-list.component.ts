import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../commen/product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  previousKeyword: string | null = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {
    const theKeyword: string | null = this.route.snapshot.paramMap.get('keyword');

    // if we have a different keyword than previous
    // then set thePageNumber to 1

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    const theKeyword_string = (theKeyword) ? theKeyword : "";
    // now search for the products using keyword
    this.productService.searchProductPaginate(this.thePageNumber-1, this.thePageSize, theKeyword_string)
      .subscribe(this.processResult());
  }

  handleListProducts() {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      const id = this.route.snapshot.paramMap.get('id');
      this.currentCategoryId = (id) ? parseInt(id) : 0;
    } else {
      // not category id available ... default category id 1
      this.currentCategoryId = 1;
    }

    //
    //  check if we have a diferrent category than previous
    //  Note: Angular will reuse a component if it is currentlly being viewed
    //

    //  if we have a different category id than previous
    //  then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    console.log(`current Category Id = ${this.currentCategoryId}, the Page Number = ${this.thePageNumber}`);

    // now get the products for the given category id
    this.productService.getProductListPaginate(
      this.thePageNumber - 1, this.thePageSize, this.currentCategoryId
    ).subscribe(this.processResult());
  }

  processResult() {
    return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(e: Event) {
    console.log(e);
    // this.thePageSize = pageSize;
    // this.thePageNumber = 1;
    // this.listProducts();
  }
}