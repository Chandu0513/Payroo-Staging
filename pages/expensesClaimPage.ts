import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { log } from '../utils/logger';
import { ConfigReader } from '../utils/configreader';

export class ExpenseClaimPage extends BasePage {

  
  expenseClaimsLink = this.page.getByRole('link', { name: ' Expense Claims ' });
  createExpenseButton = this.page.getByRole('button', { name: 'Create Expense Claim ' });
  expenseclaimleftnav = this.page.getByRole('link', { name: ' Expense Claims ' });
  

  calendarIcon = this.page.locator('.uil.uil-calendar-alt');
  dateOption = this.page.getByRole('option', { name: 'Choose Tuesday, November 11th,' }); // update if dynamic

  amountField = this.page.getByPlaceholder('0.00');
  descriptionField = this.page.getByRole('textbox', { name: 'Add a note or description for' });

  CreateExpenseButtonModel = this.page.getByRole('button', { name: 'Create' });

  approveListRow = this.page.locator('div')
    .filter({ hasText: 'StatusPendingPendingApprovedPaidRejectedCancelled' })
    .nth(3);

  approveSelector = this.page.locator('.base-table-row > .ui > label');
  approveButton = this.page.getByRole('button', { name: 'Approve (1)' });
  approveConfirmButton = this.page.getByRole('button', { name: 'Approve', exact: true });

  successToast = this.page.getByText('Expense Claim(s) Approved.✖');

constructor(page: Page) {
  super(page);
}

async navigateToExpenseclaim() {
  log.info('Navigating to expense claim page...');
  await this.expenseclaimleftnav.click();
  log.success('Successfully navigated to expenese claim page.');
}

 
async createExpenseClaim() {
    log.info('Opening Expense Claim Form...');
    await this.createExpenseButton.click();
  }

  
  async fillExpenseDetails(employeeIndex: number) {
    log.info('Filling expense claim details using index-based dropdowns...');

    
    const empParent = this.page.getByRole('combobox').nth(0);
    await empParent.scrollIntoViewIfNeeded();
    await empParent.click({ force: true });
    const empOptions = empParent.locator('role=option');
    await empOptions.nth(employeeIndex).click();

    
   
  await this.page.getByText('Selectc1244@10..f>').click();
  await this.page.getByRole('option', { name: 'Food' }).click();
    
    await this.calendarIcon.click();
    await this.dateOption.click();
    await this.amountField.fill('100');
    await this.descriptionField.fill('new claim for testing');
    await this.CreateExpenseButtonModel.click();
    await this.CreateExpenseButtonModel.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => null);
    await this.page.waitForTimeout(500);
     log.info('Selecting expense type...');




  }

 async approveExpense() {
  log.info('Approving Expense...');
  const descText = 'new claim for testing';

  try {
    // Wait for table to be visible
    await this.page.locator('div.base-table-row').first().waitFor({ state: 'visible', timeout: 8000 });

    // Find the row with the description text
    let targetRow = this.page.locator('div.base-table-row', { hasText: descText }).first();
    
   
    if ((await targetRow.count()) === 0) {
      log.info('Row not found, reloading page...');
      await this.page.reload({ waitUntil: 'networkidle', timeout: 15000 });
      targetRow = this.page.locator('div.base-table-row', { hasText: descText }).first();
      await targetRow.waitFor({ state: 'visible', timeout: 8000 });
    }
    await targetRow.scrollIntoViewIfNeeded();
    await targetRow.click({ force: true }); 
    const checkbox = targetRow.locator('label');
    await checkbox.click({ force: true });
    await this.approveButton.click({ force: true });
    await this.approveConfirmButton.click({ force: true });
    log.success('Expense approved successfully.');
  } catch (err) {
    log.error('approveExpense failed: ' + String(err));
    throw err;
  }
}

  async validateApprovalMessage() {
    log.info('Validating Success Toast...');
    await expect(this.successToast).toBeVisible();
    log.success('Success toast is visible: Expense Claim(s) Approved.');
    
  }
}
