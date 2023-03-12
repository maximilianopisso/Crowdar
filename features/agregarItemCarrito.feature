Feature: Agregado de productos al carrito de compras
  Como usuario
  Quiero poder agregar productos al carrito de compras
  Para poder comprar los productos más tarde

  Background:
    Given el usuario se encuentra en la pantalla de login
    And se loguea ingresando usuario y password
      | username      | password     |
      | standard_user | secret_sauce |

  Scenario: Agregar un producto al carrito de compras
    When se agrega un producto al carrito de compras
    Then se visualiza que el número de productos en el carrito de compras es 1
    And el botón add to cart pasa a nombrarse Remove

  Scenario: Agregar más productos al carrito de compras, luego de continuar con el shopping.
    Given se agregan 2 productos al carrito de compras
    And presiona el icono del carrito de compras
    And lo redirige a la pantalla Your Cart
    When presiona boton para continuar compra
    And  se agregan 2 productos al carrito de compras
    Then se visualiza que el número de productos en el carrito de compras es 4
    And los 4 botones add to cart pasan a nombrarse Remove

  Scenario: Agregar un producto al carrito de compras (Falla)
    When se agrega un producto al carrito de compras
    Then se visualiza que el número de productos en el carrito de compras es 0