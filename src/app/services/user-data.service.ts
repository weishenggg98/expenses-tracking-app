import { Injectable } from '@angular/core';
import { UserDataModel } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor() { }

  isUserDataExist(): boolean {
    const userDataJSONString = localStorage.getItem('userData');
    return userDataJSONString ? true : false;
  }

  get userData(): UserDataModel {
    const userDataJSONString = localStorage.getItem('userData');
    if (userDataJSONString) {
      const userDataJSONObject = JSON.parse(userDataJSONString);
      return userDataJSONObject as UserDataModel;
    } else {
      const userData: UserDataModel = {
        uniqueDeviceId: null,
        userEmail: null,
        expenseList: [],
      };

      return userData;
    }
  }

  set userData(userData: UserDataModel) {
    const updatedUserDataJSONString = JSON.stringify(userData);
    localStorage.setItem('userData', updatedUserDataJSONString);
  }

  clearUserData() {
    localStorage.removeItem('userData');
  }
}
