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
  }
}
