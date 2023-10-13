'use client';

import { useState } from 'react';
import styles from '@styles/ClientesForm.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/clients`;
console.log(url);

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  neighborhood: '',
  city: '',
  instagram: '',
};

function ClientsForm() {
  const router = useRouter();
  const [clientes, setClientes] = useState(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(clientes);

    try {
      const res = await axios.post(url, clientes);
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    setClientes(initialFormState);
    console.log('form submitted');
    router.push('/ListaClientes');
  };

  const handleChange = (e) => {
    setClientes({
      ...clientes,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <a href='/' className={styles.back}>Inicio</a>
      <h1 className={styles.ClientesForm__title}>Formulario Clientes</h1>
      <form className={styles.ClientesForm__container} onSubmit={handleSubmit}>
        <label>
          Nombre Cliente:
          <input
            type='text'
            name='name'
            value={clientes.name}
            className={styles.ClientesForm__container__input}
            placeholder='ingresa el nombre'
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type='email'
            name='email'
            value={clientes.email}
            placeholder='correo@mail.com'
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
            className={styles.ClientesForm__container__input}
            onChange={handleChange}
          />
        </label>
        <label>
          Teléfono:
          <input
            type='number'
            name='phone'
            value={clientes.phone}
            placeholder='celular'
            className={styles.ClientesForm__container__input}
            onChange={handleChange}
            maxLength={10}
            required
          />
        </label>
        <label>
          Dirección:
          <input
            type='text'
            name='address'
            value={clientes.address}
            placeholder='calle 123 # 123-123'
            className={styles.ClientesForm__container__input}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Barrio:
          <input
            type='text'
            name='neighborhood'
            value={clientes.neighborhood}
            placeholder='barrio'
            className={styles.ClientesForm__container__input}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Ciudad:
          <input
            type='text'
            name='city'
            value={clientes.city}
            placeholder='ingresa la ciudad'
            className={styles.ClientesForm__container__input}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Instagram:
          <input
            type='text'
            name='instagram'
            value={clientes.instagram}
            placeholder='@instagram'
            className={styles.ClientesForm__container__input}
            onChange={handleChange}
          />
        </label>
        <button type='submit' className={styles.back}>Enviar</button>
      </form>
    </div>
  );
}

export default ClientsForm;
