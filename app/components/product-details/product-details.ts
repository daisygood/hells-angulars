import { ActivatedRoute }           from "@angular/router";
import { Component, Input, OnInit, DoCheck } from "@angular/core";
import { NgbRatingConfig }          from "@ng-bootstrap/ng-bootstrap";
import { stripeConfig }             from "../../stripe/stripe.config";
import { ProductDetailsService }    from "./product-details.service";
import { UIROUTER_DIRECTIVES }      from "ui-router-ng2";
import { UIRouter }                 from "ui-router-ng2";
import { DaterangepickerConfig }    from "./daterangepicker/index";

import * as moment from 'moment';

@Component({
  moduleId: module.id,
  providers: [ NgbRatingConfig ],
  selector: "products",
  styleUrls: [ "product-details.css" ],
  templateUrl: "product-details.html",
})

export class ProductDetails implements OnInit, DoCheck {

  @Input() public product: any;

  @Input() public selectedPic: String;

  public fromDate: any;
  public toDate: any;
  public prodId: any;
  public invalidDays: Array<any>;
  public formattedDays: Array<any> = [];
  public context: any = this;

  private minDate: any = {
    "year": new Date().getFullYear(),
    "month": +new Date().getMonth() + 1,
    "day": +new Date().getDate(),
  };

  private reviews: Array<any>;
  private numberOfReviews: Number;
  private averageRating: Number;

  // private oldFromDate: any = undefined;
  // private oldToDate: any = undefined;
  private totalAmount: Number;
  private daysBetween: Number;

  private userId = JSON.parse(localStorage.getItem("profile")).user_id;

  private isInvalidDate: any = undefined;

