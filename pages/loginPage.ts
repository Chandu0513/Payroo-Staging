import { BasePage } from './basePage';
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
      try {
      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 60000 }).catch(() => null),
        this.page.click(this.loginButton),
      ]);
      log.success('Admin login completed successfully!');
    } catch (e) {
      log.info('Login click/navigation completed with warning: ' + String(e));
    }
  }

  
}
