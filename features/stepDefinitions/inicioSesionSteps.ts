import { Given, When, Then, DataTable } from '@wdio/cucumber-framework';
import LoginPage from '../pages/loginPage.js';


Given(/^el usuario se encuentra en la pantalla de login$/, async () => {
    await LoginPage.open();
});

When(/^se loguea ingresando usuario y password$/, async (dataTable: DataTable) => {
    LoginPage.userLogin(dataTable);
    await browser.pause(3000);
});

Then(/^lo redirige a la pantalla "(.*?)"$/, async (page: string) => {
    LoginPage.validarRedireccionPage(page);
    await browser.pause(1000);
});

Then(/^visualiza un mensaje de error que indica que las credenciales son incorrectas$/, async () => {
    LoginPage.validarMsjErrorCredencialesIncorrectas();
    await browser.pause(2000);
});

Then(/^visualiza un mensaje de error que indica que el usuario se encuentra bloqueado$/, async () => {
    LoginPage.validarMsjErrorUserBloqueado();
    await browser.pause(2000);
});