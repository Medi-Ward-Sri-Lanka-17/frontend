import { Paper, gridClasses } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React from 'react'
import Theme from './Theme'

const DataGridComponent = (props) => {
  const theme = Theme()

  return (
    <Box>
      <Paper
        style={{
          width: '100%',
          overflowX: 'auto',
          margin: 'auto',
          maxWidth: props.totalWidth + 'px', // Set the total width of columns
        }}
      >
        <DataGrid
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          columns={props.columns}
          rows={props.rows}
          getRowId={props.getRowId}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 15, 25]}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          sx={{
            height: '75vh',
            [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
              {
                outline: 'none',
              },
            [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
              {
                outline: 'none',
              },
            '& .colored-data-grid': {
              backgroundColor: theme.palette.secondary.main,
              color: 'white',
            },
          }}
        />
      </Paper>
    </Box>
  )
}

export default DataGridComponent
