import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly shoppingCartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.shoppingCartIcon = page.locator('.shopping_cart_link');
  }

  async isLoaded(): Promise<boolean> {
    return await this.title.isVisible();
  }

  async addProductToCart(productName: string) {
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
    const addToCartButton = this.page.locator(`[data-test="add-to-cart-${formattedName}"]`);
    await addToCartButton.click();
  }

  async goToCart() {
    await this.shoppingCartIcon.click();
  }
}
