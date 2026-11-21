import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { UserList } from './UserList'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  // La sesión se guarda en localStorage para que sobreviva a un F5.
  const [token, setToken] = useState(localStorage.getItem('token'))

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault() // sin esto, el navegador recarga la página
    setError(null)
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json()
    // fetch no falla con un 401: hay que mirar response.ok
    if (!response.ok) {
      setError(data.detail)
      return
    }
    localStorage.setItem('token', data.token)
    setToken(data.token)
  }

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
  }

  if (token) {
    return (
      <>
        <button onClick={logout}>Salir</button>
        <UserList token={token} />
      </>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Ingresar</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Ingresar</button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}
