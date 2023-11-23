'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '@/styles/Form.module.css';
import Swal from 'sweetalert2';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/supplies`;

const initialFormState = {
  supplierName: '',
  supplieCode: '',
  supplieDescription: '',
  unitCost: '',
  udm: '',
  colorGroup: '',
  size: '',
  quantity: '',
};

export default function SuppliesForm() {
  const router = useRouter();
  const [insumos, setInsumos] = useState(initialFormState);
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/suppliers`);
        setProveedores(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(insumos);

    try {
      const res = await axios.post(url, insumos);
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    setInsumos(initialFormState);
    console.log('form submitted');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Insumo creado',
      showConfirmButton: false,
      timer: 1500,
    });
    router.push('/SuppliesListPage');
  };

  const handleChange = (e) => {
    setInsumos({
      ...insumos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <a href='/' className={styles.back}>
        ←
      </a>
      <h1 className={styles.Form__title}>Crear Nuevo Insumo</h1>
      <form className={styles.Form__container} onSubmit={handleSubmit}>
        <label className={styles.Form_container_label}>Nombre Proveedor:</label>
        <select
          name='supplierName'
          className={styles.Form__container__input}
          value={insumos.supplierName}
          onChange={handleChange}
          required
        >
          <option value='' disabled hidden>
            Seleccione un Proveedor
          </option>
          {proveedores.map((proveedor) => (
            <option key={proveedor._id} value={proveedor._id}>
              {proveedor.name}
            </option>
          ))}
        </select>

        <label className={styles.Form_container_label}>Codigo Insumo:</label>
        <input
          type='text'
          name='supplieCode'
          value={insumos.supplieCode}
          className={styles.Form__container__input}
          placeholder='Ingresa el codigo del insumo'
          onChange={handleChange}
        />

        <label className={styles.Form_container_label}>
          Descripcion Insumo:
        </label>
        <input
          type='text'
          name='supplieDescription'
          value={insumos.supplieDescription}
          className={styles.Form__container__input}
          placeholder='Ingresa descripcion del insumo'
          onChange={handleChange}
          required
        />

        <label className={styles.Form_container_label}>Costo unitario:</label>
        <input
          type='number'
          name='unitCost'
          value={insumos.unitCost}
          className={styles.Form__container__input}
          placeholder='Ingresa el costo unitario'
          onChange={handleChange}
          required
        />

        <label className={styles.Form_container_label}>UDM:</label>
        <input
          type='text'
          name='udm'
          value={insumos.udm}
          className={styles.Form__container__input}
          placeholder='Ingresa la unidad de medida'
          onChange={handleChange}
          required
        />

        <label className={styles.Form_container_label}>Grupo Color:</label>
        <input
          type='text'
          name='colorGroup'
          value={insumos.colorGroup}
          className={styles.Form__container__input}
          placeholder='Ingresa el color'
          onChange={handleChange}
          required
        />

        <label className={styles.Form_container_label}>Tamaño:</label>
        <input
          type='number'
          name='size'
          value={insumos.size}
          className={styles.Form__container__input}
          placeholder='Ingresa el tamaño'
          onChange={handleChange}
          required
        />

        <label className={styles.Form_container_label}>Cantidad:</label>
        <input
          type='number'
          name='quantity'
          value={insumos.quantity}
          className={styles.Form__container__input}
          placeholder='Ingresa la cantidad'
          onChange={handleChange}
        />

        <button type='submit' className={styles.button}>
          Enviar
        </button>
      </form>
    </div>
  );
}
