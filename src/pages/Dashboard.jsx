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
        <div className={styles.dashboard__sectionBox}>
          <h2
            onClick={() => handleOpen('clients')}
            className={styles.dashboard__sectionBox__listTitle}
          >
            Clientes
          </h2>
          {selected === 'clients' && menuOpen && (
            <ul className={styles.dashboard__sectionBox__list}>
              <Link href={'/ClientsFormPage'}>
                <li className={styles.dashboard__sectionBox__listItem}>
                  Nuevo Cliente
                </li>
              </Link>
              <Link href={'/ClientsListPage'}>
                <li className={styles.dashboard__sectionBox__listItem}>
                  Ver Listado
                </li>
              </Link>
            </ul>
          )}
        </div>

        <div className={styles.dashboard__sectionBox}>
          <h2
            className={styles.dashboard__sectionBox__listTitle}
            onClick={() => handleOpen('orders')}
          >
            Pedidos
          </h2>
          {selected === 'orders' && menuOpen && (
            <ul className={styles.dashboard__sectionBox__list}>
              <Link href={'/OrdersFormPage'}>
                <li className={styles.dashboard__sectionBox__listItem}>
                  Nuevo Pedido
                </li>
              </Link>
              <Link href={'/OrdersListPage'}>
                <li className={styles.dashboard__sectionBox__listItem}>
                  Ver Listado
                </li>
              </Link>
            </ul>
          )}
        </div>

        <div className={styles.dashboard__sectionBox}>
          <h2
            className={styles.dashboard__sectionBox__listTitle}
            onClick={() => handleOpen('suppliers')}
          >
            Proveedores
          </h2>
          {selected === 'suppliers' && menuOpen && (
            <ul className={styles.dashboard__sectionBox__list}>
              <Link href={'/SuppliersFormPage'}>
                <li className={styles.dashboard__sectionBox__listItem}>
                  Nuevo Proveedor
                </li>
              </Link>
              <Link href={'/SuppliersListPage'}>
                <li className={styles.dashboard__sectionBox__listItem}>
                  Ver Listado
                </li>
              </Link>
            </ul>
          )}
        </div>

        <div className={styles.dashboard__sectionBox}>
          <h2
            className={styles.dashboard__sectionBox__listTitle}
            onClick={() => handleOpen('bodega')}
          >
            Bodega
          </h2>
          {selected === 'bodega' && menuOpen && (
            <ul className={styles.dashboard__sectionBox__list}>
              <li className={styles.dashboard__sectionBox__listItem}>
                Insumos
              </li>
              <li className={styles.dashboard__sectionBox__listItem}>
                Articulos
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
