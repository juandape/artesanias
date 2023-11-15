import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Summary.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Summary() {
  const [orders, setOrders] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

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

  const calculateTotalByMonth = (month, year, status) => {
    const total = orders
      .filter(
        (order) =>
          order.status === status &&
          new Date(order.deliveryDate).toLocaleString('default', { month: 'long' }).toLowerCase() === month.toLowerCase() &&
          new Date(order.deliveryDate).getFullYear().toString() === year
      )
      .reduce((acc, order) => acc + order.totalPrice, 0);
    return total.toLocaleString({ style: 'currency', currency: 'COP' });
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  }

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
        <h3>Despachado y cancelado por mes y año</h3>
          <select name='month' value={selectedMonth} onChange={handleMonthChange}>
            <option value='' disabled>
              Seleccione un mes
            </option>
            <option value='enero'>enero</option>
            <option value='febrero'>febrero</option>
            <option value='marzo'>marzo</option>
            <option value='abril'>abril</option>
            <option value='mayo'>mayo</option>
            <option value='junio'>junio</option>
            <option value='julio'>julio</option>
            <option value='agosto'>agosto</option>
            <option value='septiembre'>septiembre</option>
            <option value='octubre'>octubre</option>
            <option value='noviembre'>noviembre</option>
            <option value='diciembre'>diciembre</option>
          </select>
          <select name='year' value={selectedYear} onChange={handleYearChange}>
            <option value='' disabled>
              Seleccione un año
            </option>
            <option value='2022'>2022</option>
            <option value='2023'>2023</option>
            <option value='2024'>2024</option>

          </select>
          {selectedMonth && selectedYear && (
            <div>
              <div>$ {calculateTotalByMonth(selectedMonth, selectedYear, 'Despachado y cancelado')}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
