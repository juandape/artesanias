import React from 'react';
import Link from 'next/link';

import styles from '@/styles/Dashboard.module.css';

const Dashboard = () => {
  return (
    <>
      <h1 className={styles.dashboard__title}>In Kontrol Dashboard</h1>
      <div className={styles.dashboard__container}>
        <div>
          <h2>Clientes</h2>
          <ul>
            <Link href={'FormularioClientes'}>
              <li>Crear nuevo Cliente</li>
            </Link>
            <li>Total Clientes</li>
            <li>cant</li>
            <li>Pendiente entrega</li>
            <li>$, cant clientes</li>
            <li>Pendiente Fabricacion</li>
            <li>$, cant clientes</li>
            <li>Entregado y Pendiente cobro</li>
            <li>$, cant clientes</li>
            <li>Entregado y Cobrado</li>
            <li>$, cant clientes</li>
            <li>Recaudo por mes</li>
          </ul>
        </div>
        <div>
          <h2>Proveedores</h2>
          <div>Ver listado</div>
          <Link href={'/FormularioProveedores'}>
            <div>Crear Nuevo</div>
          </Link>
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
