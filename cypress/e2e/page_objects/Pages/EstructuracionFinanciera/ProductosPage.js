export default class ProductosPage {

    static abrirModalCrearProducto() {
        cy.get('a[title="Crear productos"]').click();
        return cy.get('#form0');
    }

    static completarCampo(selector, texto) {
        return cy.get(selector).clear().type(texto, {delay: 20});
    }

    static seleccionarOpcionSelect(dataIdSelect, opcion) {
        return cy.get(`select#${dataIdSelect}`).select(opcion, { force: true });
    }
}