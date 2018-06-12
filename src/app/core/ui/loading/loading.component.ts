import { Component, OnInit, Input } from '@angular/core';
import { UIService } from '../ui.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

    hidden: boolean;

    constructor(private uiService: UIService) {
        this.hidden = true;
    }

    ngOnInit() {
        // this.hide = false;
        this.uiService.onLoadingVisibility().subscribe((visibility: boolean) => {
            this.hidden = !visibility;
        });
    }
}
