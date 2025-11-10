Feature: Gestión de productos
    Como usuario del sistema
    Quiero crear productos financieros
    Para guardar y usar estos en procesos institucionales

    Background:
        Given El usuario ha iniciado sesión en el sistema correctamente
        When El usuario navega a la página de "Productos" financieros

    Scenario: Creación exitosa de un producto
        And El usuario hace clic en "Crear productos"
        And El usuario completa el formulario de creación de producto con datos válidos
            | Código   | PRO-AUT      |
            | Nombre   | Producto BDD |
            | Valor    | 100.000      |
            | Impuesto | IVA          |
        And El usuario envía el formulario y se muestra una aletar de éxito "El registro fue creados exitosamente"
        Then El producto se crea exitosamente en la plataforma


    Scenario: Edición exitosa de un producto
        And El usuario busca el producto creado "Producto BDD"
        And El usuario hace clic en la acción de editar producto
        And El usuario cambia los datos del producto modificando los siguientes campos
            | Código   | PRO-AUT      |
            | Nombre | Producto BDD - Editado |
            | Valor  | 12.500                 |
        And El usuario envía el formulario y se muestra una aletar de éxito "El registro fue creados exitosamente"
        Then El producto se edita exitosamente en la plataforma

    Scenario: Eliminación exitosa de un producto
        And El usuario busca el producto editado "Producto BDD - Editado"
        And El usuario hace clic en la acción de eliminar producto
        Then El usuario acepta la eliminación y se muestra una aletar de éxito "El registro fue eliminado exitosamente"