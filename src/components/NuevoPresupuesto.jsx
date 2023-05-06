import { useState } from 'react'
import { useControl } from '../hook/useControl'
import Mensaje from './Mensaje'

const NuevoPresupuesto = () => {
  const { presupuesto, setPresupuesto, setIsValidPresupuesto } = useControl()
  const [mensaje, setMensaje] = useState('')

  // Funcion manejadora del campo de presupuesto
  const handlePresupuesto = e => {
    e.preventDefault()

    if (!presupuesto || presupuesto < 0) {
      setMensaje('no es un presupuesto valido')
      setTimeout(() => {
        setMensaje('')
      }, 2000)
      return
    }

    setMensaje('')
    setIsValidPresupuesto(true)
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo'>
          <label htmlFor=''>Definir Presupuesto</label>
          <input
            className='nuevo-presupuesto'
            type='number'
            placeholder='Añade tu presupuesto'
            value={presupuesto}
            onChange={e => setPresupuesto(Number(e.target.value))}
          />
        </div>

        <input value='Añadir' type='submit' />

        {mensaje && <Mensaje tipo='error'> {mensaje} </Mensaje>}
      </form>
    </div>
  )
}

export default NuevoPresupuesto
