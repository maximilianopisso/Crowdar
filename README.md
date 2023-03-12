# Challenge Automation

Run Test
-> npx wdio run wdio.conf.ts

Run Reportes
Los reportes generados automáticamente luego de una ejecución en formato json, son alojados en la carpeta local "allure-results" 

Al correr los siguientes comandos, se genera el reporte en allure report
1) npx allure generate allure-results --clean
2) npx allure open

Para poder ejecutarlos tuve que instalar el commandline de Allure Report
-> npm install -g allure-commandline --save-dev

También tuve que cambiar la política de Windows, para que me permita que corra scripts:
Para ello, en PowerShell en modo administrador:
-> Set-ExecutionPolicy RemoteSigned
