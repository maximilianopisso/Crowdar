# Challenge Automation
### Instalacion
1. Descargar proyecto del repositorio
2. Instalar Node -> ejecutando el comando npm install

### Run Test
- npx wdio run wdio.conf.ts

### Ejecutar 2 navegadores
- Sobre el archivo de configuracion del framework, sobre la seccion *capabilities* descomentar las lineas que habilitan la ejecucion de pruebas con Firefox:

 capabilities: [
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        {
            maxInstances: 1,
            browserName: 'chrome',
            acceptInsecureCerts: true
        },
        //Habilitar para ejecutar en firefox
        // {
        //     maxInstances: 1,
        //     browserName: 'firefox',
        //     acceptInsecureCerts: true
        // },

### Reportes
Los reportes son generados por Allure Report automáticamente luego de una ejecución en formato json.
Los reportes son alojados en la carpeta local *allure-results*

### Run Reportes
Para visualizar los reportes de Allure Report, se deben ejecutar los siguientes comandos:
1. npx allure generate allure-results --clean
2. npx allure open

*Para poder ejecutarlos tuve que instalar el commandline de Allure Report*
npm install -g allure-commandline --save-dev
*También tuve que cambiar la política de Windows, para que me permita que corra scripts*
Para ello, en PowerShell en modo administrador:
- Set-ExecutionPolicy RemoteSigned
