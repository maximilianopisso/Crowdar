import BasePage from "./basePage.js";

class LoginPage extends BasePage {
    get title() { return $("//div[@class='login_logo']"); }
    get inputUsername() { return $("//input[@id='user-name']"); }
    get inputPassword() { return $("//input[@id='password']"); }
    get msgError() { return $("//div[@class='error-message-container error']") }
    get btnLogin() { return $("//input[@id='login-button']"); }

    public async login(username: string, password: string) {
        await this.wdioSendKeys(await this.inputUsername, username);
        await this.wdioSendKeys(await this.inputPassword, password);
        await this.wdioClick(await this.btnLogin);
    }

    public async open(url: string) {
        return super.open('https://www.saucedemo.com/');
    }
}

export default new LoginPage();