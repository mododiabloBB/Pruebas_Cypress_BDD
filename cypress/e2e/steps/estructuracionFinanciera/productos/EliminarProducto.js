import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('El usuario busca el producto editado {string}', (nombreProducto) => {
    cy.wrap(nombreProducto).as('nombreProducto');
    cy.buscarRegistroTabla(nombreProducto);
});

When('El usuario hace clic en la acción de eliminar producto', () => {
    cy.get('@nombreProducto').then((nombreProducto) => {
        cy.presionarAccionRegistroTabla(nombreProducto, 'Eliminar');
    });
});

Then('El usuario acepta la eliminación y se muestra una aletar de éxito "El registro fue eliminado exitosamente"', () => {
    cy.enviarFormularioModal();
});