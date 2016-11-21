import { Component, OnInit } from "@angular/core";
import { ProfileService }    from "./profile.service";

import { AddModalService }     from "../add_modal/addModal.service";

@Component({
  moduleId: module.id,
  selector: "profile",
  styleUrls: ["profile.component.css"],
  templateUrl: "profile.component.html",
})

export class ProfileComponent implements OnInit {
  public user: any;
  public products: Array<any>;
  public rentals: Array<any>;
  public userId: string;
  public gearView: boolean = true;
  public rentalView: boolean = false;
  private stripeAccount: any;

  constructor(
    private profileService: ProfileService,
    private addModalService: AddModalService
  ) { }

  getUserIdFromProfile() {
    this.userId = JSON.parse(localStorage.getItem("profile")).user_id;
  }

  getUserInfo() {
    this.profileService
      .getUserInfo(this.userId)
      .then(response => {
        const user = JSON.parse(response._body);
        this.user = user;
        this.stripeAccount = user.stripeaccountid;
        this.getUserProducts(this.user.id);

        this.getUserRentals();
      })
      .catch(err => console.log(err));
  }

  getUserProducts(userId: number) {
    this.profileService
      .getUserProducts(userId)
      .then(response => {
        const products = JSON.parse(response._body);
        this.products = products;
      })
      .catch(err => console.log(err));
  }

  getUserRentals() {
    this.profileService
      .getUserRentals()
      .then(rentals => {
        this.rentals = rentals;
      })
      .catch(err => console.log(err));
  }

  selectGearView() {
    this.rentalView = false;
    this.gearView = true;
    return "active";
  }

  selectRentalView() {
    this.gearView = false;
    this.rentalView = true;
    return "active";
  }

  ngOnInit(): void {
    this.getUserIdFromProfile();
    this.getUserInfo();
  }

  public open(content: any) {
    this.addModalService.open(content);
  }

  public close() {
    this.addModalService.close();
  }
}
