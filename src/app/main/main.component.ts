import { Component, OnInit } from '@angular/core';
import { UIService } from '../core/ui/ui.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    hideNav: boolean;

    constructor(private uiService: UIService) { }

    ngOnInit() {
        this.hideNav = false;
        this.uiService.onKeyboardVisible().subscribe(isKeyboardVisible => {
            this.hideNav = isKeyboardVisible;
        });
    }
}
