import { rootPath } from "./root.js"
import { helloPath } from "./hello.js"
import { healthDbPath } from "./healthDb.js"
import { authRegisterPath, authLoginPath, authLoginVerifyPath } from "./auth.js"
import { mePath } from "./me.js"
import { fedapayWebhookPath } from "./fedapayWebhook.js"
import { transactionsSendPath, transactionsFromQrPath } from "./transactions.js"
import { mePaymentRequestPath } from "./mePaymentRequest.js"

export const paths = {
  "/": rootPath,
  "/hello/{name}": helloPath,
  "/health/db": healthDbPath,
  "/api/auth/register": authRegisterPath,
  "/api/auth/login": authLoginPath,
  "/api/auth/login/verify": authLoginVerifyPath,
  "/api/me": mePath,
  "/api/me/payment-request": mePaymentRequestPath,
  "/webhooks/fedapay": fedapayWebhookPath,
  "/api/transactions/send": transactionsSendPath,
  "/api/transactions/from-qr": transactionsFromQrPath
}
