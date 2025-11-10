import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
    e2e: {
        baseUrl: "https://site2.q10.com/",
        defaultCommandTimeout: 10000,
        specPattern: "**/*.feature",
        async setupNodeEvents(
            on: Cypress.PluginEvents,
            config: Cypress.PluginConfigOptions
        ): Promise<Cypress.PluginConfigOptions> {
            // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
            await addCucumberPreprocessorPlugin(on, config);

            on(
                "file:preprocessor",
                createBundler({
                    plugins: [createEsbuildPlugin(config)],
                })
            );

            // Make sure to return the config object as it might have been modified by the plugin.
            return config;
        },
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
    }
});