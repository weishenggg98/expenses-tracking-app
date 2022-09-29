import { Type } from 'class-transformer';
import { AmountType, CategoryType } from '../enums/expense.enum';

export class GenericModel {
  uniqueDeviceId: string | null;
  userEmail: string | null;

  constructor() {
    this.uniqueDeviceId = '';
    this.userEmail = '';
  }
}

export class UserDataModel extends GenericModel {
  expenseList: Array<ExpenseModel>;

  constructor() {
    super();
    this.expenseList = new Array<ExpenseModel>();
  }
}

export class ExpenseModel {
  id: string;
  title: string;
  category: CategoryType;
  remark: string;
  amount: number;
  dateTime: number | string;
  createdDateTime: number;
  updatedDateTime: number;

  @Type(() => Number)
  amountType: AmountType;

  constructor() {
    this.id = '';
    this.title = '';
    this.category = CategoryType.Others;
    this.remark = '';
    this.amount = 0;
    this.dateTime = 0;
    this.createdDateTime = 0;
    this.updatedDateTime = 0;
    this.amountType = AmountType.Credit;
  }
}
