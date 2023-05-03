import { Constants } from "../utils/constants.js";
export default class BasePage {

    public async open(url: string): Promise<void> {
        await browser.maximizeWindow();
        await browser.url(url as string);
    }

    public async wdioSendKeys(element: WebdriverIO.Element, text: string): Promise<void> {
        if (text !== "") {
            await element.waitForExist({ timeout: Constants.ELEMENT_WAIT_TIME, timeoutMsg: `EL ELEMENTO NO FUE ENCONTRADO DURANTE ${Constants.ELEMENT_WAIT_TIME}ms` });
            await element.waitForEnabled({ timeout: Constants.ELEMENT_WAIT_TIME, timeoutMsg: `EL ELEMENTO NO FUE HABILITADO DURANTE ${Constants.ELEMENT_WAIT_TIME}ms` });
        }
        await element.clearValue();
        await element.setValue(text);
    }

    public async wdioClick(element: WebdriverIO.Element): Promise<void> {
        await element.waitForExist({ timeout: Constants.ELEMENT_WAIT_TIME, timeoutMsg: `EL ELEMENTO NO FUE ENCONTRADO DURANTE ${Constants.ELEMENT_WAIT_TIME} ms` });
        await element.waitForClickable({ timeout: Constants.ELEMENT_WAIT_TIME, timeoutMsg: `EL ELEMENTO NO FUE CLICKEABLE DURANTE ${Constants.ELEMENT_WAIT_TIME} ms` });
        await element.click();
    }

    public async wdioGetTextFromElement(element: WebdriverIO.Element): Promise<string> {
        await element.waitForExist({ timeout: Constants.ELEMENT_WAIT_TIME, timeoutMsg: `EL ELEMENTO NO FUE ENCONTRADO DURANTE ${Constants.ELEMENT_WAIT_TIME}ms` });
        return element.getText();
    }
}