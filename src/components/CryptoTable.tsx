import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SortIcon from '@mui/icons-material/Sort';
import { useEffect, useState } from 'react';
import {
  FormControl, InputLabel, Select, MenuItem, Pagination,
} from '@mui/material';
import DataService from '../services/DataService';
import { CoinData } from '../dto/CoinData';
import { CURRENCY_LIST } from '../util/constants';
import columns from '../util/tableColumn';

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
    '& .MuiDataGrid-footerContainer': {
      justifyContent: 'center',
    },
  },

  container: {
    width: '100%',
  },

  formContainer: {
    marginTop: '10rem',
    justifyContent: 'right',
    alignItems: 'right',
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

function CryptoTable() {
  const { pageAt } = useParams<{ pageAt: string }>();
  const history = useHistory();
  const theme = useTheme();
  const classes = useStyles(theme);
  const [rows, setRows] = useState<CoinData[]>([]);
  const [pageLength, setPageLength] = useState(100);
  const [pageNumber, setPageNumber] = useState(Number(pageAt));
  const [currency, setCurrency] = useState(CURRENCY_LIST.AUD);
  const [totalPage, setTotalPage] = useState(0);

  const getData = async (curr: string, len: number, num: number) => {
    try {
      const rowsData: CoinData[] = await DataService.getDataPerPage(curr, len, num);
      setRows(rowsData);
    } catch (err) {
      console.log(err);
    }
  };

  const getPageCount = async () => {
    try {
      const count = await DataService.getTotalPage();
      setTotalPage(count);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageLengthChange = (e: any) => {
    setPageLength(e.target.value);
  };

  const handlePageNumberChange = (e: any, n: number) => {
    setPageNumber(n);
    history.push(`/${n}`);
    console.log(e.target.value);
  };

  const handleCurrencyChange = (e: any) => {
    setCurrency(e.target.value);
  };

  useEffect(() => {
    getData(currency, pageLength, pageNumber);
  }, [currency, pageLength, pageNumber]);

  useEffect(() => {
    getPageCount();
  }, []);

  return (
    <Box>
      <FormControl className={classes.formContainer} size="small" variant="standard">
        <InputLabel id="currency-selector-label">Currency</InputLabel>
        <Select
          labelId="currency-selector-label"
          id="currency-selector"
          value={currency}
          label="Currency"
          onChange={handleCurrencyChange}
        >
          <MenuItem value={CURRENCY_LIST.USD}>US Dollar</MenuItem>
          <MenuItem value={CURRENCY_LIST.AUD}>Australian Dollar</MenuItem>
          <MenuItem value={CURRENCY_LIST.EUR}>Euro</MenuItem>
          <MenuItem value={CURRENCY_LIST.JPY}>Japanese Yen</MenuItem>
        </Select>
      </FormControl>
      <DataGrid
        className={classes.dataGridStyling}
        autoHeight
        rows={rows}
        columns={columns}
        // pageSize={100}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        // onPageSizeChange={handlePageLengthChange}
        // onPageChange={handlePageNumberChange}
        sx={{
          border: 'none',
        }}
        components={{
          ColumnSortedAscendingIcon: ArrowDropUpIcon,
          ColumnSortedDescendingIcon: ArrowDropDownIcon,
          ColumnUnsortedIcon: SortIcon,
          Pagination: () => {
            return (
              <>
                <Pagination count={totalPage} page={pageNumber} variant="outlined" shape="rounded" onChange={handlePageNumberChange} />
              </>
            );
          },
        }}
      />
    </Box>
  );
}
export default CryptoTable;
