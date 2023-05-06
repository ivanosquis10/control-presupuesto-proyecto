import { useControl } from './hook/useControl'
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import IconoGastoNuevo from './img/nuevo-gasto.svg'

function App() {
  const { isValidPresupuesto, handleNuevoGasto, modal } = useControl()

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros />

            <ListadoGastos />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoGastoNuevo}
              alt='icono para añadir nuevo gasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && <Modal />}
    </div>
  )
}

export default App
