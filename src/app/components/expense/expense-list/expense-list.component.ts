import { Component, OnInit } from '@angular/core';
import { Type } from 'class-transformer';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-expense-list',
    templateUrl: './expense-list.component.html',
    styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent implements OnInit {
    expensesList: Array<ExpenseModel> = new Array<ExpenseModel>();

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

    constructor() {}

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 2,
            ordering: true,
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
