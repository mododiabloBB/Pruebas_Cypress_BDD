export default class CursosPage {

    static abrirModalCrearCurso() {
        cy.get('a[title="Crear cursos"]').click();
        return cy.get('#form0');
    }

    static completarCampo(selector, texto) {
        return cy.get(selector).clear().type(texto, { delay: 20 });
    }

    static seleccionarOpcionSelect(dataIdSelect, opcion) {
        return cy.get(`select#${dataIdSelect}`).select(opcion, { force: true });
    }
}