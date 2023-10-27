import styles from '../styles/SuppliersForm.module.css';

export default function SuppliersForm() {
  return (
    <div className={styles.container}>
       <a href='/' className={styles.back}>
        ←
      </a>
      <h1 className={styles.ProveedoresForm__title}>Formulario Proveedores</h1>
      <form className={styles.ProveedoresForm__container}>
        <label className={styles.ProveedoresForm_container_label}>
          Nombre Proveedor:
        </label>
        <input
          type='text'
          name='name'
          className={styles.ProveedoresForm__container__input}
        />

        <label className={styles.ProveedoresForm_container_label}>NIT:</label>
        <input
          type='number'
          name='nit'
          className={styles.ProveedoresForm__container__input}
        />

        <label className={styles.ProveedoresForm_container_label}>Email:</label>
        <input
          type='email'
          name='email'
          className={styles.ProveedoresForm__container__input}
        />

        <label className={styles.ProveedoresForm_container_label}>
          Dirección:
        </label>
        <input
          type='text'
          name='address'
          className={styles.ProveedoresForm__container__input}
        />

        <label className={styles.ProveedoresForm_container_label}>
          Teléfono:
        </label>
        <input
          type='number'
          name='phone'
          className={styles.ProveedoresForm__container__input}
        />

        <button type='submit' className={styles.button}>
          Enviar
        </button>
      </form>
    </div>
  );
}
