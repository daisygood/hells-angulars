import {Component} from "@angular/core";
import {UIROUTER_DIRECTIVES} from "ui-router-ng2";
import {Auth} from "../../auth/auth.service";
@Component({
  moduleId: module.id,
  selector: 'my-app',
  providers: [Auth],
  templateUrl: 'app.html',
  styleUrls: [ 'app.css' ]
})
export class App {
  title: "Gear Box";

  constructor(private auth: Auth) {}
}
