import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api/api.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Receipt, ApiError } from 'src/app/core/api/models';
import { UIService } from 'src/app/core/ui/ui.service';
import { ReceiptsService } from './receipts.service';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {
  private currentReceipts: Receipt[] = [];
  receipts$: BehaviorSubject<Receipt[]>;
  error: string;

  constructor(
    private api: ApiService,
    private receiptsService: ReceiptsService,
    private uiService: UIService,
    private router: Router) {

  }

  ngOnInit() {
    this.getReceipts();
  }

  getReceipts() {
    this.uiService.showLoading();
    this.api.getReceipts().subscribe({
      next: (receipts: Receipt[]) => {
        this.currentReceipts = receipts;
        debugger;
        if (!this.receipts$) {
          this.receipts$ = new BehaviorSubject<Receipt[]>(this.currentReceipts);
        } else {
          this.receipts$.next(this.currentReceipts);
        }
      },
      error: (err: ApiError) => {
        console.error('ReceiptsComponent:getReceipts err: %o', err);
        this.error = err.message;
        this.uiService.hideLoading();
      },
      complete: () => {
        this.uiService.hideLoading();
      }
    });
  }

  viewDetails(receipt: Receipt) {
    this.receiptsService.setDetailsReceipt(receipt);
    this.router.navigate(['/main/receipts', receipt.id]);
  }
}
