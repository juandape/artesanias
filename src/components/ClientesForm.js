import { useState } from 'react';
import styles from '@styles/ClientesForm.module.css';
import { useRouter } from 'next/router';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  neighborhood: '',
  city: '',
  instagram: '',
};

function ClientesForm() {
  const router = useRouter();
  const [clientes, setClientes] = useState(initialFormState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(clientes);
    router.push({
      pathname: '/ListaClientes',
      query: { data: JSON.stringify(clientes) },
    });

    setClientes(initialFormState);
    console.log('form submitted');
  };

  const handleChange = (e) => {
    setClientes({
      ...clientes,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1 className={styles.ClientesForm__title}>Formulario Clientes</h1>
      <form className={styles.ClientesForm__container} onSubmit={handleSubmit}>
        <label>
          Nombre Cliente:
          <input
            type='text'
            name='name'
            value={clientes.name}
            className={styles.ClientesForm__container__input}
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
            className={styles.ClientesForm__container__input}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
}

export default ClientesForm;
