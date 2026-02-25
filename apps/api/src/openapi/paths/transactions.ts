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

export const transactionsListPath = {
  get: {
    tags: ["Transactions"],
    operationId: "getTransactions",
    summary: "Liste les transactions de l'utilisateur connecté",
    parameters: [
      {
        in: "query",
        name: "page",
        required: false,
        schema: {
          type: "integer",
          example: 1
        }
      },
      {
        in: "query",
        name: "pageSize",
        required: false,
        schema: {
          type: "integer",
          example: 20
        }
      }
    ],
    responses: {
      "200": {
        description: "Liste paginée des transactions",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/TransactionListResponse"
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

export const payoutsCreatePath = {
  post: {
    tags: ["Payouts"],
    operationId: "postPayouts",
    summary: "Retrait vers un compte Mobile Money depuis le wallet de l'utilisateur",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/PayoutCreateRequest"
          }
        }
      }
    },
    responses: {
      "201": {
        description: "Payout créé et wallet débité",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/PayoutCreateResponse"
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
        description: "Wallet source introuvable"
      },
      "500": {
        description: "Erreur interne du serveur"
      }
    }
  }
}

export const transactionDetailPath = {
  get: {
    tags: ["Transactions"],
    operationId: "getTransactionById",
    summary: "Récupère le détail d'une transaction",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "string",
          format: "uuid"
        }
      }
    ],
    responses: {
      "200": {
        description: "Transaction trouvée",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/TransactionDetailResponse"
            }
          }
        }
      },
      "401": {
        description: "Utilisateur non authentifié"
      },
      "404": {
        description: "Transaction introuvable"
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
