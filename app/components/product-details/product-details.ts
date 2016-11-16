import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from './product-details.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'products',
  templateUrl: 'product-details.html',
  styleUrls: ['product-details.css'],
  providers: [NgbRatingConfig]
})

export class ProductDetails implements OnInit {
  products: Array<any>;

  constructor(
    private productDetailService: ProductDetailsService,
    private config: NgbRatingConfig
  ){}



  ngOnInit(): void{

  }
}