import { useState, useEffect } from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    // Usamos el .recuce para hacer los calculos del total
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidadGasto + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;

    // Calcular el porcentaje gastado (grafica)
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setDisponible(totalDisponible);
    setGastado(totalGastado);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);
  }, [gastos]);

  const handleResetApp = () => {
    const resultado = confirm('¿Deseas eliminar presupuesto y gasto?');

    if (resultado) {
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    }
  };

  // funcion que formatea el presupuesto
  const formatearPresupuesto = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
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

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
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
  );
};

export default ControlPresupuesto;
