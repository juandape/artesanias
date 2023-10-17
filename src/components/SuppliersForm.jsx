import style from '../styles/SuppliersForm.module.css';

export default function SuppliersForm() {
  return (
    <div>
      <h1 className={style.ProveedoresForm__title}>Formulario Proveedores</h1>
      <form className={style.ProveedoresForm__container}>
        <label>
          Nombre Proveedor:
          <input
            type='text'
            name='name'
            className={style.ProveedoresForm__container__input}
          />
        </label>
        <label>
          NIT:
          <input
            type='number'
            name='nit'
            className={style.ProveedoresForm__container__input}
          />
        </label>
        <label>
          Email:
          <input
            type='email'
            name='email'
            className={style.ProveedoresForm__container__input}
          />
        </label>
        <label>
          Dirección:
          <input
            type='text'
            name='address'
            className={style.ProveedoresForm__container__input}
          />
        </label>
        <label>
          Teléfono:
          <input
            type='number'
            name='phone'
            className={style.ProveedoresForm__container__input}
          />
        </label>
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
}
