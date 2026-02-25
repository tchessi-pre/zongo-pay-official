export function authHeaders(json: boolean) {
  const secret = process.env.FEDAPAY_SECRET_KEY ?? ''
  const headers: Record<string, string> = {
    Authorization: `Bearer ${secret}`,
    Accept: 'application/json'
  }
  if (json) {
    headers['Content-Type'] = 'application/json'
  }
  return headers
}
