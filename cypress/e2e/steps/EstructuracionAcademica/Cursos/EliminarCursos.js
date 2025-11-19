import DatosCursos from "../../../../fixtures/EstructuracionAcademica/Cursos.json";
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

const { Editar } = DatosCursos.Curso;

When('El usuario busca el curso editado "Curso BDD - Editado"', () => {
    cy.buscarRegistroTabla(Editar.Nombre);
});

When('El usuario hace clic en la acción de {string} asignatura', (Accion) => {
    cy.presionarAccionRegistroTabla(Editar.Nombre, Accion);
});

Then('Then El usuario acepta la eliminación y se muestra una aletar de éxito "El registro fue eliminado exitosamente"', () => {
    cy.enviarFormularioModal();
}); 