  constructor(
    private config: NgbRatingConfig,
    private productDetailsService: ProductDetailsService,
    private uiRouter: UIRouter,
    private drpOptions: DaterangepickerConfig,
  ) {
    this.prodId = this.uiRouter.globals.params["productId"];
    this.productDetailsService
    .getInvalidDays(this.prodId)
    .then(response => {
      const invalidDates = response;
      this.invalidDays = invalidDates;
      console.log(this.invalidDays);
      // format invalid days

      let oneDay = 1000 * 60 * 60 * 24;

    // days.forEach(function(day: any) {
      for(var i = 0; i < this.invalidDays.length; i++) {
        let from = moment(this.invalidDays[i].bookedfrom);
        let to = moment(this.invalidDays[i].bookedto);
        let diffMs = to - from;
        let numDays = Math.round(diffMs / oneDay);

        let currentDay = from;

        do {
          this.formattedDays.push(currentDay.format("MM-DD-YYYY"));
          currentDay = currentDay.add(1, 'd');
          numDays--;
        } while (numDays > 0);
      }

      // console.log("this Sucks", this, this.formattedDays);

      // this.drpOptions.settings = {
      //   opens: "center",
      //   isInvalidDate: function(date: any) {
      //   for(var i = 0; i < this.formattedDays.length; i++) {
      //     if(date.format('MM-DD-YYYY') == this.formattedDays[i]) {
      //       return true;
      //     } else {
      //       return false;
      //       }
      //     }
      //   }
      // }
    })

    console.log('outside promise', this, this.formattedDays);

    config.max = 5;
    config.readonly = true;

    // this.drpOptions.settings = {
    //   opens: "center",
    //   isInvalidDate: function(date: any) {
    //     console.log(date);
    //     if(date.format('MM-DD-YYYY') == '11-30-2016') {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }
    this.drpOptions.settings = {
      opens: "center",
      isInvalidDate: function(date: any) {
        console.log('running invalid dates', this);
        for(var i = 0; i < this.formattedDays.length; i++) {
          if(date.format('MM-DD-YYYY') == this.formattedDays[i]) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  }


  public selectedDate(value: any) {
    this.fromDate = value.start;
    this.toDate = value.end;

    let oneDay = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    let differenceMs = this.toDate - this.fromDate;

    // this.Convert back to days and return
    let days = Math.round(differenceMs / oneDay);
    this.daysBetween = days;
    this.totalAmount = days * this.product.priceperday;
  }

  public ngOnInit() {
    this.product = this.product[0];
    this.selectedPic = this.product.url[0];
    this.getReviews(this.product.id);
    // this.getInvalidDays(this.product.id);
    // this.drpOptions.settings.opens = "left";
    // console.log(this.drpOptions.settings.isInvalidDate);
  }

  public onSelect(n: number) {
    this.selectedPic = this.product.url[n];
  }

  // public getInvalidDays(productId: number) {
  //   this.productDetailsService
  //   .getInvalidDays(productId)
  //   .then(response => {
  //     const invalidDates = response;
  //     this.invalidDays = invalidDates;
  //     console.log(this.invalidDays);
  //     // format invalid days
  //     this.formatInvalidDays(this.invalidDays);
  //     // this.drpOptions.settings.isInvalidDate = function(date: any) {
  //     //   console.log('running invalid dates');
  //     //   for(var i = 0; i < this.formattedDays.length; i++) {
  //     //     if(date.format('MM-DD-YYYY') == this.formattedDays[i]) {
  //     //       return true;
  //     //     } else {
  //     //       return false;
  //     //     }
  //     //   }
  //     // }
  //     // this.drpOptions.settings.isInvalidDate();
  //   })
  // }

  // public formatInvalidDays(days: Array<any>) {

  //   let oneDay = 1000 * 60 * 60 * 24;
  //   console.log(days.length);

  //   // days.forEach(function(day: any) {
  //   for(var i = 0; i < days.length; i++) {
  //     console.log(days);
  //     // console.log(day.bookedto.slice(0, 10));
  //     let from = moment(days[i].bookedfrom);
  //     let to = moment(days[i].bookedto);
  //     let diffMs = to - from;
  //     let numDays = Math.round(diffMs / oneDay);

  //     let currentDay = from;

  //     do {
  //       this.formattedDays.push(currentDay.format("MM-DD-YYYY"));
  //       currentDay = currentDay.add(1, 'd');
  //       numDays--;
  //     } while (numDays > 0);

  //     console.log(this.formattedDays);
  //     let context = this;
  //     // console.log(from.format("DD-MM-YYYY"));
  //     // let nextDay = from.add(1, 'd');
  //     // console.log(nextDay.format("DD-MM-YYYY"));

  //     // returns milliseconds
  //     // console.log(to - from);
  //     // let to = (day.bookedto.slice(0, 10));
  //     // let daysBetween =
  //     // console.log(from, to);
  //     // console.log(from + oneDay);
  //     // let daysBetween = (to - from) / oneDay;
  //     // console.log(daysBetween);
  //     // while(daysBetween !== 0) {
  //     // this.formattedDays.push(from, to);
  //     // if(to.format('YYYY-MM-DD') == to) {
  //     //   return true;
  //     // }
  //   }
  //   // this.drpOptions.settings = {
  //   //   opens: "center",
  //   //   isInvalidDate: function(date: any) {
  //   //     console.log('running invalid dates', context.formattedDays.length);
  //   //     for(var i = 0; i < context.formattedDays.length; i++) {
  //   //       if(date.format('MM-DD-YYYY') == context.formattedDays[i]) {
  //   //         return true;
  //   //       } else {
  //   //         return false;
  //   //       }
  //   //     }
  //   //   }
  //   // }
  //     // this.drpOptions.settings.isInvalidDate = function(date: any) {
  //     //   if(date.format('MM-DD-YYYY') == '11-30-2016') {
  //     //     return true;
  //     //   } else {
  //     //     return false;
  //     //   }
  //     // }
  // // this.drpOptions.settings.isInvalidDate();    // this.drpOptions.settings.isInvalidDate();
  // }

  public getReviews(productId: number) {
    this.productDetailsService
      .getReviews(productId)
      .then(response => {
        const reviews = response;
        this.reviews = reviews;
        this.numberOfReviews = this.reviews.length;
        let total = this.reviews.reduce((prev, acc) => {
          return prev + acc.rating;
        }, 0);
        this.averageRating =  +total / reviews.length;

        console.log(this.reviews);
      })
      .catch(err => console.log(err));

  }

  public openCheckOut() {
    console.log(this.product);
    let handler = (<any> window).StripeCheckout.configure({
      key: stripeConfig.apiKey,
      locale: "auto",
      token: (token: any) => {
        this.productDetailsService.charge(token, {
          amount: this.totalAmount,
          buyer_id: this.userId,
          seller_id: this.product.owner_id,
          status_id: 1,
          product_id: this.product.id,
          bookedfrom: this.fromDate._d,
          bookedto: this.toDate._d,
        });
      },
    });

    handler.open({
      name: "Gear Box",
      amount: +this.totalAmount * 100,
    });

  }

  public convertObjToDate(obj: any) {
    let date = obj.year + "-" + obj.month + "-" + obj.day;
    return new Date(date);
  }
}
