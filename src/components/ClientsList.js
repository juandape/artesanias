import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import styles from '@styles/ClientsList.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ClientsList() {
  const router = useRouter();
  //data and fetching state
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});

  console.log('imprime la data', data);

  //handle row edits
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      const id = values._id;
      const url = `${BASE_URL}/api/clients/${id}`;
      data[row.index] = values;

      try {
        const res = await axios.patch(url, values);
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Cliente actualizado con éxito',
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
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  // Delete row
  const handleDeleteRow = useCallback(
    (row) => {
      Swal.fire({
        title: `¿Estás seguro de que deseas eliminar a ${row.getValue(
          'name'
        )}?`,
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const url = `${BASE_URL}/api/clients/${row.getValue('_id')}`;
          console.log(url);
          try {
            const res = axios.delete(url);
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Cliente eliminado con éxito',
              showConfirmButton: false,
              timer: 1500,
            });

            // Elimina el cliente de la lista después de la eliminación
            data.splice(row.index, 1);
            setData([...data]);
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
    },
    [data]
  );

  //table state
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }
      const url = new URL(`${BASE_URL}/api/clients`);

      url.searchParams.set(
        'start',
        `${pagination.pageIndex * pagination.pageSize}`
      );
      url.searchParams.set('size', `${pagination.pageSize}`);
      url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
      url.searchParams.set('globalFilter', globalFilter ?? '');
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
  }, [
    columnFilters,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
  ]);

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
        accessorKey: 'name',
        header: 'Nombre',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'phone',
        header: 'Teléfono',
      },
      {
        accessorKey: 'address',
        header: 'Dirección',
      },
      {
        accessorKey: 'neighborhood',
        header: 'Barrio',
      },
      {
        accessorKey: 'city',
        header: 'Ciudad',
      },
      {
        accessorKey: 'instagram',
        header: 'Instagram',
      },
    ],
    []
  );

  return (
    <>
      <a href='/' className={styles.back}>
        {' '}
        ←{' '}
      </a>
      <h1 className={styles.clientListTitle}>Lista de Clientes</h1>
      <div>
        <MaterialReactTable
          displayColumnDefOptions={{
            'mrt-row-actions': {
              muiTableHeadCellProps: {
                align: 'center',
              },
              size: 120,
            },
          }}
          columns={columns}
          data={data}
          editingMode='modal' // Default
          enableColumnOrdering
          enableEditing
          initialState={{columnVisibility: { _id: false }}}
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement='left' title='Edit'>
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement='right' title='Delete'>
                <IconButton color='error' onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
      </div>
    </>
  );
}
