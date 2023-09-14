import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { MaterialReactTable } from 'material-react-table';
import Swal from 'sweetalert2';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import db from '../../public/db.json';

export default function ListaClientes() {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [tableData, setTableData] = useState(() => db.clientes);
  const [validationErrors, setValidationErrors] = useState({});

  const handleSaveRowEdits = ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      console.log(tableData)
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(async (row) => {
    const result = await Swal.fire({
      title: 'Are you sure you want to delete? This will permanently delete the row.',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    });

    if (result.isConfirmed) {
      Swal.fire('Deleted!', '', 'success');
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    }
  }, [tableData]);

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (e) => {
          const isValid =
            cell.column.id === 'name'
              ? validateName(e.target.value)
              : cell.column.id === 'email'
              ? validateEmail(e.target.value)
              : cell.column.id === 'phone'
              ? validatePhone(e.target.value)
              : cell.column.id === 'address'
              ? validateAddress(e.target.value)
              : cell.column.id === 'neighborhood'
              ? validateNeighborhood(e.target.value)
              : cell.column.id === 'city'
              ? validateCity(e.target.value)
              : cell.column.id === 'instagram'
              ? validateInstagram(e.target.value)
              : true;

          if (!isValid) {
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              [cell.id]: `Invalid ${cell.column.columnDef.header}`,
            }));
          } else {
            setValidationErrors((prevErrors) => {
              const newErrors = { ...prevErrors };
              delete newErrors[cell.id];
              return newErrors;
            });
          }
        },
      };
    },
    [validationErrors]
  );


  useEffect(() => {
    const formDataString = router.query.data;
    if (formDataString) {
      const formDataObj = JSON.parse(formDataString);
      setFormData(formDataObj);
    }
  }, [router.query.data]);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row.id,
        header: 'Id',
        accessor: 'id',
        enableEditing: false,
        enableSorting: false,
        enableColumnOrdering: false,
      },
      {
        accessorFn: (row) => row.name,
        header: 'Nombre',
        accessor: 'name',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorFn: (row) => row.email,
        header: 'Email',
        accessor: 'email',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorFn: (row) => row.phone,
        header: 'Teléfono',
        accessor: 'phone',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorFn: (row) => row.address,
        header: 'Dirección',
        accessor: 'address',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorFn: (row) => row.neighborhood,
        header: 'Barrio',
        accessor: 'neighborhood',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorFn: (row) => row.city,
        header: 'Ciudad',
        accessor: 'city',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorFn: (row) => row.instagram,
        header: 'Instagram',
        accessor: 'instagram',
        muiTableBodyCellEditTextFielProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );

  return (
    <>
      <a href='/'>Inicio</a>
      <div>
        <>
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
            data={tableData}
            editingMode='modal' //default
            enableColumnOrdering
            enableEditing
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
                  <IconButton
                    color='error'
                    onClick={() => handleDeleteRow(row)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            />
        </>
        );
      </div>
    </>
  );
}

// renderTopToolbarCustomActions={() => (
//   <Button
//     color='secondary'
//     onClick={() => setCreateModalOpen(true)}
//     variant='contained'
//   >
//     Create New Account
//   </Button>
// )}
{/* <CreateNewAccountModal
columns={columns}
open={createModalOpen}
onClose={() => setCreateModalOpen(false)}
onSubmit={handleCreateNewRow}
/> */}