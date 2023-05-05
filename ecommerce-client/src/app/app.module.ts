import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { OKTA_CONFIG, OktaAuthModule, OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';

import { CartService } from './service/cart.service';
import { ProductService } from './service/product.service';
import { CheckoutService } from './service/checkout.service';
import { ShopFormService } from './service/shop.form.service';

import myAppConfig from './config/my-app-config';

const oktaConfig = Object.assign({
  onAuthRequired: (_oktaAuth, injector: { get: (arg0: typeof Router) => any; }) => {
    const router = injector.get(Router)

    // redirect the user to your custom login page
    router.navigate(['/login'])
  }
}, myAppConfig.oidc)

const routes: Routes = [
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    CheckoutComponent,
    CartStatusComponent,
    LoginStatusComponent,
    CartDetailsComponent,
    ProductListComponent,
    MembersPageComponent,
    ProductDetailsComponent,
    ProductCategoryMenuComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [
    CartService,
    ProductService,
    CheckoutService,
    ShopFormService,
    { provide: OKTA_CONFIG, useValue: oktaConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
