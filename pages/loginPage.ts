import { test, expect } from '@playwright/test';
import { ConfigReader } from '../utils/configreader';
import { log } from '../utils/logger';
import { Page } from '@playwright/test';

export class LoginPage  {
  private emailLoginInput = '#input-email';
  private passwordLoginInput = '#input-password';
  private loginButton = 'button[type="submit"]';

  
  constructor(private page: Page) {}

  async loginPage() {
    log.info('Starting Admin Login flow');
    log.step(`Filling email: ${ConfigReader.getStagingUsername()}`);
    await this.page.fill(this.emailLoginInput, ConfigReader.getStagingUsername());
    log.step(`Filling password`);
    await this.page.fill(this.passwordLoginInput, ConfigReader.getStagingPassword());
    log.step('Clicking on Login button');
    await this.page.click(this.loginButton);
    log.info('Login successful');
    await expect(this.page).toHaveURL('https://staging.payroo.com.au/payruns');
  }

  
}
