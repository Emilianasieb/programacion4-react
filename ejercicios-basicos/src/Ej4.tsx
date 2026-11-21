// Ejercicio 4 · Conversor de temperatura (inputs controlados)
import { useState } from 'react'

export default function Ej4() {
  const [celsius, setCelsius] = useState('')

  // Fahrenheit no tiene estado propio: se calcula en cada render a partir de celsius.
  const c = Number(celsius)
  const fahrenheit = c * 9 / 5 + 32

  return (
    <div>
      <label>
        Celsius:{' '}
        <input type="number" value={celsius} onChange={(e) => setCelsius(e.target.value)} />
      </label>
      {celsius !== '' && (
        <>
          <p>{fahrenheit.toFixed(1)} °F</p>
          {c > 30 && <p>Hace calor</p>}
        </>
      )}
    </div>
  )
}
