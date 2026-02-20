import { rootPath } from "./root.js"
import { helloPath } from "./hello.js"
import { healthDbPath } from "./healthDb.js"

export const paths = {
  "/": rootPath,
  "/hello/{name}": helloPath,
  "/health/db": healthDbPath
}
