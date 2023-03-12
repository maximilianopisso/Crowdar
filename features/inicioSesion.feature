Feature: Iniciar sesión.
  Como usuario
  Quiero poder iniciar sesión en mi cuenta
  Para acceder a mi perfil y a las funciones protegidas de la aplicación

  Scenario: Iniciar sesión con credenciales válidas.
    Given el usuario se encuentra en la pantalla de login
    When se loguea ingresando usuario y password
      | username      | password     |
      | standard_user | secret_sauce |
    Then lo redirige a la pantalla Products

    Examples:
      | username | password             | message                        |
      | tomsmith | SuperSecretPassword! | You logged into a secure area! |

