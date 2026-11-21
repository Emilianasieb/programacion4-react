// Ejercicio 5 · Lista de compras (listas y estado)
import { useState } from 'react'

interface Item {
  id: number
  texto: string
}

export default function Ej5() {
  const [items, setItems] = useState<Item[]>([])
  const [texto, setTexto] = useState('')

  function agregar() {
    const limpio = texto.trim()
    if (limpio === '') return // no se agregan ítems vacíos
    setItems([...items, { id: Date.now(), texto: limpio }]) // array nuevo, sin push
    setTexto('')
  }

  function eliminar(id: number) {
    setItems(items.filter((i) => i.id !== id))
  }

  return (
    <div>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Ej: pan" />
      <button onClick={agregar}>Agregar</button>
      {items.length === 0 ? (
        <p>No hay nada para comprar</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.texto} <button onClick={() => eliminar(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
