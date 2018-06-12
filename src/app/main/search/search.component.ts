import { Component, OnInit } from '@angular/core';
import { UIService } from '../../core/ui/ui.service';
import { TYPE_ICON_MAP } from '../../core/ui/ui.type-icon.map';
import { Router, NavigationStart, Event } from '@angular/router';
import { ApiService } from '../../core/api/api.service';
import { Subject, Observable } from 'rxjs';
import { Establishment } from '../../core/api/models/api.establishment';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    searchQry: string;
    private searchName: Subject<string>;
    private inputFocused: boolean;

    searchResults: Observable<Establishment[]>;

    constructor(private uiService: UIService, private router: Router, private api: ApiService) { }

    ngOnInit() {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                this.uiService.mainHeaderShow();
            }
        });

        this.subscribeSearch();
    }

    onSearchFocus() {
        this.inputFocused = true;
        this.uiService.inputFocused();
        this.uiService.mainHeaderHide();
    }

    cancelSearch() {
        this.clearSearch();
        this.uiService.mainHeaderShow();
        this.inputFocused = false;
    }

    clearSearch() {
        this.searchQry = '';
        this.search();
        this.uiService.hideLoading();
    }

    search() {
        this.searchName.next(this.searchQry.toLowerCase().trim());
    }

    private subscribeSearch() {
        this.searchName = new Subject<string>();

        this.searchResults = this.searchName.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => this.uiService.showLoading()),
            switchMap(searchName => this.api.getEstablishments(searchName)),
            tap(results => {
                console.log('SearchResults: %o', results);
                this.uiService.hideLoading();
            })
        );
    }

    getIcon(type: string) {
        return TYPE_ICON_MAP[type];
    }

}
