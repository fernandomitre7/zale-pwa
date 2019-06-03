import { Component, OnInit } from '@angular/core';
import { Card, ApiError, ErrorStatus } from 'src/app/core/api/models';
import { UIService } from 'src/app/core/ui';
import { ApiService } from 'src/app/core/api/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PayService } from '../../pay/pay.service';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-paymen-method-details',
    templateUrl: './paymen-method-details.component.html',
    styleUrls: ['./paymen-method-details.component.css']
})
export class PaymenMethodDetailsComponent implements OnInit {
    card: Card;
    error: string;
    default: boolean;

    constructor(
        private payServce: PayService,
        private apiService: ApiService,
        private uiService: UIService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.card = this.payServce.getCardToTuse();

        if (!this.card) {
            this.getCard();
        } else {
            this.default = this.card.default;
        }
    }

    getCard() {
        this.uiService.showLoading();
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                return this.apiService.getCard(params.get('payment_method_id'));
            })
        ).subscribe({
            next: (card: Card) => {
                this.card = card;
                this.default = this.card.default;
                this.uiService.hideLoading();
            },
            error: (err: ApiError) => {
                if (!err.message && err.status === ErrorStatus.NotFound) {
                    err.message = 'La tarjeta que intentaste acceder no existe.';
                }
                this.error = err.message;
                this.uiService.hideLoading();
            },
        });
    }

    back() {
        if (this.default !== this.card.default) {
            this.uiService.showLoading();
            this.card.default = this.default;
            this.apiService.updateCard(this.card)
                .subscribe({
                    next: (card: Card) => {
                        debugger;
                        this.uiService.hideLoading();
                        this.router.navigate(['/main/payment-methods']);
                    },
                    error: (err: ApiError) => {
                        debugger;
                        if (!err.message) {
                            err.message = 'No se pudo actualizar la tarjeta, intentelo mas tarde.';
                        }
                        this.error = err.message;
                        this.uiService.hideLoading();
                    }
                })
        } else {
            this.router.navigate(['/main/payment-methods']);
        }
    }

}
