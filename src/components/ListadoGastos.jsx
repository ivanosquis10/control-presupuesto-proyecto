import { useControl } from '../hook/useControl'
import Gasto from './Gasto'

const ListadoGastos = () => {
  const { gastos, filtro, gastosFiltrados } = useControl()
  return (
    <div className='listado-gastos contenedor'>
      {
        // si hay gastos filtrado se mostrara este, caso contrario, el general
        filtro ? (
          <>
            <h2>
              {gastosFiltrados.length
                ? 'Gastos'
                : 'No hay gastos de la categoria!'}
            </h2>
            {gastosFiltrados?.map(gasto => (
              <Gasto key={gasto.id} gasto={gasto} />
            ))}
          </>
        ) : (
          <>
            <h2>{gastos.length ? 'Gastos' : 'No hay gastos!'}</h2>
            {gastos.map(gasto => (
              <Gasto key={gasto.id} gasto={gasto} />
            ))}
          </>
        )
      }
    </div>
  )
}

export default ListadoGastos
