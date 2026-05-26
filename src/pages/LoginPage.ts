import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

const SELECTORS = {
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorMessage: '[data-test="error"]'
};

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton:   Locator;
  readonly errorMessage:  Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput  = page.locator(SELECTORS.usernameInput);
    this.passwordInput  = page.locator(SELECTORS.passwordInput);
    this.loginButton    = page.locator(SELECTORS.loginButton);
    this.errorMessage   = page.locator(SELECTORS.errorMessage);
  }

  async navigate() {
    const urlBase = process.env.BASE_URL as string;
    await this.page.goto(urlBase);
  }

  async login(username: string, password: string) {
    await this.fillText(this.usernameInput, username);
    await this.fillText(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getElementText(this.errorMessage);
  }
}
