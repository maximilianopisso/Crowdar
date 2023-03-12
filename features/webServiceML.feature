Feature: Interactuar con el servicio web de Mercado Libre
  Como automatizador
  Quiero poder interactuar con los web services de mercado libre
  Para obtener informacion acerca de sus departamentos

  Scenario Outline: Interactuar con el servicio web de Mercado Libre y verificar que contenga departamentos
    Given que accede al servicio web de Mercado Libre de departamentos
    When consulto web service
    Then comprueba si departamento <departamento> se encuentra contenido
    Examples:
      | departamento |
      | Tecnología   |
      | Hogar        |