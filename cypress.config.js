const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
    e2e: {
        baseUrl: "https://site2.q10.com",
        specPattern: "cypress/e2e/features/**/*.feature", // Con esto especificamos que los archivos "Test" a usar son los .feature que se encuentren en la ruta. Esto se debe hacer ya que por defecto los cypress busca archivos .cy.js o .spec.js
        async setupNodeEvents(on, config) {
            // 1) Inicializar plugin de Cucumber — debe ir antes del preprocessor
            await addCucumberPreprocessorPlugin(on, config);
            // 2) Registrar esbuild como preprocessor con el plugin de cucumber
            on("file:preprocessor", createBundler({
                plugins: [createEsbuildPlugin(config)],
            }));
            return config;
        },
        env: {
            instituciones: {
                ordenesPago: {
                    nombre: "Ordenes pago",
                    aplentId: "bcc94d05-976b-43fd-a0dd-db2fbee2f2c8",
                    modeloAcademico: 2,
                    modeloFinanciero: 2,
                    token: 'RJS3ZJjdk8b_8EWkCNQqvVJspPymNnlRByYTNTwhM19ArmmhyltTC6lcTrIdo0IeC7FevLpQTPt492xhOTBu7mxc0rG1AMhgJ99cLdzTPPiBNvBcL7xm4ZbMN6ABNMqUg62rN-3dbsnM3HjHWTPwkxu9u7aZgMMlRRxscZ3fEPlppzgvhZsuPICcWNOlWduAFSEZYyX2BSrtkdkzMcsyNPPkPLpl7Uk_f6uUwGS30IuuV3pB1cpn2tq7AxCP_FzzGk9Cb3bOMAlG4s_t6m4PKvdOXcwTaW3QuOvk94G2I_VFFTcKl4_3v5V3bbLarjCvk4T0PsqbXFNiqZCElV-eMAWo-MRDB-zY_nRM41ha4UiMKcU3dIKIIigkvnF6Px3jHbJHkIUUPri4aZ8hCP2ZeIPd5LxLdDBaE1zp3axPbgQrVQLyviCcJ4lTqhJPdh5BfXGLlvdFEQ3oztXL72juiBwY8nI',
                    usuarios: [
                        {
                            usuario: "automatizacion@yopmail.com",
                            contrasenia: "0000",
                            rol: 0
                        },
                        {
                            usuario: "estudiante_automatizacion",
                            contrasenia: "estudiante_automatizacion",
                            rol: 1
                        }
                    ]
                }
            }
        },
    },
});
