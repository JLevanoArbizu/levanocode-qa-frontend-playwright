import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

const SELECTORS = {
  title:            '.title',
  shoppingCartIcon: '.shopping_cart_link',
  addToCartPrefix:  '[data-test="add-to-cart-'
};

export class InventoryPage extends BasePage {
  readonly title:Locator;
  readonly shoppingCartIcon:Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator(SELECTORS.title);
    this.shoppingCartIcon = page.locator(SELECTORS.shoppingCartIcon);
  }

  async isLoaded(): Promise<boolean> {
    return await this.isElementVisible(this.title);
  }

  async addProductToCart(productName: string) {
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
    const selector = `${SELECTORS.addToCartPrefix}${formattedName}"]`;
    const addToCartButton = this.page.locator(selector);
    await this.clickElement(addToCartButton);
  }

  async goToCart() {
    await this.clickElement(this.shoppingCartIcon);
  }
}
