import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import HeaderTitle from '@components/HeaderTitle';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function itemsList() {
  const router = useRouter();
  //data and fetching state
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});

  //handle row edits
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      const id = values._id;
      const url = `${BASE_URL}/api/items/${id}`;
      data[row.index] = values;

      try {
        const res = await axios.patch(url, values);
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado con éxito',
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
          const url = `${BASE_URL}/api/items/${row.getValue('_id')}`;
          console.log(url);
          try {
            const res = axios.delete(url);
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Producto eliminado con éxito',
              showConfirmButton: false,
              timer: 1500,
            });

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
      const url = new URL(`${BASE_URL}/api/items`);

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

  const calculateMarginPerHour = (
    unitCost,
    unitPrice,
    realMinUn,
    estimatedMinUn
  ) => {
    if (!isNaN(realMinUn) && parseFloat(realMinUn) > 0) {
      return ((unitPrice - unitCost) / parseFloat(realMinUn)) * 60;
    } else {
      return ((unitPrice - unitCost) / estimatedMinUn) * 60;
    }
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
        accessorKey: 'itemCode',
        header: 'Codigo Producto',
      },
      {
        accessorKey: 'itemDescription',
        header: 'Descripción',
      },
      {
        accessorKey: 'itemFamily',
        header: 'Familia',
      },
      {
        accessorKey: 'unitCost',
        header: 'Costo Unitario',
        Cell: ({ row }) => {
          const unitCost = row.original.unitCost;
          return <span>${unitCost.toLocaleString()}</span>;
        },
      },
      {
        accessorKey: 'unitPrice',
        header: 'Precio Unitario',
        Cell: ({ row }) => {
          const unitPrice = row.original.unitPrice;
          return <span>${unitPrice.toLocaleString()}</span>;
        },
      },
      {
        accessorKey: 'marginPerHour',
        header: 'Margen por Hora',
        Cell: ({ row }) => {
          const unitCost = row.original.unitCost;
          const unitPrice = row.original.unitPrice;
          const realMinUn = row.original.realMinUn;
          const estimatedMinUn = row.original.estimatedMinUn;
          const marginPerHour = calculateMarginPerHour(
            unitCost,
            unitPrice,
            realMinUn,
            estimatedMinUn
          );
          return <span>${marginPerHour.toLocaleString()}</span>;
        },
        enableEditing: false,
      },
      {
        accessorKey: 'weight',
        header: 'Peso',
      },
      {
        accessorKey: 'realMinUn',
        header: 'Min/un Real',
      },
      {
        accessorKey: 'estimatedMinUn',
        header: 'Min/un Estimado',
      },
      {
        accessorKey: 'quantity',
        header: 'Cantidad',
      },
    ],
    []
  );

  const handleExport = () => {
    csvExporter.generateCsv(data);
  };

  return (
    <>
      <HeaderTitle title='Lista de Productos' />
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
          editingMode='modal'
          enableColumnOrdering
          enableEditing
          enableStickyHeader
          initialState={{ columnVisibility: { _id: false } }}
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
