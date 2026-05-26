import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
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
