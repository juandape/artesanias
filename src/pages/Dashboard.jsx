import React, { useState } from 'react';
import Link from 'next/link';

import styles from '@/styles/Dashboard.module.css';

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleOpen = (value) => {
    setMenuOpen(!menuOpen);
    setSelected(value);
  };

  return (
    <>
      <h1 className={styles.dashboard__title}>In Kontrol Dashboard</h1>
      <div className={styles.dashboard__container}>
        <div>
          <h2 onClick={()=>handleOpen('clientes')}>Clientes</h2>
          {menuOpen && (
            <ul>
              <Link href={'FormularioClientes'}>
                <li>Crear nuevo Cliente</li>
              </Link>
              <Link href={'ListaClientes'}>
                <li>Listado clientes</li>
              </Link>
            </ul>
          )}
        </div>
        <div>
          <h2 onClick={()=>handleOpen('proveedores')}>Proveedores</h2>
          {menuOpen && (
            <>
              <div>Ver listado</div>
              <Link href={'/FormularioProveedores'}>
                <div>Crear Nuevo</div>
              </Link>
            </>
          )}
        </div>

        <div>
          <h2>Planta</h2>
          <ul>
            <li>Ultima semana</li>
            <li>fecha</li>
            <li>Unidades</li>
            <li>cant</li>
            <li>Horas</li>
            <li>total</li>
          </ul>
        </div>
        <div>
          <h2>Bodega</h2>
          <ul>
            <li>MP</li>
            <li>costo</li>
            <li>PT</li>
            <li>valor</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
