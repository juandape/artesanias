import styles from '@styles/ClientesForm.module.css';

function ClientesForm() {
  return (
    <div>
      <h1 className={styles.ClientesForm__title}>Formulario Clientes</h1>
      <form className={styles.ClientesForm__container}>
        <label>
          Nombre Cliente:
          <input
            type='text'
            name='name'
            className={styles.ClientesForm__container__input}
          />
        </label>
        <label>
          Email:
          <input
            type='email'
            name='email'
            className={styles.ClientesForm__container__input}
          />
        </label>
        <label>
          Dirección:
          <input
            type='text'
            name='address'
            className={styles.ClientesForm__container__input}
          />
        </label>
        <label>
          Teléfono:
          <input
            type='number'
            name='phone'
            className={styles.ClientesForm__container__input}
          />
        </label>
        <label>
          Instagram:
          <input
            type='text'
            name='instagram'
            className={styles.ClientesForm__container__input}
          />
        </label>
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
}

export default ClientesForm;
