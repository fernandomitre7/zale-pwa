import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import { ApiService } from '../../core/api/api.service';
import { Subject, Observable, Subscription } from 'rxjs';
import { Establishment } from '../../core/api/models/api.establishment';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { PayService } from '../pay/pay.service';
import { UIService, getIcon } from 'src/app/core/ui';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
    searchQry: string;
    private searchName: Subject<string>;
    private inputFocused: boolean;
    private routerEventsSubscription: Subscription;

    searchResults: Observable<Establishment[]>;

    constructor(
        private uiService: UIService,
        private payService: PayService,
        private router: Router,
        private api: ApiService
    ) { }

    ngOnInit() {
        this.routerEventsSubscription = this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                this.uiService.mainHeaderShow();
            }
        });

        this.subscribeSearch();
    }

    ngOnDestroy() {
        this.routerEventsSubscription.unsubscribe();
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
        if (this.searchQry) {
            this.searchName.next(this.searchQry.toLowerCase().trim());
        }
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

    getIcon = getIcon;

    payInEstablishment(establishment: Establishment) {
        this.payService.useEstablishment(establishment);
        this.router.navigate(['/main/pay']);
    }

}
