import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { SearchComponent } from './search/search.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { AccountComponent } from './account/account.component';
import { PayComponent } from './pay/pay.component';

const routes: Routes = [
    {
        path: '', component: MainComponent, children: [
            { path: '', redirectTo: 'search' },
            { path: 'search', component: SearchComponent },
            { path: 'pay', component: PayComponent },
            { path: 'receipts', component: ReceiptsComponent },
            { path: 'account', component: AccountComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
