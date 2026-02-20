export const mePath = {
  get: {
    tags: ["Me"],
    operationId: "getMe",
    summary: "Profil de l'utilisateur connecté",
    responses: {
      "200": {
        description: "Profil et wallets de l'utilisateur connecté",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/MeResponse"
            }
          }
        }
      },
      "401": {
        description: "Utilisateur non authentifié"
      },
      "404": {
        description: "Utilisateur introuvable"
      },
      "500": {
        description: "Erreur interne du serveur"
      }
    }
  }
}

