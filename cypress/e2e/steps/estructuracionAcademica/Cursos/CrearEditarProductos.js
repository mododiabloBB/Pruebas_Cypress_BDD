import CursosPage from "../../../page_objects/Pages/EstructuracionAcademica/CursosPage.js";
import DatosCursos from "../../../../fixtures/estructuracionAcademica/Cursos.json"
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

const { Base, Editar } = DatosCursos.curso;


When('El usuario hace clic en {word}', (Accion) => {
    Accion === "Crear" ?
        CursosPage.abrirModalCrearCurso().should('be.visible')
        :
        cy.get('@nombreProducto').then((NombreCurso) => {
            cy.buscarRegistroTabla(NombreCurso);
            cy.presionarAccionRegistroTabla(NombreCurso, 'Editar');
        });
});

When ('And El usuario completa los campos del modal para <word>', (Accion) => {
    
    if (Accion === "Crear") {
        CursosPage.completarCampo();
        CursosPage.completarCampo();
        CursosPage.seleccionarOpcionSelect();
        CursosPage.seleccionarOpcionSelect();
        CursosPage.seleccionarOpcionSelect();
        CursosPage.seleccionarOpcionSelect();
    }
});