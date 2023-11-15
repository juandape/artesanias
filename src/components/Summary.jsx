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
          new Date(order.deliveryDate)
            .toLocaleString('default', { month: 'long' })
            .toLowerCase() === month.toLowerCase() &&
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
          <div className={styles.valueContainer}>
            <div className={styles.subtitle}>Clientes</div>
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
        <div className={styles.valueContainer}>
          <div className={styles.subtitle}>Despachado y cancelado por mes</div>
          <select
            name='month'
            value={selectedMonth}
            onChange={handleMonthChange}
            className={styles.select}
          >
            <option value='' disabled>
              Seleccione mes
            </option>
            <option value='enero'>Enero</option>
            <option value='febrero'>Febrero</option>
            <option value='marzo'>Marzo</option>
            <option value='abril'>Abril</option>
            <option value='mayo'>Mayo</option>
            <option value='junio'>Junio</option>
            <option value='julio'>Julio</option>
            <option value='agosto'>Agosto</option>
            <option value='septiembre'>Septiembre</option>
            <option value='octubre'>Octubre</option>
            <option value='noviembre'>Noviembre</option>
            <option value='diciembre'>Diciembre</option>
          </select>
          <select
            name='year'
            value={selectedYear}
            onChange={handleYearChange}
            className={styles.select}
          >
            <option value='' disabled>
              Seleccione año
            </option>
            <option value='2023'>2023</option>
            <option value='2024'>2024</option>
            <option value='2025'>2025</option>
            <option value='2026'>2026</option>
          </select>
          {selectedMonth && selectedYear && (
            <div>
              <div className={styles.value}>
                {' '}
                <strong>
                  -&gt; ${' '}
                  {calculateTotalByMonth(
                    selectedMonth,
                    selectedYear,
                    'Despachado y cancelado'
                  )}
                </strong>{' '}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
