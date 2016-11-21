import { Injectable }    from "@angular/core";

import { NgbModal, ModalDismissReasons, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class AddModalService {

  public closeResult: string;
  public modal: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  public open(content:any) {
    debugger;
    this.modal = this.modalService.open(content);
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public close() {
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
