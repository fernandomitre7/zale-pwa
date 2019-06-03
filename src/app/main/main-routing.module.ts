import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { SearchComponent } from './search/search.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { AccountComponent } from './account/account.component';
import { PayComponent } from './pay/pay.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { ReceiptDetailComponent } from './receipts/receipt-detail/receipt-detail.component';
import { PaymenMethodDetailsComponent } from './payment-methods/paymen-method-details/paymen-method-details.component';

const routes: Routes = [
    {
        path: '', component: MainComponent, children: [
            { path: '', redirectTo: 'search' },
            { path: 'search', component: SearchComponent },
            { path: 'pay', component: PayComponent },
            { path: 'payment-methods', component: PaymentMethodsComponent },
            { path: 'payment-methods/:payment_method_id', component: PaymenMethodDetailsComponent },
            { path: 'receipts', component: ReceiptsComponent },
            { path: 'receipts/:receipt_id', component: ReceiptDetailComponent },
            { path: 'account', component: AccountComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
