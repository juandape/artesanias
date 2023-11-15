import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Summary.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Summary() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersRes = await axios.get(`${BASE_URL}/api/orders`);
        setOrders(ordersRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const calculateTotal = (status) => {
    const total = orders
      .filter((order) => order.status === status)
      .reduce((acc, order) => acc + order.totalPrice, 0);
    return total.toLocaleString({ style: 'currency', currency: 'COP' });
  };

  return (
    <>
      <h1>PAGE UNDER CONSTRUCTION</h1>
      <div className={styles.container}>
        <a href='/' className={styles.back}>
          ←
        </a>
        <h1 className={styles.title}>Resumen</h1>
        <div>
          <div>
            <h2>Clientes</h2>
            <div>Pendiente</div>
            <div>$ {calculateTotal('Pendiente')}</div>
            <div>Inventario Asignado</div>
            <div>$ {calculateTotal('Inventario asignado')}</div>
            <div>Despachado y pendiente de cobro</div>
            <div>$ {calculateTotal('Despachado y pendiente de cobro')}</div>
            <div>Despachado y cancelado</div>
            <div>$ {calculateTotal('Despachado y cancelado')}</div>
          </div>
        </div>
        <div>
          <h3>Despachado y cancelado por mes</h3>
          <select name='' id=''>
            <option value='' disabled hidden>
              Seleccione un mes
            </option>
            <option value=''>enero</option>
            <option value=''>febrero</option>
          </select>
        </div>
      </div>
    </>
  );
}
