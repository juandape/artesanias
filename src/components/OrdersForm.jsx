'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/OrdersForm.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/orders`;
console.log(url);

const initialFormState = {
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
  const [clients, setClients] = useState([]);
  const [items, setItems] = useState([]);
  const [valorUnitario, setValorUnitario] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsRes, itemsRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/clients`),
          axios.get(`${BASE_URL}/api/items`),
        ]);
        setClients(clientsRes.data);
        setItems(itemsRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Función para calcular el valor total
    const calculateTotal = () => {
      const cantidad = parseFloat(orders.cantidad);
      const unitPrice = parseFloat(valorUnitario);
      const transporte = parseFloat(orders.valorTransporte);
      if (!isNaN(cantidad) && !isNaN(unitPrice) && !isNaN(transporte)) {
        const total = cantidad * unitPrice + transporte;
        setOrders({
          ...orders,
          valorTotal: total.toFixed(0), // Redondear a 2 decimales
        });
      } else {
        setOrders({
          ...orders,
          valorTotal: '', // Si hay datos inválidos, establece el valor total en blanco
        });
      }
    };

    calculateTotal(); // Calcula el valor total cuando cambian los valores iniciales

  }, [orders.cantidad, valorUnitario, orders.valorTransporte]);

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
    const { name, value } = e.target;

    // Verificar si el cambio se produce en el campo de "cantidad" o "codigoProducto"
    if (name === 'cantidad' || name === 'codigoProducto') {
      setOrders({
        ...orders,
        [name]: value,
      });
    } else {
      setOrders({
        ...orders,
        [name]: value,
        valorTotal: '', // Si cambia otro campo que no sea cantidad o producto, establecer valorTotal en blanco
      });
    }

    if (name === 'codigoProducto') {
      // Encuentra el producto seleccionado en los datos de productos
      const product = items.find((item) => item.itemDescription === value);
      if (product) {
        setValorUnitario(product.unitPrice);
      } else {
        setValorUnitario(''); // Producto no encontrado, establece el valor unitario en blanco
      }
    }
  };

  return (
    <div className={styles.container}>
      <a href='/' className={styles.back}>
        ←
      </a>
      <h1 className={styles.OrdersForm__title}>Pedidos</h1>
      <form className={styles.OrdersForm__container} onSubmit={handleSubmit}>
        <label className={styles.OrdersForm_container_label}>linea:</label>
        <input
          type='text'
          name='linea'
          className={styles.OrdersForm__container__input}
          placeholder='ingresa la linea'
          value={orders.linea}
          onChange={handleChange}
          required
        />

        <label className={styles.OrdersForm_container_label}>Cliente:</label>
        <select
          name='cliente'
          className={styles.OrdersForm__container__input}
          value={orders.cliente}
          onChange={handleChange}
          required
        >
          <option value='' disabled hidden>
            Seleccione un cliente
          </option>
          {clients.map((client) => (
            <option key={client._id} value={client.name}>
              {client.name}
            </option>
          ))}
        </select>

        <label className={styles.OrdersForm_container_label}>
          Codigo Producto:
        </label>
        <select
          name='codigoProducto'
          className={styles.OrdersForm__container__input}
          value={orders.codigoProducto}
          onChange={handleChange}
          required
        >
          <option value='' disabled hidden>
            Seleccione un producto
          </option>
          {items.map((item) => (
            <option key={item._id} value={item.itemDescription}>
              {item.itemDescription}
            </option>
          ))}
        </select>

        <label className={styles.OrdersForm_container_label}>Cantidad:</label>
        <input
          type='number'
          name='cantidad'
          className={styles.OrdersForm__container__input}
          placeholder='ingresa la cantidad'
          value={orders.cantidad}
          onChange={handleChange}
          required
        />

        <label className={styles.OrdersForm_container_label}>
          Valor Unitario:
        </label>
        <input
          type='number'
          name='valorUnitario'
          className={styles.OrdersForm__container__input}
          placeholder='Valor unitario del producto'
          value={valorUnitario}
          onChange={handleChange}
          readOnly
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
          required
        />

        <label className={styles.OrdersForm_container_label}>
          Valor Total:
        </label>
        <input
          type="number"
          name="valorTotal"
          className={styles.OrdersForm__container__input}
          placeholder="Valor total"
          value={orders.valorTotal}
          onChange={handleChange}
          readOnly
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
          required
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
          required
        />

        <label className={styles.OrdersForm_container_label}>Estado:</label>
        <select
          name='estado'
          className={styles.OrdersForm__container__input}
          value={orders.estado}
          onChange={handleChange}
          required
        >
          <option value='' disabled hidden>
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
