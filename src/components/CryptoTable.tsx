import * as React from 'react';
import {
  DataGrid, GridColDef, GridRowsProp, GridValueGetterParams,
} from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SortIcon from '@mui/icons-material/Sort';
import { useEffect, useState } from 'react';
import DataService from '../services/DataService';

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
    field: 'id', headerName: '#', type: 'number', width: 70,
  },
  {
    field: 'name', headerName: 'Coin', width: 130,
  },
  {
    field: 'price', headerName: 'Price', width: 130,
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

function CryptoTable() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [rows, setRows] = useState(DataService.getDataPerPage('usd', 100, 135) as unknown as [[GridRowsProp]]);

  useEffect(() => {
    setRows(DataService.getDataPerPage('usd', 100, 135) as unknown as [[GridRowsProp]]);
  }, []);

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
        components={{
          ColumnSortedAscendingIcon: ArrowDropUpIcon,
          ColumnSortedDescendingIcon: ArrowDropDownIcon,
          ColumnUnsortedIcon: SortIcon,
        }}
      />
    </Box>
  );
}
export default CryptoTable;
