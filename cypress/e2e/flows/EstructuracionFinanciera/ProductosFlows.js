import ProductosPage from '../../pageObject/Pages/EstructuracionFinanciera/ProductosPage.js';
import ProductosApi from '../../api/EstructuracionFinanciera/ProductosApi.js';

export default class ProductosFlows {

    static crearProducto(codigo, nombre, valor, impuesto) {
        ProductosPage.inicio();
        ProductosPage.abrirModalCrearProducto().should('be.visible');

        ProductosPage.completarCampo('#Producto_prod_codigoP', codigo).should('have.value', codigo);
        ProductosPage.completarCampo('#Producto_prod_nombre', nombre).should('have.value', nombre);
        ProductosPage.completarCampo('#Producto_prod_valor_neto_currencytxt', valor).should('contain.value', valor);
        ProductosPage.seleccionarOpcionSelect('Producto_prod_imp_consecutivo', impuesto).should('contain.text', impuesto);

        cy.enviarFormularioModal();

        // Validación por medio de API
        ProductosApi.validarApiCrearProducto(codigo, nombre, impuesto);
    }

    static editarProducto(codigo, nombre, valor, impuesto) {
        ProductosPage.inicio();
        cy.buscarRegistroTabla(codigo);
        cy.presionarAccionRegistroTabla(codigo, "Editar");

        ProductosPage.completarCampo('#Producto_prod_nombre', nombre).should('have.value', nombre);
        ProductosPage.completarCampo('#Producto_prod_valor_neto_currencytxt', valor).should('contain.value', valor);
        ProductosPage.seleccionarOpcionSelect('Producto_prod_imp_consecutivo', impuesto).should('contain.text', impuesto);

        cy.enviarFormularioModal();

        // Validación por medio de API
        ProductosApi.validarApiEditarProducto(codigo, nombre, impuesto);
    }

    static eliminarProducto(nombre) {
        ProductosPage.inicio();
        cy.buscarRegistroTabla(nombre);
        cy.presionarAccionRegistroTabla(nombre, "Eliminar");
        cy.enviarFormularioModal();
    }
}