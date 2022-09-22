import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
import { ExpenseRoutingModule } from './expense-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/modules/shared.module';

@NgModule({
    declarations: [ExpenseListComponent, ExpenseDetailComponent],
    imports: [
        CommonModule,
        ExpenseRoutingModule,
        DataTablesModule,
        SharedModule,
    ],
})
export class ExpenseModule {}
