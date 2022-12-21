import { useState, useEffect } from 'react';
import CerrarModal from '../img/cerrar.svg';
import Mensaje from './Mensaje';

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGastos,
  editarGasto,
  setEditarGasto,
}) => {
  const [mensaje, setMensaje] = useState('');
  const [nombreGasto, setNombreGasto] = useState('');
  const [cantidadGasto, setCantidadGasto] = useState('');
  const [categoriaGasto, setCategoriaGasto] = useState('');
  const [fecha, setFecha] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    // Hacemos la misma comprobacion y en caso de ser true, se llenara el formulario con la informacion traida a traves de los props
    if (Object.keys(editarGasto).length > 0) {
      setNombreGasto(editarGasto.nombreGasto);
      setCantidadGasto(editarGasto.cantidadGasto);
      setCategoriaGasto(editarGasto.categoriaGasto);
      setFecha(editarGasto.fecha);
      setId(editarGasto.id);
    }
  }, []);

  const handleCerrarModal = () => {
    setAnimarModal(false);
    // seteamos el estado a un objeto vacio para resetearlo, asi no queda guardado
    setEditarGasto({});
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validando los campos
    if (
      [nombreGasto, cantidadGasto, categoriaGasto].includes('') ||
      cantidadGasto < 0
    ) {
      setMensaje('Todos los campos son obligatorios');
      setTimeout(() => {
        setMensaje('');
      }, 2000);
      return;
    }

    guardarGastos({ nombreGasto, cantidadGasto, categoriaGasto, id, fecha });
  };

  return (
    <div className="modal fijar">
      <div className="cerrar-modal">
        <img
          src={CerrarModal}
          alt="icono para cerrar el modal"
          onClick={handleCerrarModal}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
      >
        <legend>
          {editarGasto.nombreGasto ? 'Editar Gasto' : 'Nuevo Gasto'}
        </legend>

        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            value={nombreGasto}
            onChange={(e) => setNombreGasto(e.target.value)}
            placeholder="Añade el nombre del gasto..."
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            value={cantidadGasto}
            onChange={(e) => setCantidadGasto(Number(e.target.value))}
            placeholder="Añade la cantidad del gasto. Ej: 300"
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categorías</label>
          <select
            id="categoria"
            value={categoriaGasto}
            onChange={(e) => setCategoriaGasto(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          value={editarGasto.nombreGasto ? 'Guardar Cambios' : 'Añadir Gasto'}
        />
      </form>
    </div>
  );
};

export default Modal;
