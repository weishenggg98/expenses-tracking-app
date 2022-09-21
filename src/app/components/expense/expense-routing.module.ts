import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';

const routes: Routes = [
    {
        path: '',
        component: ExpenseListComponent,
    },
    {
        path: 'list',
        component: ExpenseListComponent,
    },
    {
        path: 'detail',
        component: ExpenseDetailComponent,
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, FormsModule],
})
export class ExpenseRoutingModule {}
