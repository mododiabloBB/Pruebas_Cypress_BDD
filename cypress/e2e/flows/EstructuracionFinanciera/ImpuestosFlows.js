import ImpuestosPage from '../../pageObject/Pages/EstructuracionFinanciera/ImpuestosPage.js';
import ImpuestosApi from '../../api/EstructuracionFinanciera/ImpuestosApi.js';

export default class ImpuestosFlows {

    static crearImpuesto(tipo, nombre, porcentaje) {
        ImpuestosPage.inicio();
        ImpuestosPage.abrirModalAgregarImpuesto().should('be.visible');

        ImpuestosPage.seleccionarOpcionSelect('Impuesto_imp_tipimp_codigo', tipo).should('contain.text', tipo);
        ImpuestosPage.completarCampo('#Impuesto_imp_nombre', nombre).should('have.value', nombre);
        ImpuestosPage.completarCampo('#Impuesto_imp_porcentaje', porcentaje).should('have.value', porcentaje);

        cy.enviarFormularioModal();

        // Validación por medio de API
        ImpuestosApi.validarApiImpuesto('Activo', nombre, porcentaje, tipo);

    }

    static editarImpuesto(nombre, nombreEditado, porcentaje) {
        ImpuestosPage.inicio();
        cy.buscarRegistroTabla(nombre);
        cy.presionarAccionRegistroTabla(nombre, "Editar");

        ImpuestosPage.completarCampo('#Impuesto_imp_nombre', nombreEditado).should('have.value', nombreEditado);
        ImpuestosPage.completarCampo('#Impuesto_imp_porcentaje', porcentaje).should('have.value', porcentaje);

        cy.enviarFormularioModal();

        // Validación por medio de API
        ImpuestosApi.validarApiImpuesto('Activo', nombreEditado, porcentaje);
    }

    static eliminarImpuesto(nombre) {
        ImpuestosPage.inicio();
        cy.buscarRegistroTabla(nombre);
        cy.presionarAccionRegistroTabla(nombre, "Eliminar");
        cy.enviarFormularioModal();
    }
}