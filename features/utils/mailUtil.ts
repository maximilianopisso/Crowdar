import BasePage from "../pages/basePage.js";
import easyYOPmail from 'easy-yopmail';
import { Constants } from "./constants.js";
import moment from 'moment';
import getHrefs from 'get-hrefs';

export class MailUtil extends BasePage {
    private URL = 'https://yopmail.com/es/';
    private idWindows = "";
    get inputCorreo() { return $("//input[@id='login']"); }
    get btnIr() { return $("//div[@id='refreshbut']//button[@class='md']"); }
    get btnRefresh() { return $("//button[@id='refresh']"); }
    get primerCorreo() { return $("//button[@class='lm']"); }
    get cuerpoMail() { return $("//div[@id='mail']"); }
    get linkCuerpoMail() { return ("SELECTOR"); }

    /** Obtiene una nueva direccion de mail de dominio @yopmail.com (sincronica)
     */
    public async obtenerDireccionYopMail(): Promise<string> {
        const fecha = moment().format("DDMMYY-hhmmss");
        return `QA-${fecha}@yopmail.com`;
    }

    /** Abre en nueva ventana la URL de yopmail.com
     */
    public async abrirYopMail(): Promise<void> {
        this.idWindows = await browser.newWindow(this.URL, { windowName: 'yopmail' })
    }

    /** Accede a la cuenta de correo electronico de yopmail que se pasa como parametro
     * @param   {string<void>} correo  el nombre del correo electronico no debe incluir el dominio. La url generara el dominio automaticamente. Por ejemplo: para correo 1, ingresa: correo1@yopmail.com
     */
    public async ingresarCorreo(correo: string): Promise<void> {
        await this.wdioSendKeys(await this.inputCorreo, correo);
        await this.wdioClick(await this.btnIr)
    }

    /** Selecciona el ultimo mail de la lista de mails
     */
    public async seleccionarUltimoMail(): Promise<void> {
        await this.btnRefresh;
        await browser.switchToParentFrame();
        await browser.switchToFrame(0);
        await this.wdioClick(await this.primerCorreo);
    }

    /** Devuelve el texto del cuerpo del mail seleccionado previamente en @seleccionarUltimoMail
     */
    public async obtenerCuerpoMail(): Promise<string> {
        await browser.switchToParentFrame();
        await browser.switchToFrame(2);
        return await this.wdioGetTextFromElement((await this.cuerpoMail));
    }

    /** Devuelve verdadero si un WebElement es visible dentro del cuerpo del mail seleccionado previamente en @seleccionarUltimoMail
     * @param element WebElement que para el cual se realiza la comprobacion.
     */
    public async comprobarWebElementCuerpoMail(element: WebdriverIO.Element): Promise<boolean> {
        await browser.switchToParentFrame();
        await browser.switchToFrame(2);
        if (await element.waitForDisplayed({ timeout: Constants.ELEMENT_WAIT_TIME, timeoutMsg: `EL ELEMENTO NO SE ENCONTRÓ EN EL TIEMPO ${Constants.ELEMENT_WAIT_TIME} ms` })) {
            console.log("SE ENCONTRO ELEMENTO EN CUERPO MAIL");
            return true
        } else {
            return false;
        }
    }

    /** Busca y devuelve el codigo en el cuerpo del mail seleccionado previamente en @seleccionarPrimerMail
       * Luego clickea sobre el boton VALIDAR AHORA para redireccionar a la nueva pestaña
       * @return  {<Promise><string>} el codigo ib multitoken que se encuentra en el cuerpo del mail
       */
    public async obtenerCodigoIbRL(): Promise<string> {
        await browser.switchToParentFrame()
        await browser.switchToFrame(2)
        //Al estar parado en un elemento se puede acceder a los elementos hijos con elem.$ o elem.$$
        //si es $$, entonces devuelve una lista, por eso se accede al elemento en el indice 1 que es el que contiene el codigo
        const codigo = await this.wdioGetTextFromElement((await this.cuerpoMail.$$('<b>'))[2]);
        await this.wdioClick(await (await this.cuerpoMail).$("/a[contains(@href, 'http')]"));
        return codigo;
    }

    //--------------------------------------------LIBRERIA easy-yopmail-----------------------------------//
    
    /** Crea una nueva casilla de email con dominio yopmail */
    public async createMail(): Promise<string> {
        console.log("ACCEDIENDO A EASY-YOPMAIL")
        const mail = await easyYOPmail.getMail();
        console.log("E-MAIL GENERADO: " + mail);
        return mail;
    }

    /** Lee correos de bandeja yopmail */
    public async readMail(mailname: string): Promise<object> {
        mailname = mailname.substring(0, mailname.indexOf("@"));// setea nombre del correo sin dominio(@yopmail)
        console.log("mail : " + mailname);
        const mail = await easyYOPmail.getInbox(mailname);  // obtiene info de la bandeja de entrada       
        const jsontext = JSON.stringify(mail.pages);
        console.log(jsontext);
        const obj = JSON.parse(jsontext.substring(1, jsontext.length - 1));
        console.log("ID : " + obj[0].id);
        const html = await easyYOPmail.readMessage(mailname, obj[0].id); // obtiene contenido del correo deseado a travez de el nombre del correo e ID del corrreo buscado
        console.log("HTML : " + html);
        return html;
    }

    /** Obtiene el nombre del asunto del correo */
    public async getSubjectMail(mailname: string): Promise<string> {
        mailname = mailname.substring(0, mailname.indexOf("@"));// setea nombre del correo sin dominio(@yopmail)
        console.log("mail : " + mailname);
        const mail = await easyYOPmail.getInbox(mailname);  // obtiene info de la bandeja de entrada       
        const jsontext = JSON.stringify(mail.pages);
        console.log(jsontext);
        const obj = JSON.parse(jsontext.substring(1, jsontext.length - 1));   //remuevo corchetes extra del contenido
        console.log("subject : " + obj[0].content);
        const subject = obj[0].content; // obtiene subject del correo deseado a travez de el nombre del correo          
        return subject;
    }

    /** Obtiene el nombre del remitente del correo */
    public async getRemitterMail(mailname: string): Promise<string> {
        mailname = mailname.substring(0, mailname.indexOf("@"));// setea nombre del correo sin dominio(@yopmail)
        console.log("mail : " + mailname);
        const mail = await easyYOPmail.getInbox(mailname);  // obtiene info de la bandeja de entrada       
        const jsontext = JSON.stringify(mail.pages);
        console.log(jsontext);
        const obj = JSON.parse(jsontext.substring(1, jsontext.length - 1));   //remuevo corchetes extra del contenido
        console.log("sender : " + obj[0].subject);
        const remitter = obj[0].subject; // obtiene el remitente del correo deseado a travez de el nombre del correo          
        return remitter;
    }

    /** Obtiene sobre la posicion indicada, el link dentro del cuerpo del correo */
    public async getLinks(html: object, index: number): Promise<string> {
        const arrayLinks: Array<object> = await getHrefs(html); // extrae todos los links dentro del html del correo
        let url = "";
        if (arrayLinks.length === 0) {
            console.log("NO SE ENCONTRARON LINKS");
        } else {
            url = String(arrayLinks[index])
            console.log(`Link solicitado (Nº pos:${index + 1}): ${url}`);
        }
        return url;
    }
}

export default new MailUtil();
