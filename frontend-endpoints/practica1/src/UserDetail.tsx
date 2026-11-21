import { useEffect, useState } from 'react'

interface Role {
  id: number
  name: string
}

interface Country {
  id: number
  name: string
}

// GET /user/{id} trae todos los datos; GET /user solo trae id y name.
interface UserData {
  id: number
  name: string
  age: number
  email: string
  country: Country | null
  roles: Role[]
}

interface Props {
  token: string
  id: number
  onBack: () => void
}

export function UserDetail({ token, id, onBack }: Props) {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) {
          setError(data.detail) // por ejemplo 404 "User not found"
          setLoading(false)
          return
        }
        setUser(data)
        setLoading(false)
      })
      .catch(() => {
        setError('No se pudo conectar con la API')
        setLoading(false)
      })
  }, [token, id])

  if (loading) return <p>Cargando...</p>

  if (error || !user) {
    return (
      <>
        <p className="error">{error}</p>
        <button onClick={onBack}>Volver</button>
      </>
    )
  }

  return (
    <>
      <button onClick={onBack}>Volver</button>
      <h1>{user.name}</h1>
      <p>Edad: {user.age}</p>
      <p>Email: {user.email}</p>
      <p>País: {user.country?.name ?? 'Sin país'}</p>
      <p>Roles: {user.roles.map((role) => role.name).join(', ') || 'Sin roles'}</p>
    </>
  )
}
