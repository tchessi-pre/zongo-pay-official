export const mePaymentRequestPath = {
  get: {
    tags: ["Me"],
    operationId: "getMePaymentRequest",
    summary: "PaymentRequest de profil pour générer le QR de paiement",
    responses: {
      "200": {
        description: "PaymentRequest de profil de l'utilisateur connecté",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/MePaymentRequestResponse"
            }
          }
        }
      },
      "401": {
        description: "Utilisateur non authentifié"
      },
      "500": {
        description: "Erreur interne du serveur"
      }
    }
  }
}

