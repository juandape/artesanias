import React from 'react';
import styles from '@/styles/StatusSelect.module.css';

function StatusSelect({ value, onChange }) {
  const options = [
    'Pendiente',
    'Inventario asignado',
    'Despachado y pendiente de cobro',
    'Despachado y cancelado',
  ];

  return (
    <>
      <label className={styles.status__title}>Estado</label>
      <select
        value={value}
        onChange={onChange}
        className={styles.status__options}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

export default StatusSelect;
