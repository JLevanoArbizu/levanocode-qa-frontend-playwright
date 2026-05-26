import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly shoppingCartIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.shoppingCartIcon = page.locator('.shopping_cart_link');
  }

  async isLoaded(): Promise<boolean> {
    return await this.isElementVisible(this.title);
  }

  async addProductToCart(productName: string) {
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
    const addToCartButton = this.page.locator(`[data-test="add-to-cart-${formattedName}"]`);
    await this.clickElement(addToCartButton);
  }

  async goToCart() {
    await this.clickElement(this.shoppingCartIcon);
  }
}
