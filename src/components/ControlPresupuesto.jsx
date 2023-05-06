import { useControl } from '../hook/useControl'
import { usePresupuesto } from '../hook/usePresupuesto'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { formatearPresupuesto } from '../helpers'

const ControlPresupuesto = () => {
  const { presupuesto, handleResetApp } = useControl()
  const { porcentaje, disponible, gastado } = usePresupuesto()

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
          value={porcentaje}
          strokeWidth={6}
          text={`${porcentaje}% Gastado`}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
            trailColor: porcentaje > 100 ? '#DC2626' : '#F5F5F5',
            textColor: porcentaje > 100 ? '#DC2626' : '#3b82f6',
            strokeLinecap: 'butt',
          })}
        />
      </div>

      <div className='contenido-presupuesto'>
        <button className='reset-app' type='button' onClick={handleResetApp}>
          Reset App
        </button>
        <p>
          <span>Presupuesto: </span> {formatearPresupuesto(presupuesto)}
        </p>

        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {formatearPresupuesto(disponible)}
        </p>

        <p>
          <span>Gastado: </span> {formatearPresupuesto(gastado)}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto
