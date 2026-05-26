import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import * as usersData from '../../config/data/users.json';

Given('inicio sesión exitosamente con {string}', async function (this: CustomWorld, userType: string) {
  const users: any = usersData;
  const user = users[userType];
  await this.loginPage.login(user.username, user.password);
  
  const isLoaded = await this.inventoryPage.isLoaded();
  expect(isLoaded).toBeTruthy();
});

When('agrego un producto al carrito desde el inventario', async function (this: CustomWorld) {
  await this.inventoryPage.addProductToCart('Sauce Labs Backpack');
});

When('navego al carrito de compras', async function (this: CustomWorld) {
  await this.inventoryPage.goToCart();
});

Then('el producto seleccionado debe estar en el carrito', async function (this: CustomWorld) {
  const isInCart = await this.cartPage.isProductInCart('Sauce Labs Backpack');
  expect(isInCart).toBeTruthy();
});

When('procedo al checkout', async function (this: CustomWorld) {
  await this.cartPage.proceedToCheckout();
});

When('ingreso mis datos de envío', async function (this: CustomWorld) {
  await this.checkoutPage.fillShippingInfo('John', 'Doe', '12345');
  await this.checkoutPage.continueToOverview();
});

When('confirmo la compra', async function (this: CustomWorld) {
  await this.checkoutPage.finishCheckout();
});

Then('debo ver la pantalla de confirmación de orden exitosa', async function (this: CustomWorld) {
  const confirmationMessage = await this.checkoutPage.getConfirmationMessage();
  expect(confirmationMessage).toBe('Thank you for your order!');
});
