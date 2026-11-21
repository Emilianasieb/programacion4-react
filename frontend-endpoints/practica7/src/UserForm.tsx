import { useEffect, useState } from 'react'
import type { SubmitEvent } from 'react'

// La API no tiene endpoint de países: son los que crea el backend al arrancar.
const COUNTRIES = [
  { id: 1, name: 'Argentina' },
  { id: 2, name: 'Brasil' },
]

interface Props {
  token: string
  id?: number // si viene, el formulario edita a ese usuario; si no, crea uno nuevo
  onDone: () => void
}

// FastAPI responde {"detail": "texto"} o, si falla la validación (422), una lista de errores.
function readDetail(detail: unknown): string {
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail)) {
    return detail.map((e) => `${e.loc.at(-1)}: ${e.msg}`).join(' · ')
  }
  return 'Error inesperado'
}

export function UserForm({ token, id, onDone }: Props) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [countryId, setCountryId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Al editar, se cargan los datos actuales con GET /user/{id}.
  useEffect(() => {
    if (id === undefined) return
    setLoading(true)
    fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) {
          setError(readDetail(data.detail))
          setLoading(false)
          return
        }
        setName(data.name)
        setAge(String(data.age))
        setEmail(data.email)
        setCountryId(data.country ? String(data.country.id) : '')
        setLoading(false)
      })
      .catch(() => {
        setError('No se pudo conectar con la API')
        setLoading(false)
      })
  }, [token, id])

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    setError(null)
    setLoading(true)
    const api = import.meta.env.VITE_API_URL
    const url = id === undefined ? `${api}/user` : `${api}/user/${id}`
    const method = id === undefined ? 'POST' : 'PATCH'
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          age: Number(age),
          email,
          password,
          country_id: countryId ? Number(countryId) : null,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(readDetail(data.detail)) // 403 sin permiso, 422 datos inválidos
        return
      }
      onDone() // {id}: guardado, volvemos a la lista
    } catch {
      setError('No se pudo conectar con la API')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id === undefined ? 'Nuevo usuario' : 'Editar usuario'}</h1>
      <input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Edad" value={age} onChange={(e) => setAge(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select value={countryId} onChange={(e) => setCountryId(e.target.value)}>
        <option value="">Sin país</option>
        {COUNTRIES.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
      <button type="button" onClick={onDone}>
        Cancelar
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}
