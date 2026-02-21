export const fedapayWebhookPath = {
  post: {
    tags: ["Webhooks"],
    operationId: "postFedapayWebhook",
    summary: "Réception des webhooks de paiement FedaPay",
    security: [],
    parameters: [
      {
        in: "header",
        name: "X-Fedapay-Webhook-Token",
        required: true,
        schema: {
          type: "string",
          example: "super-dev-webhook-token"
        },
        description: "Secret partagé pour sécuriser l'appel du webhook"
      }
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            additionalProperties: true
          }
        }
      }
    },
    responses: {
      "200": {
        description: "Webhook reçu et accepté"
      },
      "400": {
        description: "Payload invalide"
      },
      "401": {
        description: "Signature de webhook invalide"
      },
      "500": {
        description: "Webhook non configurable côté serveur"
      }
    }
  }
}
