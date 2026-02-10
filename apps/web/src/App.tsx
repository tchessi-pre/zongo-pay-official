import { useEffect, useState } from 'react'

export default function App() {
  const [message, setMessage] = useState('...')

  useEffect(() => {
    fetch('/api/hello/Vite')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Failed to reach API'))
  }, [])

  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', padding: 24 }}>
      <h1>Vite + React + Hono ⚡</h1>
      <p>API says: <strong>{message}</strong></p>
      <p>Try: <code>GET /api/hello/World</code> in your browser.</p>
    </main>
  )
}
