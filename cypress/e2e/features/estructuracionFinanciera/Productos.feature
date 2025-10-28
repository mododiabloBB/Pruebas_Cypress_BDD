Feature: Crear Productos
    Como usuario del sitema
    Quiero crear productos financieros 
    Para guardar y usar estos en procesos institucionales

Scenario: Creación exitosa de un producto
    Given El usaurio ha iniciado sesion en el sistema
    When El usuario navega a la sección de productos financieros
    And El usuario hace clic en "Crear productos"
    And El usuario completa el formulario de creación de producto con datos válidos
        | Código    | PRO-AUT        |
        | Nombre    | Producto BDD   |
        | Valor     | 100.000        |
    And El usuario envía el formulario
    Then El sistema muestra una aletar de éxito "El registro fue creados exitosamente"