import { When } from "@badeball/cypress-cucumber-preprocessor";

When('El usuario navega a la página de {string} financieros', (url) => {
  cy.visit(`/${url}`);
});

When('El usuario envía el formulario y se muestra una aletar de éxito "El registro fue creados exitosamente"', () => {
    cy.enviarFormularioModal();
});