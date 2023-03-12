import { ChainablePromiseElement } from 'webdriverio';
import BasePage from './basePage.js';




/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductsPage extends BasePage {
    get title() { return $("//span[@class='title']"); }
    get carritoIcon() { return $("//a[@class='shopping_cart_link']"); }
    get cantItemsCarrito() { return $("//span[@class='shopping_cart_badge']"); }
    get btnContinueShop() { return $("//button[@id='continue-shopping']"); }
    get btnCheckout() { return $("//button[@id='checkout']"); }
    get btnAddToCart() { return $("//button[@id='add-to-cart-sauce-labs-backpack']"); }
    get btnRemoveCart() { return $("//button[@id='remove-sauce-labs-backpack']"); }
    get _btnsAddToCart() { return $$("//button[contains(text(), 'Add to cart')]"); }
    get _btnsRemove() { return $$("//button[contains(text(), 'Remove')]"); }

    public async addItemCart(element: WebdriverIO.Element) {
        await this.wdioClick(await element);
    }

    public async clickBtnIconCart() {
        await this.wdioClick(await this.carritoIcon);
    }

    public async clickBtnContinueShopping() {
        await this.wdioClick(await this.btnContinueShop);
    }

}

export default new ProductsPage();
