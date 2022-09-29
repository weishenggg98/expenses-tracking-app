import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AmountType, CategoryType } from 'src/app/enums/expense.enum';
import { UserDataModel, ExpenseModel } from 'src/app/models/expense.model';
import { UserDataService } from 'src/app/services/user-data.service';

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

  CategoryType = CategoryType;
  AmountType = AmountType;

  constructor(private userDataService: UserDataService) { }

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
    this.expensesList = this.userDataService.userData?.expenseList;
    setTimeout(() => {
      this.dtTrigger.next(0);
    });
  }
}
