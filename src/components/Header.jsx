import { useControl } from '../hook/useControl'
import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = () => {
  const { isValidPresupuesto } = useControl()
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      {isValidPresupuesto ? <ControlPresupuesto /> : <NuevoPresupuesto />}
    </header>
  )
}

export default Header
