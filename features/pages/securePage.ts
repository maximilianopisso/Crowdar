import { ChainablePromiseElement } from 'webdriverio';
import BasePage from './basePage.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends BasePage {
    /**
     * define selectors using getter methods
     */
    public get flashAlert() {
        return $('#flash');
    }
}

export default new SecurePage();
