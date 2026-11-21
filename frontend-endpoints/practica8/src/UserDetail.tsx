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
  onEdit: (id: number) => void
}

export function UserDetail({ token, id, onBack, onEdit }: Props) {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null) // error al borrar o cambiar roles
  const [deleting, setDeleting] = useState(false)
  const [allRoles, setAllRoles] = useState<Role[]>([])
  const [selectedRole, setSelectedRole] = useState('')

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

  // Todos los roles, para ofrecer los que el usuario todavía no tiene.
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/role`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) {
          setActionError(data.detail)
          return
        }
        setAllRoles(data)
      })
      .catch(() => setActionError('No se pudo conectar con la API'))
  }, [token])

  async function handleDelete() {
    if (!window.confirm(`¿Borrar a ${user?.name}?`)) return
    setActionError(null)
    setDeleting(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (!response.ok) {
        setActionError(data.detail) // con sfer: 403, no tiene delete_users
        return
      }
      onBack() // borrado: volvemos a la lista, que se vuelve a pedir
    } catch {
      setActionError('No se pudo conectar con la API')
    } finally {
      setDeleting(false)
    }
  }

  // POST asigna el rol y DELETE lo quita. Las dos devuelven el usuario actualizado.
  async function changeRole(method: 'POST' | 'DELETE', roleId: number) {
    setActionError(null)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}/role/${roleId}`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (!response.ok) {
        setActionError(data.detail) // asignar pide write_users; quitar, update_users
        return
      }
      setUser(data)
      setSelectedRole('')
    } catch {
      setActionError('No se pudo conectar con la API')
    }
  }

  if (loading) return <p>Cargando...</p>

  if (error || !user) {
    return (
      <>
        <p className="error">{error}</p>
        <button onClick={onBack}>Volver</button>
      </>
    )
  }

  // Se cruzan las dos listas: todos los roles menos los que ya tiene.
  const availableRoles = allRoles.filter((role) => !user.roles.some((r) => r.id === role.id))

  return (
    <>
      <button onClick={onBack}>Volver</button>
      <h1>{user.name}</h1>
      <p>Edad: {user.age}</p>
      <p>Email: {user.email}</p>
      <p>País: {user.country?.name ?? 'Sin país'}</p>

      <h2>Roles</h2>
      <ul>
        {user.roles.map((role) => (
          <li key={role.id}>
            {role.name} <button onClick={() => changeRole('DELETE', role.id)}>Quitar</button>
          </li>
        ))}
        {user.roles.length === 0 && <li>Sin roles</li>}
      </ul>
      {availableRoles.length > 0 && (
        <div className="barra">
          <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
            <option value="">Elegí un rol</option>
            {availableRoles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <button
            disabled={!selectedRole}
            onClick={() => changeRole('POST', Number(selectedRole))}
          >
            Asignar rol
          </button>
        </div>
      )}

      <div className="barra">
        <button onClick={() => onEdit(user.id)}>Editar</button>
        <button onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Borrando...' : 'Borrar'}
        </button>
      </div>
      {actionError && <p className="error">{actionError}</p>}
    </>
  )
}
