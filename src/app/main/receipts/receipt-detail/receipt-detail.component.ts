import { Component, OnInit } from '@angular/core';
import { ReceiptsService } from '../receipts.service';
import { Receipt, ApiError, ErrorStatus } from 'src/app/core/api/models';
import { ApiService } from 'src/app/core/api/api.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UIService, getIcon } from 'src/app/core/ui';

@Component({
    selector: 'app-receipt-detail',
    templateUrl: './receipt-detail.component.html',
    styleUrls: ['./receipt-detail.component.css']
})
export class ReceiptDetailComponent implements OnInit {

    receipt: Receipt;
    error: string;

    getIcon = getIcon

    constructor(
        private receiptsService: ReceiptsService,
        private apiService: ApiService,
        private uiService: UIService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.uiService.showLoading();
        this.receipt = this.receiptsService.getDetailsReceipt();

        if (!this.receipt) {
            this.getReceipt();
        } else {
            this.uiService.hideLoading();
        }
    }

    private getReceipt() {
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                return this.apiService.getReceipt(params.get('receipt_id'));
            })
        ).subscribe({
            next: (receipt: Receipt) => {
                this.receipt = receipt;
                this.uiService.hideLoading();
            },
            error: (err: ApiError) => {
                if (!err.message && err.status === ErrorStatus.NotFound) {
                    err.message = 'El Recibo que intentaste acceder no existe.';
                }
                this.error = err.message;
                this.uiService.hideLoading();
            },
        });
    }

    back() {
        this.router.navigate(['/main/receipts']);
    }

}
