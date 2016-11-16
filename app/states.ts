import {Home} from "./components/home/home";
import { Products } from "./components/products/products";
import { ProductDetails } from "./components/product-details/product-details";

import { ProductDetailsService } from './components/product-details/product-details.service';

import {Transition} from "ui-router-ng2";

/** States */
export const homeState = { name: 'home', url: '/',  component: Home };

export const productsState = {
  name: 'products',
  url: '/products',
  component: Products
};

export const productDetailsState = {
  name: 'productDetails',
  url: '/product/:productId',
  component: ProductDetails,
  resolve: [
    {
      token: 'productDetails',
      deps: [Transition, ProductDetailsService],
      resolveFn: (trans, productSvc) => productSvc.getProductDetails(trans.params().productId)
    }
  ]
};