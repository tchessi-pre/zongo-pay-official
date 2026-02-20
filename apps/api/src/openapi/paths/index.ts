import { rootPath } from "./root.js"
import { helloPath } from "./hello.js"
import { healthDbPath } from "./healthDb.js"
import { authRegisterPath, authLoginPath, authLoginVerifyPath } from "./auth.js"

export const paths = {
  "/": rootPath,
  "/hello/{name}": helloPath,
  "/health/db": healthDbPath,
  "/api/auth/register": authRegisterPath,
  "/api/auth/login": authLoginPath,
  "/api/auth/login/verify": authLoginVerifyPath
}
