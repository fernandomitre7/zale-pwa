import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    private inputFocused: boolean;
    constructor() { }

    ngOnInit() {
        // this.inputFocused = true; //
    }

    onSearchFocus() {
        this.inputFocused = true;
    }

    unFocusSearch() {
        this.inputFocused = false;
    }

    clearSearch() {
    }

}
