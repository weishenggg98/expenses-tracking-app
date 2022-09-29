import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MaterialModule } from './material.module';

@NgModule({
    exports: [
        MaterialModule,
        CurrencyMaskModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class SharedModule {}
