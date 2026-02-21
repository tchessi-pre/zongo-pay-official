export const transactionsSendPath = {
  post: {
    tags: ["Transactions"],
    operationId: "postTransactionsSend",
    summary: "Envoi d'argent depuis un wallet de l'utilisateur",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/TransactionSendRequest"
          }
        }
      }
    },
    responses: {
      "201": {
        description: "Transaction effectuée avec succès",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/TransactionSendResponse"
            }
          }
        }
      },
      "400": {
        description: "Données invalides ou solde insuffisant"
      },
      "401": {
        description: "Utilisateur non authentifié"
      },
      "404": {
        description: "Wallet source ou destinataire introuvable"
      },
      "500": {
        description: "Erreur interne du serveur"
      }
    }
  }
}

export const transactionsFromQrPath = {
  post: {
    tags: ["Transactions"],
    operationId: "postTransactionsFromQr",
    summary: "Résout un PaymentRequest scanné depuis un QR code",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/TransactionFromQrRequest"
          }
        }
      }
    },
    responses: {
      "200": {
        description: "PaymentRequest résolu avec succès",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/TransactionFromQrResponse"
            }
          }
        }
      },
      "400": {
        description: "Code invalide ou PaymentRequest inutilisable"
      },
      "401": {
        description: "Utilisateur non authentifié"
      },
      "404": {
        description: "PaymentRequest introuvable"
      },
      "500": {
        description: "Erreur interne du serveur"
      }
    }
  }
}
