import { Given, When, Then, DataTable } from '@wdio/cucumber-framework';
import LoginPage from '../pages/loginPage.js';
import SecurePage from '../pages/productsPage.js';

const pages = {
    login: LoginPage
}

Given(/^el usuario se encuentra en la pantalla de (\w+)$/, async (page: string) => {
    await pages[page].open();
});

When(/^se loguea ingresando usuario y password$/, async (dataTable: DataTable) => {
    const credenciales = dataTable.raw();
    await LoginPage.login(credenciales[1][0], credenciales[1][1]);
    await browser.pause(5000);
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveTextContaining(message);
});

