// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (institucionKey, tipoUsuario) => {
    cy.fixture('Login/instituciones').then((instituciones) => {
        const institucion = instituciones[institucionKey];
        const { aplentId, usuarios } = institucion;
        const { usuario, contrasenia } = usuarios.find(u => u.rol === tipoUsuario);
        const loginUrl = `login?ReturnUrl=%2F&aplentId=${aplentId}`;

        cy.session(`sesion ${institucionKey} - usuario ${tipoUsuario}`, () => {
            cy.visit(loginUrl)
            cy.get('#NombreUsuario').clear().type(usuario);
            cy.get('#Contrasena').clear().type(contrasenia);
            cy.intercept('GET', 'https://site2.q10.com/').as('InicioSesion');
            cy.get('#submit-btn').click();
            cy.wait('@InicioSesion');
        }, {
            validate: () => {
                cy.getCookie('.AspNet.ApplicationCookie').should('exist');
            }
        })
        Cypress.env('institucionSesion', institucionKey)
    })
})

Cypress.Commands.add('loginGlobalUser', (institucionKey, tipoUsuario) => {
    const institucion = Cypress.env('instituciones')[institucionKey];
    const { aplentId, usuarios } = institucion;
    const { usuario, contrasenia } = usuarios.find(u => u.rol === tipoUsuario);
    const loginUrl = `login?ReturnUrl=%2F&aplentId=${aplentId}`;
    
    cy.session(`sesion ${institucionKey} - usuario ${tipoUsuario}`, () => {
        cy.visit(loginUrl)
        cy.get('#NombreUsuario').clear().type(usuario, {delay: 50});
        cy.get('#Contrasena').clear().type(contrasenia, {delay: 50});
        cy.intercept('GET', 'https://site2.q10.com/').as('InicioSesion');
        cy.get('#submit-btn').click();
        cy.wait('@InicioSesion');
    }, {
        validate: () => {
            cy.getCookie('.AspNet.ApplicationCookie').should('exist');
        }
    })
    Cypress.env('institucionSesion', institucionKey)
})

Cypress.Commands.add('enviarFormularioModal', () => {
    cy.get('.modal-footer [type="submit"]').parents('form').then($form => {
        const url = $form.attr('action');
        const metodo = ($form.attr('method') || 'GET').toUpperCase();

        if (url) {
            cy.intercept(metodo, url).as('peticionInterceptada');
        }

        cy.get('.modal-footer [type="submit"]').click();

        if (url) {
            cy.wait('@peticionInterceptada');
            cy.get('.alert-success').should('be.visible')
        }

        if (metodo == 'POST') {
            // Esto con el fin de que en un futuro si se requiere obtener el consecutivo de algo creado se pueda hacer al momento de enviar el formulario : PENDIENTE VALIDAR
        }
    });
})

Cypress.Commands.add('buscarRegistroTabla', (texto) => {
    cy.get('#texto').clear().type(texto, { delay: 20 });
    cy.get("#filters_form input#texto")
        .siblings("span", { log: false })
        .get('button[type="submit"]', { log: false })
        .click();

    cy.get('#mainPanel > .form-loading > div').should('not.be.visible')

    cy.get("table tbody tr").first().should('contain', texto);
})

Cypress.Commands.add('presionarAccionRegistroTabla', (registro, textoOpcion) => {
    cy.get("table.table tbody tr").as('registros');
    cy.get('@registros').should('contain', registro)

    cy.get('@registros')
        .contains(registro)
        .closest("tr")
        .find(`td.actions a[data-original-title="${textoOpcion}"]`)
        .click({ force: true });

    if (textoOpcion == 'Detalle') cy.get('#itemDetails').should('be.visible');
})