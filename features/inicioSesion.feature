Feature: Iniciar sesión.
  Como usuario
  Quiero poder iniciar sesión en mi cuenta
  Para acceder a mi perfil y a las funciones protegidas de la aplicación

  Scenario: Iniciar sesión con credenciales válidas.
    Given el usuario se encuentra en la pantalla de login
    When se loguea ingresando usuario y password
      | username      | password     |
      | standard_user | secret_sauce |

    Then lo redirige a la pantalla "Products"

  Scenario: Iniciar sesión con credenciales incorrectas.
    Given el usuario se encuentra en la pantalla de login
    When se loguea ingresando usuario y password
      | username      | password |
      | standard_user | secret   |

    Then visualiza un mensaje de error que indica que las credenciales son incorrectas

  Scenario: Iniciar sesión con credenciales para un usuario bloqueado.
    Given el usuario se encuentra en la pantalla de login
    When se loguea ingresando usuario y password
      | username        | password     |
      | locked_out_user | secret_sauce |

    Then visualiza un mensaje de error que indica que el usuario se encuentra bloqueado