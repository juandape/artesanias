import styles from '@/styles/Dashboard.module.css';

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <div className={styles.dashboard__container}>
        <div>
          <div>Proveedores</div>
          <div>cant</div>
        </div>

        <div>
          <div>Planta</div>
          <ul>
            <li>Ultima semana</li>
            <li>fecha</li>
            <li>Unidades</li>
            <li>cant</li>
            <li>Horas</li>
            <li>total</li>
          </ul>
        </div>
        <div>
          <div>Bodega</div>
          <ul>
            <li>MP</li>
            <li>costo</li>
            <li>PT</li>
            <li>valor</li>
          </ul>
        </div>
        <div>
          <div>Clientes</div>
          <ul>
            <li>Total Clientes</li>
            <li>cant</li>
            <li>Pendiente entrega</li>
            <li>$, cant clientes</li>
            <li>Pendiente Fabricacion</li>
            <li>$, cant clientes</li>
            <li>Entregado y Pendiente cobro</li>
            <li>$, cant clientes</li>
            <li>Entregado y Cobrado</li>
            <li>$, cant clientes</li>
            <li>Recaudo por mes</li>
          </ul>


        </div>
      </div>
    </>
  );
};

export default Dashboard;
