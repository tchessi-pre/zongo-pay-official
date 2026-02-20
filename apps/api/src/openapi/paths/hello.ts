export const helloPath = {
  get: {
    tags: ["System"],
    operationId: "getHello",
    summary: "Message de bienvenue personnalisé",
    security: [],
    parameters: [
      {
        name: "name",
        in: "path",
        required: true,
        schema: { type: "string" },
        description: "Nom de la personne à saluer"
      }
    ],
    responses: {
      "200": {
        description: "Message de bienvenue renvoyé",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/HelloResponse"
            }
          }
        }
      },
      "400": {
        description: "Paramètre de chemin invalide"
      },
      "500": {
        description: "Erreur interne du serveur"
      }
    }
  }
}

