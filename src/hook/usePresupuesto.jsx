import { useState, useEffect } from 'react'
import { useControl } from './useControl'

export const usePresupuesto = () => {
  const { gastos, presupuesto } = useControl()
  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {
    // Usamos el .recuce para hacer los calculos del total
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidadGasto + total,
      0
    )
    const totalDisponible = presupuesto - totalGastado

    // Calcular el porcentaje gastado (grafica)
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2)

    setDisponible(totalDisponible)
    setGastado(totalGastado)

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1000)
  }, [gastos])

  return { porcentaje, disponible, gastado }
}
