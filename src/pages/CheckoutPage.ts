import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

const SELECTORS = {
  firstName:      '[data-test="firstName"]',
  lastName:       '[data-test="lastName"]',
  postalCode:     '[data-test="postalCode"]',
  continueBtn:    '[data-test="continue"]',
  finishBtn:      '[data-test="finish"]',
  completeHeader: '.complete-header'
};

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput  = page.locator(SELECTORS.firstName);
    this.lastNameInput   = page.locator(SELECTORS.lastName);
    this.postalCodeInput = page.locator(SELECTORS.postalCode);
    this.continueButton  = page.locator(SELECTORS.continueBtn);
    this.finishButton    = page.locator(SELECTORS.finishBtn);
    this.completeHeader  = page.locator(SELECTORS.completeHeader);
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
    await this.fillText(this.firstNameInput, firstName);
    await this.fillText(this.lastNameInput, lastName);
    await this.fillText(this.postalCodeInput, postalCode);
  }

  async continueToOverview() {
    await this.clickElement(this.continueButton);
    await this.page.waitForTimeout(1000);

  }

  async finishCheckout() {
    await this.clickElement(this.finishButton);
  }

  async getConfirmationMessage(): Promise<string> {
    return await this.getElementText(this.completeHeader);
  }
}
