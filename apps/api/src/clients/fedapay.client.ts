import { authHeaders } from './fedapay.http.js'
const fedapayApiBaseUrl = process.env.FEDAPAY_API_BASE_URL ?? ''
const fedapaySecretKey = process.env.FEDAPAY_SECRET_KEY ?? ''
const fedapayCallbackUrl = process.env.FEDAPAY_CALLBACK_URL ?? ''

type FedapayCollectParams = {
  amount: number
  currency: string
  customerPhone: string
  provider?: string
  description?: string
}

type FedapaySendPaymentParams = {
  mode: string
  token: number
  phoneNumber?: {
    number: string
    country: string
  }
}

type FedapayPayoutParams = {
  amount: number
  currency: string
  customerPhone: string
  mode: string
  description?: string
  merchantReference?: string
}

type FedapayClientError = Error & {
  status?: number
  details?: unknown
}

function buildFedapayBaseUrl() {
  return fedapayApiBaseUrl.replace(/\/+$/, '')
}

function buildFedapayTransactionsUrl() {
  return `${buildFedapayBaseUrl()}/transactions`
}

function buildFedapayPayoutsUrl() {
  return `${buildFedapayBaseUrl()}/payouts`
}

function buildFedapayBody(params: FedapayCollectParams) {
  return {
    amount: params.amount,
    currency: { iso: params.currency },
    description: params.description,
    callback_url: fedapayCallbackUrl,
    customer: {
      phone_number: {
        number: params.customerPhone,
        country: 'tg'
      }
    }
  }
}

function buildFedapayPayoutBody(params: FedapayPayoutParams) {
  return {
    amount: params.amount,
    currency: { iso: params.currency },
    mode: params.mode,
    description: params.description,
    merchant_reference: params.merchantReference,
    customer: {
      phone_number: {
        number: params.customerPhone,
        country: 'tg'
      }
    }
  }
}

function parseJsonOrText(text: string) {
  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

function buildFedapayError(response: Response, text: string): FedapayClientError {
  const error = new Error('FEDAPAY_API_ERROR') as FedapayClientError
  error.status = response.status
  error.details = parseJsonOrText(text)
  return error
}

export async function createFedapayCollect(params: FedapayCollectParams) {
  if (!fedapayApiBaseUrl || !fedapaySecretKey) {
    throw new Error('FEDAPAY_CONFIG_MISSING')
  }

  const url = buildFedapayTransactionsUrl()
  const body = buildFedapayBody(params)

  const response = await fetch(url, {
    method: 'POST',
    headers: authHeaders(true),
    body: JSON.stringify(body)
  })

  const text = await response.text().catch(() => '')

  if (!response.ok) {
    throw buildFedapayError(response, text)
  }

  return parseJsonOrText(text)
}

export async function createFedapayTransactionToken(transactionId: string | number) {
  if (!fedapayApiBaseUrl || !fedapaySecretKey) {
    throw new Error('FEDAPAY_CONFIG_MISSING')
  }

  const url = `${buildFedapayTransactionsUrl()}/${transactionId}/token`

  const response = await fetch(url, {
    method: 'POST',
    headers: authHeaders(false)
  })

  const text = await response.text().catch(() => '')

  if (!response.ok) {
    throw buildFedapayError(response, text)
  }

  return parseJsonOrText(text)
}

export async function sendFedapayPayment(params: FedapaySendPaymentParams) {
  if (!fedapayApiBaseUrl || !fedapaySecretKey) {
    throw new Error('FEDAPAY_CONFIG_MISSING')
  }

  const url = `${buildFedapayTransactionsUrl()}/${params.mode}`

  const body: Record<string, unknown> = {
    token: params.token
  }

  if (params.phoneNumber) {
    body.phone_number = params.phoneNumber
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: authHeaders(true),
    body: JSON.stringify(body)
  })

  const text = await response.text().catch(() => '')

  if (!response.ok) {
    throw buildFedapayError(response, text)
  }

  return parseJsonOrText(text)
}

export async function createFedapayPayout(params: FedapayPayoutParams) {
  if (!fedapayApiBaseUrl || !fedapaySecretKey) {
    throw new Error('FEDAPAY_CONFIG_MISSING')
  }

  const url = buildFedapayPayoutsUrl()
  const body = buildFedapayPayoutBody(params)

  const response = await fetch(url, {
    method: 'POST',
    headers: authHeaders(true),
    body: JSON.stringify(body)
  })

  const text = await response.text().catch(() => '')

  if (!response.ok) {
    throw buildFedapayError(response, text)
  }

  return parseJsonOrText(text)
}
