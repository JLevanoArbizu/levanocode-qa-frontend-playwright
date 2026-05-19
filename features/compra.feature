@e2e @compra
Feature: Flujo de compra End-to-End
  Como cliente autenticado
  Quiero agregar productos al carrito y completar la compra
  Para adquirir los productos deseados

  @regression
  Scenario: Flujo E2E - Agregar producto y completar compra
    Given que estoy en la página de inicio de sesión de SauceDemo
    And inicio sesión exitosamente con "standard_user"
    When agrego un producto al carrito desde el inventario
    And navego al carrito de compras
    Then el producto seleccionado debe estar en el carrito
    When procedo al checkout
    And ingreso mis datos de envío
    And confirmo la compra
    Then debo ver la pantalla de confirmación de orden exitosa
