import CursosPage from "../../../page_objects/Pages/EstructuracionAcademica/CursosPage.js";
import CursosApi from "../../../api/EstructuracionAcademica/CursosApis.js"
import DatosCursos from "../../../../fixtures/EstructuracionAcademica/Cursos.json"
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

const { Base, Editar } = DatosCursos.Curso;

When('El usuario hace clic en {word}', (Accion) => {
    if (Accion === "Crear") {
        CursosPage.abrirModalCrearCurso().should('be.visible')
    } else {
            cy.buscarRegistroTabla(Base.Nombre);
            cy.presionarAccionRegistroTabla(Base.Nombre, Accion);
    }
});

When('El usuario completa los campos del modal para {word}', (Accion) => {
    if (Accion === "Crear") {
        CursosPage.completarCampo('#Grupo_plaaca_codigo', Base.Codigo).should('have.value', Base.Codigo);
        CursosPage.completarCampo('#Grupo_plaaca_nombre', Base.Nombre).should('have.value', Base.Nombre);
        CursosPage.seleccionarOpcionSelect('Grupo_sedjor_consecutivoP', Base.SedeJornada).should('contain.text', Base.SedeJornada);
        CursosPage.seleccionarOpcionSelect('Grupo_plaaca_sedjorprogra_consecutivo', Base.Programa).should('contain.text', Base.Programa);
        CursosPage.seleccionarOpcionSelect('Grupo_plaaca_propen_consecutivo', Base.Pensum).should('contain.text', Base.Pensum);
        CursosPage.seleccionarOpcionSelect('Grupo_plaaca_asi_codigo', Base.Asignatura).should('contain.text', Base.Asignatura);
        CursosPage.seleccionarOpcionSelect('Grupo_plaaca_per_consecutivo', Base.Periodo).should('contain.text', Base.Periodo);
        cy.wrap(Base.Nombre).as('nombreProducto');
        cy.get('#Grupo_plaaca_fecha_fin').should('not.have.value', '');
    } else {
        CursosPage.completarCampo('#Grupo_plaaca_codigo', Editar.Codigo).should('have.value', Editar.Codigo);
        CursosPage.completarCampo('#Grupo_plaaca_nombre', Editar.Nombre).should('have.value', Editar.Nombre);
    }
});

When('El usuario envía el formulario y se muestra una aletar exitosa por la modificación', () => {
    cy.enviarFormularioModal();
});

Then('La {word} ejecutada se guardar de forma correcta en la plataforma', (Accion) => {
    if (Accion === "Crear") {
        CursosApi.validarApiCrearCursos(Base.Codigo, Base.Nombre, Base.Asignatura);
    } else {
        CursosApi.validarApiEditarCursos(Editar.Codigo, Editar.Nombre);
    }
});