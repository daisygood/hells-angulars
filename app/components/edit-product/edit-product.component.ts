import { Component, ElementRef, EventEmitter, Input,
  OnInit, Output, ViewChild } from "@angular/core";
import { EditProductService } from "./edit-product.service";
import { FormControl }        from "@angular/forms";
import { MapsAPILoader }      from "angular2-google-maps/core";
import { NewProduct }         from "../add_modal/newProduct";

@Component({
  moduleId: module.id,
  selector: "editproduct-form",
  templateUrl: "edit-product.html",
  styleUrls: [ "edit-product.css" ],
})

export class EditProductForm {
  @Input() product;
  @Output()
  close: EventEmitter<any> = new EventEmitter();

  public addressChanged: boolean = false;
  public categories = [ "Backpacking", "Bike", "Surf", "Snowboard", "Ski", "SUP", "Kayak" ];
  public city: string;
  public cityState: string = "";
  public lat: number;
  public lng: number;
  public model = new NewProduct();
  public place: any;
  public searchControl: FormControl;
  public selectedCat: any;
  public state: string;
  public zip: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private editProductService: EditProductService,
    private mapsAPILoader: MapsAPILoader,
  ) { }

  public onSubmit(model: NewProduct) {
    // this block parses out the address_components and gets out what we need.
    // It's needed because the address_components array sort is not stable.
    if (this.addressChanged) {
      this.place.address_components.forEach(component => {
        component.types.forEach(type => {
          if (type === "locality") {
            model.city = component.long_name;
          }
          if (type === "administrative_area_level_1") {
            model.state = component.short_name;
          }
          if (type === "postal_code") {
            model.zip = component.long_name;
          }
        });
      });
    }

    this.editProductService.editProduct(model)
        .then(result => {
          this.close.emit();
        })
        .catch(error => {
          console.error(error);
        });
  }

  ngOnInit(): void {
    this.searchControl = new FormControl();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
      });
      autocomplete.addListener("place_changed", () => {
        this.addressChanged = true;
        // get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        this.place = place;
        // set new latitude and longitude
        this.model.lat = place.geometry.location.lat();
        this.model.lng = place.geometry.location.lng();
      });
    });

    this.cityState = this.product.city + ", " + this.product.state;
    this.model.categoryId = this.product.category_id;
    this.model.city = this.product.city;
    this.model.id = this.product.id;
    this.model.lat = this.product.lat;
    this.model.lng = this.product.lng;
    this.model.pricePerDay = this.product.priceperday;
    this.model.productName = this.product.productname;
    this.model.productDescription = this.product.description;
    this.model.state = this.product.state;
    this.model.userId = this.product.owner_id;
    this.model.zip = this.product.zip;
    this.selectedCat = this.categories[this.model.categoryId - 1];
  }
  public selectChange(event: any) {
    this.model.categoryId = this.categories.indexOf(event.target.value) + 1;
    this.selectedCat = event.target.value;
  }

}
