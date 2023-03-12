import { expect as expectChai } from 'chai';
import BasePage from '../pages/basePage.js';
import { Constants } from './constants.js';

export class CustomAssertions extends BasePage {
    /** Este método realiza el expect de si el texto de un WebElement o texto, contiene otro texto
     * @param element WebdriverIO.Element del elemento donde esta el texto
     * @param expectedText texto que se quiere comparar
     */
    public async expectContainsText(element: WebdriverIO.Element | string, expectedText: string) {
        if (!(typeof element === 'string')) {
            const texto = await this.wdioGetTextFromElement(element);
            expectChai(texto).contain(expectedText, `el texto ${expectedText} es diferente al obtenido`);
        } else {
            expectChai(element).contain(expectedText, `el texto ${expectedText} es diferente al obtenido`);
        }
    }

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

    /** Este método realiza el expect de si un webelement no es visible
         * @param element WebdriverIO.Element del elemento a comprobar
         * @param descripcion es la descripcion del localizador
         */
    public async expectElementNotDisplayed(element: WebdriverIO.Element, descripcion?: string) {
        const isDisplay = await element.waitForDisplayed({ timeout: Constants.ELEMENT_WAIT_TIME, reverse: true, timeoutMsg: `TRANSCURRIÓ ${Constants.ELEMENT_WAIT_TIME} ms CON ${descripcion?.toUpperCase()} VISIBLE` });
        if (isDisplay && descripcion !== undefined) {
            console.log(`${descripcion?.toUpperCase()} NO ES VISIBLE`);
        }
        expectChai(isDisplay).to.be.true;
    }

    /** Este método realiza el expect de si un webelement no esta habilitado
     * @param element WebdriverIO.Element del elemento a comprobar
     */
    public async expectDisableElement(element: WebdriverIO.Element) {
        console.log("ELEMENTO HABILITADO: " + await element.isEnabled());
        expectChai(await element.isEnabled()).to.be.false;
    }

    /** Este método realiza el expect de si un webelement esta habilitado
    * @param element WebdriverIO.Element del elemento a comprobar
    */
    public async expectEnableElement(element: WebdriverIO.Element) {
        console.log("ELEMENTO HABILITADO: " + await element.isEnabled());
        expectChai(await element.isEnabled()).to.be.true;
    }
}

export default new CustomAssertions();