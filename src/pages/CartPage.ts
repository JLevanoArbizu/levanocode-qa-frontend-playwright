import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.inventoryItems = page.locator('.cart_item');
  }

  async isProductInCart(productName: string): Promise<boolean> {
    const item = this.inventoryItems.filter({ hasText: productName });
    return await item.isVisible();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
