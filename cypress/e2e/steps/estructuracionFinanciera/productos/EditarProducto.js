import ProductosPage from "../../../page_objects/Pages/EstructuracionFinanciera/ProductosPage.js";
import ProductosApi from "../../../api/EstructuracionFinanciera/ProductosApi.js"
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('El usuario busca el producto creado {string}', (nombreProducto) => {
    cy.wrap(nombreProducto).as('nombreProducto');
    cy.buscarRegistroTabla(nombreProducto);
});

When('El usuario hace clic en la acción de editar producto', () => {
  cy.get('@nombreProducto').then((nombreProducto) => {
    cy.presionarAccionRegistroTabla(nombreProducto, 'Editar');
  });
});
When('El usuario cambia los datos del producto modificando los siguientes campos', (dataTable) => {
    const data = dataTable.rowsHash();
    // Se guardan los datos para usarlos en la validación posterior
    cy.wrap(data).as('datosProductoEditado');

    ProductosPage.completarCampo('#Producto_prod_nombre', data["Nombre"]).should('have.value', data["Nombre"]);
    ProductosPage.completarCampo('#Producto_prod_valor_neto_currencytxt', data["Valor"]).should('contain.value', data["Valor"]);
});

Then('El producto se edita exitosamente en la plataforma', () => {
    // IMPORTAR APIS PARA VALIDAR
    cy.get("@datosProductoEditado").then((data) => {
        ProductosApi.validarApiEditarProducto(data["Código"], data["Nombre"]);
    });
});