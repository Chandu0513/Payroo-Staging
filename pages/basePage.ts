import { Page } from '@playwright/test';
import { ConfigReader } from '../utils/configreader';
import { log } from '../utils/logger';

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page; 
  }

  async navigateToBaseURL() {
    const baseURL = ConfigReader.getBaseURL() || process.env.BASE_URL;
    if (baseURL) {
      log.info(`Navigating to: ${baseURL}`);
      await this.page.goto(baseURL);
    } else {
      log.warn('BASE_URL missing in .env');
    }
  }
}
