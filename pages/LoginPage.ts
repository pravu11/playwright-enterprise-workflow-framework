import { Page } from '@playwright/test';
import { appConstants } from '../constants/appConstants';

export class LoginPage {

  constructor(private page: Page) {}

async navigate() {

  await this.page.goto(
    appConstants.urls.login
  );
  
  await this.page.waitForLoadState('networkidle');
}

async login(
  username: string,
  password: string
) {

  await this.page.fill(
    appConstants.loginPage.usernameInput,
    username
  );

  await this.page.fill(
    appConstants.loginPage.passwordInput,
    password
  );

  await this.page.click(
    appConstants.loginPage.loginButton
  );

  await this.page.waitForLoadState('networkidle');
}
}
