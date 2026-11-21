// Ejercicio 6 · Buscador (filtrado)
import { useState } from 'react'

const LENGUAJES = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust', 'PHP', 'Kotlin', 'Swift']

export default function Ej6() {
  const [busqueda, setBusqueda] = useState('')

  // La lista filtrada se calcula al renderizar, no se guarda en otro estado.
  const resultados = LENGUAJES.filter((l) => l.toLowerCase().includes(busqueda.toLowerCase()))

  return (
    <div>
      <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar lenguaje" />
      <p>{resultados.length} resultado(s)</p>
      <ul>
        {resultados.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  )
}
