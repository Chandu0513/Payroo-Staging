import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';

test.describe('Login Tests', () => {
  let basePage: BasePage;
  let loginPage: LoginPage;


  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);    
    loginPage = new LoginPage(page);  

    await basePage.navigateToBaseURL();  
  });

  test('Login with valid user', async () => {
    await loginPage.loginPage();
    
  });

  
});
