import { createContext, useState, useEffect } from 'react'
import { generarId } from '../helpers'

export const ControlContext = createContext()

export const ControlProvider = ({ children }) => {
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos')
      ? JSON.parse(localStorage.getItem('gastos'))
      : []
  )

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )

  // valida si el usuario tiene o no un presupuesto, hace el control de las vistas
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [editarGasto, setEditarGasto] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  // se va a encargar de verificar si hay algo o no en el estado de editar, si es asi, se ejecutara la funcion
  useEffect(() => {
    // si es mayor a 0 es porque hay algo en el objeto.
    if (Object.keys(editarGasto).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500)
    }
  }, [editarGasto])

  // useffect para cargar el presupuesto desde el localstorage
  useEffect(() => {
    // seteamos el presupuesto en el localstorage
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  // useffect para cargar los gastos desde el localstorage
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  // useEffect que se va a encarga de filtrar por categoria
  useEffect(() => {
    if (filtro) {
      const gastosFiltrado = gastos.filter(
        gasto => gasto.categoriaGasto === filtro
      )
      setGastosFiltrados(gastosFiltrado)
    }
  }, [filtro])

  // este useffect cargara el presupuesto del LS
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0)
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])

  // funcion encargada de guardar todo tipo de gasto, sea uno editado o nuevo
  const guardarGastos = gasto => {
    if (gasto.id) {
      // Actualizar porque ya viene con un ID, por ende, es para actualizar el gasto
      const gastosActualizados = gastos.map(gastoState =>
        gastoState.id === gasto.id ? gasto : gastoState
      )
      setGastos(gastosActualizados)
      setEditarGasto({})
    } else {
      // Nuevo Gasto - generamos un nuevo ID
      gasto.id = generarId()
      // generamos la fecha cuando se agrego el gasto
      gasto.fecha = Date.now()
      // y lo añadimos al arreglo de los gastos
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  // funcion encargada de cambiar el estado del modal
  const handleNuevoGasto = () => {
    setModal(true)
    setEditarGasto({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
  }

  // se encargar de cerrasr el modal
  const handleCerrarModal = () => {
    setAnimarModal(false)
    // seteamos el estado a un objeto vacio para resetearlo, asi no queda guardado
    setEditarGasto({})
    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  // elimina el gasto
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  // se encarga de resetar la app
  const handleResetApp = () => {
    const resultado = confirm('¿Deseas eliminar presupuesto y gasto?')

    if (resultado) {
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }

  return (
    <ControlContext.Provider
      value={{
        gastos,
        setGastos,
        presupuesto,
        setPresupuesto,
        isValidPresupuesto,
        setIsValidPresupuesto,
        editarGasto,
        setEditarGasto,
        filtro,
        setFiltro,
        gastosFiltrados,
        setGastosFiltrados,
        eliminarGasto,
        handleNuevoGasto,
        modal,
        setModal,
        animarModal,
        setAnimarModal,
        guardarGastos,
        handleResetApp,
        handleCerrarModal,
      }}
    >
      {children}
    </ControlContext.Provider>
  )
}
