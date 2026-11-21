// Ejercicio 3 · Mostrar y ocultar (condicionales)
import { useState } from 'react'

export default function Ej3() {
  const [visible, setVisible] = useState(false)

  return (
    <div className="tarjeta">
      <p><strong>¿Qué hook se usa para guardar estado en un componente?</strong></p>
      {visible && <p>useState</p>}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'Ocultar respuesta' : 'Mostrar respuesta'}
      </button>
    </div>
  )
}
