import { paths } from "./paths/index.js"
import { components } from "./components/index.js"

export const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Zongo Pay API",
    version: "0.1.0",
    description: "Documentation de base de l'API Zongo Pay pour les tests et le développement"
  },
  servers: [
    {
      url: "http://localhost:8787",
      description: "Développement local"
    }
  ],
  security: [
    {
      bearerAuth: []
    }
  ],
  paths,
  components
}
