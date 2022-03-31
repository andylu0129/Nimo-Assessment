// Styled table header of each of the columns
import * as React from 'react';
import { GridColDef, GridValueGetterParams, GridValueFormatterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'rank',
    headerName: '#',
    type: 'number',
    width: 80,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'name',
    headerName: 'Coin',
    width: 350,
    renderCell: (params: GridValueGetterParams) => (
      <>
        <img src={params.row.icon} alt="" style={{ height: '1rem', verticalAlign: 'text-top', marginRight: '0.5rem' }} />
        <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div style={{
            fontWeight: 'bold', verticalAlign: 'bottom', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
          }}
          >
            {params.row.name}
          </div>
          <text style={{
            alignItems: 'right', fontSize: '0.75rem', fontWeight: 'normal', verticalAlign: 'bottom',
          }}
          >
            {params.row.symbol.toUpperCase()}
          </text>
        </div>
      </>
    ),
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 200,
    valueFormatter: (params: GridValueFormatterParams) => {
      return params.value ? `$${params.value?.toLocaleString(undefined, { maximumFractionDigits: 17, minimumFractionDigits: 2 })}` : '$0.00';
    },
  },
  {
    field: 'priceChange1h',
    headerName: '1h',
    type: 'number',
    width: 100,
    renderCell: (params: GridValueGetterParams) => (
      <>
        {(params.row.priceChange1h < 0 && params.row.priceChange1h !== null) && (
          <span style={{ color: 'red' }}>
            {params.row.priceChange1h?.toFixed(1)}
            %
          </span>
        )}
        {params.row.priceChange1h >= 0 && params.row.priceChange1h !== null && (
          <span style={{ color: 'green' }}>
            {params.row.priceChange1h?.toFixed(1)}
            %
          </span>
        )}
        {params.row.priceChange1h === null && (
          <span>
            ?
          </span>
        )}
      </>
    ),
  },
  {
    field: 'priceChange24h',
    headerName: '24h',
    type: 'number',
    width: 100,
    renderCell: (params: GridValueGetterParams) => (
      <>
        {params.row.priceChange24h < 0 && params.row.priceChange24h !== null && (
          <span style={{ color: 'red' }}>
            {params.row.priceChange24h?.toFixed(1)}
            %
          </span>
        )}
        {params.row.priceChange24h >= 0 && params.row.priceChange24h !== null && (
          <span style={{ color: 'green' }}>
            {params.row.priceChange24h?.toFixed(1)}
            %
          </span>
        )}
        {params.row.priceChange1h === null && (
          <span>
            ?
          </span>
        )}
      </>
    ),
  },
  {
    field: 'priceChange7d',
    headerName: '7d',
    type: 'number',
    width: 100,
    renderCell: (params: GridValueGetterParams) => (
      <>
        {params.row.priceChange7d < 0 && params.row.priceChange7d !== null && (
          <span style={{ color: 'red' }}>
            {params.row.priceChange7d?.toFixed(1)}
            %
          </span>
        )}
        {params.row.priceChange7d >= 0 && params.row.priceChange7d !== null && (
          <span style={{ color: 'green' }}>
            {params.row.priceChange7d?.toFixed(1)}
            %
          </span>
        )}
        {params.row.priceChange1h === null && (
          <span>
            ?
          </span>
        )}
      </>
    ),
  },
  {
    field: 'volume24h',
    headerName: '24h Volume',
    type: 'number',
    width: 200,
    valueFormatter: (params: GridValueFormatterParams) => {
      return params.value ? `$${params.value?.toLocaleString()}` : '?';
    },
  },
  {
    field: 'mktCap',
    headerName: 'Mkt Cap',
    type: 'number',
    width: 200,
    valueFormatter: (params: GridValueFormatterParams) => {
      return params.value ? `$${params.value?.toLocaleString()}` : '?';
    },
  },
  {
    field: 'sparkline',
    headerName: 'Last 7 Days',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    renderCell: (params: GridValueGetterParams) => (
      <>
        <img src={params.row.sparkline} alt="" style={{ verticalAlign: 'text-top' }} />
      </>
    ),
  },
];

export default columns;
