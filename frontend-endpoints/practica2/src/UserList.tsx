import { useEffect, useState } from 'react'
import { UserDetail } from './UserDetail'

interface User {
  id: number
  name: string
}

export function UserList({ token }: { token: string }) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [me, setMe] = useState<User | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null) // usuario abierto en el detalle
  const [search, setSearch] = useState('') // lo que se escribe en el input
  const [query, setQuery] = useState('') // la búsqueda aplicada al tocar "Buscar"

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL
    let url = `${api}/user`
    if (query) url = `${api}/user/search/${encodeURIComponent(query)}`

    setLoading(true)
    setError(null)
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) {
          setError(data.detail) // 401, 403…: es un objeto con detail
          setLoading(false)
          return
        }
        setUsers(data) // 200: recién acá es una lista
        setLoading(false)
      })
      .catch(() => {
        setError('No se pudo conectar con la API') // fetch solo falla si no hay conexión
        setLoading(false)
      })
  }, [
    token,
    query,
  ])

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` }
    const api = import.meta.env.VITE_API_URL
    fetch(`${api}/user/me/id`, { headers }) // 1) ¿quién soy? → { id }
      .then((response) => response.json())
      .then(({ id }) => fetch(`${api}/user/${id}`, { headers })) // 2) mis datos
      .then((response) => response.json())
      .then(setMe)
  }, [token])

  function backToList() {
    setSelectedId(null)
  }

  function handleSearch() {
    setQuery(search.trim())
  }

  function clearSearch() {
    setSearch('')
    setQuery('')
  }

  if (selectedId !== null) {
    return (
      <UserDetail
        token={token}
        id={selectedId}
        onBack={backToList}
      />
    )
  }

  return (
    <>
      <h1>Hola, {me?.name}</h1>

      <div className="barra">
        <input
          placeholder="Buscar por nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
        {query && <button onClick={clearSearch}>Limpiar</button>}
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && users.length === 0 && <p>No hay usuarios para mostrar.</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button className="link" onClick={() => setSelectedId(user.id)}>
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
