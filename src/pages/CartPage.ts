import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage{
  readonly checkoutButton: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.inventoryItems = page.locator('.cart_item');
  }

  async isProductInCart(productName: string): Promise<boolean> {
    const item = this.inventoryItems.filter({ hasText: productName });
    return await this.isElementVisible(item);
  }

  async proceedToCheckout() {
    await this.clickElement(this.checkoutButton);
  }
}
