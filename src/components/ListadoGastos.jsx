import Gasto from './Gasto';

const ListadoGastos = ({
  gastos,
  setEditarGasto,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {
        // si hay gastos filtrado se mostrara este, caso contrario, el general
        filtro ? (
          <>
            <h2>
              {gastosFiltrados.length
                ? 'Gastos'
                : 'No hay gastos de la categoria!'}
            </h2>
            {gastosFiltrados.map((gasto) => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setEditarGasto={setEditarGasto}
                eliminarGasto={eliminarGasto}
              />
            ))}
          </>
        ) : (
          <>
            <h2>{gastos.length ? 'Gastos' : 'No hay gastos!'}</h2>
            {gastos.map((gasto) => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setEditarGasto={setEditarGasto}
                eliminarGasto={eliminarGasto}
              />
            ))}
          </>
        )
      }
    </div>
  );
};

export default ListadoGastos;
