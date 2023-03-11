import BasePage from "./basePage.js";

class LoginPage extends BasePage {
    get inputUsername() { return $('#username'); }
    get inputPassword() { return $('#password'); }
    get btnLogin() { return $('button[type="submit"]'); }

    public async login(username: string, password: string) {
        await this.wdioSendKeys(await this.inputUsername, username);
        await this.wdioSendKeys(await this.inputPassword, username);
        await this.wdioClick(await this.btnLogin);
    }

    public async open(url: string) {
        return super.open('https://www.saucedemo.com/');
    }
}

export default new LoginPage();