import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SearchComponent } from './search/search.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { AccountComponent } from './account/account.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { PayComponent } from './pay/pay.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { CardModule } from 'ngx-card/ngx-card';
import { ReceiptDetailComponent } from './receipts/receipt-detail/receipt-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        CardModule,
        CoreModule,
        MainRoutingModule,
    ],
    declarations: [
        MainComponent,
        SearchComponent,
        ReceiptsComponent,
        AccountComponent,
        PayComponent,
        PaymentMethodsComponent,
        ReceiptDetailComponent
    ]
})
export class MainModule { }
