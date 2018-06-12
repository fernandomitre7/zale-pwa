import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [InputComponent, LoadingComponent],
    exports: [InputComponent, LoadingComponent]
})
export class UIModule { }
