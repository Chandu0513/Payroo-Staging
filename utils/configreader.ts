import dotenv from 'dotenv';
dotenv.config();

export class ConfigReader {

  static getBaseURL(): string {
    return process.env.BASE_URL || 'https://dev.urbuddi.com/';
  }

  static getBrowser(): 'chromium' | 'firefox' | 'webkit' {
    const browser = process.env.BROWSER?.toLowerCase();
    if (browser === 'firefox') return 'firefox';
    if (browser === 'webkit') return 'webkit';
    return 'chromium';
  }

  static getHeadless(): boolean {
    return process.env.HEADLESS?.toLowerCase() === 'false' ? false : true;
  }

  static getStagingUsername(): string {
    return process.env.STAGING_USERNAME || '';
  }

  static getStagingPassword(): string {
    return process.env.STAGING_PASSWORD || '';
  }

  static getPayrollURL(): string {
    return process.env.PAYROLL_URL || `${this.getBaseURL()}settings/payroll`;
  }

  static getExpenseClaimURL(): string {
    return process.env.EXPENSE_CLAIM_URL || `${this.getBaseURL()}expense-claims`;
  }
}
