const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://criatoriojzs.vercel.app", // <-- Seu link da Vercel configurado!
    specPattern: "cypress/e2e/features/*.feature",
    supportFile: false,
    async setupNodeEvents(on, config) {
      // 1. Invoca o plugin com o NOME CORRETO
      await addCucumberPreprocessorPlugin(on, config);

      // 2. Configura o leitor dos passos
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // 3. Retorno obrigatório das configurações
      return config;
    },
  },
});