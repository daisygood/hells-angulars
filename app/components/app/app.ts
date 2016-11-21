import { Auth }                from "../../auth/auth.service";
import { Component, OnInit }   from "@angular/core";
import { ProductsService }     from "../products/products.service";
import { UIROUTER_DIRECTIVES } from "ui-router-ng2";

import { NgbModal, ModalDismissReasons, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  moduleId: module.id,
  providers: [ Auth ],
  selector: "my-app",
  styleUrls: [ "app.css" ],
  templateUrl: "app.html",
})

export class App {

  title: "Gear Box";
  public closeResult: string;
  public modal: NgbModalRef;
  public content: any;

  constructor(
    private auth: Auth,
    private productsService: ProductsService,
    private modalService: NgbModal,
   ) { }

  public onSearch(form: any) {
    this.productsService.keyword = form.value.keyword;
  };

  ngOnInit(): void {
    // checks for user based on profile from Auth0 in localstorage
    this.auth.findOrCreateUser(localStorage.getItem("profile"));
  }

  // this.modalService.keyboard = "lg";

  public open(content: any) {
    this.modal = this.modalService.open(content);
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public close() {
    console.log("close fired");
    this.modal.close("confirmed");
  }

  // function to determine whether modal was closed by clicking on backdrop, close button, or cross
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return  `with: ${reason}`;
    }
  }

}
