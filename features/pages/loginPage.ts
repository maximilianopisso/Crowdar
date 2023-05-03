import BasePage from "./basePage.js";
import productsPage from "./productsPage.js";
import { Constants } from "../utils/constants.js";
import { DataTable } from "@wdio/cucumber-framework";
import customAssertions from "../utils/customAssertions.js";

class LoginPage extends BasePage {
    get title() { return $("//div[@class='login_logo']"); }
    get inputUsername() { return $("//input[@id='user-name']"); }
    get inputPassword() { return $("//input[@id='password']"); }
    get msgError() { return $("//div[@class='error-message-container error']") }
    get btnLogin() { return $("//input[@id='login-button']"); }

    public async open() {
        return super.open('https://www.saucedemo.com/');
    }

    public async userLogin(dataTable: DataTable) {
        const credenciales = dataTable.raw();
        await this.wdioSendKeys(await this.inputUsername, credenciales[1][0]);
        await this.wdioSendKeys(await this.inputPassword, credenciales[1][1]);
        await this.wdioClick(await this.btnLogin);

    }

    public async validarRedireccionPage(page: string) {

        switch (page.toUpperCase()) {
            case "PRODUCTS":
                await browser.waitUntil(async () => await browser.getUrl() == "https://www.saucedemo.com/inventory.html", { timeout: 5000, timeoutMsg: "LA URL NO ES IGUAL" });
                await customAssertions.expectEqualText(await browser.getUrl(), "https://www.saucedemo.com/inventory.html");
                break;
            case "YOUR CART":
                await browser.waitUntil(async () => await browser.getUrl() == "https://www.saucedemo.com/cart.html", { timeout: 5000, timeoutMsg: "LA URL NO ES IGUAL" });
                await customAssertions.expectEqualText(await browser.getUrl(), "https://www.saucedemo.com/cart.html");
                break;
            default:
                throw new Error("NO SE RECONOCE EL NOMBRE DE PAGINA " + page);
        }
        await customAssertions.expectEqualText(await productsPage.title, page);
    }

    public async validarMsjErrorCredencialesIncorrectas() {
        await customAssertions.expectEqualText(await this.msgError, Constants.MSJ_ERROR_LOGIN_FAILED_MATCH);
    }

    public async validarMsjErrorUserBloqueado() {
        await customAssertions.expectEqualText(await this.msgError, Constants.MSJ_ERROR_LOGIN_USER_BLOCKED);
    }
}

export default new LoginPage();