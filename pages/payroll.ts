import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { log } from '../utils/logger';
import { ConfigReader } from '../utils/configreader';

export class PayrollPage extends BasePage {

  
  expensesButton = this.page.getByRole('button', { name: 'Expenses' });
  addNewButton = this.page.getByRole('button', { name: 'Add New' });
  expenseNameTextbox = this.page.getByRole('textbox', { name: 'e.g. Travel' });
  categoryDropdown = this.page.getByText('Select...Travel & MealsTools');
  categoryOptionTools = this.page.getByText('Tools & Equipment');
  amountTextbox = this.page.getByPlaceholder('$');
  descriptionTextbox = this.page.getByRole('textbox', { name: 'Enter description' });
  showInPayslipToggle = this.page.getByText('Show In Payslip');
  createButton = this.page.getByRole('button', { name: 'CREATE' });
   settingsdropdown = this.page.getByRole('button', { name: ' Settings ' });
  payrolllink = this.page.getByRole('link', { name: 'Payroll' });
  expenseslink =  this.page.getByRole('link', { name: 'Expenses' });
  


  searchExpenseTextbox = this.page.getByRole('textbox', {
    name: 'Search expense items by name'
  });

  searchResultPanel = this.page.locator('div').filter({
    hasText: 'Error: SearchAdd NewExpense'
  }).nth(3);

  constructor(page: Page) {
    super(page);
  }

    async navigateToPayroll() {
    log.info('Navigating to Payroll Settings page...');
    log.step('Clicking on Settings dropdown');
    await this.settingsdropdown.click();  
    log.step('Selecting Payroll link');
    await this.payrolllink.click();
    log.success('Successfully navigated to Payroll Settings page.');
  }

  async openAddExpenseForm() {
    log.info('Opening Add Expense form');
    log.step('Clicking "Expenses" button');
    await this.expensesButton.click();
    log.step('Clicking "Add New" button');
    await this.addNewButton.click();
    log.success('Add Expense form opened successfully!');
  }

  async fillExpenseForm(name: string, amount: string, description: string) {
    log.info('Filling Expense Form');

    log.step(`Entering Expense Name: ${name}`);
    await this.expenseNameTextbox.fill(name);

    log.step('Opening Category dropdown');
    await this.categoryDropdown.click();

    log.step('Selecting Category: Tools & Equipment');
    await this.categoryOptionTools.click();

    log.step(`Entering Amount: ${amount}`);
    await this.amountTextbox.fill(amount);

    log.step(`Entering Description: ${description}`);
    await this.descriptionTextbox.fill(description);

    log.step('Toggling "Show In Payslip"');
    await this.showInPayslipToggle.click();

    log.success('Expense form filled successfully!');
  }

  async saveExpense() {
    log.info('Saving Expense Item');
    log.step('Clicking CREATE button');
    await this.createButton.click();
    log.success('Expense item created successfully!');
  }

  async searchExpense(name: string) {
    log.info(`Searching Expense Item: ${name}`);

    log.step(`Typing into search box: ${name}`);
    await this.searchExpenseTextbox.fill(name);

    log.step('Clicking search result panel');
    await this.searchResultPanel.click();

    log.success(`Search selection completed for expense: ${name}`);
  }

}
