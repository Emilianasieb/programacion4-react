// Ejercicio 1 · Tarjetas de producto (props)
function Producto({ nombre, precio, stock }: { nombre: string; precio: number; stock: number }) {
  return (
    <div className="tarjeta">
      <h3>{nombre}</h3>
      <p>Precio: ${precio}</p>
      <p>{stock === 0 ? 'Sin stock' : `Stock: ${stock}`}</p>
    </div>
  )
}

export default function Ej1() {
  return (
    <div className="fila">
      <Producto nombre="Teclado" precio={25000} stock={8} />
      <Producto nombre="Mouse" precio={12000} stock={0} />
      <Producto nombre="Monitor" precio={180000} stock={3} />
    </div>
  )
}
