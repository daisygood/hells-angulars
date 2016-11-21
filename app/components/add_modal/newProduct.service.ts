import { Headers, Http } from "@angular/http";
import { Injectable }    from "@angular/core";
import { NewProduct }    from "./newProduct";

import "rxjs/add/operator/toPromise";

@Injectable()
export class NewProductService {

  public headers: Headers = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json",
  });

  constructor(private http: Http) { }

  // adds a product to the database
  public postProduct(newProduct: NewProduct): Promise<any> {
    return this.http.post("api/products", newProduct, { headers: this.headers })
    .toPromise()
    .then(res => res)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
