import { PayrollPage } from '../pages/payroll';
import { DataGenerator } from '../utils/helpers';
import { LoginPage } from '../pages/loginPage';
import { BasePage } from '../pages/basePage';
import { test, expect } from '@playwright/test';

test.describe('Create Expense Flow', () => {
  let basePage: BasePage;
  let loginPage: LoginPage;
  let payrollPage: PayrollPage;

  test.beforeEach(async ({ page }) => {         
    basePage = new BasePage(page);               
    loginPage = new LoginPage(page);             
    payrollPage = new PayrollPage(page);         

    await basePage.navigateToBaseURL();          
  });

  test('Create new expense', async () => {
    await loginPage.loginPage();
    await basePage.page.waitForLoadState('networkidle');
    await expect(basePage.page).toHaveURL('https://staging.payroo.com.au/payruns');

    const randomName = DataGenerator.randomExpenseName();
    const randomAmount = DataGenerator.randomAmount();
    const randomDescription = DataGenerator.randomDescription();
    console.log("Generated Data:", randomName, randomAmount, randomDescription);

    await payrollPage.navigateToPayroll();
    await payrollPage.openAddExpenseForm();
    await payrollPage.fillExpenseForm(randomName, randomAmount, randomDescription);
    await payrollPage.saveExpense();
  });

  
});
