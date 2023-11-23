import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HeaderTitle from '@components/HeaderTitle';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function OrdersList() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [clients, setClients] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsRes, itemsRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/clients`),
          axios.get(`${BASE_URL}/api/items`),
        ]);
        setClients(clientsRes.data);
        setItems(itemsRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }
      const url = new URL(`${BASE_URL}/api/orders`);

      url.searchParams.set(
        'start',
        `${pagination.pageIndex * pagination.pageSize}`
      );
      url.searchParams.set('size', `${pagination.pageSize}`);
      url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

      try {
        const res = await axios.get(url);
        setData(res.data);
        setRowCount(res.data.length);
      } catch (error) {
        setIsError(true);
        console.log(error);
        return;
      }
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };
    fetchData();
  }, [pagination.pageIndex, pagination.pageSize, sorting]);

  const filterItemsById = (itemIds) => {
    return items.filter((item) => itemIds.includes(item._id));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: '_id',
        header: 'Id',
        enableEditing: false,
        size: 50,
      },
      {
        accessorKey: 'line',
        header: 'Linea',
        enableEditing: false,
      },
      {
        accessorKey: 'client',
        header: 'Nombre Cliente',
        Cell: ({ row }) => {
          if (clients.length === 0) return 'Cargando...';
          const client = clients.find(
            (client) => client._id === row.getValue('client')
          );
          return client ? client.name : '';
        },
        enableEditing: false,
      },
      {
        accessorKey: 'items',
        header: 'Artículos',
        Cell: ({ row }) => {
          const itemIds = row.getValue('items');
          const filteredItems = filterItemsById(itemIds);
          return filteredItems.map((item) => (
            <div key={item._id}>{item.itemCode}</div>
          ));
        },
        enableEditing: false,
      },
      {
        accessorKey: 'quantity',
        header: 'Cantidad',
        enableEditing: false,
        muiEditTextFieldProps: {
          type: 'number',
          required: true,
          onFocus: (e) => e.target.select(),
        },
      },
      {
        accessorKey: 'unitPrice',
        header: 'Precio Unitario',
        enableEditing: true,
        Cell: ({ row }) => {
          const unitPrice = row.getValue('unitPrice');
          return unitPrice.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP',
          });
        },
      },
      {
        accessorKey: 'shipment',
        header: 'Costo Envío',
        enableEditing: true,
        Cell: ({ row }) => {
          const shipment = row.getValue('shipment');
          return shipment.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP',
          });
        },
      },
      {
        accessorKey: 'totalPrice',
        header: 'Precio Total',
        accessorKey: 'totalPrice',
        header: 'Precio Total',
        enableEditing: true,
        Cell: ({ row }) => {
          const totalPrice = row.getValue('totalPrice');
          return totalPrice.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP',
          });
        },
      },
      {
        accessorKey: 'orderDate',
        header: 'Fecha Pedido',
        Cell: ({ row }) => {
          const orderDate = new Date(row.getValue('orderDate'));
          return orderDate.toLocaleDateString();
        },
        enableEditing: false,
      },
      {
        accessorKey: 'deadline',
        header: 'Fecha Límite',
        Cell: ({ row }) => {
          const orderDate = new Date(row.getValue('deadline'));
          return orderDate.toLocaleDateString();
        },
        enableEditing: true,
      },
      {
        accessorKey: 'deliveryDate',
        header: 'Fecha Entrega',
        Cell: ({ row }) => {
          const orderDate = new Date(row.getValue('deliveryDate'));
          return orderDate.toLocaleDateString();
        },
        muiEditTextFieldProps: {
          type: 'date',
          required: false,
          onFocus: (e) => e.target.select(),
        },
      },
      {
        accessorKey: 'status',
        header: 'Estado',
        editVariant: 'select',
        editSelectOptions: [
          { value: 'Pendiente', label: 'Pendiente' },
          { value: 'Inventario asignado', label: 'Inventario asignado' },
          {
            value: 'Despachado y pendiente de cobro',
            label: 'Despachado y pendiente de cobro',
          },
          { value: 'Despachado y cancelado', label: 'Despachado y cancelado' },
        ],
        muiEditTextFieldProps: {
          select: true,
          required: true,
        },
      },
    ],
    [clients]
  );

  const handleEdit = async ({ values, table }) => {
    const id = values._id;
    const url = `${BASE_URL}/api/orders/${id}`;
    try {
      const res = await axios.patch(url, values);
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Orden actualizada con éxito',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal, por favor intente de nuevo',
        footer: `${error}`,
      });
      return;
    }
    table.setEditingRow(null);
  };

  const handleDelete = async (row) => {
    console.log(row);
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar esta linea?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const id = row.getValue('_id');
        const url = `${BASE_URL}/api/orders/${id}`;
        try {
          const res = await axios.delete(url);
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Orden eliminada con éxito',
            showConfirmButton: false,
            timer: 1500,
          });
          router.reload();
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal, por favor intente de nuevo',
            footer: `${error}`,
          });
          return;
        }
        setData([...data]);
      }
    });
  };

  const table = useMaterialReactTable({
    columns,
    data,
    editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row._id,
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onEditingRowSave: handleEdit,
    onEditingRowCancel: () => {},
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip arrow placement='left' title='Edit'>
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement='right' title='Delete'>
          <IconButton color='error' onClick={() => handleDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    rowCount,
    state: {
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
  });

  return (
    <div>
      <HeaderTitle title='Lista de Pedidos' />
      <div>
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
}
