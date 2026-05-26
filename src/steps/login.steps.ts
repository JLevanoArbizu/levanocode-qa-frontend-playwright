import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import * as usersData from '../../config/data/users.json';

Given('que estoy en la página de inicio de sesión de SauceDemo', async function (this: CustomWorld) {
  await this.loginPage.navigate();
});

When('ingreso mis credenciales con el usuario {string}', async function (this: CustomWorld, userType: string) {
  const users: any = usersData;
  const user = users[userType];
  await this.loginPage.login(user.username, user.password);
});

Then('debo ser redirigido a la página de inventario', async function (this: CustomWorld) {
  const isLoaded = await this.inventoryPage.isLoaded();
  expect(isLoaded).toBeTruthy();
});

Then('debo ver un mensaje de error {string}', async function (this: CustomWorld, mensajeEsperado: string) {
  const errorMessage = await this.loginPage.getErrorMessage();
  expect.soft(errorMessage).toContain(mensajeEsperado);
});
