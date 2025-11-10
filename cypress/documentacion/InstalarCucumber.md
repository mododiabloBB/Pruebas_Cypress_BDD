+ **NOTA:** Antes de revisar este proyecto, se debe estudiar y entender el primer proyecto https://github.com/mododiabloBB/Pruebas_Cypress.git.

# Instalar cucumber

Para instalar cucumber, primero debemos ingresar al repositorio actualizado (actualmente - quien sabe en un futuro jajaj) de este: https://github.com/badeball/cypress-cucumber-preprocessor?tab=readme-ov-file.

Desde este podemos ver el poceso general de instalación de este.

### Explicación de instalación

Desde nuestra terminar debemos ejecutar el instalador npm

```bash
npm install --save-dev @badeball/cypress-cucumber-preprocessor
```
Esta debendencia debe mostrarse en nuestro archivo "package.json":

```json
  "devDependencies": {
    "@badeball/cypress-cucumber-preprocessor": "^23.2.1",
    "cypress": "^15.5.0"
  }
```

Una vez instalada el procesador de cucumber, debemos cambiar la extensión de nuestro archivos "cypress.config.js" de a "ts", dejando el archivo como "cypress.config.**ts**".

Luego, debemos remplazar el archivo de nuextro config por el siguiente:

```typescript
import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
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
});
```

Normalmente, al cambiar nuestro config, se muestra un error en la importación del "esbuild", esto es debido a que no hemos instalado la dependencia de este. Por lo que se debe realizar esta instalación desde nuestra terminar:

```bash
npm install --save-dev @bahmutov/cypress-esbuild-preprocessor
```
Esta debendencia debe mostrarse en nuestro archivo "package.json":

```json
  "devDependencies": {
    "@badeball/cypress-cucumber-preprocessor": "^23.2.1",
    "@bahmutov/cypress-esbuild-preprocessor": "^2.2.7",
    "cypress": "^15.5.0"
  }
```

---

**Nota #1:** Con esto nuestro cypress debería quedar configurado de manera correcta, pero, puede que se muestre un error con el cambio de config de "js" a "ts", para ello debemos debemos instalar el "loader-js" desde nuestra terminar **(ESTO SOLO SI NUESTRO CYPRESS PRESENTA DICHO ERROR)**.

```bash
npm install --save-dev @bahmutov/cypress-esbuild-preprocessor
```
---

**Nota #2:** En nuestro config tambien puede haber error con el "esbuild", por la versión de este, para la solución de este se debe investigar en caso de que pase, esto se debe hacer directamente en los repositorios de este (https://github.com/badeball/cypress-cucumber-preprocessor?tab=readme-ov-file), ya que las actualizaciones se lanzan aquí, adicional, se deja link de las preguntas frecuentes de este: https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/faq.md#i-get-cypress_esbuild_preprocessor_1createbundler-is-not-a-function.