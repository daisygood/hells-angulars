import { Component, Input, Output, EventEmitter, OnInit }         from "@angular/core";
import { EditedReview }        from "./editedReview";
import { EditReviewService } from "./editReviews.service";
import { FormControl } from "@angular/forms";

import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  moduleId: module.id,
  selector: "editreview-form",
  templateUrl: "editReviews.html",
  styleUrls: [ "editReviews.css" ],
  providers: [ NgbRatingConfig ],
})

export class EditReviewForm {
  @Input() transaction: any;
  @Input() userId: any;
  @Input() review: any;
  @Output()
  close: EventEmitter<any> = new EventEmitter();

  public selected = 0;
  public hovered = 0;
  public readonly = false;
  public searchControl: FormControl;

  public model = new EditedReview();

  constructor(
    private editReviewService: EditReviewService,
    private config: NgbRatingConfig,
  ) {
    config.max = 5;
  }

  public ngOnInit(): void {
    this.searchControl = new FormControl();
    this.model.text = this.review.text
  }

  public onSubmit(model: EditedReview) {
    model.rating = this.selected;
    this.editReviewService.updateReview(model, this.review.id)
        .then(result => {
          this.close.emit();
        })
        .catch(error => {
          console.log(error);
        });
  }

  public deleteReview(){
    this.editReviewService.deleteReview(this.review.id);
  }

}
