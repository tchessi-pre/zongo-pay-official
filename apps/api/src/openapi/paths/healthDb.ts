export const healthDbPath = {
  get: {
    tags: ["System"],
    operationId: "getHealthDb",
    summary: "Vérifie la connexion à la base de données",
    security: [],
    responses: {
      "200": {
        description: "Base de données joignable"
      },
      "500": {
        description: "Problème de connexion à la base de données"
      }
    }
  }
}

