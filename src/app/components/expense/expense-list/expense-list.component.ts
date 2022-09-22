import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Type } from 'class-transformer';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-expense-list',
    templateUrl: './expense-list.component.html',
    styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent implements OnInit {
    expensesList: Array<ExpenseModel> = new Array<ExpenseModel>();

    @ViewChild(DataTableDirective, { static: false })
    dtElement!: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

    constructor() {}

    ngOnInit(): void {
        this.dtOptions = {
            lengthChange: false,
            ordering: true,
            searching: false,
            responsive: true,
            paging: false,
        };

        this.getExpensesList();
    }

    getExpensesList() {
        const userDataJSONString = localStorage.getItem('userData');
        if (userDataJSONString) {
            const userDataJSONObject = JSON.parse(userDataJSONString);
            const userData = userDataJSONObject as ExpenseListModel;
            this.expensesList = userData.expenseList;

            setTimeout(() => {
                this.dtTrigger.next(0);
            });
        }
    }

    addRecord() {
        this.expensesList.push({
            name: 'ABC',
            category: 'Shopping',
            remark: 'ABC',
            amount: Math.random(),
            createdDateTime: 1663757593941,
            amountType: 1,
        });

        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next(0);
        });
    }
}

class GenericModel {
    uniqueDeviceId: string;

    constructor() {
        this.uniqueDeviceId = '';
    }
}

class ExpenseListModel extends GenericModel {
    expenseList: Array<ExpenseModel>;

    constructor() {
        super();
        this.expenseList = new Array<ExpenseModel>();
    }
}

class ExpenseModel {
    name: string;
    category: string;
    remark: string;
    amount: number;
    createdDateTime: number;

    @Type(() => Number)
    amountType: AmountType;

    constructor() {
        this.name = '';
        this.category = '';
        this.remark = '';
        this.amount = 0;
        this.createdDateTime = 0;
        this.amountType = AmountType.Credit;
    }
}

enum AmountType {
    Credit,
    Debit,
}
