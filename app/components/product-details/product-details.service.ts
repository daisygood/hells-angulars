import { Injectable } from '@angular/core';
import { Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Data } from '../../data/dummydata';

@Injectable()

export class ProductDetailsService {

  constructor(
    private http: Http
  ){}

  public getProductDetails(id: any) {
    console.log(id);
    let productDetail = Data.filter(product => product.id === id);
    return productDetail[0];

    // let url = '/api/products/' + id;
    // return this.http.get(url)
    //               .toPromise()
    //               .then(response => response.json())
    //               .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}