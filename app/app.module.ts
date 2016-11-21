/* tslint:disable:max-line-length */
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

import { AUTH_PROVIDERS }          from "angular2-jwt";
import { BrowserModule }           from "@angular/platform-browser";
import { FormControl, FormsModule,
  ReactiveFormsModule }            from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";
import { NgbModule }               from "@ng-bootstrap/ng-bootstrap";
import { NgModule }                from "@angular/core";
import { UIRouterModule }          from "ui-router-ng2";
import { Daterangepicker }         from "./components/product-details/daterangepicker/index"

import { AddReviewForm }           from "./components/add-review/add-review";
import { AgmCoreModule }           from "angular2-google-maps/core";

import { About }                   from "./components/about/about.js";

import { App }                     from "./components/app/app.js";
import { Google }                  from "./components/google/google.component";
import { Home }                    from "./components/home/home.js";
import { NewProductForm }          from "./components/add_modal/productForm.component";
import { Products }                from "./components/products/products";
import { ProductDetails }          from "./components/product-details/product-details";
import { ProfileComponent }        from "./components/profile/profile.component";
import { DateRangeComponent }      from "./components/product-details/daterange.component";

import { GOOGLE_API_KEY }          from "./auth/googleMaps.config";

import { AddModalService }         from "./components/add_modal/addModal.service";
import { AddReviewService }        from "./components/add-review/add-review.service";
import { NewProductService }       from "./components/add_modal/newProduct.service";
import { ProductsService }         from "./components/products/products.service";
import { ProductDetailsService }   from "./components/product-details/product-details.service";
import { ProfileService }          from "./components/profile/profile.service";

import { MyUIRouterConfig }        from "./config/router.config.js";
import { aboutState, googleState, homeState, productsState, productDetailsState, profileState, searchState } from "./states.js";

let INITIAL_COMPONENTS =  [
  App, About, AddReviewForm,  Google, Home, Products, ProductDetails, ProfileComponent, NewProductForm, DateRangeComponent
];

let INITIAL_PROVIDERS  =  [
  AddModalService, AddReviewService, ProductsService, ProfileService, ProductDetailsService, AUTH_PROVIDERS, NewProductService,
];

let INITIAL_STATES     =  [
  aboutState, googleState, homeState, productsState, productDetailsState, profileState, searchState,
];

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_API_KEY,
      libraries: ["places"],
    }),
    BrowserModule,
    Daterangepicker,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    UIRouterModule.forRoot({
      configClass: MyUIRouterConfig,
      states: INITIAL_STATES,
      useHash: true,
    }),
  ],
  declarations: INITIAL_COMPONENTS,

  providers: INITIAL_PROVIDERS,

  bootstrap: [ App ],
})
export class AppModule { }
