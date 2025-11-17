import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',

  
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  timeout: 80000,

  use: {
    baseURL: process.env.BASE_URL || 'https://staging.payroo.com.au/',
    headless: process.env.CI ? true : false,  
    viewport: null,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  

  
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: process.env.CI ? 'never' : 'always' }], 
    ['allure-playwright'],
  ],

projects: [
  {
    name: 'Chromium',
    use: {
      browserName: 'chromium',
      viewport: null,
      launchOptions: {
        args: ['--start-maximized'], 
        headless: process.env.CI ? true : false,
      },
    },
  },
  // {
  //   name: 'Firefox',
  //   use: {
  //     browserName: 'firefox',
  //     viewport: null, 
  //     launchOptions: {
  //       headless: process.env.CI ? true : false,
  //             },
  //   },
  // },
  // {
  //   name: 'WebKit',
  //   use: {
  //     browserName: 'webkit',
  //     viewport: null,
  //     launchOptions: {
  //       headless: process.env.CI ? true : false,
  //     },
   // },
  //},
],


fullyParallel: false,
workers:1
});
