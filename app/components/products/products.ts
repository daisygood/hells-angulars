import { Component, OnInit, ViewChild,
  ElementRef, Input }          from "@angular/core";
import { FormControl }         from "@angular/forms";
import { MapsAPILoader }       from "angular2-google-maps/core";
import { NgbRatingConfig }     from "@ng-bootstrap/ng-bootstrap";
import { ProductsService }     from "./products.service";
import { UIROUTER_DIRECTIVES } from "ui-router-ng2";
import * as moment             from "moment";

@Component({
  moduleId: module.id,
  providers: [ NgbRatingConfig ],
  selector: "products",
  styleUrls: [ "products.css" ],
  templateUrl: "products.html",
})

export class Products implements OnInit {
  public allProducts: Array<any>;
  public markers: Array<any>;
  public maxPrice: string = "500";
  public minPrice: string = "0";
  public latitude: number = 39.8282;
  public longitude: number = -98.5795;
  public products: Array<any> = [];
  public searchCategoryId: string = "";
  public searchControl: FormControl;
  public searchRadius: number = 50; // miles
  public zoom: number = 10;
  @Input()
  public availableFrom: any = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  @Input()
  public availableTo: any = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  public activeProducts: Array<any> = [];

  // Note: This is looking for #search in the HTML template
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    public activeTransactions: Array<any>,
    private config: NgbRatingConfig,
    private mapsAPILoader: MapsAPILoader,
    private productsService: ProductsService,
  ) {
    config.max = 5;
    config.readonly = true;
  }

  public makeRange(start: any, end: any): String[] {
    function addDays(date: any, days: any) {
      let dat = new Date(date.valueOf());
      dat.setDate(dat.getDate() + days);
      return moment(dat).format("YYYY-MM-DD");
    }

    function getDates(startDate: any, stopDate: any) {
      let dateArray: String[] = [];
      let currentDate = startDate;
      while (currentDate <= stopDate) {
        dateArray.push(currentDate);
        currentDate = addDays(currentDate, 2);
      }
      return dateArray;
    }

    let dateArray = getDates(start, end);
    return dateArray;
  }

  public getActiveTransactions() {
    this.productsService
        .getActiveTransactions()
        .then(transactions => {
          let activeTransactions: Array<any> = [];
          // an array of all active transactions
          this.activeTransactions = transactions.slice();
        });
  }

  public getActiveProducts() {
    let from = this.convertObjToDate(this.availableFrom);
    let to = this.convertObjToDate(this.availableTo);
    let userRange = this.makeRange(from, to);
    this.activeProducts = [];
    for (let i = 0; i < this.activeTransactions.length; i++) {
      let bookedfrom = this.activeTransactions[i].bookedfrom.substr(0, 10);
      let bookedto = this.activeTransactions[i].bookedto.substr(0, 10);
      let transactionRange =
      this.makeRange(bookedfrom, bookedto);
      for (let j = 0; j < transactionRange.length; j++) {
        if (userRange.includes(transactionRange[j])) {
          this.activeProducts.push(this.activeTransactions[i].product_id);
          break;
        }
      }
    }
  }

  public getProducts() {
    let context = this;
    this.productsService
        .getProductsByQuery()
        .then(response => {
          let products = response.products;
          this.latitude = parseFloat(response.location.lat);
          this.longitude = parseFloat(response.location.lng);
          // Rearrange products to have 3 products in one row
          let allProducts: Array<any> = [];
          this.allProducts = products.slice();
          let productsWithRows: Array<any> = [];
          let row: Array<any> = [];
          for (let i = 0; i < products.length; i++) {
            allProducts.push(products[i]);
            if (i % 3 === 0 && row.length > 0) {
              productsWithRows.push(row);
              row = [];
            }

            row.push(products[i]);
            if (i === products.length - 1) {
              productsWithRows.push(row);
            }
          }
          this.products = productsWithRows;
          this.markers = allProducts;
        });
  }

  public refineSearch(): void {
    this.getActiveProducts();
    let from = this.convertObjToDate(this.availableFrom);
    let to = this.convertObjToDate(this.availableTo);
    this.products = this.allProducts;
    let context = this;
    let products = this.products.filter(function(product: any) {
      return (
        product.priceperday >= parseInt(context.minPrice, 10)
        && product.priceperday <= parseInt(context.maxPrice, 10)
        && (context.searchCategoryId === "" || product.category_id === parseInt(context.searchCategoryId, 10))
        && (
          context.haversineDistance(
              [context.latitude, context.longitude], [product.lat, product.lng], true
            ) <= context.searchRadius
          )
        && (!context.activeProducts.includes(product.id))
        );
     });
    // Rearrange products to have 3 products in one row
    let productsWithRows: Array<any> = [];
    let row: Array<any> = [];
    for (let i = 0; i < products.length; i++) {
      if (i % 3 === 0 && row.length > 0) {
        productsWithRows.push(row);
        row = [];
      }
      row.push(products[i]);
      if (i === products.length - 1) {
        productsWithRows.push(row);
      }
    }
    this.products = productsWithRows;
  }

  public haversineDistance(coords1: number[], coords2: number[], isMiles: boolean) {
    function toRad(x: number): number {
      return x * Math.PI / 180;
    }

    let lat1: number = coords1[0];
    let lon1: number = coords1[1];

    let lat2: number = coords2[0];
    let lon2: number = coords2[1];

    let R: number = 6371; // earth radius in km

    let x1 = lat2 - lat1;
    let dLat = toRad(x1);
    let x2 = lon2 - lon1;
    let dLon = toRad(x2);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    if (isMiles) {
      d /= 1.60934;
    }

    return d;
  }

  public ngOnInit(): void {
    this.getActiveTransactions();
    this.getProducts();

    // if map center is still default, attempt to set center to user's current location
    // if (this.latitude === 39.8282 && this.longitude === -98.5795) {
    //   this.setCurrentPosition();
    // }

    // load Places Autocomplete
    this.mapsAPILoader.load();
  }

  public convertObjToDate(obj: any) {
    if (String(obj.day).length === 1) {
      obj.day = "0" + String(obj.day);
    }
    if (String(obj.month).length === 1) {
      obj.month = "0" + String(obj.month);
    }
    let date = obj.year + "-" + obj.month + "-" + obj.day;
    return date;
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
      });
    }
  }
}
