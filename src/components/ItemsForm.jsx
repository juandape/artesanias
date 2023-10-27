'use client';

import { useState } from 'react';
import styles from '@styles/Form.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/items`;

const initialFormState = {
  itemCode: '',
  itemDescription: '',
  itemFamily: '',
  unitCost: '',
  unitPrice: '',
  weight: '',
  estimatedMinUn: '',
};

export default function ClientsForm() {
  const router = useRouter();
  const [productos, setProductos] = useState(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productos);

    try {
      const res = await axios.post(url, productos);
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    setProductos(initialFormState);
    console.log('form submitted');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto creado',
      showConfirmButton: false,
      timer: 1500,
    });
    // router.push('/ItemsListPage');
  };

  const handleChange = (e) => {
    setProductos({
      ...productos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <a href='/' className={styles.back}>
        ←
      </a>
      <h1 className={styles.Form__title}>Crear Nuevo Producto</h1>
      <form className={styles.Form__container} onSubmit={handleSubmit}>
        <label className={styles.Form_container_label}>Codigo Producto:</label>
        <input
          type='text'
          name='itemCode'
          value={productos.itemcode}
          className={styles.Form__container__input}
          placeholder='ingresa el codigo del producto'
          onChange={handleChange}
          required
        />

        <label className={styles.Form_container_label}>Descripcion:</label>
        <input
          type='text'
          name='itemDescription'
          value={productos.itemDescription}
          placeholder='ingresa la descripcion del producto'
          className={styles.Form__container__input}
          onChange={handleChange}
          required
        />

        <label className={styles.Form_container_label}>Familia:</label>
        <input
          type='text'
          name='itemFamily'
          value={productos.itemFamily}
          placeholder='ingresa la familia del producto'
          className={styles.Form__container__input}
          onChange={handleChange}
          required
        />

        <label className={styles.Form_container_label}>Costo Unitario:</label>
        <input
          type='number'
          name='unitCost'
          value={productos.unitCost}
          placeholder='ingresa el costo unitario'
          className={styles.Form__container__input}
          onChange={handleChange}
          required
        />

        <label className={styles.Form_container_label}>Precio Unitario:</label>
        <input
          type='number'
          name='unitPrice'
          value={productos.unitPrice}
          placeholder='ingresa el precio unitario'
          className={styles.Form__container__input}
          onChange={handleChange}
          required
        />

        <label className={styles.Form_container_label}>Min/un estimado:</label>
        <input
          type='number'
          name='estimatedMinUn'
          value={productos.estimatedMinUn}
          placeholder='ingresa el min/un estimado'
          className={styles.Form__container__input}
          onChange={handleChange}
          required
        />

        <label className={styles.Form_container_label}>Peso (grs):</label>
        <input
          type='number'
          name='weight'
          value={productos.weight}
          placeholder='ingresa el peso del producto'
          className={styles.Form__container__input}
          onChange={handleChange}
        />

        <button type='submit' className={styles.button}>
          Enviar
        </button>
      </form>
    </div>
  );
}
