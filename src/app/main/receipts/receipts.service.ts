import { Injectable } from '@angular/core';
import { MainModule } from '../main.module';
import { Receipt } from 'src/app/core/api/models';

@Injectable({
  providedIn: 'root'
})
export class ReceiptsService {
  private receipt: Receipt;

  setDetailsReceipt(receipt: Receipt) {
    this.receipt = receipt;
  }

  getDetailsReceipt(): Receipt {
    return this.receipt;
  }

  constructor() { }
}
