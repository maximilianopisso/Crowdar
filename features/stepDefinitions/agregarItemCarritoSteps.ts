import { Given, When, Then, DataTable } from '@wdio/cucumber-framework';
import ProductsPage from '../pages/productsPage.js';
import CustomAssertions from '../utils/customAssertions.js';

When(/^se agrega un producto al carrito de compras$/, async () => {
    await ProductsPage.addItemCart(await ProductsPage.btnAddToCart);
});

When(/^se agregan (.*) productos al carrito de compras$/, async (cantidad: number) => {
    const arrayAddCartBtns = await ProductsPage._btnsAddToCart;
    for (let index = 0; index < cantidad; index++) {
        await ProductsPage.addItemCart(await arrayAddCartBtns[index]);
    }
});

When(/^presiona el icono del carrito de compras$/, async () => {
    await ProductsPage.clickBtnIconCart();
});

When(/^presiona boton para continuar compra$/, async () => {
    await ProductsPage.clickBtnContinueShopping();
});

Then(/^se visualiza que el número de productos en el carrito de compras es (.*)$/, async (incremento: string) => {
    await CustomAssertions.expectElementDisplayed(await ProductsPage.cantItemsCarrito);
    await CustomAssertions.expectEqualText(await ProductsPage.cantItemsCarrito, incremento);
});

Then(/^el botón add to cart pasa a nombrarse (.*)$/, async (nombreBtn: string) => {
    await CustomAssertions.expectEqualText(await ProductsPage.btnRemoveCart, nombreBtn);
});

Then(/^los (.*) botones add to cart pasan a nombrarse (.*)$/, async (cantidad: number, nombreBtn: string) => {
    const arrayRemoveBtns = await ProductsPage._btnsRemove;
    for (let index = 0; index < cantidad; index++) {
        await CustomAssertions.expectEqualText(await arrayRemoveBtns[index], nombreBtn);
    }
    await CustomAssertions.expectEqualText(await ProductsPage.btnRemoveCart, nombreBtn);
});