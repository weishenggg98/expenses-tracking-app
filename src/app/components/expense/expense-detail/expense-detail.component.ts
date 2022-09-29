import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyMaskConfig } from 'ng2-currency-mask';
import { AmountType, CategoryType, PageAction } from 'src/app/enums/expense.enum';
import { v4 as uuidv4 } from 'uuid';
import { UserDataService } from 'src/app/services/user-data.service';
import { ExpenseModel } from 'src/app/models/expense.model';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss']
})
export class ExpenseDetailComponent implements OnInit {
  pageAction: PageAction = PageAction.Add;
  PageAction = PageAction;

  currencyConfig: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: false,
    decimal: '.',
    precision: 2,
    prefix: '',
    suffix: '',
    thousands: ',',
  };

  CategoryType = CategoryType;
  AmountType = AmountType;
  expenseForm!: FormGroup;
  expenseGuid: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userDataService: UserDataService,
    private expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.expenseForm = this.formBuilder.group({
      id: null,
      title: [null, [Validators.required, Validators.maxLength(100)]],
      category: [null, Validators.required],
      remark: null,
      amount: [
        null,
        [
          Validators.required,
          Validators.min(0.01),
          Validators.max(999999.99),
        ],
      ],
      dateTime: [new Date().toISOString(), Validators.required],
      createdDateTime: null,
      updatedDateTime: null,
      amountType: [AmountType.Credit, [Validators.required]],
    });

    this.getQueryParams().then((id: string | null) => {
      if (id) {
        this.pageAction = PageAction.Update;
        const expense = this.expenseService.getExpense(id);
        if (expense) {
          expense.dateTime = new Date(expense.dateTime).toISOString();
          this.expenseForm.patchValue(expense);
        }
      } else {
        this.pageAction = PageAction.Add;
      }
    })
  }

  getQueryParams() {
    return new Promise<string | null>(resolve => {
      this.route.queryParams.subscribe(params => {
        resolve(params['id']);
      });
    });
  }

  onSubmit() {
    this.expenseForm.markAllAsTouched();

    if (this.expenseForm.valid && this.userDataService.isUserDataExist()) {
      let expense = this.expenseForm.value as ExpenseModel;
      expense.dateTime = new Date(expense.dateTime).getTime();

      if (this.pageAction === PageAction.Update) {
        expense.updatedDateTime = new Date().getTime();

        this.expenseService.updateExpense(expense);
        this.router.navigate(['expenses']);
      } else {
        expense.id = uuidv4();
        expense.createdDateTime = new Date().getTime();
        expense.updatedDateTime = new Date().getTime();

        this.expenseService.addExpense(expense);
        this.router.navigate(['expenses']);
      }
    }
  }
}
