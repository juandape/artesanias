import { useState, useEffect, useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HeaderTitle from '@components/HeaderTitle';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function SuppliesList() {
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

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/suppliers`);
        setSuppliers(res.data);
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
      const url = new URL(`${BASE_URL}/api/supplies`);

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

  const handleEdit = async ({ exitEditingMode, row, values }) => {
    const id = values._id;
    const url = `${BASE_URL}/api/supplies/${id}`;
    data[row.index] = values;

    try {
      const res = await axios.patch(url, values);
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Insumo actualizado con éxito',
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

    setData([...data]);
    exitEditingMode();
  };

  const handleDelete = async (row) => {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar este insumo?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const id = row.getValue('_id');
        const url = `${BASE_URL}/api/supplies/${id}`;

        try {
          const res = axios.delete(url);
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Insumo eliminado con éxito',
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
        }
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: '_id',
        header: 'Id',
        enableEditing: false,
        enableSorting: false,
        enableColumnOrdering: false,
        size: 50,
      },
      {
        accessorKey: 'supplierName',
        header: 'Nombre Proveedor',
        enableEditing: false,
        Cell: ({ row }) => {
          if (suppliers.length === 0) return 'Cargando...';
          const supplier = suppliers.find(
            (supplier) => supplier._id === row.getValue('supplierName')
          );
          return supplier ? supplier.name : '';
        },
      },

      {
        accessorKey: 'supplieCode',
        header: 'Código',
      },
      {
        accessorKey: 'supplieDescription',
        header: 'Descripción',
      },
      {
        accessorKey: 'unitCost',
        header: 'Costo Unitario',
      },
      {
        accessorKey: 'udm',
        header: 'UDM',
      },
      {
        accessorKey: 'colorGroup',
        header: 'Grupo de Color',
      },
      {
        accessorKey: 'size',
        header: 'Tamaño',
      },
      {
        accessorKey: 'quantity',
        header: 'Cantidad',
      },
    ],
    [suppliers]
  );

  const table = useMaterialReactTable({
    columns,
    data,
    editDisplayMode: 'modal', // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    enableStickyHeader: true,
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
    <>
      <HeaderTitle title='Lista de Insumos' />
      <div>
        <MaterialReactTable table={table} />
      </div>
    </>
  );
}
