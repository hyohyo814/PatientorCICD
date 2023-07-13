import { defineConfig } from "cypress";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default defineConfig({
  e2e: {
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
    supportFile: false,
    baseUrl: "http://localhost:3000",
  },
  env: {
    BACKEND: "http://localhost:3001/api"
  }
});
