@login
Feature: Autenticación de usuarios en SauceDemo
  Como usuario de SauceDemo
  Quiero poder iniciar sesión
  Para acceder al inventario de productos

  @smoke @happy_path @severity:blocker
  Scenario: Login exitoso con usuario estándar
    Given que estoy en la página de inicio de sesión de SauceDemo
    When ingreso mis credenciales con el usuario "standard_user"
    Then debo ser redirigido a la página de inventario

  @regression @negative @severity:minor
  Scenario: Login fallido con usuario bloqueado
    Given que estoy en la página de inicio de sesión de SauceDemo
    When ingreso mis credenciales con el usuario "locked_out_user"
    Then debo ver un mensaje de error "Epic sadface: Sorry, this user has been locked out. DEMO test fallido"

  @regression @negative @data_driven @severity:minor
  Scenario Outline: Inicios de sesión fallidos con múltiples validaciones
    Given que estoy en la página de inicio de sesión de SauceDemo
    When ingreso mis credenciales con el usuario "<usuario>"
    Then debo ver un mensaje de error "<mensaje_esperado>"

    Examples:
      | usuario          | mensaje_esperado                                                          |
      | locked_out_user  | Epic sadface: Sorry, this user has been locked out.                       |
      | usuario_falso    | Epic sadface: Username and password do not match any user in this service |
      | usuario_sin_pass | Epic sadface: Password is required                                        |
