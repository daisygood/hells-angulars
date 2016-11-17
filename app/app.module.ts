import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { UIRouterModule } from "ui-router-ng2";
import { HttpModule, JsonpModule } from "@angular/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { App } from "./components/app/app.js";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

import { Home } from "./components/home/home.js";


import { Products } from './components/products/products';
import { ProductDetails } from './components/product-details/product-details';
import { ProfileComponent } from './components/profile/profile.component';
import {MyUIRouterConfig} from "./config/router.config.js";
import {homeState, productsState, productDetailsState, addProductState, profileState} from "./states.js";

import { NewProductForm } from './components/add_modal/productForm.component'

import { NgbdModalBasic } from "./components/add_modal/addModal";

import { ProductsService } from "./components/products/products.service";
import { ProductDetailsService } from "./components/product-details/product-details.service";
import { ProfileService } from "./components/profile/profile.service";
import { NewProductService } from "./components/add_modal/newProduct.service";


import { AUTH_PROVIDERS } from "angular2-jwt";

let INITIAL_STATES =  [ homeState, productsState, productDetailsState, addProductState, profileState ];
let INITIAL_COMPONENTS =  [ App, Home, Products, ProductDetails, ProfileComponent, NgbdModalBasic, NewProductForm ];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    UIRouterModule.forRoot({
      states: INITIAL_STATES,
      useHash: true,
      configClass: MyUIRouterConfig,
    }),
  ],
  declarations: INITIAL_COMPONENTS,

  providers: [ProductsService, ProfileService, ProductDetailsService, AUTH_PROVIDERS, NewProductService],

  bootstrap: [ App ],
})
export class AppModule { }
