+ **NOTA:** Antes de revisar este proyecto, se debe estudiar y entender el primer proyecto https://github.com/mododiabloBB/Pruebas_Cypress.git.

# Documentación de uso BDD y Cypress

## I. ¿Que es BDD (Behavior Driven Development) y porque??

BDD es una **metodología de desarrollo** enfocada en **describir el comportamiento esperado del sistema** desde la perspectiva del **usuario o negocio, NO del código técnico**.

En vez de decir “voy a probar el botón de login”, dices “el usuario debería poder iniciar sesión exitosamente”.

### Cómo se ve en la práctica

BDD usa una sintaxis llamada Gherkin, que sigue el formato:

```gherkin
Feature: Inicio de sesión
  Como usuario registrado
  Quiero poder iniciar sesión en la plataforma
  Para acceder a mi cuenta

  Scenario: Inicio de sesión exitoso
    Given que el usuario está en la página de inicio de sesión
    When ingresa credenciales válidas
    Then debería ver el panel principal
```
Es decir:

+ **Given** → contexto inicial (estado del sistema)

+ **When** → acción del usuario

+ **Then** → resultado esperado

Algo SUPER importante, es que cuando tenemos muchas acciones para realizar, estas se concatenan con un "AND". Por ejemplo:

```gherkin
Scenario: Creación exitosa de un producto
    Given El usaurio ha iniciado sesion en el sistema correctamente  
    When El usuario navega a la página de productos
    And El usuario hace clic en "Crear productos"
    And El usuario completa el formulario de creación de producto con datos válidos
        | Código    | PRO-AUT        |
        | Nombre    | Producto BDD   |
        | Valor     | 100.000        |
    And El usuario envía el formulario
    Then El sistema muestra una aletar de éxito "El registro fue creados exitosamente"
```

## II. Encarpetado del proyecto.

La estructura de este proyecto es muy parecida al proyecto anterior, por ello solo le explicaran la cosas que cambian:

### Features (cypress / e2e / features)

Los features es donde escribimos nuestra estructura de Gherkin.

```gherkin
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
```

### Steps (cypress / e2e / steps)

Desde aquí es donde relacionamos nuestra estructura de Gherkin con el funcionamiento.

```javascript
When('El usuario hace clic en "Crear productos"', () => {
    ProductosPage.abrirModalCrearProducto().should('be.visible');
});
 
When('El usuario completa el formulario de creación de producto con datos válidos', (dataTable) => {
 
    const data = dataTable.rowsHash();
    // Se guardan los datos para usarlos en la validación posterior
    cy.wrap(data).as('datosProducto');
 
    ProductosPage.completarCampo('#Producto_prod_codigoP', data["Código"]).should('have.value', data["Código"]);
    ProductosPage.completarCampo('#Producto_prod_nombre', data["Nombre"]).should('have.value', data["Nombre"]);
    ProductosPage.completarCampo('#Producto_prod_valor_neto_currencytxt', data["Valor"]).should('contain.value', data["Valor"]);
    ProductosPage.seleccionarOpcionSelect('Producto_prod_imp_consecutivo', data["Impuesto"]).should('contain.text', data["Impuesto"]);
});
 
Then('El producto se crea exitosamente en la plataforma', () => {
    // IMPORTAR APIS PARA VALIDAR
    cy.get("@datosProducto").then((data) => {
        ProductosApi.validarApiCrearProducto(data["Código"], data["Nombre"], data["Impuesto"]);
    });
});  
```

Se debe tener en cuenta que la relación de estos debe ser por el texto de nuestro archivo "Feature", por lo que se deben tener alguna consideraciones:

+ **1.** Los pasos NO deben repetirse en nuestros steps, ya que, nuestro preprocesador no sabria cual paso tomar (para ello se deben centralizar pasos).

+ **2.** Los datos de estos se pueden tomar desde los features, ya que, desde aqui podemos crear strings, tablas etc. que pueden ser consumidas en nuestros steps.

+ **3.** Debemos importar en nuestros steps las acciones a realizar en este

```javascript
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
```

Nota: Las otras partes del funcionamiento estan descritas en el otro proyecto.