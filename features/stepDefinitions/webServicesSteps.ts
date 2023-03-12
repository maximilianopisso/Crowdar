import { Given, Then, When } from "@wdio/cucumber-framework";
import CustomAssertions from "../utils/customAssertions.js";
import WebServices from "../utils/webService.js";

const dominios = {
    "Mercado Libre": "https://www.mercadolibre.com.ar/",
}
let urlWS: string;
let response: any;

Given(/^que accede al servicio web de (.*) de (.*)$/, async (dominio: string, path: string) => {
    switch (path) {
        case "departamentos":
            urlWS = dominios[dominio] + "menu/departments"
            break;
        default:
            throw new Error("NO SE RECONOCE PATH: " + path);
    }
    console.log("Url Web Service ML: " + urlWS);
});

When(/^consulto web service$/, async () => {
    response = await WebServices.getMethod(urlWS);
});

When(/^comprueba si departamento (.*) se encuentra contenido$/, async (departamento: string) => {
    const departments = response.data.departments[0];
    const categories = departments.categories;
    const landings = response.data.landings;
    console.log("**** INFORMACION SOBRE LOS DEPARTAMENTOS DEL WEB SERVICE DE MERCADO LIBRE ****");
    console.log("> DEPARTAMENTO ");
    console.log("* " + departments.name + "\n");
    console.log("> CATEGORIAS");
    categories.forEach(element => {
        console.log("* " + element.name);
    });
    console.log("\n" + "> LANDINGS");
    landings.forEach(element => {
        console.log("* " + element.label);
    });
    console.log("**** FIN ****");
    CustomAssertions.expectEqualText(departments.name, departamento);
});