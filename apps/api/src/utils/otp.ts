const pendingOtps = new Map<
  string,
  {
    code: string
    expiresAt: number
    userId: string
  }
>()

const OTP_TTL_MS = 5 * 60 * 1000

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function createOtpForUser(phone: string, userId: string) {
  const code = generateOtp()
  const expiresAt = Date.now() + OTP_TTL_MS

  pendingOtps.set(phone, {
    code,
    expiresAt,
    userId
  })

  return {
    code,
    expiresInSeconds: Math.floor(OTP_TTL_MS / 1000)
  }
}

export function verifyOtp(phone: string, code: string) {
  const entry = pendingOtps.get(phone)

  if (!entry || entry.code !== code || entry.expiresAt < Date.now()) {
    return null
  }

  pendingOtps.delete(phone)

  return {
    userId: entry.userId
  }
}

