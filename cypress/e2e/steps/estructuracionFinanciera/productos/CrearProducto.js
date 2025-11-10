import ProductosPage from "../../../page_objects/Pages/EstructuracionFinanciera/ProductosPage.js";
import ProductosApi from "../../../api/EstructuracionFinanciera/ProductosApi.js"
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
 
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