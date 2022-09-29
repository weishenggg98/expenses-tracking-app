import { Injectable } from '@angular/core';
import { ExpenseModel, UserDataModel } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor() { }

  addExpense(expense: ExpenseModel) {
    const userDataJSONString = localStorage.getItem('userData');
    if (userDataJSONString) {
      const userDataJSONObject = JSON.parse(userDataJSONString);
      userDataJSONObject.expenseList.push(expense);

      const updatedUserDataJSONString = JSON.stringify(userDataJSONObject);
      localStorage.setItem('userData', updatedUserDataJSONString);
    }
  }

  getExpense(id: string): ExpenseModel | null {
    const userDataJSONString = localStorage.getItem('userData');
    if (userDataJSONString) {
      const userDataJSONObject = JSON.parse(userDataJSONString) as UserDataModel;
      const expense = userDataJSONObject.expenseList.find(e => e.id == id);
      return expense ? expense : null;
    } else {
      return null;
    }
  }

  updateExpense(expenseModel: ExpenseModel): void {
    const userDataJSONString = localStorage.getItem('userData');
    if (userDataJSONString) {
      const userDataJSONObject = JSON.parse(userDataJSONString) as UserDataModel;
      const expenseIndex = userDataJSONObject.expenseList.findIndex(e => e.id == expenseModel.id);

      if (expenseIndex != -1) {
        userDataJSONObject.expenseList[expenseIndex] = expenseModel;

        const updatedUserDataJSONString = JSON.stringify(userDataJSONObject);
        localStorage.setItem('userData', updatedUserDataJSONString);
      }
    }
  }
}
