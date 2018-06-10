import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SearchComponent } from './search/search.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { AccountComponent } from './account/account.component';
import { CoreModule } from '../core/core.module';

@NgModule({
    imports: [
        CommonModule,
        MainRoutingModule,
        CoreModule
    ],
    declarations: [MainComponent, SearchComponent, ReceiptsComponent, AccountComponent]
})
export class MainModule { }
