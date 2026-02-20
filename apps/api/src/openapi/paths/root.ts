export const rootPath = {
  get: {
    tags: ["System"],
    operationId: "getRoot",
    summary: "Vérification rapide de l'API",
    security: [],
    responses: {
      "200": {
        description: "Le serveur répond correctement"
      },
      "500": {
        description: "Erreur interne du serveur"
      }
    }
  }
}

