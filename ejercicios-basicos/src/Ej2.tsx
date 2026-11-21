// Ejercicio 2 · Contador con límites (useState)
import { useState } from 'react'

const MIN = 0
const MAX = 10

export default function Ej2() {
  const [valor, setValor] = useState(0)

  function restar() {
    if (valor > MIN) setValor(valor - 1)
  }

  function sumar() {
    if (valor < MAX) setValor(valor + 1)
  }

  return (
    <div>
      <p className="grande">{valor}</p>
      <button onClick={restar} disabled={valor === MIN}>-</button>
      <button onClick={sumar} disabled={valor === MAX}>+</button>
      <button onClick={() => setValor(0)}>Reiniciar</button>
    </div>
  )
}
