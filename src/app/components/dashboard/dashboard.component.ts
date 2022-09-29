import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { AmountType } from 'src/app/enums/expense.enum';
import { ExpenseModel } from 'src/app/models/expense.model';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  expensesList: Array<ExpenseModel> = new Array<ExpenseModel>();

  viewDate: Date = new Date();
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;
  events: CalendarEvent[] = [];

  totalAccumulatedSpending = 0;
  totalExpensesCount = 0;

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.getExpensesList().then(() => {
      this.initialiseCalendar();
      this.getDashboardStatistics();
    });
  }

  getDashboardStatistics() {
    this.totalAccumulatedSpending = this.expensesList
      .filter(e => e.amountType === AmountType.Credit)
      .map(e => e.amount)
      .reduce((acc, cur) => { return acc + cur });

    this.totalExpensesCount = this.expensesList.length;
  }

  initialiseCalendar() {
    this.expensesList.forEach(e => {
      this.events.push({
        start: new Date(e.dateTime),
        end: new Date(e.dateTime),
        title: e.title,
        allDay: true
      });
    });
  }

  getExpensesList() {
    return new Promise<void>((resolve, reject) => {
      this.expensesList = this.userDataService.userData?.expenseList;

      if (this.expensesList) {
        resolve();
      } else {
        reject();
      }
    });
  }
}
