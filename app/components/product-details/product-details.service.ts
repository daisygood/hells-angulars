import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import "rxjs/add/operator/toPromise";

import { Data } from "../../data/dummydata";

@Injectable()

export class ProductDetailsService {
  public headers: Headers = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json",
  });

  constructor(
    private http: Http
  ) {}

  public getProductDetails(id: any) {
    let url = "/api/products/" + id;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }

  public getReviews(id: number) {
    let url = "/api/reviews/" + id;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }

  public getInvalidDays(id: number) {
    let url = "api/transactions/" + id;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  public charge(token, transaction) {
    let requestBody = {token: token, transaction: transaction};
    return this.http.post("api/charge", requestBody, {headers: this.headers})
      .map(res => res)
      .subscribe(data => data);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
