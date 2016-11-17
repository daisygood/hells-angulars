import { Component, Input, OnInit } from "@angular/core";
import { ProductDetailsService } from "./product-details.service";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { UIROUTER_DIRECTIVES } from "ui-router-ng2";
import { ActivatedRoute } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: "products",
  templateUrl: "product-details.html",
  styleUrls: ["product-details.css"],
  providers: [ NgbRatingConfig ],
})

export class ProductDetails implements OnInit {
  @Input() public product;

  @Input() public selectedPic: String;

  constructor(
    private config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = true;
  }

  public ngOnInit() {
    console.log(this.product);
    this.selectedPic = this.product.pic[0];
    console.log(this.selectedPic);
  }

  public onSelect(n: number) {
    this.selectedPic = this.product.pic[n];
  }

}
