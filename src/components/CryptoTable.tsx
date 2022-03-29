import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';

const useStyles = makeStyles((theme: any) => ({
  dataGridStyling: {
    '& .MuiDataGrid-columnHeaders': {
      borderBottom: `2px solid ${theme.palette.grey[300]}`,
      '& .MuiDataGrid-columnHeaderTitle': {
        fontFamily: theme.typography.primaryFont,
        fontWeight: theme.typography.fontBold,
      },
    },
    '& .MuiDataGrid-row': {
      border: 'none',
      '& .MuiDataGrid-cellContent': {
        fontFamily: theme.typography.primaryFont,
        fontWeight: theme.typography.fontNormal,
      },
      '&:nth-child(even)': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      borderRight: 'none',
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-row': {
      borderBottom: 'none',
    },
    '& .MuiDataGrid-root': {
      outline: 'none',
    },
  },

  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.2rem',
      height: '0.5rem',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[500],
    },
  },

}));

const columns: GridColDef[] = [
  {
    field: 'id', headerName: '#', type: 'number', headerAlign: 'left', width: 70,
  },
  {
    field: 'firstName', headerName: 'Coin', width: 130,
  },
  {
    field: 'lastName', headerName: 'Price', width: 130,
  },
  {
    field: '1h', headerName: '1h', width: 130,
  },
  {
    field: '24h', headerName: '24h', width: 130,
  },
  {
    field: '7d', headerName: '7d', width: 130,
  },
  {
    field: '24h Volume', headerName: '24h Volume', width: 130,
  },
  {
    field: 'Mkt Cap',
    headerName: 'Mkt Cap',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Last 7 Days',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  {
    id: 1, lastName: 'Snow', firstName: 'Jon', age: 35,
  },
  {
    id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42,
  },
  {
    id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45,
  },
  {
    id: 4, lastName: 'Stark', firstName: 'Arya', age: 16,
  },
  {
    id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null,
  },
  {
    id: 6, lastName: 'Melisandre', firstName: null, age: 150,
  },
  {
    id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44,
  },
  {
    id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36,
  },
  {
    id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65,
  },
  {
    id: 10, lastName: 'Snow', firstName: 'Jon', age: 35,
  },
  {
    id: 11, lastName: 'Lannister', firstName: 'Cersei', age: 42,
  },
  {
    id: 12, lastName: 'Lannister', firstName: 'Jaime', age: 45,
  },
  {
    id: 41, lastName: 'Stark', firstName: 'Arya', age: 16,
  },
  {
    id: 51, lastName: 'Targaryen', firstName: 'Daenerys', age: null,
  },
  {
    id: 61, lastName: 'Melisandre', firstName: null, age: 150,
  },
  {
    id: 71, lastName: 'Clifford', firstName: 'Ferrara', age: 44,
  },
  {
    id: 81, lastName: 'Frances', firstName: 'Rossini', age: 36,
  },
  {
    id: 91, lastName: 'Roxie', firstName: 'Harvey', age: 65,
  },
];

function CryptoTable() {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Box style={{ width: '100%' }}>
      <DataGrid
        className={classes.dataGridStyling}
        autoHeight
        rows={rows}
        columns={columns}
        // pageSize={10}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        sx={{
          border: 'none',
        }}
      />
    </Box>
  );
}
export default CryptoTable;
