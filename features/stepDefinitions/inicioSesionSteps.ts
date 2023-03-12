import { Given, When, Then, DataTable } from '@wdio/cucumber-framework';
import LoginPage from '../pages/loginPage.js';
import ProductsPage from '../pages/productsPage.js';
import { Constants } from '../utils/constants.js';
import CustomAssertions from '../utils/customAssertions.js';


const pages = {
    login: LoginPage
}

Given(/^el usuario se encuentra en la pantalla de (\w+)$/, async (page: string) => {
    await pages[page].open();
});

When(/^se loguea ingresando usuario y password$/, async (dataTable: DataTable) => {
    const credenciales = dataTable.raw();
    await LoginPage.login(credenciales[1][0], credenciales[1][1]);
});

Then(/^lo redirige a la pantalla (.*)$/, async (page: string) => {
    const url = await browser.getUrl();
    switch (page.toUpperCase()) {
        case "PRODUCTS":
            await CustomAssertions.expectEqualText(url, "https://www.saucedemo.com/inventory.html");
            break;
        case "YOUR CART":
            await CustomAssertions.expectEqualText(url, "https://www.saucedemo.com/cart.html");
            break;
        default:
            throw new Error("NO SE RECONOCE EL NOMBRE DE PAGINA " + page);
    }
    await CustomAssertions.expectEqualText(await ProductsPage.title, page);
});

Then(/^visualiza un mensaje de error que indica que las credenciales son incorrectas$/, async () => {
    await CustomAssertions.expectEqualText(await LoginPage.msgError, Constants.MSJ_ERROR_LOGIN_FAILED_MATCH);
});

Then(/^visualiza un mensaje de error que indica que el usuario se encuentra bloqueado$/, async () => {
    await CustomAssertions.expectEqualText(await LoginPage.msgError, Constants.MSJ_ERROR_LOGIN_USER_BLOCKED);
});