import { Auth }                from "../../auth/auth.service";
import { Component, OnInit }   from "@angular/core";

import { AddModalService }     from "../add_modal/addModal.service";
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
    private addModalService: AddModalService,
    private modalService: NgbModal,
   ) { }

  public onSearch(form: any) {
    this.productsService.keyword = form.value.keyword;
  };

  ngOnInit(): void {
    // checks for user based on profile from Auth0 in localstorage
    this.auth.findOrCreateUser(localStorage.getItem("profile"));
  }

  public open(content: any) {
    this.addModalService.open(content);
  }

  public close() {
    this.addModalService.close();
  }

}
