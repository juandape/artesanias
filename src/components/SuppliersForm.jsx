'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '@/styles/SuppliersForm.module.css';
import Swal from 'sweetalert2';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/suppliers`;

const initialFormState = {
  name: '',
  nit: '',
  email: '',
  address: '',
  phone: '',
};

export default function SuppliersForm() {
  const router = useRouter();
  const [proveedores, setProveedores] = useState(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(proveedores);

    try {
      const res = await axios.post(url, proveedores);
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    setProveedores(initialFormState);
    console.log('form submitted');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Proveedor creado',
      showConfirmButton: false,
      timer: 1500,
    });
    router.push('/SuppliersListPage');
  }

  const handleChange = (e) => {
    setProveedores({
      ...proveedores,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className={styles.container}>
       <a href='/' className={styles.back}>
        ←
      </a>
      <h1 className={styles.ProveedoresForm__title}>Formulario Proveedores</h1>
      <form className={styles.ProveedoresForm__container} onSubmit={handleSubmit}>
        <label className={styles.ProveedoresForm_container_label}>
          Nombre Proveedor:
        </label>
        <input
          type='text'
          name='name'
          className={styles.ProveedoresForm__container__input}
          placeholder='Nombre Proveedor'
          onChange={handleChange}
          required
        />

        <label className={styles.ProveedoresForm_container_label}>NIT:</label>
        <input
          type='number'
          name='nit'
          className={styles.ProveedoresForm__container__input}
          placeholder='NIT'
          onChange={handleChange}
          required
        />

        <label className={styles.ProveedoresForm_container_label}>Email:</label>
        <input
          type='email'
          name='email'
          className={styles.ProveedoresForm__container__input}
          placeholder='correo@email.com'
          onChange={handleChange}
        />

        <label className={styles.ProveedoresForm_container_label}>
          Dirección:
        </label>
        <input
          type='text'
          name='address'
          className={styles.ProveedoresForm__container__input}
          placeholder='calle 123 # 123'
          onChange={handleChange}
          required
        />

        <label className={styles.ProveedoresForm_container_label}>
          Teléfono:
        </label>
        <input
          type='number'
          name='phone'
          className={styles.ProveedoresForm__container__input}
          placeholder='Teléfono'
          onChange={handleChange}
          maxLength={10}
          required
        />

        <button type='submit' className={styles.button}>
          Enviar
        </button>
      </form>
    </div>
  );
}
