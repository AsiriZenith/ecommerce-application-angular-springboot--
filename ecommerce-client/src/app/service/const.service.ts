import { Injectable } from '@angular/core';
import { ProductCategory } from '../commen/product-category';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  readonly CATEGORY_ITEMS: ReadonlyArray<ProductCategory> = [
    { id: 1, categoryName: 'BOOK-TECH' },
    { id: 2, categoryName: 'COFFEEMUG' },
    { id: 3, categoryName: 'MOUSEPAD' },
    { id: 4, categoryName: 'LUGGAGETAG' },
  ];
}


