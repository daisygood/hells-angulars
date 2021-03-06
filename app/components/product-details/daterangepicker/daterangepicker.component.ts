/* tslint:disable:max-line-length, no-var-keyword */
/* tslint:disable:no-var-requires */
/* tslint:disable:no-duplicate-variable */
import { Directive, OnInit, AfterViewInit, Input, Output, EventEmitter, ElementRef } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { DaterangepickerConfig } from "./config.service";

declare var $: any;
var $ = require("jquery");
import "bootstrap-daterangepicker";
import * as moment from "moment";

@Directive({
    // moduleId: module.id,
    selector: "[daterangepicker]",
    // styleUrls: ["./daterangepicker.css"],
 })

export class DaterangePickerComponent implements AfterViewInit {

    @Input() options: any = {};
    @Output() selected = new EventEmitter();

    constructor(private input: ElementRef, private config: DaterangepickerConfig) { }

    ngAfterViewInit() {

        let targetOptions: any = Object.assign({}, this.config.settings, this.options);

        $(this.input.nativeElement).daterangepicker(targetOptions, this.callback.bind(this));
    }

    private callback(start?: any, end?: any): void {
        let obj = {
            start: start,
            end: end,
        };

        this.selected.emit(obj);
    }
}
