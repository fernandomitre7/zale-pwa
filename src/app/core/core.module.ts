import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UIModule } from './ui/ui.module';
import { InputComponent } from './ui/input/input.component';
import { LoadingComponent } from './ui/loading/loading.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        UIModule
    ],
    declarations: [],
    exports: [InputComponent, LoadingComponent]
})
export class CoreModule { }
