export default class CursosApi {
    static obtenerTokenInstitucion() {
        const institucionKey = Cypress.env('institucionSesion');
        return Cypress.env('instituciones')[institucionKey].token;
    }

    static consumoApiCrearCursos() {
        return cy.request({
            method: 'GET',
            url: `https://site2.q10.com/api/cursos??Limit=100&api-version=1.0`,
            headers: {
                Authorization: `Bearer ${this.obtenerTokenInstitucion()}`,
                Cookie: '.ASPXANONYMOUS=5eGHGdxzyjC1AQ1WQ-t82M_R3wU9XDIvPTt_O5kf4JLmiLXOFQq0vE8xy8OsL9gwEYg0djfB_PbBCDJfIhghWCez1wRQyiiO7hKeluehujraIUysdrOrDacD-_tJg93p7P8-Yg2; ARRAffinity=8b7fb4bc0827dd2af94d0522e4698f8bf220b1323250a660bfdb66609b24da2a; .ASPXANONYMOUS=2AE0eHxMml8u3tUlTNhzkgl0p6GHKX_RjhaP2Qlppe7WCiui_cgoRtFfaAcKBSAZrcyNDNSci3licphIQoNZoxhGm98gd4v1K01LN6BzJLk2umKNQUqrVfdoK5pLlyU7myoUTQ2'
            }
        }).then((res) => res);
    }

    static obtenerCurso(listaCursos, { codigo, nombre, asignatura }) {
        return listaCursos.find(item =>
            item.Codigo === codigo &&
            (nombre ? item.Nombre === nombre : true) &&
            (asignatura ? item.Nombre_asignatura === asignatura : true)
        );
    }

    static validarApiCrearCursos(codigo, nombre, asignatura) {
        this.consumoApiCrearCursos().then(({ status, body }) => {

            expect(status).to.eq(200);

            const curso = this.obtenerCurso(body, { codigo, nombre, asignatura });
            expect(curso, 'El curso no fue encontrado').to.not.be.undefined;

            expect(curso.Codigo).to.eq(codigo);
            expect(curso.Nombre).to.eq(nombre);
            expect(curso.Nombre_asignatura).to.eq(asignatura);
        });
    }

    static validarApiEditarCursos(codigo, nombre) {
        this.consumoApiCrearCursos().then(({ status, body }) => {

            expect(status).to.eq(200);

            const curso = this.obtenerCurso(body, { codigo, nombre });
            expect(curso, 'El curso editado no fue encontrado').to.not.be.undefined;

            expect(curso.Codigo).to.eq(codigo);
            expect(curso.Nombre).to.eq(nombre);
        });
    }
}