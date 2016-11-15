import {Home} from "./components/home/home";
import { Products } from "./components/products/products";
import { ProductDetails } from "./components/product-details/product-details";

import {Transition} from "ui-router-ng2";

/** States */
export const homeState = { name: 'home', url: '/',  component: Home };

export const productsState = {
  name: 'products',
  url: '/products',
  component: Products
};

export const productDetailState = {
  name: 'productDetail',
  url: '/products/:productId',
  component: ProductDetails
};