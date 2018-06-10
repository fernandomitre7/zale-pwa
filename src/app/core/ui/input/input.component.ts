import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UIService } from '../ui.service';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

    @Input() type: string;
    @Input('placeholder') placeholder: string;
    @Output('focus') focus = new EventEmitter<boolean>();
    @Output('blur') blur = new EventEmitter<boolean>();

    constructor(private uiService: UIService) { }

    ngOnInit() {
    }

    onFocus() {
        this.uiService.inputFocused();
        if (this.focus.observers.length > 0) {
            this.focus.emit(true);
        }
    }

    onBlur() {
        this.uiService.inputBlurred();
        if (this.blur.observers.length > 0) {
            this.blur.emit(true);
        }
    }
}
