/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
const ELEMENT_WAIT_TIME = 5000;

export default class BasePage {

    public async open(url: string) {
        await browser.maximizeWindow();
        return browser.url(url as string);
    }

    public async wdioSendKeys(element: WebdriverIO.Element, text: string): Promise<void> {
        if (text !== "") {
            await element.waitForExist({ timeout: ELEMENT_WAIT_TIME, timeoutMsg: `EL ELEMENTO NO FUE ENCONTRADO DURANTE ${ELEMENT_WAIT_TIME}ms` });
            await element.waitForEnabled({ timeout: ELEMENT_WAIT_TIME, timeoutMsg: `EL ELEMENTO NO FUE HABILITADO DURANTE ${ELEMENT_WAIT_TIME}ms` });
        }
        await element.clearValue();
        await element.setValue(text);
    }

    public async wdioClick(element: WebdriverIO.Element): Promise<void> {
        await element.waitForExist({ timeout: ELEMENT_WAIT_TIME, timeoutMsg: `EL ELEMENTO NO FUE ENCONTRADO DURANTE ${ELEMENT_WAIT_TIME} ms` });
        await element.waitForClickable({ timeout: ELEMENT_WAIT_TIME, timeoutMsg: `EL ELEMENTO NO FUE CLICKEABLE DURANTE ${ELEMENT_WAIT_TIME} ms` });
        await element.click();
    }
}