const fedapayApiBaseUrl = process.env.FEDAPAY_API_BASE_URL ?? ''
const fedapaySecretKey = process.env.FEDAPAY_SECRET_KEY ?? ''
const fedapayCallbackUrl =
  process.env.FEDAPAY_CALLBACK_URL ?? 'https://example.com/callback'

type FedapayCollectParams = {
  amount: number
  currency: string
  customerPhone: string
  provider?: string
  description?: string
}

export async function createFedapayCollect(params: FedapayCollectParams) {
  if (!fedapayApiBaseUrl || !fedapaySecretKey) {
    throw new Error('FEDAPAY_CONFIG_MISSING')
  }

  const url = `${fedapayApiBaseUrl.replace(/\/+$/, '')}/transactions`

  const body = {
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

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${fedapaySecretKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body)
  })

  const text = await response.text().catch(() => '')

  if (!response.ok) {
    let details: unknown = text

    try {
      details = text ? JSON.parse(text) : null
    } catch {
      details = text
    }

    const error = new Error('FEDAPAY_API_ERROR') as Error & {
      status?: number
      details?: unknown
    }

    error.status = response.status
    error.details = details

    throw error
  }

  let data: unknown = null

  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  return data
}
