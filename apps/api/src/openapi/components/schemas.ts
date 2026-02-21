export const schemas = {
  HelloResponse: {
    type: "object",
    properties: {
      message: { type: "string" }
    }
  },
  AuthRegisterRequest: {
    type: "object",
    required: ["phone", "full_name", "pin"],
    properties: {
      phone: {
        type: "string",
        example: "+22890123456"
      },
      full_name: {
        type: "string",
        example: "Kossi Agbeko"
      },
      pin: {
        type: "string",
        minLength: 4,
        maxLength: 6,
        example: "1234"
      }
    }
  },
  AuthRegisterResponse: {
    type: "object",
    properties: {
      user: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          phone: { type: "string" },
          fullName: { type: "string" }
        }
      },
      wallets: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            balance: { type: "number" },
            currency: { type: "string", example: "XOF" },
            provider: { type: "string", example: "MAIN" }
          }
        }
      },
      accessToken: {
        type: "string",
        description: "JWT d'authentification"
      }
    }
  },
  AuthLoginRequest: {
    type: "object",
    required: ["phone", "pin"],
    properties: {
      phone: {
        type: "string",
        example: "+22890123456"
      },
      pin: {
        type: "string",
        minLength: 4,
        maxLength: 6,
        example: "1234"
      }
    }
  },
  AuthLoginOtpRequest: {
    type: "object",
    required: ["phone", "code"],
    properties: {
      phone: {
        type: "string",
        example: "+22890123456"
      },
      code: {
        type: "string",
        minLength: 6,
        maxLength: 6,
        example: "123456"
      }
    }
  },
  AuthLoginStartResponse: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "OTP_SENT"
      },
      phone: {
        type: "string",
        example: "+22890123456"
      },
      code: {
        type: "string",
        example: "123456",
        description: "Code envoyé (exposé ici pour les tests en développement)"
      },
      expiresInSeconds: {
        type: "integer",
        example: 300
      }
    }
  },
  TransactionSendRequest: {
    type: "object",
    required: ["amount"],
    properties: {
      to_phone: {
        type: "string",
        example: "+22890123456"
      },
      to_user_id: {
        type: "string",
        format: "uuid"
      },
      amount: {
        type: "number",
        example: 10000
      },
      provider: {
        type: "string",
        example: "TMONEY"
      },
      source_wallet_id: {
        type: "string",
        format: "uuid"
      }
    }
  },
  TransactionSendResponse: {
    type: "object",
    properties: {
      transaction: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          reference: { type: "string", example: "TX-123456789-0001" },
          type: { type: "string", example: "SEND" },
          status: { type: "string", example: "SUCCEEDED" },
          amount: { type: "number", example: 10000 },
          currency: { type: "string", example: "XOF" },
          direction: { type: "string", example: "OUT" },
          createdAt: { type: "string", format: "date-time" }
        }
      },
      fromWallet: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          balance: { type: "number" },
          currency: { type: "string", example: "XOF" },
          provider: { type: "string", example: "MAIN" }
        }
      },
      toWallet: {
        anyOf: [
          {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              balance: { type: "number" },
              currency: { type: "string", example: "XOF" },
              provider: { type: "string", example: "MAIN" }
            }
          },
          {
            type: "null"
          }
        ]
      }
    }
  },
  MePaymentRequestResponse: {
    type: "object",
    properties: {
      code: {
        type: "string",
        example: "PR-1729586768000-000000123"
      },
      url: {
        type: "string",
        example: "zongo://pay/PR-1729586768000-000000123"
      },
      paymentRequest: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          code: { type: "string" },
          ownerUserId: { type: "string", format: "uuid" },
          amount: { type: "number", nullable: true },
          currency: { type: "string", example: "XOF" },
          provider: { type: "string", nullable: true },
          phoneNumber: { type: "string", nullable: true },
          isSingleUse: { type: "boolean" },
          maxUses: { type: "integer", nullable: true },
          usesCount: { type: "integer" },
          expiresAt: { type: "string", format: "date-time", nullable: true },
          status: { type: "string", example: "ACTIVE" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      }
    }
  },
  TransactionFromQrRequest: {
    type: "object",
    required: ["code"],
    properties: {
      code: {
        type: "string",
        example: "PR-1729586768000-000000123"
      }
    }
  },
  TransactionFromQrResponse: {
    type: "object",
    properties: {
      paymentRequest: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          code: { type: "string" },
          ownerUserId: { type: "string", format: "uuid" },
          amount: { type: "number", nullable: true },
          currency: { type: "string", example: "XOF" },
          provider: { type: "string", nullable: true },
          phoneNumber: { type: "string", nullable: true },
          isSingleUse: { type: "boolean" },
          maxUses: { type: "integer", nullable: true },
          usesCount: { type: "integer" },
          expiresAt: { type: "string", format: "date-time", nullable: true },
          status: { type: "string", example: "ACTIVE" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      owner: {
        anyOf: [
          {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              phone: { type: "string" },
              fullName: { type: "string" }
            }
          },
          {
            type: "null"
          }
        ]
      },
      suggestedTransaction: {
        type: "object",
        properties: {
          to_user_id: { type: "string", format: "uuid" },
          amount: { type: "number", nullable: true },
          provider: { type: "string", nullable: true }
        }
      }
    }
  },
  MeResponse: {
    type: "object",
    properties: {
      user: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          phone: { type: "string" },
          fullName: { type: "string" }
        }
      },
      wallets: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            balance: { type: "number" },
            currency: { type: "string", example: "XOF" },
            provider: { type: "string", example: "MAIN" }
          }
        }
      }
    }
  }
}
