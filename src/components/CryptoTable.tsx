import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SortIcon from '@mui/icons-material/Sort';
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
        fontWeight: theme.typography.fontWeightBold,
      },
    },
    '& .MuiDataGrid-row': {
      border: 'none',
      '& .MuiDataGrid-cellContent': {
        fontWeight: theme.typography.fontWeightRegular,
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
    '& .MuiDataGrid-footerContainer': {
      justifyContent: 'center',
    },
  },

  boxContainer: {
    width: '100%',
    // alignItems: 'center !important',
    // justifyContent: 'center !important',
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
  const [isloading, setIsLoading] = useState(true);

  // get data based on the given currency, page length (reserverd for future feature), page number.
  const getData = async (curr: string, len: number, num: number) => {
    try {
      const rowsData: CoinData[] = await DataService.getDataPerPage(curr, len, num);
      setRows(rowsData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // get the total number of pages.
  const getPageCount = async () => {
    try {
      const count = await DataService.getTotalPage();
      setTotalPage(count);
    } catch (err) {
      console.log(err);
    }
  };

  // calls when page changes.
  const handlePageNumberChange = (e: any, n: number) => {
    setPageNumber(n);
    history.push(`/${n}`);
  };

  // calls when a different currency is selected.
  const handleCurrencyChange = (e: any) => {
    setCurrency(e.target.value);
  };

  // update as currency, page size, page number changes.
  useEffect(() => {
    setIsLoading(true);
    getData(currency, pageLength, pageNumber);
  }, [currency, pageLength, pageNumber]);

  // initilise number of total pages.
  useEffect(() => {
    getPageCount();
  }, []);

  return (
    <Box style={{ width: '100%' }}>
      <FormControl size="small" style={{ margin: '1rem' }}>
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
        sx={{
          border: 'none',
        }}
        loading={isloading}
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
