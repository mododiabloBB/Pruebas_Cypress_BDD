Feature: Crear Productos
    Como usuario del sistema
    Quiero crear productos financieros
    Para guardar y usar estos en procesos institucionales

    Scenario: Creación exitosa de un producto
        Given El usuario ha iniciado sesión en el sistema correctamente
        When El usuario navega a la página de productos
        And El usuario hace clic en "Crear productos"
        And El usuario completa el formulario de creación de producto con datos válidos
            | Código | PRO-AUT      |
            | Nombre | Producto BDD |
            | Valor  | 100.000      |
        And El usuario envía el formulario
        Then El sistema muestra una alerta de éxito "El registro fue creado exitosamente"