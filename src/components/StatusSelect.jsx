import React from 'react';

function StatusSelect({ value, onChange}) {
  const options = ['Pendiente', 'Inventario asignado', 'Despachado y pendiente de cobro', 'Despachado y cancelado'];

  return (
    <select value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default StatusSelect;
