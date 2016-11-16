import { Component, Input } from '@angular/core';
import { ProductDetailsService } from './product-details.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import {UIROUTER_DIRECTIVES} from 'ui-router-ng2';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'products',
  templateUrl: 'product-details.html',
  styleUrls: ['product-details.css'],
  providers: [NgbRatingConfig]
})

export class ProductDetails {
  @Input() product;
}