import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../db.js'
import { createOtpForUser, verifyOtp } from '../utils/otp.js'
import type { RegisterDto, LoginDto, LoginVerifyDto } from '../dto/auth.dto.js'

const jwtSecret = process.env.JWT_SECRET ?? 'dev-secret'

/**
 * Builds the authentication response object containing user details, wallets, and an access token.
 * 
 * @function
 * @name buildAuthResponse
 * @kind function
 * @param {{ id: string phone: string fullName: string }} user
 * @returns {Promise<{ user: { id: string; phone: string; fullName: string; }; wallets: { id: string; balance: Decimal; currency: string; provider: string; }[]; accessToken: string; }>}
 */
function buildAuthResponse(user: { id: string; phone: string; fullName: string }) {
  return prisma.wallet.findMany({
    where: { userId: user.id }
  }).then((wallets) => {
    const accessToken = jwt.sign(
      {
        sub: user.id,
        phone: user.phone
      },
      jwtSecret,
      { expiresIn: '1h' }
    )

    return {
      user: {
        id: user.id,
        phone: user.phone,
        fullName: user.fullName
      },
      wallets: wallets.map((w) => ({
        id: w.id,
        balance: w.balance,
        currency: w.currency,
        provider: w.provider
      })),
      accessToken
    }
  })
}

/**
 * Registers a new user with the provided phone number, full name, and PIN.
 * 
 * @async
 * @function
 * @name registerUser
 * @kind function
 * @param {{ phone: string full_name: string pin: string }} data
 * @returns {Promise<{ user: { id: string; phone: string; fullName: string; }; wallets: { id: string; balance: Decimal; currency: string; provider: string; }[]; accessToken: string; }>}
 * @exports
 */
export async function registerUser(data: RegisterDto) {
  const existing = await prisma.user.findUnique({
    where: { phone: data.phone }
  })

  if (existing) {
    throw new Error('USER_ALREADY_EXISTS')
  }

  const pinHash = await bcrypt.hash(data.pin, 10)

  const user = await prisma.user.create({
    data: {
      phone: data.phone,
      fullName: data.full_name,
      pinHash
    }
  })

  await prisma.wallet.create({
    data: {
      userId: user.id,
      provider: 'MAIN',
      balance: 0,
      currency: 'XOF'
    }
  })

  return buildAuthResponse(user)
}

/**
 * Initiates the login process by validating the user's phone and PIN, then generates and sends an OTP code for verification.
 * 
 * @async
 * @function
 * @name startLogin
 * @kind function
 * @param {{ phone: string pin: string }} data
 * @returns {Promise<{ status: string; phone: string; code: string; expiresInSeconds: number; }>}
 * @exports
 */
export async function startLogin(data: LoginDto) {
  const user = await prisma.user.findUnique({
    where: { phone: data.phone }
  })

  if (!user) {
    throw new Error('INVALID_CREDENTIALS')
  }

  const validPin = await bcrypt.compare(data.pin, user.pinHash)

  if (!validPin) {
    throw new Error('INVALID_CREDENTIALS')
  }

  const { code, expiresInSeconds } = createOtpForUser(user.phone, user.id)

  return {
    status: 'OTP_SENT',
    phone: user.phone,
    code,
    expiresInSeconds
  }
}

/**
 * Verifies the OTP code sent during login and returns the authenticated user data along with their wallets and access token.
 * 
 * @async
 * @function
 * @name verifyLoginCode
 * @kind function
 * @param {{ phone: string code: string }} data
 * @returns {Promise<{ user: { id: string; phone: string; fullName: string; }; wallets: { id: string; balance: Decimal; currency: string; provider: string; }[]; accessToken: string; }>}
 * @exports
 */
export async function verifyLoginCode(data: LoginVerifyDto) {
  const result = verifyOtp(data.phone, data.code)

  if (!result) {
    throw new Error('INVALID_OTP')
  }

  const user = await prisma.user.findUnique({
    where: { id: result.userId }
  })

  if (!user) {
    throw new Error('USER_NOT_FOUND')
  }

  return buildAuthResponse(user)
}

