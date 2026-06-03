import { test as setup } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';

import { testData } from '../../utils/testData';

setup(
  'login and save session',
  async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
      testData.username,
      testData.password
    );

    // save authenticated session
    await page.context().storageState({
      path: 'storageState.json'
    });
  }
);