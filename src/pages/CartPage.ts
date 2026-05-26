import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

const SELECTORS = {
  checkoutButton: '[data-test="checkout"]',
  inventoryItems: '.cart_item'
};

export class CartPage extends BasePage{
  readonly checkoutButton: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.locator(SELECTORS.checkoutButton);
    this.inventoryItems = page.locator(SELECTORS.inventoryItems);
  }

  async isProductInCart(productName: string): Promise<boolean> {
    const item = this.inventoryItems.filter({ hasText: productName });
    return await this.isElementVisible(item);
  }

  async proceedToCheckout() {
    await this.clickElement(this.checkoutButton);
  }
}
