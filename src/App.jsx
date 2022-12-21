import { useState, useEffect } from 'react';

import Header from './components/Header';
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';

import { generarId } from './helpers';
import IconoGastoNuevo from './img/nuevo-gasto.svg';

function App() {
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos')
      ? JSON.parse(localStorage.getItem('gastos'))
      : []
  );

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [editarGasto, setEditarGasto] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  // se va a encargar de verificar si hay algo o no en el estado de editar, si es asi, se ejecutara la funcion
  useEffect(() => {
    // si es mayor a 0 es porque hay algo en el objeto.
    if (Object.keys(editarGasto).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [editarGasto]);

  // useffect para cargar el presupuesto desde el localstorage
  useEffect(() => {
    // seteamos el presupuesto en el localstorage
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto]);

  // useffect para cargar los gastos desde el localstorage
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos]);

  // useEffect que se va a encarga de filtrar por categoria
  useEffect(() => {
    if (filtro) {
      const gastosFiltrado = gastos.filter(
        (gasto) => gasto.categoriaGasto === filtro
      );
      setGastosFiltrados(gastosFiltrado);
    }
  }, [filtro]);

  // este useffect cargara el presupuesto del LS
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0);
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  // funcion encargada de cambiar el estado del modal
  const handleNuevoGasto = () => {
    setModal(true);
    setEditarGasto({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const guardarGastos = (gasto) => {
    if (gasto.id) {
      // Actualizar porque ya viene con un ID, por ende, es para actualizar el gasto
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setEditarGasto({});
    } else {
      // Nuevo Gasto - generamos un nuevo ID
      gasto.id = generarId();
      // generamos la fecha cuando se agrego el gasto
      gasto.fecha = Date.now();
      // y lo añadimos al arreglo de los gastos
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActualizados);
  };

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />

            <ListadoGastos
              gastos={gastos}
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoGastoNuevo}
              alt="icono para añadir nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGastos={guardarGastos}
          editarGasto={editarGasto}
          setEditarGasto={setEditarGasto}
        />
      )}
    </div>
  );
}

export default App;
