import { ChainablePromiseElement } from 'webdriverio';
import BasePage from './basePage.js';




/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends BasePage {
    get title() { return $("//span[@class='title']"); }
    get carritoIcon{ return $("//a[@class='shopping_cart_link']"); }
    get carritoAcum{ return $("//a[@class='shopping_cart_link']//span"); }
    get arrayAddToCart{ return $$("//button[contains(text(), 'Add to cart')]"); }
    get btnInventory{ return $$("//button[contains(@class, 'btn_inventory')]"); }


    public get flashAlert() {
        return $('#flash');
    }
}

export default new SecurePage();
