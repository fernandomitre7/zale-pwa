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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MainRoutingModule,
        CoreModule
    ],
    declarations: [MainComponent, SearchComponent, ReceiptsComponent, AccountComponent, PayComponent]
})
export class MainModule { }
