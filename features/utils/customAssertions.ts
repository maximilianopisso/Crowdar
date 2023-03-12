import { expect as expectChai } from 'chai';
import BasePage from '../pages/basePage.js';
import { Constants } from './constants.js';

export class CustomAssertions extends BasePage {
    /** Este método realiza el expect de que el texto de un WebElement o texto, sea igual en forma estricta "==="" a otro texto
  * @param element WebdriverIO.Element del elemento donde esta el texto
  * @param expectedText texto que se quiere comparar
  */
    public async expectEqualText(element: WebdriverIO.Element | string, expectedText: string) {
        if (!(typeof element === 'string')) {
            const texto = await this.wdioGetTextFromElement(element);
            expectChai(texto).equal(expectedText, `el texto ${expectedText} es diferente al obtenido`);
        } else {
            expectChai(element).equal(expectedText, `el texto ${expectedText} es diferente al obtenido`);
        }
    }

    public async expectElementDisplayed(element: WebdriverIO.Element, descripcion?: string) {
        const isDisplay = await element.waitForDisplayed({ timeout: Constants.ELEMENT_WAIT_TIME, timeoutMsg: `${descripcion?.toUpperCase()} NO SE ENCONTRÓ EN EL TIEMPO ${Constants.ELEMENT_WAIT_TIME} ms` });
        if (isDisplay && descripcion !== undefined) {
            console.log(`${descripcion?.toUpperCase()} ES VISIBLE`);
        }
        expectChai(isDisplay).to.be.true;
    }
}

export default new CustomAssertions();