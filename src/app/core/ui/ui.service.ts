import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UIService {

    private focusInputSubject: BehaviorSubject<boolean>;
    private keyboardVisibilitySubject: BehaviorSubject<boolean>;
    private windowResizeObservable: Observable<Event>;
    private mainHeaderVisiblitySubject: BehaviorSubject<boolean>;
    private navVisibilitySubject: BehaviorSubject<boolean>;
    private loadingVisiblitySubject: BehaviorSubject<boolean>;

    private originalHeight: number;
    private withKeyboardHeight: number;
    private isFocused: boolean;

    constructor() {
        this.focusInputSubject = new BehaviorSubject(false);
        this.keyboardVisibilitySubject = new BehaviorSubject(false);
        this.mainHeaderVisiblitySubject = new BehaviorSubject(true);
        this.navVisibilitySubject = new BehaviorSubject(true);
        this.loadingVisiblitySubject = new BehaviorSubject(false);

        this.originalHeight = window.innerHeight;

        this.windowResizeObservable = fromEvent(window, 'resize');

        this.windowResizeObservable.subscribe((event: Event) => {
            const currentHeight = window.innerHeight;
            console.log('Resize Event: %o, original height: %d, current height: %d', event, this.originalHeight, currentHeight);
            // If an input is focused and currentHeight < originalHeight
            if (this.isFocused && currentHeight < this.originalHeight) {
                this.withKeyboardHeight = currentHeight;
                this.keyboardVisibilitySubject.next(true);
                return;
            }
            // If we have the height with keyboard shown calculated
            if (!!this.withKeyboardHeight) {
                const min = this.withKeyboardHeight * .85;
                const max = this.withKeyboardHeight * 1.15;
                // 85% of with_keyboard_height < currentHeight < 1.15% of with_keyboard_height
                // this is an error margin in case somewhow the window was resized
                if (currentHeight > min && currentHeight < max) {
                    this.keyboardVisibilitySubject.next(true);
                    return;
                }
            }

            if (this.originalHeight === currentHeight) {
                this.keyboardVisibilitySubject.next(false);
            }

        });
    }

    onKeyboardVisible(): BehaviorSubject<boolean> {
        return this.keyboardVisibilitySubject;
    }

    inputFocused() {
        console.log('Focus Event');
        this.isFocused = true;
        this.focusInputSubject.next(true);
    }

    inputBlurred() {
        this.isFocused = false;
        this.focusInputSubject.next(false);
    }

    onFocusInput(): BehaviorSubject<boolean> {
        return this.focusInputSubject;
    }

    onMainHeaderVisibility(): BehaviorSubject<boolean> {
        return this.mainHeaderVisiblitySubject;
    }

    mainHeaderShow() {
        this.mainHeaderVisiblitySubject.next(true);
    }

    mainHeaderHide() {
        this.mainHeaderVisiblitySubject.next(false);
    }

    onNavVisibility(): BehaviorSubject<boolean> {
        return this.navVisibilitySubject;
    }
    showNav() {
        this.navVisibilitySubject.next(true);
    }
    hideNav() {
        this.navVisibilitySubject.next(false);
    }

    onLoadingVisibility() {
        return this.loadingVisiblitySubject;
    }
    showLoading() {
        this.loadingVisiblitySubject.next(true);
    }
    hideLoading() {
        this.loadingVisiblitySubject.next(false);
    }
}
