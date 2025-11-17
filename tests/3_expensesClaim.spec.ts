import { test, expect } from '@playwright/test';
import { ExpenseClaimPage } from '../pages/expensesClaimPage';
import { LoginPage } from '../pages/loginPage';
import { BasePage } from '../pages/basePage';

test.describe('Approve Expense Claim Flow', () => {

  test.setTimeout(120000);

  let basePage: BasePage;
  let loginPage: LoginPage;
  let expenseClaimPage: ExpenseClaimPage;

  test.beforeEach(async ({ page }) => {         
    basePage = new BasePage(page);              
    loginPage = new LoginPage(page);            
    expenseClaimPage = new ExpenseClaimPage(page);

    await basePage.navigateToBaseURL();         
  });

  test('Approve an existing expense claim', async () => {
    await loginPage.loginPage();
    await expenseClaimPage.navigateToExpenseclaim();
    await expenseClaimPage.createExpenseClaim();

    const employeeIndex = 0;  
    await expenseClaimPage.fillExpenseDetails(employeeIndex);
    await expenseClaimPage.approveExpense();
    await expenseClaimPage.validateApprovalMessage();
  });

  
});
