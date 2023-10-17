'use client';

import { useState } from 'react';
import styles from '@/styles/OrdersForm.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/orders`;
console.log(url);

const initialFormState = {
  numeroPedido: '',
  linea: '',
  cliente: '',
  codigoProducto: '',
  cantidad: '',
  valorUnitario: '',
  valorTransporte: '',
  valorTotal: '',
  fechaSolicitud: '',
  fechaEntregaEstimada: '',
  fechaEntregaReal: '',
  estado: '',
};

export default function OrdersForm() {
  const router = useRouter();
  const [orders, setOrders] = useState(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(orders);

    try {
      const res = await axios.post(url, orders);
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    setOrders(initialFormState);
    console.log('form submitted');
    router.push('/OrdersListPage');
  };

  const handleChange = (e) => {
    setOrders({
      ...orders,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <a href='/' className={styles.back}>
        ←
      </a>
      <h1 className={styles.OrdersForm__title}>Pedidos</h1>
      <form className={styles.OrdersForm__container} onSubmit={handleSubmit}>
        <label className={styles.OrdersForm_container_label}>
          Numero Pedido:
        </label>
        <input
          type='number'
          name='numeroPedido'
          className={styles.OrdersForm__container__input}
          placeholder='ingresa el numero de pedido'
          value={orders.numeroPedido}
          onChange={handleChange}
        />

        <label className={styles.OrdersForm_container_label}>linea:</label>
        <input
          type='text'
          name='linea'
          className={styles.OrdersForm__container__input}
          placeholder='ingresa la linea'
          value={orders.linea}
          onChange={handleChange}
        />

        <label className={styles.OrdersForm_container_label}>Cliente:</label>
        <input
          type='text'
          name='cliente'
          className={styles.OrdersForm__container__input}
          placeholder='ingresa el cliente'
          value={orders.cliente}
          onChange={handleChange}
        />

        <label className={styles.OrdersForm_container_label}>
          Codigo Producto:
        </label>
        <input
          type='text'
          name='codigoProducto'
          className={styles.OrdersForm__container__input}
          placeholder='ingresa el codigo del producto'
          value={orders.codigoProducto}
          onChange={handleChange}
        />

        <label className={styles.OrdersForm_container_label}>Cantidad:</label>
        <input
          type='number'
          name='cantidad'
          className={styles.OrdersForm__container__input}
          placeholder='ingresa la cantidad'
          value={orders.cantidad}
          onChange={handleChange}
        />

        <label className={styles.OrdersForm_container_label}>
          Valor Unitario:
        </label>
        <input
          type='number'
          name='valorUnitario'
          className={styles.OrdersForm__container__input}
          placeholder='ingresa el valor unitario'
          value={orders.valorUnitario}
          onChange={handleChange}
        />

        <label className={styles.OrdersForm_container_label}>
          Valor Transporte:
        </label>
        <input
          type='number'
          name='valorTransporte'
          className={styles.OrdersForm__container__input}
          placeholder='ingresa el valor del transporte'
          value={orders.valorTransporte}
          onChange={handleChange}
        />

        <label className={styles.OrdersForm_container_label}>
          Valor Total:
        </label>
        <input
          type='number'
          name='valorTotal'
          className={styles.OrdersForm__container__input}
          placeholder='ingresa el valor total'
          value={orders.valorTotal}
          onChange={handleChange}
        />

        <label className={styles.OrdersForm_container_label}>
          Fecha Solicitud:
        </label>
        <input
          type='date'
          name='fechaSolicitud'
          className={styles.OrdersForm__container__input}
          value={orders.fechaSolicitud}
          onChange={handleChange}
        />

        <label className={styles.OrdersForm_container_label}>
          Fecha Entrega Estimada:
        </label>
        <input
          type='date'
          name='fechaEntregaEstimada'
          className={styles.OrdersForm__container__input}
          value={orders.fechaEntregaEstimada}
          onChange={handleChange}
        />

        <label className={styles.OrdersForm_container_label}>
          Fecha Entrega Real:
        </label>
        <input
          type='date'
          name='fechaEntregaReal'
          className={styles.OrdersForm__container__input}
          value={orders.fechaEntregaReal}
          onChange={handleChange}
        />

        <label className={styles.OrdersForm_container_label}>Estado:</label>
        <select name='estado' className={styles.OrdersForm__container__input} value={orders.estado} onChange={handleChange}>
          <option value='' disabled hidden >
            Seleccione una opción
          </option>
          <option value='pendiente'>Pendiente</option>
          <option value='asignado'>Inventario asignado</option>
          <option value='pendientedecobro'>
            Despachado pendiente de cobro
          </option>
          <option value='pagado'>Despachado y cancelado</option>
        </select>

        <button type='submit' className={styles.button}>
          Enviar
        </button>
      </form>
    </div>
  );
}
