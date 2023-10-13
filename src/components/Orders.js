function Orders() {
  return (
    <div>
      <h1>Pedidos</h1>
      <form>
        <label>
          Numero Pedido:
          <input type='number' name='numeroPedido' />
        </label>
        <label>
          linea:
          <input type='text' name='linea' />
        </label>
        <label>
          Cliente:
          <input type='text' name='cliente' />
        </label>
        <label>
          Codigo Producto:
          <input type='text' name='codigoProducto' />
        </label>
        <label>
          Cantidad:
          <input type='number' name='cantidad' />
        </label>
        <label>
          Valor Unitario:
          <input type='number' name='valorUnitario' />
        </label>
        <label>
          Valor Transporte:
          <input type='number' name='valorTransporte' />
        </label>
        <label>
          Valor Total:
          <input type='number' name='valorTotal' />
        </label>
        <label>
          Fecha Solicitud:
          <input type='date' name='fechaSolicitud' />
        </label>
        <label>
          Fecha Entrega Estimada:
          <input type='date' name='fechaEntregaEstimada' />
        </label>
        <label>
          Fecha Entrega Real:
          <input type='date' name='fechaEntregaReal' />
        </label>
        <label>
          Estado:
          <select name='estado'>
            <option value='' disabled selected hidden>
              Seleccione una opción
            </option>
            <option value='pendiente'>Pendiente</option>
            <option value='asignado'>Inventario asignado</option>
            <option value='pendientedecobro'>
              Despachado pendiente de cobro
            </option>
            <option value='pagado'>Despachado y cancelado</option>
          </select>
        </label>
      </form>
    </div>
  );
}

export default Orders;
