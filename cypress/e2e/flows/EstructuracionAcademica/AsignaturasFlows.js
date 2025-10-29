import AsignaturasPage from "../../pageObject/Pages/EstructuracionAcademica/AsignaturasPage";
import AsignaturasApi from "../../api/EstructuracionAcademica/AsignaturasApi.js";

export default class AsignaturasFlows {

    static crearAsignatura(codigo, nombre, abreviacion) {
        AsignaturasPage.inicio();
        AsignaturasPage.abrirModalCrearAsignatura().should('be.visible');
        
        AsignaturasPage.completarCampo('#Asignatura_asi_codigoP', codigo).should('have.value', codigo);
        AsignaturasPage.completarCampo('#Asignatura_asi_nombre', nombre).should('have.value', nombre);
        AsignaturasPage.completarCampo('#Asignatura_asi_abreviacion', abreviacion).should('have.value', abreviacion);

        cy.enviarFormularioModal();
        
        // Validar mediante API
        AsignaturasApi.validarApiCrearAsignatura(codigo, nombre, abreviacion);
    }

    static editarAsignatura(codigo, nombre, abreviacion) {
        AsignaturasPage.inicio();
        cy.buscarRegistroTabla(codigo);
        cy.presionarAccionRegistroTabla(codigo, "Editar");

        AsignaturasPage.completarCampo('#Asignatura_asi_nombre', nombre).should('have.value', nombre);
        AsignaturasPage.completarCampo('#Asignatura_asi_abreviacion', abreviacion).should('have.value', abreviacion);

        cy.enviarFormularioModal();

        // Validar mediante API
        AsignaturasApi.validarApiEditarAsignatura(codigo,nombre, abreviacion);
    }

    static eliminarAsignatura(nombre) {
        AsignaturasPage.inicio();
        cy.buscarRegistroTabla(nombre);
        cy.presionarAccionRegistroTabla(nombre, "Eliminar");
        cy.enviarFormularioModal();
    }
}